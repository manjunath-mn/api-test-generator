import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`to { transform: rotate(360deg); }`;
const fadeIn = keyframes`from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); }`;

/* ── Page wrapper ── */
export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 130px);
  padding: 2.5rem 1rem;

  @media (max-width: 640px) {
    padding: 1.5rem 0.5rem;
    align-items: flex-start;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 660px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  animation: ${fadeIn} 0.35s ease both;
`;

/* ── Card header ── */
export const CardHeader = styled.div`
  padding: 1.75rem 2rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface2};
`;

export const CardHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
`;

export const CardIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accent2});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

export const CardSubtitle = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0;
  line-height: 1.5;
`;

/* ── Sections ── */
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Section = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem;
  }
`;

/* ── Field labels ── */
export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const Label = styled.label`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.01em;
`;

export const OptionalBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textMuted};
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1px 7px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

/* ── Tooltip ── */
export const TooltipWrap = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: auto;
`;

export const TooltipTrigger = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  padding: 0;

  &:hover { color: ${({ theme }) => theme.text}; }
  &:hover + div { display: block; }
`;

export const TooltipBox = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 260px;
  background: #1a1830;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #c4c0e8;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  pointer-events: none;

  code {
    font-family: ${({ theme }) => theme.fontMono};
    background: rgba(255,255,255,0.08);
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
`;

/* ── Mode tabs ── */
export const ModeTabs = styled.div`
  display: inline-flex;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 3px;
  margin-bottom: 0.75rem;
`;

export const ModeTab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.85rem;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fontMono};
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.15s;
  background: ${({ $active, theme }) => $active ? theme.accent : 'transparent'};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.textMuted};

  &:hover {
    color: ${({ $active, theme }) => $active ? '#fff' : theme.text};
  }
`;

/* ── Inputs ── */
export const InputWrap = styled.div<{ $filled?: boolean; $valid?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ $valid }) => $valid && css`
    &::after {
      content: '✓';
      position: absolute;
      right: 12px;
      color: #4ade80;
      font-size: 0.85rem;
      pointer-events: none;
    }
  `}
`;

export const InputPrefix = styled.span`
  position: absolute;
  left: 12px;
  color: ${({ theme }) => theme.textMuted};
  display: flex;
  align-items: center;
  pointer-events: none;
  line-height: 1;
`;

export const TextInput = styled.input<{ $hasPrefix?: boolean; $hasCheck?: boolean }>`
  width: 100%;
  padding: 0.72rem 1rem;
  padding-left: ${({ $hasPrefix }) => $hasPrefix ? '2.2rem' : '1rem'};
  padding-right: ${({ $hasCheck }) => $hasCheck ? '2.2rem' : '1rem'};
  background: ${({ theme }) => theme.surface2};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.83rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  box-sizing: border-box;

  &::placeholder { color: ${({ theme }) => theme.textMuted}; opacity: 0.55; }

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.surface};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accent}22;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.surface2};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  resize: vertical;
  min-height: 160px;
  box-sizing: border-box;
  line-height: 1.55;

  &::placeholder { color: ${({ theme }) => theme.textMuted}; opacity: 0.55; }

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accent}22;
  }
`;

export const InputHint = styled.p`
  margin: 0.45rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.5;
`;

/* ── Strategy cards ── */
export const StrategyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const StrategyCard = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1.5px solid ${({ $active, theme }) => $active ? theme.accent : theme.border};
  background: ${({ $active, theme }) => $active ? `${theme.accent}0f` : theme.surface2};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => `${theme.accent}08`};
  }
`;

export const StrategyCheck = styled.span<{ $active: boolean }>`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid ${({ $active, theme }) => $active ? theme.accent : theme.border};
  background: ${({ $active, theme }) => $active ? theme.accent : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.55rem;
  color: #fff;
  transition: all 0.15s;
`;

export const StrategyIcon = styled.span`
  font-size: 1.2rem;
  line-height: 1;
  margin-bottom: 0.1rem;
`;

export const StrategyName = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  display: block;
`;

export const StrategyTag = styled.span<{ $color: 'green' | 'amber' | 'purple' }>`
  font-size: 0.65rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 20px;
  letter-spacing: 0.03em;
  ${({ $color, theme }) => $color === 'green' && `color: ${theme.green}; background: ${theme.green}18; border: 1px solid ${theme.green}30;`}
  ${({ $color, theme }) => $color === 'amber' && `color: #f59e0b; background: #f59e0b18; border: 1px solid #f59e0b30;`}
  ${({ $color, theme }) => $color === 'purple' && `color: ${theme.accent2}; background: ${theme.accent2}18; border: 1px solid ${theme.accent2}30;`}
`;

export const StrategyDesc = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.45;
  display: block;
`;

/* ── Footer ── */
export const CardFooter = styled.div`
  padding: 1.25rem 2rem 1.75rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface2};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accent}cc);
  border: none;
  border-radius: 12px;
  color: white;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 16px ${({ theme }) => theme.accent}40;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.accent}55;
  }

  &:active:not(:disabled) { transform: translateY(0); }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const SubmitMeta = styled.p`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
  margin: 0;
`;

export const BtnLoading = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Spinner = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  animation: ${spin} 0.7s linear infinite;
`;
