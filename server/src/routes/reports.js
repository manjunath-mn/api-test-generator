const express = require('express');
const router = express.Router();
const { getDb } = require('../db/init');

const db = getDb();

// POST /api/reports - save a report
router.post('/', (req, res) => {
  const { report } = req.body;

  if (!report || !report.meta || !report.summary) {
    return res.status(400).json({ error: 'A valid report is required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO reports (user_id, title, version, base_url, strategy, pass_rate, total, passed, failed, report_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      req.user.id,
      report.meta.title,
      report.meta.version,
      report.meta.baseUrl,
      report.meta.strategy,
      report.summary.passRate,
      report.summary.total,
      report.summary.passed,
      report.summary.failed,
      JSON.stringify(report)
    );

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports - list saved reports for the current user
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, title, version, base_url, strategy, pass_rate, total, passed, failed, created_at
      FROM reports WHERE user_id = ? ORDER BY created_at DESC
    `).all(req.user.id);

    res.json({ reports: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/:id - fetch full report for download
router.get('/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT report_json FROM reports WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);

    if (!row) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ report: JSON.parse(row.report_json) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/reports/:id - delete a saved report
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM reports WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
