import { useState } from 'react';

interface Props {
  onSubmit: (data: { specInput: string; baseUrl: string; strategy: string }) => void;
  loading: boolean;
}

export default function UploadPanel({ onSubmit, loading }: Props) {
  const [specInput, setSpecInput] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [strategy, setStrategy] = useState('zero-shot');
  const [inputMode, setInputMode] = useState<'url' | 'json'>('url');

  return (
    <div className="upload-panel">
      <div className="panel-header">
        <h2>API Specification</h2>
        <p>Provide an OpenAPI / Swagger spec to generate test cases</p>
      </div>

      <div className="toggle-row">
        {(['url', 'json'] as const).map(mode => (
          <button
            key={mode}
            className={`toggle-btn ${inputMode === mode ? 'active' : ''}`}
            onClick={() => setInputMode(mode)}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      {inputMode === 'url' ? (
        <input
          className="text-input"
          placeholder="https://petstore.swagger.io/v2/swagger.json"
          value={specInput}
          onChange={e => setSpecInput(e.target.value)}
        />
      ) : (
        <textarea
          className="text-input textarea"
          placeholder='{ "openapi": "3.0.0", ... }'
          value={specInput}
          onChange={e => setSpecInput(e.target.value)}
          rows={10}
        />
      )}

      <input
        className="text-input"
        placeholder="Base URL for test execution (e.g. https://petstore.swagger.io/v2)"
        value={baseUrl}
        onChange={e => setBaseUrl(e.target.value)}
      />

      <div className="strategy-row">
        <label>Prompting Strategy</label>
        <div className="strategy-options">
          {['zero-shot', 'few-shot', 'chain-of-thought'].map(s => (
            <button
              key={s}
              className={`strategy-btn ${strategy === s ? 'active' : ''}`}
              onClick={() => setStrategy(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        className="submit-btn"
        onClick={() => onSubmit({ specInput, baseUrl, strategy })}
        disabled={loading || !specInput.trim()}
      >
        {loading ? (
          <span className="btn-loading"><span className="spinner" /> Generating...</span>
        ) : 'Generate Test Cases'}
      </button>
    </div>
  );
}