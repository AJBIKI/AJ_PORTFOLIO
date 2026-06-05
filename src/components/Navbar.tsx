import { PERSON } from '../constants';

interface NavbarProps {
  isLightTheme: boolean;
  onOpenCommandPalette: () => void;
  onSelectTab: (tabId: string) => void;
  activeTab: string;
}

export default function Navbar({ isLightTheme, onOpenCommandPalette, onSelectTab, activeTab }: NavbarProps) {
  const links = ['WORK', 'STACK', 'ABOUT', 'CONTACT'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-colors duration-300 ${
      isLightTheme 
        ? 'bg-white border-b border-[#D8D4CE]' 
        : 'bg-[#131313] border-b border-[#353534]'
    }`}>
      <div className="flex justify-between items-center w-full px-4 md:px-12 max-w-[1440px] mx-auto">
        {/* Left: Brand Logo */}
        <button 
          onClick={() => onSelectTab('home')}
          className={`font-sans text-xl font-bold tracking-tight cursor-pointer text-left focus:outline-none ${
            isLightTheme ? 'text-[#0A0A0A]' : 'text-[#e5e2e1]'
          }`}
        >
          AJ<span className="terminal-cursor">_</span>
        </button>

        {/* Center: Main Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(link => {
            const tabKey = link.toLowerCase();
            const isActive = activeTab === tabKey;
            return (
              <button
                key={link}
                onClick={() => onSelectTab(tabKey)}
                className={`font-mono text-xs uppercase tracking-widest relative pb-1 transition-all duration-200 cursor-pointer focus:outline-none ${
                  isActive 
                    ? (isLightTheme ? 'text-[#aed50d] font-bold border-b-2 border-[#aed50d]' : 'text-[#c9f236] font-bold border-b-2 border-[#c9f236]') 
                    : (isLightTheme ? 'text-[#6B6B6B] hover:text-[#0A0A0A]' : 'text-[#c5c9ae] hover:text-[#ffffef]')
                }`}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Search hints + CTA Badge */}
        <div className="flex items-center gap-4">
          {/* Quick Search Trigger / Cmd+K */}
          <button 
            onClick={onOpenCommandPalette}
            className={`hidden sm:flex items-center gap-2 px-2.5 py-1 text-[10px] font-mono border rounded transition-colors ${
              isLightTheme 
                ? 'border-[#D8D4CE] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A]' 
                : 'border-[#353534] text-[#c5c9ae]/50 hover:border-[#c9f236] hover:text-[#e5e2e1]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">search</span>
            <span>⌘K</span>
          </button>

          {/* Open to Work status */}
          <button 
            onClick={onOpenCommandPalette}
            className={`px-3 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
              isLightTheme 
                ? 'border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#c8f135] hover:text-[#171e00]' 
                : 'border-[#aed50d] text-[#c9f236] bg-[#1c1b1b] hover:bg-[#c9f236] hover:text-[#171e00]'
            }`}
          >
            OPEN TO WORK
          </button>
        </div>
      </div>
    </nav>
  );
}
