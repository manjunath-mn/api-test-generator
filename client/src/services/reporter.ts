import { GenerateResponse, ExecuteResponse, ExecResult } from './api';

export interface Report {
  meta: {
    title: string;
    version: string;
    baseUrl: string;
    strategy: string;
    generatedAt: string;
  };
  summary: {
    total: number;
    passed: number;
    failed: number;
    passRate: string;
    totalDurationMs: number;
  };
  endpoints: EndpointReport[];
}

export interface EndpointReport {
  endpoint: string;
  total: number;
  passed: number;
  failed: number;
  testCases: TestCaseReport[];
}

export interface TestCaseReport {
  id: string;
  description: string;
  category: string;
  method: string;
  path: string;
  expectedStatus: number;
  actualStatus: number | null;
  passed: boolean;
  statusMatch: boolean;
  bodyMatch: boolean;
  durationMs: number;
  error: string | null;
}

export function buildReport(gen: GenerateResponse, exec: ExecuteResponse): Report {
  const execMap = new Map(exec.results.map(r => [r.id, r]));
  const totalDurationMs = exec.results.reduce((s, r) => s + r.result.duration, 0);

  const endpoints: EndpointReport[] = gen.results.map(er => {
    const testCases: TestCaseReport[] = er.testCases.map(tc => {
      const ex: ExecResult | undefined = execMap.get(tc.id);
      const actualStatus = ex?.result.actualStatus ?? null;
      const statusMatch = actualStatus !== null && actualStatus === Number(tc.expectedStatus);
      const bodyMatch = ex?.result.bodyMatch ?? false;
      return {
        id: tc.id,
        description: tc.description,
        category: tc.category,
        method: tc.method,
        path: tc.path,
        expectedStatus: Number(tc.expectedStatus),
        actualStatus,
        passed: statusMatch && bodyMatch,
        statusMatch,
        bodyMatch,
        durationMs: ex?.result.duration ?? 0,
        error: ex?.result.error ?? null,
      };
    });

    const passed = testCases.filter(t => t.passed).length;
    return { endpoint: er.endpoint, total: testCases.length, passed, failed: testCases.length - passed, testCases };
  });

  return {
    meta: {
      title: gen.api.title,
      version: gen.api.version,
      baseUrl: gen.api.baseUrl,
      strategy: gen.strategy,
      generatedAt: new Date().toISOString(),
    },
    summary: {
      total: exec.summary.total,
      passed: exec.summary.passed,
      failed: exec.summary.failed,
      passRate: exec.summary.passRate,
      totalDurationMs,
    },
    endpoints,
  };
}

export function exportJSON(report: Report): void {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  download(blob, `report-${slug(report.meta.title)}.json`);
}

export function exportHTML(report: Report): void {
  const blob = new Blob([buildHTML(report)], { type: 'text/html' });
  download(blob, `report-${slug(report.meta.title)}.html`);
}

// ─── helpers ────────────────────────────────────────────────────────────────

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function statusColor(passed: boolean) {
  return passed ? '#16a34a' : '#dc2626';
}

