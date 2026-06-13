import { useState } from 'react';
import {
  Panel, PanelHeader, ToggleRow, ToggleButton, TextInput, TextArea,
  StrategyRow, StrategyOptions, StrategyButton, SubmitButton, BtnLoading, Spinner,
} from './UploadPanel.styles';

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
    <Panel>
      <PanelHeader>
        <h2>API Specification</h2>
        <p>Provide an OpenAPI / Swagger spec to generate test cases</p>
      </PanelHeader>

      <ToggleRow>
        {(['url', 'json'] as const).map(mode => (
          <ToggleButton
            key={mode}
            $active={inputMode === mode}
            onClick={() => setInputMode(mode)}
          >
            {mode.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleRow>

      {inputMode === 'url' ? (
        <TextInput
          placeholder="https://petstore.swagger.io/v2/swagger.json"
          value={specInput}
          onChange={e => setSpecInput(e.target.value)}
        />
      ) : (
        <TextArea
          placeholder='{ "openapi": "3.0.0", ... }'
          value={specInput}
          onChange={e => setSpecInput(e.target.value)}
          rows={10}
        />
      )}

      <TextInput
        placeholder="Base URL for test execution (e.g. https://petstore.swagger.io/v2)"
        value={baseUrl}
        onChange={e => setBaseUrl(e.target.value)}
      />

      <StrategyRow>
        <label>Prompting Strategy</label>
        <StrategyOptions>
          {['zero-shot', 'few-shot', 'chain-of-thought'].map(s => (
            <StrategyButton
              key={s}
              $active={strategy === s}
              onClick={() => setStrategy(s)}
            >
              {s}
            </StrategyButton>
          ))}
        </StrategyOptions>
      </StrategyRow>

      <SubmitButton
        onClick={() => onSubmit({ specInput, baseUrl, strategy })}
        disabled={loading || !specInput.trim()}
      >
        {loading ? (
          <BtnLoading><Spinner /> Generating...</BtnLoading>
        ) : 'Generate Test Cases'}
      </SubmitButton>
    </Panel>
  );
}
