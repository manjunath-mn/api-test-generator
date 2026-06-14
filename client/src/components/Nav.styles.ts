import styled from 'styled-components';

export const NavBar = styled.nav`
  display: flex;
  gap: 0.25rem;
  background: ${({ theme }) => theme.surface2};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 0.25rem;
`;

export const NavButton = styled.button<{ $active: boolean }>`
  background: none;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.textMuted};
  padding: 0.4rem 1.1rem;
  border-radius: calc(${({ theme }) => theme.radius} - 2px);
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  ${({ $active, theme }) => $active && `
    background: ${theme.accent};
    border-color: ${theme.accent};
    color: white;
    box-shadow: 0 2px 8px rgba(107, 92, 231, 0.35);
  `}
`;
