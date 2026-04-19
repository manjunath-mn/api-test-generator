const express = require('express');
const router = express.Router();
const { parseSpec } = require('../services/parser');
const { generateTestCases } = require('../services/llm');

// POST /api/generate
router.post('/', async (req, res) => {
  const { spec, strategy = 'zero-shot' } = req.body;

  if (!spec) {
    return res.status(400).json({ error: 'No spec provided' });
  }

  try {
    const parsed = await parseSpec(spec);

    const allTestCases = [];

    for (const endpoint of parsed.endpoints) {
      const testCases = await generateTestCases(endpoint, strategy);
      allTestCases.push({
        endpoint: `${endpoint.method} ${endpoint.path}`,
        testCases,
      });
    }

    res.json({
      api: { title: parsed.title, version: parsed.version, baseUrl: parsed.baseUrl },
      strategy,
      totalEndpoints: parsed.endpoints.length,
      results: allTestCases,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;