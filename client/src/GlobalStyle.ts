import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontDisplay};
    min-height: 100vh;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @keyframes loader-dot-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.bg}; }
  ::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.border}; border-radius: 3px; }
`;
