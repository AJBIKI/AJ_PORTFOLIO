import { PERSON, PROJECTS, TECH_STACK } from '../constants';

interface EditorialLightProps {
  onSelectTab: (tabId: string) => void;
  onOpenCommandPalette: () => void;
  onSelectProject: (projectId: string) => void;
}

export default function EditorialLight({ onSelectTab, onOpenCommandPalette, onSelectProject }: EditorialLightProps) {
  return (
    <div className="w-full min-h-screen bg-[#F5F2ED] text-[#0A0A0A] font-sans pt-[60px] flex flex-col max-w-[1440px] mx-auto border-x border-[#D8D4CE]">
      
      {/* 2-Pane Content wrapper with Sidebar Lock */}
      <div className="flex-grow flex flex-col lg:flex-row">
        
        {/* Left Side Navigation (Screen 2 Sidebar) */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#D8D4CE] bg-[#F5F2ED] p-6 flex flex-col justify-between shrink-0">
          <div>
            {/* Grayscale profile pic with warmth border */}
            <div className="w-16 h-16 bg-[#2a2a2a] border border-[#D8D4CE] flex items-center justify-center overflow-hidden">
              <img 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-95" 
                alt="Aritra Jana Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQn7hQ0bUdavMPe_11quLlqdY_yVexsM6n22PF0-nB3ZOykvsB_xnJwYdWIo9vu-6m98YL6VlaR32WuIMjDID-OyKyHi7NoBzJuSEpYS6QClj2hyL0SkSH1Zd-rwgcwwvsgpvijge340GbydGDVT_WRHroOqq1tsqD_FsWy0GA9gfoneon0QB00vpM26XNBkh3JpeKVMS7U25bAr0MyhEv0su03alJKzao0lhUk4B0L2hDi84rOZ4RSCQeh1TVgVnEQsVVsnGcoFs" 
              />
            </div>
            
            <h2 className="font-sans text-lg font-bold tracking-tight text-[#0A0A0A] mt-4 uppercase">
              AJ_ENGINEERING
            </h2>
            <p className="font-mono text-xs text-[#6B6B6B] flex items-center gap-1 mt-1">
              <span className="text-[#aed50d] font-bold">&gt;</span> SYSTEM_READY
            </p>

            <nav className="mt-8 space-y-1">
              <button 
                onClick={() => onSelectTab('work')}
                className="w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#aed50d] font-bold bg-[#ebe8e4] border-l-4 border-[#aed50d] text-left focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">code</span>
                // Projects
              </button>
              
              <button 
                onClick={() => onSelectTab('stack')}
                className="w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:bg-[#ebe8e4] hover:text-[#0A0A0A] text-left focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">account_tree</span>
                // Architecture
              </button>

              <button 
                onClick={() => onSelectTab('about')}
                className="w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:bg-[#ebe8e4] hover:text-[#0A0A0A] text-left focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">history</span>
                // Experience
              </button>

              <button 
                onClick={onOpenCommandPalette}
                className="w-full flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#6B6B6B] hover:bg-[#ebe8e4] hover:text-[#0A0A0A] text-left focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">terminal</span>
                // System Console
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-[#D8D4CE]">
            <a 
              href={`mailto:${PERSON.email}`}
              className="w-full block text-center border border-[#D8D4CE] py-2 font-mono text-xs uppercase tracking-wider text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              [ CONTACT_ME ]
            </a>
          </div>
        </aside>

        {/* Center Main Canvas & Right Inverted Panel */}
        <section className="flex-grow flex flex-col md:flex-row">
          
          {/* Main Hero center content (Screen 2 Center) */}
          <div className="flex-grow p-6 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#D8D4CE]">
            <div className="mb-10">
              <p className="font-mono text-xs text-[#6B6B6B] uppercase mb-2">
                <span className="text-[#aed50d] font-bold">&gt;</span> INITIALIZING_CORE_SEQUENCE
              </p>
              <h1 className="font-sans text-5xl md:text-[80px] leading-[0.9] font-extrabold text-[#0A0A0A] mb-6 tracking-tighter uppercase">
                {PERSON.name.first}<br />{PERSON.name.last}
              </h1>
              <p className="font-sans text-lg md:text-xl text-[#6B6B6B] max-w-xl leading-relaxed">
                {PERSON.tagline}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-[#D8D4CE]">
              <div 
                onClick={() => onSelectProject(PROJECTS[0].id)}
                className="border border-[#D8D4CE] p-6 hover:bg-white cursor-pointer transition-all hover:border-[#aed50d]"
              >
                <h3 className="font-sans text-2xl font-bold mb-1">01</h3>
                <p className="font-mono text-[10px] text-[#6B6B6B] font-bold tracking-widest uppercase mb-4">
                  {PROJECTS[0].name.join(' ')}
                </p>
                <div className="h-px bg-[#D8D4CE] w-full my-3"></div>
                <p className="font-sans text-sm text-[#6B6B6B]">
                  {PROJECTS[0].desc}
                </p>
              </div>

              <div 
                onClick={() => onSelectProject(PROJECTS[1].id)}
                className="border border-[#D8D4CE] p-6 hover:bg-white cursor-pointer transition-all hover:border-[#aed50d]"
              >
                <h3 className="font-sans text-2xl font-bold mb-1">02</h3>
                <p className="font-mono text-[10px] text-[#6B6B6B] font-bold tracking-widest uppercase mb-4">
                  {PROJECTS[1].name.join(' ')}
                </p>
                <div className="h-px bg-[#D8D4CE] w-full my-3"></div>
                <p className="font-sans text-sm text-[#6B6B6B]">
                  {PROJECTS[1].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right column (Inverted Dark Panel AI_LLM_CORE, Screen 2 Right) */}
          <div className="w-full md:w-[360px] bg-[#0c0c0c] border-t md:border-t-0 md:border-l-2 border-[#c9f236] p-8 flex flex-col justify-between shrink-0 text-white">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="material-symbols-outlined text-[#c9f236] text-3xl font-fill">psychology</span>
                <span className="font-mono text-xs uppercase tracking-tight text-[#c9f236] font-bold">
                  AI_LLM_CORE
                </span>
              </div>

              <div className="space-y-8">
                <div className="pb-6 border-b border-[#2A2A2A]">
                  <h4 className="font-mono text-[11px] text-[#c9f236] uppercase tracking-widest mb-4">
                    Neural Frameworks
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-[#c5c9ae]">
                    {TECH_STACK.find(s => s.category === 'AI_LLM_CORE')?.items.map(item => (
                      <li key={item}>[ {item.replace(/^\d+\.\s*/, '')} ]</li>
                    ))}
                  </ul>
                </div>

                <div className="pb-6">
                  <h4 className="font-mono text-[11px] text-[#c9f236] uppercase tracking-widest mb-4">
                    Agentic Workflows
                  </h4>
                  <p className="font-sans text-xs text-[#c5c9ae] leading-relaxed">
                    Automating complex technical reasoning via multi-agent collaborative systems and local model pipelines.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#2A2A2A] font-mono text-xs text-[#aed50d]">
              <span className="terminal-cursor">_</span> RUNNING: LLM_MODULE.SH
            </div>
          </div>

        </section>
      </div>

      {/* Light Footer */}
      <footer className="border-t border-[#D8D4CE] bg-white py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center px-6 md:px-12 w-full mx-auto">
          <div className="font-sans text-sm font-bold text-[#0A0A0A]">
            {PERSON.name.first.toUpperCase()}_{PERSON.name.last.toUpperCase()} // LIGHT_DASH_V2
          </div>
          <div className="flex justify-center gap-6 font-mono text-xs text-[#6B6B6B]">
            <a href={PERSON.github} target="_blank" rel="noreferrer" className="hover:text-black">GITHUB</a>
            <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">LINKEDIN</a>
            <span className="opacity-30">·</span>
            <span onClick={onOpenCommandPalette} className="cursor-pointer hover:text-black">CMD PALETTE</span>
          </div>
          <div className="flex justify-end font-mono text-xs text-[#6B6B6B]">
            © 2026 {PERSON.name.first.toUpperCase()} {PERSON.name.last.toUpperCase()}
          </div>
        </div>
      </footer>

    </div>
  );
}
