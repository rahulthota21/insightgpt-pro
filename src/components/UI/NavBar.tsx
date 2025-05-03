
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/custom-button';
import { User, LogOut, Upload, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../Auth/AuthProvider';

interface NavBarProps {
  isLoggedIn?: boolean;
}

export const NavBar = ({ isLoggedIn = false }: NavBarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Use passed isLoggedIn prop if provided, otherwise use auth state
  const isUserLoggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 glass-card border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-gradient">InsightGPT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isUserLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-primary transition">
                Dashboard
              </Link>
              <Link to="/upload" className="text-sm font-medium text-foreground/80 hover:text-primary transition">
                Upload
              </Link>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-foreground/80">
                  <Settings size={18} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground/80 hover:text-primary"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 glass-card border-t border-border/30">
            {isUserLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  <LayoutDashboard size={18} className="mr-3" />
                  Dashboard
                </Link>
                <Link
                  to="/upload"
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  <Upload size={18} className="mr-3" />
                  Upload
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </Link>
                <hr className="border-border/50 my-2" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 text-base font-medium rounded-md text-destructive hover:bg-muted"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium rounded-md text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium rounded-md bg-primary text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
