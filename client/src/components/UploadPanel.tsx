import { useState } from 'react';
import {
  FlaskConical, Link2, Braces, Globe, Zap, BookOpen, Brain,
  Check, ChevronRight, Loader2, HelpCircle, TestTube2,
} from 'lucide-react';
import {
  PageWrapper, Card,
  CardHeader, CardHeaderTop, CardIcon, CardTitle, CardSubtitle,
  CardBody, Section,
  LabelRow, Label, OptionalBadge, TooltipWrap, TooltipTrigger, TooltipBox,
  ModeTabs, ModeTab,
  InputWrap, InputPrefix, TextInput, TextArea, InputHint,
  StrategyGrid, StrategyCard, StrategyCheck, StrategyIcon, StrategyName, StrategyTag, StrategyDesc,
  CardFooter, SubmitButton, SubmitMeta, BtnLoading, Spinner,
} from './UploadPanel.styles';

interface Props {
  onSubmit: (data: { specInput: string; baseUrl: string; strategy: string }) => void;
  loading: boolean;
}

const STRATEGIES = [
  {
    id: 'zero-shot',
    icon: Zap,
    label: 'Zero-Shot',
    tag: 'Fastest' as const,
    tagColor: 'green' as const,
    desc: 'AI reads your spec directly. No examples — broad coverage in seconds.',
  },
  {
    id: 'few-shot',
    icon: BookOpen,
    label: 'Few-Shot',
    tag: 'Balanced' as const,
    tagColor: 'amber' as const,
    desc: 'AI references example test cases for more structured, consistent output.',
  },
  {
    id: 'chain-of-thought',
    icon: Brain,
    label: 'Chain-of-Thought',
    tag: 'Deepest' as const,
    tagColor: 'purple' as const,
    desc: 'AI reasons step-by-step through your spec — best quality, slightly slower.',
  },
] as const;

function isValidUrl(val: string) {
  try { new URL(val); return true; } catch { return false; }
}

