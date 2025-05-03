
import React from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { QAInterface } from '../components/Project/QAInterface';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Project = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock project data - in a real app, this would come from an API call
  const projectData = {
    id: id || '1',
    title: 'Annual Financial Report',
    documentCount: 5,
    lastUpdated: new Date().toISOString(),
  };

  return (
    <MainLayout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">{projectData.title}</h1>
          <p className="text-muted-foreground">
            {projectData.documentCount} documents • Last updated {new Date(projectData.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        
        <QAInterface projectId={projectData.id} />
      </div>
    </MainLayout>
  );
};

export default Project;
