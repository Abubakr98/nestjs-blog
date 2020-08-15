import React from 'react';
import { AuthModal } from '../auth-modal';
import { SignInForm } from './components/signin-form';

export const SignIn: React.FC = () => {
  return <AuthModal><SignInForm/></AuthModal>;
};
