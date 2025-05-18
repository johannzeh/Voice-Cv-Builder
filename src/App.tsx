import React, { useRef, useState } from 'react';
import { Mic, FileText, Download, HelpCircle } from 'lucide-react';
import { CVEditor } from './components/editor/CVEditor';
import { CVPreview } from './components/preview/CVPreview';
import { CVProvider } from './context/CVContext';
import { Button } from './components/ui/Button';
import generatePDF from 'react-to-pdf';

function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const previewRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleExport = async () => {
    if (previewRef.current) {
      await generatePDF(previewRef, { 
        filename: 'my-cv.pdf',
        page: { 
          format: 'A4',
          orientation: 'portrait',
          margin: '10mm'
        }
      });
    }
  };

  const WelcomeModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/95 rounded-xl shadow-soft p-8 max-w-md m-4 transform transition-all duration-300 section-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Welcome to Voice CV Builder
        </h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Create a professional CV using your voice! This app helps you build your resume by speaking directly to your device.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="flex-shrink-0 mr-4">
              <Mic className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-700">Click the microphone icon to start recording your information</p>
          </div>
          
          <div className="flex items-center p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
            <div className="flex-shrink-0 mr-4">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <p className="text-gray-700">Fill in each section of your CV with ease using voice commands</p>
          </div>
          
          <div className="flex items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <div className="flex-shrink-0 mr-4">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-700">Preview and download your CV as a PDF when you're finished</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 flex items-center">
            <HelpCircle className="w-4 h-4 mr-1" />
            Click the mic icon next to any field to speak
          </p>
          <Button 
            variant="primary"
            onClick={() => setShowWelcome(false)}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <CVProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Navigation */}
        <nav className="glassmorphism sticky top-0 z-40 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                  <Mic className="h-8 w-8 text-blue-600" />
                  <span className="text-xl font-bold text-transparent">Voice CV Builder</span>
                </div>
              </div>
              
              <div className="hidden md:flex md:items-center md:space-x-4">
                <div className="flex rounded-lg bg-white/50 p-1">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === 'edit'
                        ? 'bg-white text-blue-600 shadow-soft'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('edit')}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === 'preview'
                        ? 'bg-white text-blue-600 shadow-soft'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('preview')}
                  >
                    Preview
                  </button>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExport}
                  icon={<Download size={16} />}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  Export PDF
                </Button>
              </div>
              
              <div className="flex items-center md:hidden">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExport}
                  icon={<Download size={16} />}
                  className="bg-gradient-to-r from-blue-600 to-teal-600"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile tabs */}
          <div className="md:hidden border-t border-gray-200/50">
            <div className="grid grid-cols-2 divide-x divide-gray-200/50">
              <button
                className={`py-2 text-center text-sm font-medium transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white/50 text-blue-600'
                    : 'text-gray-600 hover:bg-white/30'
                }`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </button>
              <button
                className={`py-2 text-center text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white/50 text-blue-600'
                    : 'text-gray-600 hover:bg-white/30'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          <div 
            className={`
              ${activeTab === 'edit' ? 'block' : 'hidden'} 
              md:block md:w-1/2 h-full
            `}
          >
            <CVEditor onExport={handleExport} />
          </div>
          <div 
            className={`
              ${activeTab === 'preview' ? 'block' : 'hidden'} 
              md:block md:w-1/2 h-full
            `}
          >
            <CVPreview ref={previewRef} />
          </div>
        </main>
        
        {showWelcome && <WelcomeModal />}
      </div>
    </CVProvider>
  );
}

export default App;