import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
`;

export const Subtitle = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const GoogleButtonWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 12px;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  &::before { margin-right: 12px; }
  &::after { margin-left: 12px; }
`;

export const ToggleButton = styled.button`
  padding: 0;
  background-color: transparent;
  color: #0066cc;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;
