const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseSpec(specInput) {
  let api;

  try {
    // handles both JSON object and YAML/JSON string
    if (typeof specInput === 'string') {
      api = await SwaggerParser.validate(specInput);
    } else {
      api = await SwaggerParser.validate(specInput);
    }
  } catch (err) {
    throw new Error(`Invalid OpenAPI spec: ${err.message}`);
  }

  const endpoints = [];
  const paths = api.paths || {};

  for (const [path, pathItem] of Object.entries(paths)) {
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

    for (const method of methods) {
      if (!pathItem[method]) continue;

      const operation = pathItem[method];

      endpoints.push({
        method: method.toUpperCase(),
        path,
        summary: operation.summary || '',
        description: operation.description || '',
        parameters: operation.parameters || [],
        requestBody: operation.requestBody || null,
        responses: operation.responses || {},
        security: operation.security || api.security || [],
        tags: operation.tags || [],
      });
    }
  }

  return {
    title: api.info?.title || 'Unknown API',
    version: api.info?.version || '1.0.0',
    baseUrl: extractBaseUrl(api),
    endpoints,
  };
}

function extractBaseUrl(api) {
  // OpenAPI 3.x
  if (api.servers && api.servers.length > 0) {
    return api.servers[0].url;
  }
  // Swagger 2.x
  if (api.host) {
    const scheme = (api.schemes && api.schemes[0]) || 'https';
    const basePath = api.basePath || '';
    return `${scheme}://${api.host}${basePath}`;
  }
  return '';
}

module.exports = { parseSpec };