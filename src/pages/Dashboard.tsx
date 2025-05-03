
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { DashboardGrid } from '../components/Dashboard/DashboardGrid';
import { Button } from '../components/ui/custom-button';
import { Upload, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <MainLayout isLoggedIn={true}>
      <div className="container px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground">Manage and analyze your document projects</p>
          </div>
          <Link to="/upload">
            <Button leftIcon={<Upload size={16} />}>
              Upload Documents
            </Button>
          </Link>
        </div>
        
        <div className="mb-8">
          <DashboardGrid />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
