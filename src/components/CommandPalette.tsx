import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSON, CMD_PALETTE_ITEMS } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string, href?: string) => void;
  onToggleTheme: () => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectAction, onToggleTheme }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(2); // "Open Resume PDF" index default active to match mockup
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter commands
  const filteredItems = CMD_PALETTE_ITEMS.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(filteredItems.length > 0 ? 0 : -1);
  }, [searchQuery]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearchQuery('');
      // Find "Open Resume PDF" index from current list
      const pdfIndex = CMD_PALETTE_ITEMS.findIndex(item => item.id === 'resume-pdf');
      if (pdfIndex !== -1) {
        setActiveIndex(pdfIndex);
      }
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (filteredItems.length === 0 ? -1 : (prev + 1) % filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (filteredItems.length === 0 ? -1 : (prev - 1 + filteredItems.length) % filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredItems.length) {
          const selected = filteredItems[activeIndex];
          if (selected.action === 'TOGGLE_THEME') {
            onToggleTheme();
          } else {
            onSelectAction(selected.id, selected.href);
          }
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, onClose, onSelectAction, onToggleTheme]);

  const handleItemClick = (item: typeof CMD_PALETTE_ITEMS[0]) => {
    if (item.action === 'TOGGLE_THEME') {
      onToggleTheme();
    } else {
      onSelectAction(item.id, item.href);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-[2px]"
          onClick={onClose}
          id="cmd-palette-backdrop"
        >
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-[560px] bg-[#141414] border border-[#2A2A2A] flex flex-col shadow-2xl overflow-hidden pointer-events-auto"
            onClick={e => e.stopPropagation()}
            id="cmd-palette-container"
          >
            {/* Search Input Row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2a] bg-[#0e0e0e]">
              <span className="material-symbols-outlined text-[#aed50d] font-bold">search</span>
              <input 
                ref={inputRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-[#e5e2e1] font-mono text-sm placeholder:text-[#c5c9ae]/40" 
                placeholder="Search system commands..." 
                type="text"
                autoComplete="off"
              />
              <div className="flex items-center">
                <span className="px-1.5 py-0.5 border border-[#353534] rounded-sm font-mono text-[10px] text-[#c5c9ae] bg-[#1c1b1b] uppercase">Esc</span>
              </div>
            </div>

            {/* Result Rows */}
            <div className="flex flex-col max-h-[360px] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="py-8 px-4 text-center font-mono text-[#c5c9ae]/50 text-sm">
                  No matching system commands found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`group flex items-center justify-between px-4 py-3 cursor-pointer transition-colors border-b border-[#353534]/30 ${
                        isActive 
                          ? 'bg-[#c9f236]/5 border-l-2 border-[#c9f236]' 
                          : 'hover:bg-[#1c1b1b]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${
                          isActive ? 'text-[#c9f236]' : 'text-[#c5c9ae]'
                        }`}>
                          {item.id === 'resume-analyzer' ? 'analytics' :
                           item.id === 'aetheros' ? 'terminal' :
                           item.id === 'resume-pdf' ? 'picture_as_pdf' :
                           item.id === 'toggle-theme' ? 'contrast' :
                           item.id === 'contact' ? 'mail' :
                           item.id === 'github' ? 'account_circle' :
                           item.id === 'linkedin' ? 'work' : 'verified'}
                        </span>
                        <span className={`font-mono text-sm ${
                          isActive ? 'text-[#c9f236] font-bold' : 'text-[#e5e2e1]'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {isActive && item.id === 'resume-pdf' ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[#c9f236] uppercase">[ ACTIVE ]</span>
                          <span className="material-symbols-outlined text-[#c9f236] text-sm font-bold">subdirectory_arrow_left</span>
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-[#c5c9ae]/40 uppercase">
                          {item.category}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2 bg-[#0e0e0e] border-t border-[#2a2a2a] flex items-center gap-4 text-[#c5c9ae]/50 font-mono text-[10px]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] font-bold">arrow_upward</span>
                <span className="material-symbols-outlined text-[12px] font-bold">arrow_downward</span>
                <span className="uppercase tracking-tighter">Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] font-bold">keyboard_return</span>
                <span className="uppercase tracking-tighter">Open</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="uppercase font-bold">⌘K</span>
                <span className="uppercase tracking-tighter">Close</span>
              </div>
              <div className="ml-auto opacity-20">
                <div className="w-8 h-8 diagonal-grid"></div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
