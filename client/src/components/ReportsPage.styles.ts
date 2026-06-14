import styled from 'styled-components';

export const Panel = styled.div`
  max-width: 900px;
  margin: 2rem auto;
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

export const EmptyState = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.9rem;
`;

export const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const ReportCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 0.85rem 1.25rem;
`;

export const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .title {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .meta {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textMuted};
    font-family: ${({ theme }) => theme.fontMono};
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
`;

export const ReportStats = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const Stat = styled.div<{ $variant?: 'green' | 'red' }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-num {
    font-size: 1.1rem;
    font-weight: 800;
    font-family: ${({ theme }) => theme.fontMono};
    color: ${({ $variant, theme }) => $variant === 'green' ? theme.green : $variant === 'red' ? theme.red : 'inherit'};
  }

  .stat-label {
    font-size: 0.65rem;
    color: ${({ theme }) => theme.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const ReportActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.4rem 0.9rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled(ActionButton)`
  &:hover {
    border-color: ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.red};
  }
`;
