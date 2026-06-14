import { useState } from 'react';
import { GenerateResponse, ExecuteResponse, TestCase } from '../services/api';
import { buildReport, exportJSON, exportHTML } from '../services/reporter';
import { saveReport } from '../services/reportsApi';
import Loader from './Loader';
import {
  ResultsContainer, ResultsHeader, ApiInfo, VersionBadge, StrategyBadge, HeaderStats, Stat,
  ResultsBody, EndpointSidebar, EndpointButton, EndpointPath, MethodBadge,
  TestCasesList, TestCaseCard, TcHeader, CategoryDot, TcCategory, TcDesc, TcStatusBadge,
  StatusPill, StatusPillTooltip, TcDetails, TcDetailRow, TcExecResult, ExecError,
  ResultsFooter, ExecuteButton, NoBaseUrl, ExportGroup, ExportLabel, ExportButton, SaveButton,
  BtnLoading, Spinner,
} from './ResultsPanel.styles';

const EXECUTE_STEPS = [
  'Preparing requests',
  'Sending HTTP requests to the API',
  'Collecting responses',
  'Evaluating assertions',
  'Compiling results',
];

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
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const allTestCases = data.results.flatMap(r => r.testCases);
  const endpoint = data.results[activeEndpoint];

  const getExecResult = (tcId: string) =>
    execResults?.results?.find(r => r.id === tcId);

  const getTooltip = (exec: ReturnType<typeof getExecResult>): string => {
    if (!exec) return '';
    const r = exec.result;
    if (r.passed) {
      const lines = [`Status ${r.actualStatus} matched expected ${r.expectedStatus}`];
      if (exec.expectedBodyContains && r.bodyMatch) lines.push('Response body matched');
      return lines.join('\n');
    }
    const lines: string[] = [];
    if (!r.statusMatch) lines.push(`Status ${r.actualStatus} — expected ${r.expectedStatus}`);
    if (exec.expectedBodyContains && !r.bodyMatch) lines.push('Response body did not match');
    if (r.error) lines.push(`Error: ${r.error}`);
    return lines.join('\n') || 'Test failed';
  };

  if (executing) {
    return <Loader title="Executing test cases" steps={EXECUTE_STEPS} />;
  }

  const handleSave = async () => {
    if (!execResults) return;
    setSaving(true);
    try {
      await saveReport(buildReport(data, execResults));
      setSaved(true);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ResultsContainer>
      <ResultsHeader>
        <ApiInfo>
          <h2>{data.api.title}</h2>
          <VersionBadge>v{data.api.version}</VersionBadge>
          <StrategyBadge>{data.strategy}</StrategyBadge>
        </ApiInfo>
        <HeaderStats>
          <Stat><span className="stat-num">{data.totalEndpoints}</span><span className="stat-label">Endpoints</span></Stat>
          <Stat><span className="stat-num">{allTestCases.length}</span><span className="stat-label">Tests</span></Stat>
          {execResults && (
            <>
              <Stat $variant="green"><span className="stat-num">{execResults.summary.passed}</span><span className="stat-label">Passed</span></Stat>
              <Stat $variant="red"><span className="stat-num">{execResults.summary.failed}</span><span className="stat-label">Failed</span></Stat>
            </>
          )}
        </HeaderStats>
      </ResultsHeader>

      <ResultsBody>
        <EndpointSidebar>
          {data.results.map((r, i) => (
            <EndpointButton key={i} $active={activeEndpoint === i} onClick={() => setActiveEndpoint(i)}>
              <MethodBadge $method={r.endpoint.split(' ')[0].toLowerCase()}>{r.endpoint.split(' ')[0]}</MethodBadge>
              <EndpointPath>{r.endpoint.split(' ')[1]}</EndpointPath>
            </EndpointButton>
          ))}
        </EndpointSidebar>

        <TestCasesList>
          {endpoint.testCases.map((tc, i) => {
            const exec = getExecResult(tc.id);
            return (
              <TestCaseCard
                key={tc.id}
                $expanded={expandedCase === i}
                onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              >
                <TcHeader>
                  <CategoryDot $color={CATEGORY_COLORS[tc.category]} />
                  <TcCategory>{tc.category}</TcCategory>
                  <TcDesc>{tc.description}</TcDesc>
                  <TcStatusBadge>
                    {exec ? (
                      <StatusPill $variant={exec.result.passed ? 'pass' : 'fail'}>
                        {exec.result.passed ? 'PASS' : 'FAIL'}
                        <StatusPillTooltip className="status-pill-tooltip">{getTooltip(exec)}</StatusPillTooltip>
                      </StatusPill>
                    ) : (
                      <StatusPill $variant="pending">{tc.expectedStatus}</StatusPill>
                    )}
                  </TcStatusBadge>
                </TcHeader>
                {expandedCase === i && (
                  <TcDetails>
                    <TcDetailRow><strong>Method:</strong> {tc.method}</TcDetailRow>
                    <TcDetailRow><strong>Path:</strong> {tc.path}</TcDetailRow>
                    {Object.keys(tc.headers).length > 0 && (
                      <TcDetailRow><strong>Headers:</strong><pre>{JSON.stringify(tc.headers, null, 2)}</pre></TcDetailRow>
                    )}
                    {tc.body ?(
                      <TcDetailRow><strong>Body:</strong><pre>{JSON.stringify(tc.body, null, 2)}</pre></TcDetailRow>
                    ) : <></>}
                    {exec && (
                      <TcExecResult>
                        <strong>Actual Status:</strong> {exec.result.actualStatus} | <strong>Duration:</strong> {exec.result.duration}ms
                        {exec.result.error && <ExecError>{exec.result.error}</ExecError>}
                      </TcExecResult>
                    )}
                  </TcDetails>
                )}
              </TestCaseCard>
            );
          })}
        </TestCasesList>
      </ResultsBody>

      <ResultsFooter>
        <ExecuteButton onClick={() => onExecute(allTestCases, data.api.baseUrl)} disabled={executing || !data.api.baseUrl}>
          {executing ? <BtnLoading><Spinner /> Executing...</BtnLoading> : '▶ Execute Tests'}
        </ExecuteButton>
        {!data.api.baseUrl && <NoBaseUrl>No base URL — execution disabled</NoBaseUrl>}
        {execResults && (
          <ExportGroup>
            <ExportLabel>Export report</ExportLabel>
            <ExportButton onClick={() => exportJSON(buildReport(data, execResults))}>JSON</ExportButton>
            <ExportButton onClick={() => exportHTML(buildReport(data, execResults))}>HTML</ExportButton>
            <SaveButton onClick={handleSave} disabled={saving || saved}>
              {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save Report'}
            </SaveButton>
          </ExportGroup>
        )}
      </ResultsFooter>
    </ResultsContainer>
  );
}
