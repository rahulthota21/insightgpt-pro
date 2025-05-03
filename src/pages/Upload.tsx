
import React from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { FileUploader } from '../components/Upload/FileUploader';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Upload = () => {
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
          
          <h1 className="text-3xl font-bold mt-4">Upload Documents</h1>
          <p className="text-muted-foreground">Add new documents to start analyzing</p>
        </div>
        
        <FileUploader />
      </div>
    </MainLayout>
  );
};

export default Upload;
