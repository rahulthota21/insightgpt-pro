
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { Button } from '../components/ui/custom-button';
import { ArrowRight, FileText, CheckCircle, FileSearch, CloudUpload, Search } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <span className="mr-2">✨</span>
              <span>Introducing InsightGPT PRO</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              AI-Powered <span className="text-gradient">Document Intelligence</span> for Business
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload business documents and get intelligent answers and insights through natural language Q&A
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-glow">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
            
            <div className="glass-card p-1 rounded-2xl border border-border overflow-hidden">
              <div className="w-full h-[400px] md:h-[500px] bg-card rounded-xl flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <FileSearch size={64} className="mb-4" />
                  <p>Application preview would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Unlock Document Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Extract insights, answer questions, and make better decisions with your business documents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-xl spring-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CloudUpload size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simple Document Upload</h3>
              <p className="text-muted-foreground">
                Drag and drop PDF, DOCX, and ZIP files with our intuitive upload interface
              </p>
              <ul className="mt-4 space-y-2">
                {['Multi-file support', 'Progress tracking', 'File validation'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-accent mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-xl spring-card">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <FileSearch size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Q&A Interface</h3>
              <p className="text-muted-foreground">
                Ask natural language questions about your documents and receive accurate answers
              </p>
              <ul className="mt-4 space-y-2">
                {['Document citations', 'Source highlighting', 'Context awareness'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-accent mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-xl spring-card">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <FileText size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Export & Share</h3>
              <p className="text-muted-foreground">
                Export your results in multiple formats and share with team members
              </p>
              <ul className="mt-4 space-y-2">
                {['PDF export', 'CSV for data', 'JSON for developers'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-accent mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="glass-card p-8 md:p-16 rounded-2xl border border-primary/20 text-center max-w-4xl mx-auto shadow-glow">
            <h2 className="text-3xl font-bold mb-6">Ready to extract insights from your documents?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using InsightGPT PRO to make data-driven decisions from their business documents.
            </p>
            <Link to="/signup">
              <Button size="lg" className="shadow-glow">
                Start Free Trial <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
