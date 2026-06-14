import styled from 'styled-components';

export const Panel = styled.div`
  max-width: 480px;
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
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const AvatarInfo = styled.div`
  flex: 1;
`;

export const AvatarName = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

export const AvatarEmail = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const BreakSpan = styled.span`
  font-size: 0.85rem;
  word-break: break-all;
`;

export const Avatar = styled.div<{ $src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme, $src }) =>
    $src
      ? `url(${$src}) center / cover`
      : `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
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
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radius};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    font-size: 0.95rem;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.accent};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.accent}40;
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

