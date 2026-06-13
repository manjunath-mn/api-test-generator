import styled from 'styled-components';

export const LoaderContainer = styled.div`
  max-width: 480px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 2.5rem 2rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;

export const LoaderSpinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid ${({ theme }) => theme.surface2};
  border-top-color: ${({ theme }) => theme.accent};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;

export const LoaderTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontDisplay};
`;

export const LoaderSteps = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const LoaderStep = styled.li<{ $state: 'done' | 'active' | 'pending' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fontMono};
  transition: color 0.25s, background 0.25s;

  ${({ $state, theme }) => $state === 'active' && `
    color: ${theme.text};
    background: rgba(107,92,231,0.07);
  `}

  ${({ $state, theme }) => $state === 'done' && `
    color: ${theme.textMuted};
  `}

  ${({ $state, theme }) => $state === 'pending' && `
    color: ${theme.textMuted};
    opacity: 0.4;
  `}
`;

export const LoaderStepIndicator = styled.span`
  width: 14px;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.green};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderStepDot = styled.span`
  display: block;
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.accent};
  border-radius: 50%;
  animation: loader-dot-pulse 1s ease-in-out infinite;
`;
