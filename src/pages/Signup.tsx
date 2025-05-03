
import React from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { SignupForm } from '../components/Auth/SignupForm';

const Signup = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SignupForm />
      </div>
    </MainLayout>
  );
};

export default Signup;
