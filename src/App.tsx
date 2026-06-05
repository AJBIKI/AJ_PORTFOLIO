import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import PortfolioHome from './components/PortfolioHome';
import EditorialLight from './components/EditorialLight';
import ResumeAnalyzerDetail from './components/ResumeAnalyzerDetail';
import AetherOsDetail from './components/AetherOsDetail';
import { PROJECTS } from './constants';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Sync theme with body class and styling
  useEffect(() => {
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add('light-theme');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-theme');
      root.classList.add('dark');
    }
  }, [isLightTheme]);

  // Command Palette global hotkey (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProjectId(null); // Return to home view first if viewing detail

    // Small delay to allow home view to mount before anchoring
    setTimeout(() => {
      const elementId = tabId === 'home' ? 'hero' : tabId;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectAction = (actionId: string, href?: string) => {
    if (actionId === 'resume-analyzer' || actionId === 'aetheros') {
      setSelectedProjectId(actionId);
      setActiveTab('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actionId === 'diabetes-prediction' || actionId === 'note-app' || actionId === 'lead-gen') {
      const project = PROJECTS.find(p => p.id === actionId);
      const url = project?.live || project?.github;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else if (href && href !== '#') {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // Trigger default action/notifications
      console.log(`Action triggered: ${actionId}`);
    }
  };

  const handleSelectProject = (projectId: string) => {
    if (projectId === 'resume-analyzer' || projectId === 'aetheros') {
      setSelectedProjectId(projectId);
      setActiveTab('work');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const project = PROJECTS.find(p => p.id === projectId);
      const targetUrl = project?.live || project?.github;
      if (targetUrl) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleToggleTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLightTheme ? 'bg-[#F5F2ED] text-[#0A0A0A]' : 'bg-[#131313] text-[#e5e2e1]'}`}>
      
      {/* 1. STICKY TOP NAVIGATION BAR */}
      <Navbar 
        isLightTheme={isLightTheme} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onSelectTab={handleSelectTab}
        activeTab={activeTab}
      />

      {/* 2. MAIN ACTIVE MODULE ELEMENT */}
      <main className="w-full">
        {selectedProjectId === 'resume-analyzer' ? (
          <ResumeAnalyzerDetail 
            onBackToWork={() => {
              setSelectedProjectId(null);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
          />
        ) : selectedProjectId === 'aetheros' ? (
          <AetherOsDetail 
            onBackToWork={() => {
              setSelectedProjectId(null);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
          />
        ) : isLightTheme ? (
          <EditorialLight 
            onSelectTab={handleSelectTab} 
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <PortfolioHome 
            onSelectProject={handleSelectProject} 
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}
      </main>

      {/* 3. FLOATING PORTABLE COMMAND PALETTE */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectAction}
        onToggleTheme={handleToggleTheme}
      />

    </div>
  );
}
