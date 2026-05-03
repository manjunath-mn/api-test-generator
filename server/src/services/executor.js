const axios = require('axios');

async function executeTestCases(testCases, baseUrl) {
  const results = [];

  for (const tc of testCases) {
    const result = await runSingleTest(tc, baseUrl);
    results.push(result);
  }

  return results;
}

async function runSingleTest(tc, baseUrl) {
  const url = `${baseUrl}${tc.path}`;
  const startTime = Date.now();

  try {
    const response = await axios({
      method: tc.method.toLowerCase(),
      url,
      headers: tc.headers || {},
      params: tc.queryParams || {},
      data: tc.body || undefined,
      validateStatus: () => true, // don't throw on 4xx/5xx
      timeout: 10000,
    });

    const duration = Date.now() - startTime;
    const statusMatch = response.status === Number(tc.expectedStatus);

    const bodyMatch = tc.expectedBodyContains
      ? JSON.stringify(response.data).includes(tc.expectedBodyContains)
      : true;

    const passed = statusMatch && bodyMatch;

    return {
      ...tc,
      result: {
        passed,
        actualStatus: response.status,
        expectedStatus: tc.expectedStatus,
        statusMatch,
        bodyMatch,
        duration,
        responseBody: truncate(response.data),
        error: null,
      },
    };
  } catch (err) {
    const duration = Date.now() - startTime;
    return {
      ...tc,
      result: {
        passed: false,
        actualStatus: null,
        expectedStatus: tc.expectedStatus,
        statusMatch: false,
        bodyMatch: false,
        duration,
        responseBody: null,
        error: err.message,
      },
    };
  }
}

function truncate(data) {
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  return str && str.length > 500 ? str.substring(0, 500) + '...' : str;
}

module.exports = { executeTestCases };