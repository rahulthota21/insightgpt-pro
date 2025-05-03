
import React from 'react';
import { NavBar } from '../UI/NavBar';
import { useAuth } from '../Auth/AuthProvider';

interface MainLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean; // Make it optional with default value
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isLoggedIn }) => {
  const { user } = useAuth();
  
  // Use passed isLoggedIn prop if provided, otherwise use auth state
  const isUserLoggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar isLoggedIn={isUserLoggedIn} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="glass-card mt-auto py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} InsightGPT PRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
