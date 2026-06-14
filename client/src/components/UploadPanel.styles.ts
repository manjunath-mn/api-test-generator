import styled from 'styled-components';

export const Panel = styled.div`
  max-width: 680px;
  margin: 3rem auto;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const PanelHeader = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.9rem;
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: none;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.8rem;
  transition: all 0.2s;

  ${({ $active, theme }) => $active && `
    background: ${theme.accent};
    border-color: ${theme.accent};
    color: white;
  `}
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 180px;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const StrategyRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textMuted};
  }
`;

export const StrategyOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const StrategyButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: none;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.8rem;
  transition: all 0.2s;

  ${({ $active, theme }) => $active && `
    border-color: ${theme.accent2};
    color: ${theme.accent2};
    background: rgba(34,211,238,0.08);
  `}
`;

export const SubmitButton = styled.button`
  padding: 0.85rem;
  background: ${({ theme }) => theme.accent};
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  color: white;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.02em;

  &:hover:not(:disabled) {
    background: #4f52e8;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BtnLoading = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
`;
