const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateTestCases(endpoint, strategy = 'zero-shot') {
  const prompt = buildPrompt(endpoint, strategy);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8096,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find(block => block.type === 'text');
  if (!textBlock) {
    throw new Error('LLM response did not contain a text block');
  }

  return parseTestCasesFromResponse(textBlock.text, endpoint);
}

function buildPrompt(endpoint, strategy) {
  const endpointContext = `
Endpoint: ${endpoint.method} ${endpoint.path}
Summary: ${endpoint.summary}
Description: ${endpoint.description}
Parameters: ${JSON.stringify(endpoint.parameters, null, 2)}
Request Body: ${JSON.stringify(endpoint.requestBody, null, 2)}
Responses: ${JSON.stringify(endpoint.responses, null, 2)}
Security: ${JSON.stringify(endpoint.security, null, 2)}
`.trim();

  const strategies = {
    'zero-shot': buildZeroShotPrompt(endpointContext),
    'few-shot': buildFewShotPrompt(endpointContext),
    'chain-of-thought': buildChainOfThoughtPrompt(endpointContext),
  };

  return strategies[strategy] || strategies['zero-shot'];
}

// function buildZeroShotPrompt(context) {
//   return `You are an expert API test engineer. Generate comprehensive functional test cases for the following REST API endpoint.

// ${context}

// Generate test cases in the following categories:
// 1. positive - valid inputs that should succeed
// 2. negative - invalid inputs, missing fields, wrong types
// 3. boundary - edge values (empty strings, max lengths, zero, negative numbers)
// 4. authentication - missing token, invalid token, expired token
// 5. security - SQL injection, XSS payloads, path traversal

// Respond ONLY with a valid JSON array. No explanation, no markdown, no code fences. Each test case must follow this exact structure:
// [
//   {
//     "id": "tc_001",
//     "category": "positive",
//     "description": "Short description of what this test checks",
//     "method": "GET",
//     "path": "/example",
//     "headers": {},
//     "queryParams": {},
//     "body": null,
//     "expectedStatus": 200,
//     "expectedBodyContains": null
//   }
// ]`;
// }

function buildZeroShotPrompt(context) {
  return `You are an expert API test engineer. Generate functional test cases for the following REST API endpoint.

${context}

Generate EXACTLY 5 test cases covering these categories: positive, negative, boundary, authentication, security (one each).

Respond ONLY with a valid JSON array of exactly 5 objects. No explanation, no markdown, no code fences. Each object must follow this exact structure:
[
  {
    "id": "tc_001",
    "category": "positive",
    "description": "Short description",
    "method": "GET",
    "path": "/example",
    "headers": {},
    "queryParams": {},
    "body": null,
    "expectedStatus": 200,
    "expectedBodyContains": null
  }
]`;
}

function buildFewShotPrompt(context) {
  return `You are an expert API test engineer. Generate comprehensive functional test cases for the following REST API endpoint.

${context}

Here are examples of well-structured test cases:

Example 1 - Positive test:
{
  "id": "tc_001",
  "category": "positive",
  "description": "Retrieve user with valid ID",
  "method": "GET",
  "path": "/users/1",
  "headers": { "Authorization": "Bearer valid_token" },
  "queryParams": {},
  "body": null,
  "expectedStatus": 200,
  "expectedBodyContains": "id"
}

Example 2 - Negative test:
{
  "id": "tc_002",
  "category": "negative",
  "description": "Retrieve user with non-existent ID",
  "method": "GET",
  "path": "/users/99999",
  "headers": { "Authorization": "Bearer valid_token" },
  "queryParams": {},
  "body": null,
  "expectedStatus": 404,
  "expectedBodyContains": null
}

Example 3 - Authentication test:
{
  "id": "tc_003",
  "category": "authentication",
  "description": "Request without Authorization header",
  "method": "GET",
  "path": "/users/1",
  "headers": {},
  "queryParams": {},
  "body": null,
  "expectedStatus": 401,
  "expectedBodyContains": null
}

Now generate test cases covering all categories: positive, negative, boundary, authentication, security.
Respond ONLY with a valid JSON array. No explanation, no markdown, no code fences.`;
}

function buildChainOfThoughtPrompt(context) {
  return `You are an expert API test engineer. Think step by step to generate comprehensive test cases for the following REST API endpoint.

${context}

Follow this reasoning process:
1. First, understand what this endpoint does and what a successful call looks like
2. Identify all required and optional parameters
3. Consider what inputs would cause validation failures
4. Think about boundary conditions for each parameter type
5. Consider authentication and authorisation scenarios
6. Think about security attack vectors relevant to this endpoint

After reasoning through each step, produce ONLY a valid JSON array of test cases with this structure:
[
  {
    "id": "tc_001",
    "category": "positive|negative|boundary|authentication|security",
    "description": "What this test validates",
    "method": "HTTP_METHOD",
    "path": "/actual/path",
    "headers": {},
    "queryParams": {},
    "body": null,
    "expectedStatus": 200,
    "expectedBodyContains": null
  }
]

Respond ONLY with the JSON array. No preamble, no explanation, no markdown fences.`;
}

function parseTestCasesFromResponse(raw, endpoint) {
  try {
    // Strip markdown fences if Claude adds them despite instructions
    const cleaned = raw
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      throw new Error('Response is not an array');
    }

    // Normalise and stamp each test case with a unique ID
    return parsed.map((tc, i) => ({
      id: tc.id || `tc_${String(i + 1).padStart(3, '0')}`,
      category: tc.category || 'positive',
      description: tc.description || '',
      method: tc.method || endpoint.method,
      path: tc.path || endpoint.path,
      headers: tc.headers || {},
      queryParams: tc.queryParams || {},
      body: tc.body || null,
      expectedStatus: Number(tc.expectedStatus) || 200,
      expectedBodyContains: tc.expectedBodyContains || null,
    }));
  } catch (err) {
    const preview = typeof raw === 'string' ? raw.substring(0, 300) : String(raw);
    throw new Error(`Failed to parse LLM response: ${err.message}\nRaw: ${preview}`);
  }
}

module.exports = { generateTestCases };