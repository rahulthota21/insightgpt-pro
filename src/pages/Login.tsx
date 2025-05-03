
import React from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { LoginForm } from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default Login;
