
import React, { useState } from 'react';
import { Button } from '../ui/custom-button';
import { Send, Download, Copy, CheckCircle, X, Bookmark, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface QAMessage {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  citations?: {
    id: string;
    text: string;
    page: number;
    document: string;
  }[];
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'zip';
}

interface QAInterfaceProps {
  projectId: string;
}

export const QAInterface: React.FC<QAInterfaceProps> = ({ projectId }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [showCitations, setShowCitations] = useState<Record<string, boolean>>({});

  // Mock documents for the project
  const documents: Document[] = [
    { id: 'doc1', name: 'Annual Report 2022.pdf', type: 'pdf' },
    { id: 'doc2', name: 'Financial Statement.docx', type: 'docx' },
    { id: 'doc3', name: 'Market Analysis.pdf', type: 'pdf' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add the question to messages
    const questionMessage: QAMessage = {
      id: crypto.randomUUID(),
      type: 'question',
      content: question,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, questionMessage]);
    setIsLoading(true);
    
    // Simulate API response delay
    setTimeout(() => {
      const answerMessage: QAMessage = {
        id: crypto.randomUUID(),
        type: 'answer',
        content: `This is a simulated answer to your question about "${question}". In a real implementation, this would be the response from the AI model analyzing the uploaded documents.`,
        timestamp: new Date(),
        citations: [
          {
            id: 'cit1',
            text: 'According to the annual report, revenue increased by 15% year-over-year.',
            page: 24,
            document: 'doc1',
          },
          {
            id: 'cit2',
            text: 'The financial statement shows a positive cash flow of $2.3M in Q4.',
            page: 3,
            document: 'doc2',
          },
        ],
      };
      
      setMessages(prev => [...prev, answerMessage]);
      setQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyAnswer = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleCitations = (messageId: string) => {
    setShowCitations(prev => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const toggleDocument = (docId: string) => {
    setActiveDocumentId(prev => prev === docId ? null : docId);
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polygon points="10 9 9 9 8 9 8 10 8 11 9 11 10 11 10 10 10 9"></polygon></svg>;
      case 'docx':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polygon points="10 9 9 9 8 9 8 10 8 11 9 11 10 11 10 10 10 9"></polygon></svg>;
      case 'zip':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"></path><path d="M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"></path><path d="M4 8h16"></path><path d="M7 13h.01"></path><path d="M17 13h.01"></path></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Document sidebar */}
      <div className="w-full md:w-64 glass-card p-4 rounded-xl h-auto md:h-[calc(100vh-8rem)] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Documents</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Download size={16} />
          </Button>
        </div>
        
        <div className="space-y-2">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => toggleDocument(doc.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center ${
                activeDocumentId === doc.id 
                  ? 'bg-muted text-foreground' 
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {getDocumentIcon(doc.type)}
              <span className="ml-2 text-sm truncate">{doc.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            <Download size={14} className="mr-2" />
            Export Results
          </Button>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col glass-card rounded-xl h-[calc(100vh-8rem)] overflow-hidden">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hidden">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Ask questions about your documents</h3>
              <p className="max-w-sm">
                Ask specific questions about the documents in this project. The AI will analyze them and provide answers with citations.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`${
                    message.type === 'question' 
                      ? 'ml-auto max-w-lg bg-primary/10 rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                      : 'mr-auto max-w-2xl bg-muted rounded-tl-xl rounded-tr-xl rounded-br-xl'
                  } p-4`}
                >
                  <div className="text-sm">
                    {message.content}
                  </div>
                  
                  {message.type === 'answer' && message.citations && message.citations.length > 0 && (
                    <div className="mt-4">
                      <button 
                        onClick={() => toggleCitations(message.id)}
                        className="flex items-center text-xs text-primary"
                      >
                        {showCitations[message.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <span>{message.citations.length} citations</span>
                      </button>
                      
                      {showCitations[message.id] && (
                        <div className="mt-2 space-y-2">
                          {message.citations.map(citation => (
                            <div key={citation.id} className="text-xs p-2 rounded bg-muted/50 border border-border/50">
                              <div className="flex justify-between">
                                <span className="font-medium">{documents.find(d => d.id === citation.document)?.name}</span>
                                <span className="text-muted-foreground">Page {citation.page}</span>
                              </div>
                              <p className="mt-1 text-muted-foreground">{citation.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    
                    {message.type === 'answer' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCopyAnswer(message.content)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy answer"
                        >
                          {isCopied ? (
                            <CheckCircle size={16} className="text-accent" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Save answer"
                        >
                          <Bookmark size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex space-x-2 items-center mr-auto p-4 max-w-md">
                  <div className="animate-bounce w-2 h-2 bg-primary rounded-full"></div>
                  <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.1s' }}></div>
                  <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="flex-grow px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !question.trim()}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Document preview panel (show only when a document is selected) */}
      {activeDocumentId && (
        <div className="hidden lg:block w-96 glass-card p-4 rounded-xl h-[calc(100vh-8rem)] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              {documents.find(d => d.id === activeDocumentId)?.name}
            </h3>
            <button onClick={() => setActiveDocumentId(null)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center border border-border rounded-lg bg-card/50 h-[calc(100%-4rem)]">
            <p className="text-center text-muted-foreground text-sm">
              Document preview would appear here.
              <br />
              This would use react-pdf or a similar library.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
