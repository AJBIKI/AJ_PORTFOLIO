import { useState } from 'react';
import { motion } from 'motion/react';
import { RESUME_ANALYZER_ARCH, PERSON } from '../constants';

interface ResumeAnalyzerDetailProps {
  onBackToWork: () => void;
}

export default function ResumeAnalyzerDetail({ onBackToWork }: ResumeAnalyzerDetailProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full text-[#e5e2e1] bg-[#131313] pt-[60px]">
      
      {/* 2-Column Hero Structure */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#353534]">
        
        {/* Left Hero Content Section (Screen 4 Left) */}
        <div className="relative p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-[#353534] overflow-hidden flex flex-col justify-center min-h-[500px]">
          {/* Decorative Huge Background Layer "01" */}
          <div className="absolute -top-10 -left-10 opacity-5 select-none pointer-events-none">
            <span className="font-sans text-[200px] md:text-[240px] leading-none font-extrabold text-[#ffffef]">01</span>
          </div>

          <div className="relative z-10">
            <div className="font-mono text-xs text-[#c9f236] flex items-center gap-2 mb-6">
              <span className="inline-block w-2.5 h-2.5 bg-[#c9f236] pulsing-dot rounded-full"></span>
              &gt; STATUS_LIVE_SYSTEM
            </div>

            <h1 className="font-sans text-4xl md:text-6xl font-extrabold mb-4 text-[#ffffef] tracking-tighter uppercase leading-none">
              Resume Analyzer
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js 15', 'Express', 'BullMQ', 'Redis', 'Qdrant Cloud', 'MongoDB Atlas', 'Socket.io'].map(tag => (
                <span 
                  key={tag} 
                  className="border border-[#353534] px-2.5 py-1 font-mono text-[10px] uppercase text-[#c5c9ae] bg-[#0e0e0e]/40"
                >
                  [ {tag} ]
                </span>
              ))}
            </div>

            <p className="font-sans text-base md:text-lg text-[#c5c9ae] max-w-lg mb-8 leading-relaxed">
              A high-performance asynchronous pipeline designed to parse, embed, and rank technical resumes against complex job descriptions using RAG patterns.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.open('https://resume-analyser-upgraded.vercel.app/', '_blank', 'noopener,noreferrer')}
                className="bg-[#c9f236] text-[#171e00] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#aed50d] transition-all cursor-pointer"
              >
                VIEW LIVE PROJECT
              </button>
              <button 
                onClick={onBackToWork}
                className="border border-[#8f937b] text-[#e5e2e1] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#1c1b1b] transition-all cursor-pointer"
              >
                BACK TO LIST
              </button>
            </div>
          </div>
        </div>

        {/* Right Architecture Block Diagram (Screen 4 Right with checkered backplane) */}
        <div className="bg-[#0e0e0e] p-6 md:p-12 relative flex items-center justify-center checkered-pattern min-h-[480px]">
          <div className="w-full max-w-md aspect-square relative flex flex-col gap-6 z-10 justify-center">
            
            {/* Input Layer */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onMouseEnter={() => setHoveredNode('user')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#8fcfee] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'user' ? '0 0 10px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase tracking-widest font-bold">Input Layer</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">User Input</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('clerk')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#8fcfee] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'clerk' ? '0 0 10px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase tracking-widest font-bold">Auth Provider</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">Clerk Auth</div>
              </div>
            </div>

            {/* Queue Layer */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onMouseEnter={() => setHoveredNode('redis')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#c9f236] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'redis' ? '0 0 10px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#c9f236] mb-1 uppercase tracking-widest font-bold">Message Broker</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">Redis Queue</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('worker')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#c9f236] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'worker' ? '0 0 10px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#c9f236] mb-1 uppercase tracking-widest font-bold">Task Processor</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">BullMQ Workers</div>
              </div>
            </div>

            {/* AI Layer */}
            <div className="grid grid-cols-3 gap-3">
              <div 
                onMouseEnter={() => setHoveredNode('gpt')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'gpt' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">LLM</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">GPT-4o</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('qdrant')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'qdrant' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">Vector DB</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">Qdrant</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('embed')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'embed' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">Embeddings</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">HuggingFace</div>
              </div>
            </div>

            {/* Output Layer (Featured highlighted banner block) */}
            <div className="flex justify-center">
              <div 
                onMouseEnter={() => setHoveredNode('ws')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#c9f236] text-[#171e00] p-3 w-full max-w-[240px] text-center border border-[#c9f236] relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'ws' ? '0 0 12px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] mb-1 uppercase tracking-widest opacity-80 font-bold">Final Delivery</div>
                <div className="font-mono text-xs font-bold uppercase transition-all">WebSocket → UI</div>
              </div>
            </div>

            {/* CSS connecting background guides */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
              <div className="w-px h-full bg-white absolute left-1/4"></div>
              <div className="w-px h-full bg-white absolute left-3/4"></div>
              <div className="h-px w-full bg-white absolute top-1/4"></div>
              <div className="h-px w-full bg-white absolute top-3/4"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Engineering Logic Panel (Screen 4 Center) */}
      <section className="p-6 md:p-12 border-b border-[#353534]">
        <div className="mb-8">
          <div className="font-mono text-xs text-[#c9f236] mb-2 uppercase tracking-widest">&gt; SYSTEM_DECISIONS</div>
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold uppercase">Engineering Logic</h2>
        </div>

        {/* Comparison grid representation */}
        <div className="w-full border border-[#353534] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1c1b1b] border-b border-[#353534] font-mono text-xs uppercase tracking-widest py-3 px-4 text-[#c5c9ae]">
            <div>Problem Archetype</div>
            <div className="hidden md:block">Architectural Solution</div>
          </div>

          <div className="divide-y divide-[#353534]">
            {RESUME_ANALYZER_ARCH.decisions.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Cell: Problem */}
                <div className="p-6 md:border-r border-[#353534] flex flex-col justify-center">
                  <div className="font-mono text-[10px] text-red-400 font-bold tracking-widest uppercase mb-1">
                    [ {row.type} ]
                  </div>
                  <h3 className="font-sans text-lg font-bold mb-2">{row.typeText}</h3>
                  <p className="font-sans text-xs text-[#c5c9ae] leading-relaxed">{row.problem}</p>
                </div>
                
                {/* Right Cell: Solution */}
                <div className="p-6 bg-[#0e0e0e]/50 flex flex-col justify-center">
                  <div className="font-mono text-[10px] text-[#c9f236] font-bold tracking-widest uppercase mb-1">
                    [ {idx === 0 ? 'QUEUE_STRATEGY' : idx === 1 ? 'PERSISTENCE_LAYER' : 'VECTOR_RAG'} ]
                  </div>
                  <h3 className="font-sans text-lg font-bold mb-2 text-white">{row.solution}</h3>
                  <p className="font-sans text-xs text-[#c5c9ae] leading-relaxed">{row.solSub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project metrics panel */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#353534] bg-[#0e0e0e]">
        <div className="p-8 border-r border-[#353534] text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Processing Speed</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">1.2s</div>
          <div className="font-mono text-[9px] text-[#c9f236] uppercase tracking-wider font-bold">AVG / PER_PAGE</div>
        </div>
        <div className="p-8 border-r border-[#353534] text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Embedding Dim</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">1536</div>
          <div className="font-mono text-[9px] text-[#c9f236] uppercase tracking-wider font-bold font-mono">VECTOR_SPACE</div>
        </div>
        <div className="p-8 border-r border-[#353534] text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Concurrent Tasks</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">500+</div>
          <div className="font-mono text-[9px] text-[#c9f236] uppercase tracking-wider font-bold font-mono">LOAD_CAPACITY</div>
        </div>
        <div className="p-8 text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Auth Security</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">RSA</div>
          <div className="font-mono text-[9px] text-[#c9f236] uppercase tracking-wider font-bold font-mono">JWKS_VALIDATION</div>
        </div>
      </section>

      {/* Screenshots visual preview grid (Screen 4 bottom layouts) */}
      <section className="p-6 md:p-12 bg-[#131313]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel 1 */}
          <div className="aspect-video bg-[#2a2a2a] border border-[#353534] relative overflow-hidden group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
              alt="High-fidelity software dashboard mockup" 
              src="/resume_analyzer_dashboard.png" 
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#131313]/85 px-2 py-1 border border-[#353534] uppercase tracking-widest text-[#e5e2e1] font-bold">
              [ Dashboard_View ]
            </div>
          </div>

          {/* Panel 2 */}
          <div className="aspect-video bg-[#2a2a2a] border border-[#353534] relative overflow-hidden group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
              alt="Macro photography of coding editor context screens" 
              src="/resume_analyzer_logic.png" 
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#131313]/85 px-2 py-1 border border-[#353534] uppercase tracking-widest text-[#e5e2e1] font-bold">
              [ Analysis_Logic ]
            </div>
          </div>

          {/* Panel 3 */}
          <div className="aspect-video bg-[#2a2a2a] border border-[#353534] relative overflow-hidden group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
              alt="Futuristic neural networks vectors connections map" 
              src="/resume_analyzer_vectors.png" 
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#131313]/85 px-2 py-1 border border-[#353534] uppercase tracking-widest text-[#e5e2e1] font-bold">
              [ Vector_Mapping ]
            </div>
          </div>
        </div>
      </section>

      {/* Detail Footer */}
      <footer className="border-t border-[#353534] bg-[#0e0e0e]/80 py-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-sans text-sm font-bold uppercase tracking-tight text-[#e5e2e1]">
            {PERSON.name.first.toUpperCase()} {PERSON.name.last.toUpperCase()} // RESUME_ANALYZER_DEEP_DIVE
          </div>
          <button 
            onClick={onBackToWork}
            className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#c5c9ae] hover:text-[#c9f236] transition-colors cursor-pointer focus:outline-none"
          >
            <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
            Back to Home Portfolio
          </button>
        </div>
      </footer>

    </div>
  );
}
