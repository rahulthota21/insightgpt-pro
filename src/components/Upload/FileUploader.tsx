
import React, { useState } from 'react';
import { Button } from '../ui/custom-button';
import { Upload, File, FileText, X } from 'lucide-react';

type FileStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
  error?: string;
}

export const FileUploader = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Filter for PDF, DOCX, ZIP files
    const filteredFiles = newFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'docx', 'doc', 'zip'].includes(extension || '');
    });

    // Create upload file objects
    const uploadFiles = filteredFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'idle' as FileStatus,
    }));

    setFiles(prevFiles => [...prevFiles, ...uploadFiles]);

    // Simulate upload process for each file
    uploadFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (id: string) => {
    // Update status to uploading
    setFiles(prevFiles =>
      prevFiles.map(f => (f.id === id ? { ...f, status: 'uploading' as FileStatus } : f))
    );

    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      setFiles(prevFiles =>
        prevFiles.map(f => (f.id === id ? { ...f, progress } : f))
      );

      if (progress >= 100) {
        clearInterval(interval);
        
        // Update status to processing
        setFiles(prevFiles =>
          prevFiles.map(f => (f.id === id ? { ...f, status: 'processing' as FileStatus } : f))
        );

        // Simulate processing
        setTimeout(() => {
          setFiles(prevFiles =>
            prevFiles.map(f => (f.id === id ? { ...f, status: 'complete' as FileStatus } : f))
          );
        }, 1500);
      }
    }, 100);
  };

  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== id));
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText size={24} className="text-blue-500" />;
      case 'zip':
        return <File size={24} className="text-yellow-500" />;
      default:
        return <File size={24} />;
    }
  };

  const getStatusText = (status: FileStatus) => {
    switch (status) {
      case 'idle':
        return 'Ready';
      case 'uploading':
        return 'Uploading';
      case 'processing':
        return 'Processing';
      case 'complete':
        return 'Complete';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`glass-card p-8 border-2 border-dashed ${
          isDragging ? 'border-primary animate-pulse' : 'border-border'
        } rounded-xl text-center transition-all`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
            <Upload size={32} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Drag and drop files</h3>
            <p className="text-sm text-muted-foreground">
              PDF, DOCX, and ZIP files are supported
            </p>
          </div>
          <div className="flex justify-center">
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                leftIcon={<Upload size={16} />}
              >
                Browse files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.zip"
                onChange={handleFileSelect}
                className="sr-only"
              />
            </label>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="font-medium">Uploaded Files</h3>
          <ul className="space-y-3">
            {files.map((file) => (
              <li 
                key={file.id} 
                className={`glass-card p-4 rounded-lg flex items-center justify-between ${
                  file.status === 'complete' ? 'border-accent/20 shadow-glow-accent' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {getFileTypeIcon(file.file.name)}
                  <div>
                    <p className="font-medium truncate max-w-xs">{file.file.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span className="mx-2">•</span>
                      <span className={`${file.status === 'error' ? 'text-destructive' : file.status === 'complete' ? 'text-accent' : 'text-muted-foreground'}`}>
                        {getStatusText(file.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {file.status === 'uploading' && (
                    <div className="w-24 h-1 bg-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X size={18} />
                    <span className="sr-only">Remove file</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="pt-4 flex justify-end">
            <Button
              disabled={files.some(f => f.status !== 'complete')}
              className="shadow-glow"
            >
              Process Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
