const express = require('express');
const router = express.Router();
const { executeTestCases } = require('../services/executor');

// POST /api/execute
router.post('/', async (req, res) => {
  const { testCases, baseUrl } = req.body;

  if (!testCases || !baseUrl) {
    return res.status(400).json({ error: 'testCases and baseUrl are required' });
  }

  try {
    const results = await executeTestCases(testCases, baseUrl);

    const passed = results.filter(r => r.result.passed).length;
    const failed = results.filter(r => !r.result.passed).length;

    res.json({
      summary: { total: results.length, passed, failed, passRate: `${Math.round((passed / results.length) * 100)}%` },
      results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;