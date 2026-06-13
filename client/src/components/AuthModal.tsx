import React, { useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import * as authApi from '../services/authApi';
import { Overlay, Modal, Title, Subtitle, ErrorMessage, Form, Input, SubmitButton, ToggleButton, Divider, GoogleButtonWrapper } from './AuthModal.styles';

interface AuthModalProps {
  onAuthSuccess: (token: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError('Google sign-in failed');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.googleLogin(credentialResponse.credential);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('authEmail', result.email);
      onAuthSuccess(result.token, result.email);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      const apiError = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(apiError || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const result = isLogin
        ? await authApi.login(email, password)
        : await authApi.register(email, password);

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('authEmail', result.email);
      onAuthSuccess(result.token, result.email);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      const apiError = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(apiError || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>API Test Generator</Title>
        <Subtitle>{isLogin ? 'Sign in to your account' : 'Create a new account'}</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <GoogleButtonWrapper>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed')}
            width="100%"
          />
        </GoogleButtonWrapper>

        <Divider>or</Divider>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </SubmitButton>
        </Form>

        <ToggleButton
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            setPassword('');
            setConfirmPassword('');
          }}
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </ToggleButton>
      </Modal>
    </Overlay>
  );
};
