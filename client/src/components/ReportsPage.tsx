import { useEffect, useState } from 'react';
import { listReports, getReport, deleteReport, SavedReportSummary } from '../services/reportsApi';
import { exportJSON, exportHTML } from '../services/reporter';
import {
  Panel, PanelHeader, EmptyState, ReportList, ReportCard, ReportInfo,
  ReportStats, Stat, ReportActions, ActionButton, DeleteButton,
} from './ReportsPage.styles';

export default function ReportsPage() {
  const [reports, setReports] = useState<SavedReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setReports(await listReports());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load reports';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDownload = async (id: number, format: 'json' | 'html') => {
    setBusyId(id);
    try {
      const report = await getReport(id);
      if (format === 'json') exportJSON(report);
      else exportHTML(report);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to download report';
      setError(msg);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setBusyId(id);
    try {
      await deleteReport(id);
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete report';
      setError(msg);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <h2>Saved Reports</h2>
        <p>Test reports you've saved from previous runs</p>
      </PanelHeader>

      {error && <EmptyState>{error}</EmptyState>}

      {!error && !loading && reports.length === 0 && (
        <EmptyState>No saved reports yet. Run and save a report from the Testing tab.</EmptyState>
      )}

      {!error && reports.length > 0 && (
        <ReportList>
          {reports.map(r => (
            <ReportCard key={r.id}>
              <ReportInfo>
                <span className="title">{r.title}</span>
                <span className="meta">
                  <span>v{r.version}</span>
                  <span>{r.strategy}</span>
                  <span>{r.base_url}</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </span>
              </ReportInfo>

              <ReportStats>
                <Stat><span className="stat-num">{r.total}</span><span className="stat-label">Tests</span></Stat>
                <Stat $variant="green"><span className="stat-num">{r.passed}</span><span className="stat-label">Passed</span></Stat>
                <Stat $variant="red"><span className="stat-num">{r.failed}</span><span className="stat-label">Failed</span></Stat>
                <Stat><span className="stat-num">{r.pass_rate}</span><span className="stat-label">Rate</span></Stat>
              </ReportStats>

              <ReportActions>
                <ActionButton disabled={busyId === r.id} onClick={() => handleDownload(r.id, 'json')}>JSON</ActionButton>
                <ActionButton disabled={busyId === r.id} onClick={() => handleDownload(r.id, 'html')}>HTML</ActionButton>
                <DeleteButton disabled={busyId === r.id} onClick={() => handleDelete(r.id)}>Delete</DeleteButton>
              </ReportActions>
            </ReportCard>
          ))}
        </ReportList>
      )}
    </Panel>
  );
}
