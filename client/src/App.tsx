import { useState, useEffect } from 'react';
import UploadPanel from './components/UploadPanel';
import ResultsPanel from './components/ResultsPanel';
import Loader from './components/Loader';
import { AuthModal } from './components/AuthModal';

const GENERATE_STEPS = [
  'Reading the specification',
  'Discovering endpoints',
  'Analysing request and response schemas',
  'Building prompts for the language model',
  'Requesting the AI to generate test cases',
  'Assembling your test suite',
];
import { generateTests, executeTests, GenerateResponse, ExecuteResponse, TestCase } from './services/api';
import './App.css';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [stage, setStage] = useState<'upload' | 'results'>('upload');
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [data, setData] = useState<GenerateResponse | null>(null);
  const [execResults, setExecResults] = useState<ExecuteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedEmail = localStorage.getItem('authEmail');
    if (savedToken) {
      setToken(savedToken);
      setEmail(savedEmail);
    }
  }, []);

  const handleAuthSuccess = (newToken: string, newEmail: string) => {
    setToken(newToken);
    setEmail(newEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    setToken(null);
    setEmail(null);
    setStage('upload');
    setData(null);
    setExecResults(null);
  };

  const handleGenerate = async ({ specInput, baseUrl, strategy }: { specInput: string; baseUrl: string; strategy: string }) => {
    setLoading(true);
    setError(null);
    try {
      let spec: unknown;
      try { spec = JSON.parse(specInput); } catch { spec = specInput; }
      const result = await generateTests(spec, strategy);
      if (baseUrl) result.api.baseUrl = baseUrl;
      setData(result);
      setStage('results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error || msg);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (testCases: TestCase[], baseUrl: string) => {
    setExecuting(true);
    try {
      const result = await executeTests(testCases, baseUrl);
      setExecResults(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error || msg);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="app">
      {!token ? (
        <AuthModal onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <header className="app-header">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">API<strong>Test</strong>Genx</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>{email}</span>
              {stage === 'results' && (
                <button className="back-btn" onClick={() => { setStage('upload'); setData(null); setExecResults(null); }}>
                  ← New Spec
                </button>
              )}
              <button className="back-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <main className="app-main">
            {error && (
              <div className="error-banner">
                <strong>Error:</strong> {error}
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}
            {stage === 'upload' && !loading && <UploadPanel onSubmit={handleGenerate} loading={loading} />}
            {loading && <Loader title="Generating your test suite" steps={GENERATE_STEPS} />}
            {stage === 'results' && data && (
              <ResultsPanel data={data} execResults={execResults} onExecute={handleExecute} executing={executing} />
            )}
          </main>
        </>
      )}
    </div>
  );
}