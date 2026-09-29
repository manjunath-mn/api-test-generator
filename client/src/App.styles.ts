import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

export const LogoIcon = styled.span`
  font-size: 1.4rem;
`;

export const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fontMono};
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textMuted};

  strong {
    color: ${({ theme }) => theme.accent2};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const UserEmail = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.textMuted};
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textMuted};
  padding: 0.35rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.78rem;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }
`;

export const AppMain = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }
`;

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #2a0a0a;
  border: 1px solid ${({ theme }) => theme.red};
  border-radius: ${({ theme }) => theme.radius};
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #fca5a5;

  button {
    background: none;
    border: none;
    color: #fca5a5;
    cursor: pointer;
    font-size: 1rem;
    flex-shrink: 0;
  }
`;
