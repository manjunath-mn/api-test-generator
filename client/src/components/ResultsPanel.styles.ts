import styled from 'styled-components';

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: calc(100vh - 120px);
`;

export const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 1rem 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ApiInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

export const VersionBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fontMono};
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const StrategyBadge = styled(VersionBadge)`
  color: ${({ theme }) => theme.accent2};
  border-color: ${({ theme }) => theme.accent2};
`;

export const HeaderStats = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Stat = styled.div<{ $variant?: 'green' | 'red' }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-num {
    font-size: 1.4rem;
    font-weight: 800;
    font-family: ${({ theme }) => theme.fontMono};
    color: ${({ $variant, theme }) => $variant === 'green' ? theme.green : $variant === 'red' ? theme.red : 'inherit'};
  }

  .stat-label {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const ResultsBody = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  overflow: hidden;
`;

export const EndpointSidebar = styled.div`
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-y: auto;
`;

export const EndpointButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.surface2};
  }

  ${({ $active, theme }) => $active && `
    border-color: ${theme.accent};
    background: ${theme.surface2};
  `}
`;

export const EndpointPath = styled.span`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const METHOD_COLORS: Record<string, string> = {
  get: '#22c55e',
  post: '#6366f1',
  put: '#f59e0b',
  delete: '#ef4444',
  patch: '#22d3ee',
};

export const MethodBadge = styled.span<{ $method: string }>`
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: ${({ theme }) => theme.fontMono};
  font-weight: 700;
  flex-shrink: 0;
  color: ${({ $method }) => METHOD_COLORS[$method] || '#999'};
  background: ${({ $method }) => METHOD_COLORS[$method] ? `${METHOD_COLORS[$method]}26` : 'rgba(153,153,153,0.15)'};
`;

export const TestCasesList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TestCaseCard = styled.div<{ $expanded: boolean }>`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ $expanded, theme }) => $expanded ? theme.accent : theme.border};
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  transition: all 0.15s;
  overflow: visible;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
  }
`;

export const TcHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
`;

export const CategoryDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
`;

export const TcCategory = styled.span`
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fontMono};
  color: ${({ theme }) => theme.textMuted};
  width: 90px;
  flex-shrink: 0;
`;

export const TcDesc = styled.span`
  flex: 1;
  font-size: 0.85rem;
`;

export const TcStatusBadge = styled.span`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.75rem;
`;

export const StatusPill = styled.span<{ $variant: 'pass' | 'fail' | 'pending' }>`
  position: relative;
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: default;
  user-select: none;

  ${({ $variant, theme }) => $variant === 'pass' && `
    background: rgba(74,222,128,0.15);
    color: ${theme.green};
    border: 1px solid rgba(74,222,128,0.35);
  `}

  ${({ $variant, theme }) => $variant === 'fail' && `
    background: rgba(248,113,113,0.12);
    color: ${theme.red};
    border: 1px solid rgba(248,113,113,0.3);
  `}

  ${({ $variant, theme }) => $variant === 'pending' && `
    background: ${theme.surface2};
    color: ${theme.textMuted};
    border: 1px solid ${theme.border};
  `}

  &:hover .status-pill-tooltip {
    display: block;
  }
`;

export const StatusPillTooltip = styled.span`
  display: none;
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0;
  white-space: pre-line;
  background: #1a1830;
  color: #e2e0ff;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fontMono};
  line-height: 1.5;
  min-width: 200px;
  max-width: 280px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  z-index: 10;
  pointer-events: none;
`;

export const TcDetails = styled.div`
  padding: 0 1rem 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 0;
  padding-top: 0.75rem;
`;

export const TcDetailRow = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontMono};

  strong {
    color: ${({ theme }) => theme.text};
  }

  pre {
    margin-top: 0.25rem;
    background: ${({ theme }) => theme.surface2};
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    overflow-x: auto;
  }
`;

export const TcExecResult = styled.div`
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fontMono};
  color: ${({ theme }) => theme.textMuted};
  margin-top: 0.25rem;
`;

export const ExecError = styled.div`
  color: ${({ theme }) => theme.red};
  margin-top: 0.25rem;
`;

export const ResultsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
`;

export const ExecuteButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: ${({ theme }) => theme.green};
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  color: white;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #16a34a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoBaseUrl = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontMono};
`;

export const ExportGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

export const ExportLabel = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontMono};
`;

export const ExportButton = styled.button`
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
`;

export const SaveButton = styled.button`
  padding: 0.4rem 0.9rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.accent2};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.accent2};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(167,139,250,0.1);
  }

  &:disabled {
    opacity: 0.6;
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
