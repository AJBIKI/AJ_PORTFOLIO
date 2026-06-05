import { motion } from 'motion/react';
import { PERSON, STATS, PROJECTS, TECH_STACK, TIMELINE, LIGHTHOUSE } from '../constants';

interface PortfolioHomeProps {
  onSelectProject: (projectId: string) => void;
  onOpenCommandPalette: () => void;
}

export default function PortfolioHome({ onSelectProject, onOpenCommandPalette }: PortfolioHomeProps) {
  return (
    <div className="w-full text-[#e5e2e1] bg-[#131313]">
      
      {/* 1. HERO SECTION (Screen 1 & Screen 5 Hybrid) */}
      <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] border-b border-[#353534] grid-pattern">
        {/* Left column: branding, credentials & core intent */}
        <div className="col-span-12 lg:col-span-7 border-r border-[#353534] p-6 md:p-12 flex flex-col justify-end">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs text-[#c9f236] font-bold mb-4 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#c9f236] pulsing-dot rounded-full"></span>
            &gt; SYSTEM_READY / AI_ENGINEER_CORE
          </motion.div>
          
          <h1 className="font-sans text-[44px] md:text-[80px] leading-[0.9] font-extrabold tracking-tighter uppercase mb-6">
            ARITRA<br />JANA.
          </h1>
          
          <p className="font-mono text-sm leading-relaxed text-[#c5c9ae] max-w-xl">
            {PERSON.tagline}
          </p>
        </div>

        {/* Right column: Availability status & live stats block */}
        <div className="col-span-12 lg:col-span-5 flex flex-col">
          <div className="p-6 md:p-12 border-b border-[#353534] bg-[#0e0e0e]/50 flex items-center gap-3">
            <span className="w-3 h-3 bg-[#aed50d] pulsing-dot rounded-full"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#e5e2e1]">
              AVAILABILITY: {PERSON.statusText}
            </span>
          </div>

          <div className="grid grid-cols-2 flex-grow bg-[#353534] gap-px">
            {STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-[#131313] p-6 lg:p-8 flex flex-col justify-center transition-all duration-300 hover:bg-[#1c1b1b]"
              >
                <span className="font-sans text-3xl md:text-5xl font-extrabold text-[#aed50d]">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase text-[#c5c9ae] tracking-widest mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK ARCHIVE (Screen 5 Grid Style, responsive to Screen 1) */}
      <section id="work" className="p-6 md:p-12 border-b border-[#353534]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="font-mono text-xs uppercase text-[#c9f236] tracking-widest mb-2 md:mb-0">
            [ 01_SELECTED_WORK_ARCHIVE ]
          </h2>
          <div className="font-mono text-[10px] text-[#c5c9ae]/50 uppercase tracking-widest">
            // PROJECTS STACK
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Work Cell 1: Resume Analyzer (Featured / Large Card) */}
          <div 
            onClick={() => onSelectProject(PROJECTS[0].id)}
            className="col-span-12 lg:col-span-8 border border-[#353534] p-6 md:p-8 flex flex-col justify-between min-h-[400px] cursor-pointer hover:border-[#c9f236] transition-all bg-[#1c1b1b]/35 hover:bg-[#1c1b1b]/60 group relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-[#c5c9ae] border border-[#aed50d] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  [ {PROJECTS[0].label} ]
                </span>
                <span className="font-mono text-xs text-[#c9f236] border border-[#c9f236] px-2 py-0.5 rounded-sm uppercase font-bold tracking-widest">
                  STATUS: {PROJECTS[0].status}
                </span>
              </div>
              <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter mb-4 group-hover:text-[#c9f236] transition-colors">
                {PROJECTS[0].name.join(' ')}
              </h3>
              <p className="font-mono text-sm text-[#c5c9ae] max-w-xl leading-relaxed mb-6">
                {PROJECTS[0].desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#353534]/50">
              {PROJECTS[0].tags.map(tag => (
                <span key={tag} className="border border-[#353534] px-2 py-1 font-mono text-[10px] text-[#c5c9ae]/70 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Work Cell 2: AetherOS (with code-graphic) */}
          <div 
            onClick={() => onSelectProject(PROJECTS[1].id)}
            className="col-span-12 lg:col-span-4 border border-[#353534] p-6 md:p-8 bg-[#1c1b1b] flex flex-col justify-between group hover:border-[#8fcfee] transition-all cursor-pointer"
          >
            <div>
              <div className="aspect-video w-full overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 border border-[#353534]">
                <img 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="A computer circuit board with neon lighting"
                  src="/aetheros_circuit.png" 
                />
              </div>
              <h3 className="font-sans text-2xl font-bold tracking-tight mb-2 group-hover:text-[#8fcfee] transition-colors">
                {PROJECTS[1].name.join(' ')}
              </h3>
              <p className="font-mono text-xs text-[#c5c9ae] leading-relaxed">
                {PROJECTS[1].desc}
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center pt-4 border-t border-[#353534]/50">
              <div className="flex flex-wrap gap-1.5">
                {PROJECTS[1].tags.slice(0, 3).map(tag => (
                  <span key={tag} className="font-mono text-[9px] uppercase text-[#c5c9ae] bg-white/5 py-0.5 px-1.5">{tag}</span>
                ))}
              </div>
              <span className="material-symbols-outlined text-[#8fcfee]">account_tree</span>
            </div>
          </div>

          {/* Work Cell 3: Next.js Blog CMS */}
          <div 
            onClick={() => onSelectProject(PROJECTS[2].id)}
            className="col-span-12 lg:col-span-4 border border-[#353534] p-6 md:p-8 flex flex-col justify-between hover:border-[#c5c9ae] transition-all cursor-pointer hover:bg-[#1c1b1b]/35 group"
          >
            <div>
              <h3 className="font-sans text-2xl font-bold mb-3 uppercase group-hover:text-[#ffffef] transition-colors">
                {PROJECTS[2].name.join(' ')}
              </h3>
              <p className="font-mono text-xs text-[#c5c9ae] leading-relaxed mb-4">
                {PROJECTS[2].desc}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#353534]/50">
              <div className="flex gap-1.5 flex-wrap">
                {PROJECTS[2].tags.slice(0, 2).map(tag => (
                  <span key={tag} className="border border-[#353534] px-1.5 py-0.5 font-mono text-[9px]">{tag}</span>
                ))}
              </div>
              <span className="font-mono text-xs text-[#c5c9ae]/40">{PROJECTS[2].status}</span>
            </div>
          </div>

          {/* Work Cell 4: Agentic Design Core Research (Lime accent cell, Screen 5 right) */}
          <div className="col-span-12 lg:col-span-8 bg-[#c8f135] text-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0A0A0A]/60">
                CURRENT_RESEARCH_VECTOR
              </span>
              <h3 className="font-sans text-3xl md:text-4xl font-extrabold uppercase mt-4 mb-2 leading-tight">
                AGENTIC WORKFLOWS + MCP
              </h3>
              <p className="font-mono text-xs md:text-sm text-[#0A0A0A]/80 max-w-xl">
                Bridging the gap between static LLM execution and dynamic system interaction via Model Context Protocol.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase text-[#0A0A0A]/50 tracking-wider pt-6 border-t border-[#0A0A0A]/10 mt-4">
              OpenHands · Continue.dev · LangGraph · CrewAI
            </div>
          </div>

          {/* Work Cell 5: Diabetes Predictor */}
          <div 
            onClick={() => onSelectProject(PROJECTS[3].id)}
            className="col-span-12 lg:col-span-4 border border-[#353534] p-6 md:p-8 flex flex-col justify-between hover:border-[#8fcfee] transition-all cursor-pointer bg-[#1c1b1b]/20 hover:bg-[#1c1b1b]/45 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[9px] text-[#c5c9ae] border border-[#8fcfee] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  [ {PROJECTS[3].label} ]
                </span>
                <span className="font-mono text-[9px] text-[#8fcfee] border border-[#8fcfee] px-2 py-0.5 rounded-sm uppercase font-bold tracking-widest">
                  {PROJECTS[3].status}
                </span>
              </div>
              <h3 className="font-sans text-2xl font-bold mb-3 uppercase group-hover:text-[#8fcfee] transition-colors">
                {PROJECTS[3].name.join(' ')}
              </h3>
              <p className="font-mono text-xs text-[#c5c9ae] leading-relaxed mb-4">
                {PROJECTS[3].desc}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#353534]/50">
              <div className="flex gap-1.5 flex-wrap">
                {PROJECTS[3].tags.slice(0, 3).map(tag => (
                  <span key={tag} className="border border-[#353534] px-1.5 py-0.5 font-mono text-[9px] text-[#c5c9ae]/70">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Work Cell 6: Zustand Note App */}
          <div 
            onClick={() => onSelectProject(PROJECTS[4].id)}
            className="col-span-12 lg:col-span-4 border border-[#353534] p-6 md:p-8 flex flex-col justify-between hover:border-[#c5c9ae] transition-all cursor-pointer bg-[#1c1b1b]/20 hover:bg-[#1c1b1b]/45 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[9px] text-[#c5c9ae] border border-[#c5c9ae] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  [ {PROJECTS[4].label} ]
                </span>
                <span className="font-mono text-[9px] text-[#c5c9ae] border border-[#c5c9ae] px-2 py-0.5 rounded-sm uppercase font-bold tracking-widest">
                  {PROJECTS[4].status}
                </span>
              </div>
              <h3 className="font-sans text-2xl font-bold mb-3 uppercase group-hover:text-[#ffffef] transition-colors">
                {PROJECTS[4].name.join(' ')}
              </h3>
              <p className="font-mono text-xs text-[#c5c9ae] leading-relaxed mb-4">
                {PROJECTS[4].desc}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#353534]/50">
              <div className="flex gap-1.5 flex-wrap">
                {PROJECTS[4].tags.slice(0, 3).map(tag => (
                  <span key={tag} className="border border-[#353534] px-1.5 py-0.5 font-mono text-[9px] text-[#c5c9ae]/70">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Work Cell 7: LeadGen Studio */}
          <div 
            onClick={() => onSelectProject(PROJECTS[5].id)}
            className="col-span-12 lg:col-span-4 border border-[#353534] p-6 md:p-8 flex flex-col justify-between hover:border-[#c9f236] transition-all cursor-pointer bg-[#1c1b1b]/20 hover:bg-[#1c1b1b]/45 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[9px] text-[#0a0a0a] bg-[#c9f236] px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold">
                  [ {PROJECTS[5].label} ]
                </span>
                <span className="font-mono text-[9px] text-[#c9f236] border border-[#c9f236] px-2 py-0.5 rounded-sm uppercase font-bold tracking-widest">
                  {PROJECTS[5].status}
                </span>
              </div>
              <h3 className="font-sans text-2xl font-bold mb-3 uppercase group-hover:text-[#c9f236] transition-colors">
                {PROJECTS[5].name.join(' ')}
              </h3>
              <p className="font-mono text-xs text-[#c5c9ae] leading-relaxed mb-4">
                {PROJECTS[5].desc}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#353534]/50">
              <div className="flex gap-1.5 flex-wrap">
                {PROJECTS[5].tags.slice(0, 3).map(tag => (
                  <span key={tag} className="border border-[#353534] px-1.5 py-0.5 font-mono text-[9px] text-[#c5c9ae]/70">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK SPECIFICATION (Screen 5 columns) */}
      <section id="stack" className="border-b border-[#353534] bg-[#0e0e0e]">
        <div className="border-b border-[#353534] p-6 md:p-12 flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="font-mono text-xs uppercase text-[#c5c9ae] tracking-widest">
            // STACK DETAILS
          </h2>
          <div className="font-mono text-[10px] text-[#c5c9ae]/40 uppercase tracking-widest mt-2 md:mt-0">
            SYSTEM ENGINE SPECS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#353534]">
          {TECH_STACK.map((col, idx) => (
            <div 
              key={idx} 
              className={`p-6 lg:p-8 transition-all duration-300 ${
                col.inverted 
                  ? 'bg-[#080808] border-l-4 border-[#c9f236]' 
                  : 'bg-[#131313]'
              }`}
            >
              <h4 className={`font-mono text-xs uppercase mb-6 tracking-widest ${
                col.inverted ? 'text-[#c9f236]' : 'text-[#c5c9ae]/50'
              }`}>
                / {col.category}
              </h4>
              <ul className="space-y-3 font-mono text-sm">
                {col.items.map((item, i) => (
                  <li 
                    key={i} 
                    className={`transition-colors duration-200 ${
                      col.inverted ? 'text-[#ffffef]' : 'text-[#e5e2e1]'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HISTORY EXPERIENCES / TIMELINE SYSTEM LOGS (Screen 5 timeline table) */}
      <section id="about" className="p-6 md:p-12 border-b border-[#353534]">
        <h2 className="font-mono text-xs uppercase text-[#c9f236] tracking-widest mb-6">
          [ 02_SYSTEM_LOGS ]
        </h2>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-mono text-sm leading-relaxed border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#353534]">
                <th className="py-4 text-[#c5c9ae]/50 font-normal tracking-wide">TIMESTAMP</th>
                <th className="py-4 text-[#c5c9ae]/50 font-normal tracking-wide">EVENT_NODE</th>
                <th className="py-4 text-[#c5c9ae]/50 font-normal tracking-wide">RESULT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#353534]/50">
              {TIMELINE.map((node, i) => (
                <tr 
                  key={i}
                  className="group transition-all duration-300 hover:bg-white/[0.02]"
                >
                  <td className="py-4 text-[#c5c9ae] font-normal group-hover:text-[#c9f236] transition-colors">{node.date}</td>
                  <td className="py-4 text-[#e5e2e1] font-medium group-hover:text-[#ffffef] transition-colors">{node.title}</td>
                  <td className="py-4 text-[#c5c9ae]/70 group-hover:text-[#c9f236]/80 transition-colors">{node.sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. LIGHTHOUSE OPTIMIZATION STRIP */}
      <section className="bg-[#0e0e0e] border-b border-[#353534]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#353534]">
          {LIGHTHOUSE.map((item, idx) => (
            <div key={idx} className="p-6 text-center">
              <span className="font-mono text-[10px] text-[#c5c9ae] block tracking-wide uppercase mb-2">
                {item.label}
              </span>
              <span className="font-sans text-4xl lg:text-5xl font-extrabold text-[#c9f236]">
                {item.score}
              </span>
            </div>
          ))}
          <div className="hidden lg:flex p-6 flex-col justify-center items-center bg-[#1c1b1b] text-center border-l border-[#353534]">
            <span className="material-symbols-outlined text-[#c9f236] text-3xl mb-1">terminal</span>
            <span className="font-mono text-[10px] uppercase text-[#e5e2e1] tracking-widest">OPTIMIZED</span>
          </div>
        </div>
      </section>

      {/* 7. BRUTALIST CONSOLE FOOTER */}
      <footer id="contact" className="py-12 px-6 md:px-12 bg-[#131313]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-[#353534] pt-8">
          <div>
            <p className="font-mono text-xs text-[#c5c9ae]/50 uppercase tracking-widest mb-1">
              © 2026 {PERSON.name.first.toUpperCase()} {PERSON.name.last.toUpperCase()} // BUILT WITH VITE
            </p>
            <p className="font-mono text-[10px] text-[#c5c9ae]/30 uppercase">
              ALL SYSTEMS OPERATIONS: STABLE_
            </p>
          </div>
          
          <div className="flex justify-center gap-6 font-mono text-xs">
            <a href={PERSON.github} target="_blank" rel="noreferrer" className="text-[#c5c9ae] hover:text-[#c9f236] transition-colors underline decoration-[#c9f236]">GITHUB</a>
            <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="text-[#c5c9ae] hover:text-[#c9f236] transition-colors underline decoration-[#c9f236]">LINKEDIN</a>
            <a onClick={onOpenCommandPalette} className="text-[#c5c9ae] hover:text-[#c9f236] transition-colors cursor-pointer underline decoration-[#c9f236]">CONSOLE</a>
          </div>

          <div className="flex justify-end">
            <a 
              href={`mailto:${PERSON.email}`}
              className="bg-[#c8f135] text-[#171e00] font-sans font-extrabold uppercase text-xs tracking-widest px-6 py-3 cursor-pointer select-none border border-[#c8f135] transition-all hover:bg-[#131313] hover:text-[#c9f236]"
            >
              HIRE ME_
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