function buildHTML(r: Report): string {
  const { meta, summary, endpoints } = r;
  const passRateNum = parseFloat(summary.passRate);
  const gaugeColor = passRateNum >= 80 ? '#16a34a' : passRateNum >= 50 ? '#d97706' : '#dc2626';

  const endpointRows = endpoints.map(ep => {
    const tcRows = ep.testCases.map(tc => `
      <tr>
        <td><span class="cat cat-${tc.category}">${tc.category}</span></td>
        <td>${esc(tc.description)}</td>
        <td><span class="method method-${tc.method.toLowerCase()}">${tc.method}</span></td>
        <td class="mono">${esc(tc.path)}</td>
        <td class="mono center">${tc.expectedStatus}</td>
        <td class="mono center">${tc.actualStatus ?? '—'}</td>
        <td class="mono center">${tc.durationMs}ms</td>
        <td class="center">
          <span class="pill ${tc.passed ? 'pill-pass' : 'pill-fail'}">${tc.passed ? 'PASS' : 'FAIL'}</span>
        </td>
        ${tc.error ? `<td class="error-cell mono">${esc(tc.error)}</td>` : '<td>—</td>'}
      </tr>`).join('');

    return `
    <section class="endpoint-section">
      <div class="endpoint-header">
        <span class="ep-label">${esc(ep.endpoint)}</span>
        <span class="ep-stats">${ep.passed}/${ep.total} passed</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th><th>Description</th><th>Method</th><th>Path</th>
            <th>Expected</th><th>Actual</th><th>Duration</th><th>Result</th><th>Error</th>
          </tr>
        </thead>
        <tbody>${tcRows}</tbody>
      </table>
    </section>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Test Report — ${esc(meta.title)}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         background: #f5f5f5; color: #111; font-size: 14px; line-height: 1.5; }
  .page { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; }
  h1 { font-size: 1.6rem; font-weight: 800; }
  h2 { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }

  /* Header */
  .report-header { background: #1e1b4b; color: #e0deff; border-radius: 12px;
                   padding: 1.5rem 2rem; margin-bottom: 1.5rem; }
  .report-header h1 { color: #fff; margin-bottom: 0.25rem; }
  .meta-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.75rem;
              font-size: 0.8rem; color: #a5b4fc; font-family: monospace; }

  /* Summary cards */
  .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
             gap: 1rem; margin-bottom: 1.5rem; }
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 1rem; text-align: center; }
  .card-num { font-size: 2rem; font-weight: 800; }
  .card-label { font-size: 0.75rem; color: #6b7280; text-transform: uppercase;
                letter-spacing: 0.05em; margin-top: 0.2rem; }
  .card-pass .card-num { color: #16a34a; }
  .card-fail .card-num { color: #dc2626; }
  .card-rate .card-num { color: ${gaugeColor}; }

  /* Endpoint section */
  .endpoint-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
                      margin-bottom: 1rem; overflow: hidden; }
  .endpoint-header { display: flex; justify-content: space-between; align-items: center;
                     padding: 0.75rem 1rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  .ep-label { font-family: monospace; font-size: 0.85rem; font-weight: 600; }
  .ep-stats { font-size: 0.8rem; color: #6b7280; }

  /* Table */
  table { width: 100%; border-collapse: collapse; }
  th { background: #f3f4f6; font-size: 0.72rem; text-transform: uppercase;
       letter-spacing: 0.05em; color: #6b7280; padding: 0.5rem 0.75rem; text-align: left; }
  td { padding: 0.55rem 0.75rem; border-top: 1px solid #f3f4f6; font-size: 0.82rem;
       vertical-align: middle; }
  tr:hover td { background: #fafafa; }
  .mono { font-family: monospace; }
  .center { text-align: center; }
  .error-cell { color: #dc2626; max-width: 220px; word-break: break-word; }

  /* Method badges */
  .method { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px;
            font-family: monospace; font-size: 0.7rem; font-weight: 700; }
  .method-get    { background: #dcfce7; color: #16a34a; }
  .method-post   { background: #ede9fe; color: #7c3aed; }
  .method-put    { background: #fef3c7; color: #d97706; }
  .method-delete { background: #fee2e2; color: #dc2626; }
  .method-patch  { background: #cffafe; color: #0891b2; }

  /* Category badges */
  .cat { display: inline-block; padding: 0.1rem 0.45rem; border-radius: 4px;
         font-size: 0.7rem; font-weight: 600; background: #f3f4f6; color: #374151; }
  .cat-positive      { background: #dcfce7; color: #15803d; }
  .cat-negative      { background: #fee2e2; color: #b91c1c; }
  .cat-boundary      { background: #fef3c7; color: #b45309; }
  .cat-authentication{ background: #ede9fe; color: #6d28d9; }
  .cat-security      { background: #fce7f3; color: #be185d; }

  /* Pills */
  .pill { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; }
  .pill-pass { background: #dcfce7; color: #16a34a; border: 1px solid #86efac; }
  .pill-fail { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }

  /* Footer */
  .report-footer { text-align: center; margin-top: 2rem; font-size: 0.75rem; color: #9ca3af; }
</style>
</head>
<body>
<div class="page">
  <div class="report-header">
    <h1>${esc(meta.title)}</h1>
    <div class="meta-row">
      <span>Version: ${esc(meta.version)}</span>
      <span>Strategy: ${esc(meta.strategy)}</span>
      <span>Base URL: ${esc(meta.baseUrl)}</span>
      <span>Generated: ${new Date(meta.generatedAt).toLocaleString()}</span>
    </div>
  </div>

  <div class="summary">
    <div class="card"><div class="card-num">${summary.total}</div><div class="card-label">Total</div></div>
    <div class="card card-pass"><div class="card-num">${summary.passed}</div><div class="card-label">Passed</div></div>
    <div class="card card-fail"><div class="card-num">${summary.failed}</div><div class="card-label">Failed</div></div>
    <div class="card card-rate"><div class="card-num">${summary.passRate}</div><div class="card-label">Pass Rate</div></div>
    <div class="card"><div class="card-num">${(summary.totalDurationMs / 1000).toFixed(2)}s</div><div class="card-label">Total Duration</div></div>
  </div>

  ${endpointRows}

  <div class="report-footer">Generated by APITestGenx &bull; ${new Date(meta.generatedAt).toUTCString()}</div>
</div>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
