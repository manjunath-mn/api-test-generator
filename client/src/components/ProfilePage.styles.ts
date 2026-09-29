import styled from 'styled-components';

export const Panel = styled.div`
  max-width: 520px;
  margin: 2.5rem auto;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;

  @media (max-width: 560px) {
    margin: 1rem auto;
    border-radius: 12px;
    padding: 1.5rem 1.25rem;
  }
`;

export const PanelHeader = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.textMuted};
    font-size: 0.9rem;
    margin: 0;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.85rem 1rem;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};

  span:first-child {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: ${({ theme }) => theme.fontMono};
  }

  span:last-child {
    font-size: 0.95rem;
    font-family: ${({ theme }) => theme.fontMono};
    word-break: break-all;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const AvatarInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AvatarName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AvatarEmail = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BreakSpan = styled.span`
  font-size: 0.85rem;
  word-break: break-all;
`;

export const Avatar = styled.div<{ $src?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme, $src }) =>
    $src
      ? `url(${$src}) center / cover`
      : `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.75rem;
  font-weight: bold;
  flex-shrink: 0;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fontMono};
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1.5px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radius};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    font-size: 0.95rem;
    font-family: inherit;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.accent};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.accent}33;
    }
  }

  textarea {
    resize: none;
    min-height: 80px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${({ theme, $variant }) =>
    $variant === 'primary'
      ? `
    background: ${theme.accent};
    color: white;
    &:hover { opacity: 0.9; }
  `
      : `
    background: transparent;
    color: ${theme.text};
    border: 1px solid ${theme.border};
    &:hover { background: ${theme.surface2}; }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