export default function UploadPanel({ onSubmit, loading }: Props) {
  const [specInput, setSpecInput] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [strategy, setStrategy] = useState('zero-shot');
  const [inputMode, setInputMode] = useState<'url' | 'json'>('url');

  const specValid = inputMode === 'url' ? isValidUrl(specInput) : specInput.trim().length > 10;
  const baseUrlValid = baseUrl.trim() !== '' && isValidUrl(baseUrl);
  const canSubmit = !loading && specInput.trim().length > 0;

  return (
    <PageWrapper>
      <Card>
        {/* ── Header ── */}
        <CardHeader>
          <CardHeaderTop>
            <CardIcon><FlaskConical size={18} /></CardIcon>
            <CardTitle>Generate Test Cases</CardTitle>
          </CardHeaderTop>
          <CardSubtitle>
            Import your OpenAPI / Swagger spec, configure a base URL, pick an AI strategy, and generate a full test suite in seconds.
          </CardSubtitle>
        </CardHeader>

        <CardBody>
          {/* ── Spec ── */}
          <Section>
            <LabelRow>
              <Label htmlFor="spec-input">API Specification</Label>
              <TooltipWrap>
                <TooltipTrigger type="button"><HelpCircle size={14} /></TooltipTrigger>
                <TooltipBox>
                  Paste a <strong>URL</strong> pointing to your OpenAPI / Swagger JSON or YAML file (e.g. <code>https://api.example.com/openapi.json</code>), or switch to <strong>JSON</strong> to paste the raw spec content. The spec tells the AI about your endpoints, parameters, and expected responses.
                </TooltipBox>
              </TooltipWrap>
            </LabelRow>

            <ModeTabs>
              <ModeTab
                type="button"
                $active={inputMode === 'url'}
                onClick={() => { setInputMode('url'); setSpecInput(''); }}
              >
                <Link2 size={11} /> URL
              </ModeTab>
              <ModeTab
                type="button"
                $active={inputMode === 'json'}
                onClick={() => { setInputMode('json'); setSpecInput(''); }}
              >
                <Braces size={11} /> JSON
              </ModeTab>
            </ModeTabs>

            {inputMode === 'url' ? (
              <InputWrap $valid={specValid}>
                <InputPrefix><Link2 size={14} /></InputPrefix>
                <TextInput
                  id="spec-input"
                  type="url"
                  $hasPrefix
                  $hasCheck={specValid}
                  placeholder="https://petstore.swagger.io/v2/swagger.json"
                  value={specInput}
                  onChange={e => setSpecInput(e.target.value)}
                />
              </InputWrap>
            ) : (
              <TextArea
                id="spec-input"
                placeholder={'{\n  "openapi": "3.0.0",\n  "info": { "title": "My API", "version": "1.0.0" },\n  "paths": {\n    "/users": { ... }\n  }\n}'}
                value={specInput}
                onChange={e => setSpecInput(e.target.value)}
                rows={9}
              />
            )}
            {inputMode === 'url' && !specValid && specInput.length > 0 && (
              <InputHint style={{ color: '#f87171' }}>
                Enter a valid URL starting with https:// or http://
              </InputHint>
            )}
          </Section>

          {/* ── Base URL ── */}
          <Section>
            <LabelRow>
              <Label htmlFor="base-url">Base URL</Label>
              <OptionalBadge>Optional</OptionalBadge>
              <TooltipWrap>
                <TooltipTrigger type="button"><HelpCircle size={14} /></TooltipTrigger>
                <TooltipBox>
                  The root address of your <strong>running API server</strong>. Required only to <em>execute</em> test cases. If your spec already declares a <code>servers</code> URL that matches your live API, you can leave this blank — it will be auto-detected. Override it here for local servers (<code>http://localhost:3000</code>) or when testing against a different environment.
                </TooltipBox>
              </TooltipWrap>
            </LabelRow>
            <InputWrap $valid={baseUrlValid}>
              <InputPrefix><Globe size={14} /></InputPrefix>
              <TextInput
                id="base-url"
                type="url"
                $hasPrefix
                $hasCheck={baseUrlValid}
                placeholder="https://api.myapp.com/v1  or  http://localhost:3000"
                value={baseUrl}
                onChange={e => setBaseUrl(e.target.value)}
              />
            </InputWrap>
            <InputHint>
              Leave blank to use the URL declared in your spec's <code>servers</code> field. Required to run tests.
            </InputHint>
          </Section>

          {/* ── Strategy ── */}
          <Section>
            <LabelRow>
              <Label>AI Strategy</Label>
              <TooltipWrap>
                <TooltipTrigger type="button"><HelpCircle size={14} /></TooltipTrigger>
                <TooltipBox>
                  Controls how the AI reasons about your spec. All strategies generate positive, negative, boundary, auth, and security tests. The difference is quality vs. speed — Zero-Shot is instant, Chain-of-Thought is most thorough.
                </TooltipBox>
              </TooltipWrap>
            </LabelRow>
            <StrategyGrid>
              {STRATEGIES.map(s => {
                const Icon = s.icon;
                return (
                  <StrategyCard
                    key={s.id}
                    type="button"
                    $active={strategy === s.id}
                    onClick={() => setStrategy(s.id)}
                  >
                    <StrategyCheck $active={strategy === s.id}>
                      {strategy === s.id && <Check size={9} strokeWidth={3} />}
                    </StrategyCheck>
                    <StrategyIcon><Icon size={18} /></StrategyIcon>
                    <StrategyName>{s.label}</StrategyName>
                    <StrategyTag $color={s.tagColor}>{s.tag}</StrategyTag>
                    <StrategyDesc>{s.desc}</StrategyDesc>
                  </StrategyCard>
                );
              })}
            </StrategyGrid>
          </Section>
        </CardBody>

        {/* ── Footer ── */}
        <CardFooter>
          <SubmitButton
            type="button"
            onClick={() => onSubmit({ specInput, baseUrl, strategy })}
            disabled={!canSubmit}
          >
            {loading ? (
              <BtnLoading>
                <Spinner><Loader2 size={15} /></Spinner>
                Generating test cases…
              </BtnLoading>
            ) : (
              <BtnLoading>
                <TestTube2 size={16} />
                Generate Test Cases
                <ChevronRight size={15} />
              </BtnLoading>
            )}
          </SubmitButton>
          <SubmitMeta>
            Generates 5 test cases per endpoint · Powered by Claude AI
          </SubmitMeta>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
