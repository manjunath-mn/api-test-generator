import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { theme } from './theme'
import { GlobalStyle } from './GlobalStyle'
import App from './App.js'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
