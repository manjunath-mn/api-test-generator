import React, { useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import * as authApi from '../services/authApi';
import {
  Page, LeftPanel, LogoBadge, BrandTitle, BrandDescription,
  FeatureList, FeatureItem, FeatureIcon,
  RightPanel, FormHeader, FormTitle, FormSubtitle,
  ErrorMessage, GoogleButtonWrapper, Divider,
  Form, InputLabel, Input, SubmitButton, ToggleRow, ToggleButton,
} from './AuthModal.styles';

interface AuthModalProps {
  onAuthSuccess: (token: string, email: string) => void;
}

const FEATURES = [
  { icon: '⚡', text: 'Generate test cases instantly from any OpenAPI spec using AI' },
  { icon: '🧪', text: 'Execute tests against live APIs and see real-time results' },
  { icon: '📊', text: 'Save, download, and share test reports in JSON or HTML' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) { setError('Google sign-in failed'); return; }
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.googleLogin(credentialResponse.credential);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('authEmail', result.email);
      onAuthSuccess(result.token, result.email);
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(apiError || (err instanceof Error ? err.message : 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const result = isLogin
        ? await authApi.login(email, password)
        : await authApi.register(email, password);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('authEmail', result.email);
      onAuthSuccess(result.token, result.email);
    } catch (err: unknown) {
      const apiError = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(apiError || (err instanceof Error ? err.message : 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Page>
      <LeftPanel>
        <LogoBadge>⚡</LogoBadge>
        <BrandTitle>API Test{'\n'}Generator</BrandTitle>
        <BrandDescription>
          Paste your OpenAPI spec, let AI generate comprehensive test cases,
          execute them against your live API, and download polished reports —
          all in one place.
        </BrandDescription>
        <FeatureList>
          {FEATURES.map(({ icon, text }) => (
            <FeatureItem key={icon}>
              <FeatureIcon>{icon}</FeatureIcon>
              {text}
            </FeatureItem>
          ))}
        </FeatureList>
      </LeftPanel>

      <RightPanel>
        <FormHeader>
          <FormTitle>{isLogin ? 'Welcome back' : 'Create account'}</FormTitle>
          <FormSubtitle>
            {isLogin ? 'Sign in to continue to your dashboard' : "Get started — it's free"}
          </FormSubtitle>
        </FormHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <GoogleButtonWrapper>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed')}
            width="384"
          />
        </GoogleButtonWrapper>

        <Divider>or continue with email</Divider>

        <Form onSubmit={handleSubmit}>
          <InputLabel>
            Email
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputLabel>
          <InputLabel>
            Password
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputLabel>
          {!isLogin && (
            <InputLabel>
              Confirm password
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputLabel>
          )}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Loading…' : isLogin ? 'Sign in' : 'Create account'}
          </SubmitButton>
        </Form>

        <ToggleRow>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <ToggleButton type="button" onClick={switchMode}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </ToggleButton>
        </ToggleRow>
      </RightPanel>
    </Page>
  );
};
