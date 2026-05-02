import { useState } from 'react';
import { GenerateResponse, ExecuteResponse, TestCase } from '../services/api';

interface Props {
  data: GenerateResponse;
  execResults: ExecuteResponse | null;
  onExecute: (testCases: TestCase[], baseUrl: string) => void;
  executing: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  positive: '#22c55e',
  negative: '#ef4444',
  boundary: '#f59e0b',
  authentication: '#8b5cf6',
  security: '#ec4899',
};

export default function ResultsPanel({ data, execResults, onExecute, executing }: Props) {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const allTestCases = data.results.flatMap(r => r.testCases);
  const endpoint = data.results[activeEndpoint];

  const getExecResult = (tcId: string) =>
    execResults?.results?.find(r => r.id === tcId);

  return (
    <div className="results-panel">
      <div className="results-header">
        <div className="api-info">
          <h2>{data.api.title}</h2>
          <span className="version-badge">v{data.api.version}</span>
          <span className="strategy-badge">{data.strategy}</span>
        </div>
        <div className="header-stats">
          <div className="stat"><span className="stat-num">{data.totalEndpoints}</span><span className="stat-label">Endpoints</span></div>
          <div className="stat"><span className="stat-num">{allTestCases.length}</span><span className="stat-label">Tests</span></div>
          {execResults && (
            <>
              <div className="stat green"><span className="stat-num">{execResults.summary.passed}</span><span className="stat-label">Passed</span></div>
              <div className="stat red"><span className="stat-num">{execResults.summary.failed}</span><span className="stat-label">Failed</span></div>
            </>
          )}
        </div>
      </div>

      <div className="results-body">
        <div className="endpoint-sidebar">
          {data.results.map((r, i) => (
            <button key={i} className={`endpoint-btn ${activeEndpoint === i ? 'active' : ''}`} onClick={() => setActiveEndpoint(i)}>
              <span className={`method-badge method-${r.endpoint.split(' ')[0].toLowerCase()}`}>{r.endpoint.split(' ')[0]}</span>
              <span className="endpoint-path">{r.endpoint.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        <div className="test-cases-list">
          {endpoint.testCases.map((tc, i) => {
            const exec = getExecResult(tc.id);
            return (
              <div
                key={tc.id}
                className={`test-case-card ${expandedCase === i ? 'expanded' : ''}`}
                onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              >
                <div className="tc-header">
                  <span className="category-dot" style={{ background: CATEGORY_COLORS[tc.category] }} />
                  <span className="tc-category">{tc.category}</span>
                  <span className="tc-desc">{tc.description}</span>
                  <span className="tc-status-badge">
                    {exec ? (
                      <span className={exec.result.passed ? 'pass' : 'fail'}>{exec.result.passed ? '✓ PASS' : '✗ FAIL'}</span>
                    ) : (
                      <span className="pending">{tc.expectedStatus}</span>
                    )}
                  </span>
                </div>
                {expandedCase === i && (
                  <div className="tc-details">
                    <div className="tc-detail-row"><strong>Method:</strong> {tc.method}</div>
                    <div className="tc-detail-row"><strong>Path:</strong> {tc.path}</div>
                    {Object.keys(tc.headers).length > 0 && (
                      <div className="tc-detail-row"><strong>Headers:</strong><pre>{JSON.stringify(tc.headers, null, 2)}</pre></div>
                    )}
                    {tc.body ?(
                      <div className="tc-detail-row"><strong>Body:</strong><pre>{JSON.stringify(tc.body, null, 2)}</pre></div>
                    ) : <></>}
                    {exec && (
                      <div className="tc-exec-result">
                        <strong>Actual Status:</strong> {exec.result.actualStatus} | <strong>Duration:</strong> {exec.result.duration}ms
                        {exec.result.error && <div className="exec-error">{exec.result.error}</div>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-footer">
        <button className="execute-btn" onClick={() => onExecute(allTestCases, data.api.baseUrl)} disabled={executing || !data.api.baseUrl}>
          {executing ? <span className="btn-loading"><span className="spinner" /> Executing...</span> : '▶ Execute Tests'}
        </button>
        {!data.api.baseUrl && <span className="no-baseurl">No base URL — execution disabled</span>}
      </div>
    </div>
  );
}