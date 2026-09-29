import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  min-height: 100vh;
  font-family: inherit;
`;

/* ── Left panel ── */
export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 56px;
  background: linear-gradient(145deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -120px;
    left: -120px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoBadge = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  font-size: 26px;
`;

export const BrandTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
  line-height: 1.15;
  color: #fff;
`;

export const BrandDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 48px;
  max-width: 360px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
`;

export const FeatureIcon = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.25);
  border: 1px solid rgba(99, 102, 241, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: 1px;
`;

/* ── Right panel ── */
export const RightPanel = styled.div`
  width: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 48px;
  background: #fff;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 24px;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 32px;
  animation: ${fadeUp} 0.4s ease both;
`;

export const FormTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

export const ErrorMessage = styled.div`
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  animation: ${fadeUp} 0.2s ease both;
`;

export const GoogleButtonWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  animation: ${fadeUp} 0.4s ease 0.05s both;

  & > div {
    width: 100% !important;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  animation: ${fadeUp} 0.4s ease 0.1s both;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  &::before { margin-right: 12px; }
  &::after  { margin-left: 12px; }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
  animation: ${fadeUp} 0.4s ease 0.15s both;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  padding: 11px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #0f172a;
  background: #f8fafc;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  outline: none;

  &::placeholder { color: #94a3b8; }

  &:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  margin-top: 4px;

  &:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ToggleRow = styled.p`
  font-size: 13px;
  color: #64748b;
  text-align: center;
  margin: 0;
  animation: ${fadeUp} 0.4s ease 0.2s both;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;

  &:hover { text-decoration: underline; }
`;
