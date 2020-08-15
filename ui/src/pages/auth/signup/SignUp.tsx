import React from 'react';
import { AuthModal } from '../auth-modal';
import { SignUpForm } from './components/signup-form';
export const SignUp: React.FC = () => {
  return (
    <AuthModal>
      <SignUpForm />
    </AuthModal>
  );
};
