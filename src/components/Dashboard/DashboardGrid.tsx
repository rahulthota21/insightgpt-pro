import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { File, Search, Clock, Filter, ArrowRight, FileText, Folder } from 'lucide-react';
import { Button } from '../ui/custom-button';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: 'Annual Financial Report',
    documentCount: 5,
    lastUpdated: '2023-04-12T10:30:00',
    type: 'finance'
  },
  {
    id: '2',
    title: 'Legal Contract Review',
    documentCount: 3,
    lastUpdated: '2023-04-10T14:20:00',
    type: 'legal'
  },
  {
    id: '3',
    title: 'HR Employee Handbook',
    documentCount: 1,
    lastUpdated: '2023-04-05T09:15:00',
    type: 'hr'
  },
  {
    id: '4',
    title: 'Marketing Strategy 2023',
    documentCount: 7,
    lastUpdated: '2023-04-01T11:45:00',
    type: 'marketing'
  },
  {
    id: '5',
    title: 'Product Development Plan',
    documentCount: 4,
    lastUpdated: '2023-03-28T16:30:00',
    type: 'product'
  }
];

// Filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'finance', label: 'Finance' },
  { id: 'legal', label: 'Legal' },
  { id: 'hr', label: 'HR' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'product', label: 'Product' }
];

export const DashboardGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');

  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => 
      (activeFilter === 'all' || project.type === activeFilter) &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'finance':
        return <FileText size={16} className="text-green-400" />;
      case 'legal':
        return <FileText size={16} className="text-blue-400" />;
      case 'hr':
        return <FileText size={16} className="text-purple-400" />;
      case 'marketing':
        return <FileText size={16} className="text-orange-400" />;
      case 'product':
        return <FileText size={16} className="text-cyan-400" />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-grow w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            className="pl-10 w-full h-10 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="glass-card p-1 rounded-lg flex items-center space-x-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeFilter === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setSortBy(sortBy === 'recent' ? 'name' : 'recent')}
            className="flex items-center space-x-1 p-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Clock size={16} />
            <span className="hidden sm:inline">{sortBy === 'recent' ? 'Recent' : 'Name'}</span>
          </button>
        </div>
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload new project card */}
        <Link to="/upload" className="group">
          <div className="glass-card h-full border border-dashed border-border p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-primary hover:shadow-glow group-hover:bg-card/70">
            <div className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center mb-4">
              <Folder size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg">New Project</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Upload documents to start</p>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white">
              Create New
            </Button>
          </div>
        </Link>
      
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="group spring-card">
              <div className="glass-card-hover h-full border border-border p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  {getProjectTypeIcon(project.type)}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(project.lastUpdated)}
                  </span>
                </div>
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.documentCount} document{project.documentCount !== 1 && 's'}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                    {project.type}
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No projects found. Try changing your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
