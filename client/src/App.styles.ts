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
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
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
  gap: 12px;
  align-items: center;
`;

export const UserEmail = styled.span`
  font-size: 14px;
  color: #666;
`;

export const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textMuted};
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }
`;

export const AppMain = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }
`;
