import { useState } from 'react';
import { AETHEROS_ARCH, PERSON } from '../constants';

interface AetherOsDetailProps {
  onBackToWork: () => void;
}

export default function AetherOsDetail({ onBackToWork }: AetherOsDetailProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleOpenGithub = () => {
    window.open('https://github.com/AJBIKI/AetherOS', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full text-[#e5e2e1] bg-[#131313] pt-[60px]">
      
      {/* 2-Column Hero Structure */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#353534]">
        
        {/* Left Hero Content Section */}
        <div className="relative p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-[#353534] overflow-hidden flex flex-col justify-center min-h-[500px]">
          {/* Decorative Huge Background Layer "02" */}
          <div className="absolute -top-10 -left-10 opacity-5 select-none pointer-events-none">
            <span className="font-sans text-[200px] md:text-[240px] leading-none font-extrabold text-[#ffffef]">02</span>
          </div>

          <div className="relative z-10">
            <div className="font-mono text-xs text-[#8fcfee] flex items-center gap-2 mb-6">
              <span className="inline-block w-2.5 h-2.5 bg-[#8fcfee] pulsing-dot rounded-full"></span>
              &gt; STATUS_WIP_SYSTEM (LOCAL_FIRST)
            </div>

            <h1 className="font-sans text-4xl md:text-6xl font-extrabold mb-4 text-[#ffffef] tracking-tighter uppercase leading-none">
              AetherOS
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {['TypeScript', 'Fastify', 'tRPC', 'Qdrant', 'Ollama', 'ONNX'].map(tag => (
                <span 
                  key={tag} 
                  className="border border-[#353534] px-2.5 py-1 font-mono text-[10px] uppercase text-[#c5c9ae] bg-[#0e0e0e]/40"
                >
                  [ {tag} ]
                </span>
              ))}
            </div>

            <p className="font-sans text-base md:text-lg text-[#c5c9ae] max-w-lg mb-8 leading-relaxed">
              A high-performance local-first RAG search and synthesis engine executing offline semantic Q&A with AST-based document chunking, sparse/dense fusion, and ONNX reranking on local hardware.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleOpenGithub}
                className="bg-[#8fcfee] text-[#003546] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#bce6fa] transition-all cursor-pointer"
              >
                VIEW GITHUB REPO
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

        {/* Right Architecture Block Diagram */}
        <div className="bg-[#0e0e0e] p-6 md:p-12 relative flex items-center justify-center checkered-pattern min-h-[480px]">
          <div className="w-full max-w-md aspect-square relative flex flex-col gap-6 z-10 justify-center">
            
            {/* Ingestion Layer */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onMouseEnter={() => setHoveredNode('unified')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#8fcfee] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'unified' ? '0 0 10px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase tracking-widest font-bold">Ingestion Layer</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">AST markdown parser</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('chokidar')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#8fcfee] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'chokidar' ? '0 0 10px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase tracking-widest font-bold">Sync Watcher</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">Chokidar File Sync</div>
              </div>
            </div>

            {/* Storage Layer */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onMouseEnter={() => setHoveredNode('qdrant')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#c9f236] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'qdrant' ? '0 0 10px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#c9f236] mb-1 uppercase tracking-widest font-bold">Vector Database</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">Qdrant Collection</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('disk')}
                onMouseLeave={() => setHoveredNode(null)}
                className="border border-[#c9f236] p-3 bg-[#131313]/90 backdrop-blur-sm relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer shadow-lg"
                style={{ boxShadow: hoveredNode === 'disk' ? '0 0 10px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#c9f236] mb-1 uppercase tracking-widest font-bold">Sidecar Cache</div>
                <div className="font-mono text-xs text-[#e5e2e1] font-bold">Disk storage system</div>
              </div>
            </div>

            {/* Retrieval Layer */}
            <div className="grid grid-cols-3 gap-3">
              <div 
                onMouseEnter={() => setHoveredNode('qwen')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'qwen' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">Intent Classifier</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">qwen3:4b</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('rrf')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'rrf' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">Lexical Fusion</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">RRF Hybrid</div>
              </div>
              <div 
                onMouseEnter={() => setHoveredNode('onnx')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#005771]/20 border border-[#8fcfee] p-2 relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'onnx' ? '0 0 8px #8fcfee' : 'none' }}
              >
                <div className="font-mono text-[8px] text-[#8fcfee] mb-1 uppercase">Local Reranker</div>
                <div className="font-mono text-[10px] text-[#e5e2e1] font-bold">ONNX Runtime</div>
              </div>
            </div>

            {/* Synthesis Layer */}
            <div className="flex justify-center">
              <div 
                onMouseEnter={() => setHoveredNode('synthesis')}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-[#c9f236] text-[#171e00] p-3 w-full max-w-[240px] text-center border border-[#c9f236] relative z-10 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                style={{ boxShadow: hoveredNode === 'synthesis' ? '0 0 12px #c9f236' : 'none' }}
              >
                <div className="font-mono text-[8px] mb-1 uppercase tracking-widest opacity-80 font-bold">Synthesis Engine</div>
                <div className="font-mono text-xs font-bold uppercase transition-all">Local Ollama / Cloud API</div>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
              <div className="w-px h-full bg-white absolute left-1/4"></div>
              <div className="w-px h-full bg-white absolute left-3/4"></div>
              <div className="h-px w-full bg-white absolute top-1/4"></div>
              <div className="h-px w-full bg-white absolute top-3/4"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* RAG pipeline flowchart deep dive */}
      <section className="p-6 md:p-12 border-b border-[#353534] bg-[#0e0e0e]/30">
        <div className="mb-10 text-center">
          <div className="font-mono text-xs text-[#8fcfee] mb-2 uppercase tracking-widest">&gt; RETRIEVER_FLOWCHART</div>
          <h2 className="font-sans text-2xl md:text-4xl font-extrabold uppercase">Multi-Stage Retrieval &amp; Rerank Funnel</h2>
        </div>

        <div className="max-w-4xl mx-auto border border-[#353534] bg-[#0e0e0e] p-6 md:p-8 rounded-sm">
          <div className="flex flex-col gap-4 font-mono text-xs md:text-sm">
            <div className="flex items-center gap-4 p-3 border border-[#353534] bg-[#131313]/90">
              <span className="w-6 h-6 rounded-full bg-[#8fcfee] text-[#003546] font-bold flex items-center justify-center">1</span>
              <div>
                <strong className="text-[#ffffef]">Intent Routing (qwen3:4b):</strong>
                <p className="text-xs text-[#c5c9ae] mt-1">Classifies query intent. Broad mode duplicates query into 3 semantic variants; precise mode targets exact keywords.</p>
              </div>
            </div>

            <div className="flex justify-center py-1 text-[#8fcfee]">▼</div>

            <div className="flex items-center gap-4 p-3 border border-[#353534] bg-[#131313]/90">
              <span className="w-6 h-6 rounded-full bg-[#8fcfee] text-[#003546] font-bold flex items-center justify-center">2</span>
              <div>
                <strong className="text-[#ffffef]">Parallel Hybrid Search (Qdrant):</strong>
                <p className="text-xs text-[#c5c9ae] mt-1">Executes dense vector queries (text-dense, 768-dim) and sparse term frequencies in parallel. Fuses them using Reciprocal Rank Fusion (RRF, k=60).</p>
              </div>
            </div>

            <div className="flex justify-center py-1 text-[#8fcfee]">▼</div>

            <div className="flex items-center gap-4 p-3 border border-[#353534] bg-[#131313]/90">
              <span className="w-6 h-6 rounded-full bg-[#8fcfee] text-[#003546] font-bold flex items-center justify-center">3</span>
              <div>
                <strong className="text-[#ffffef]">ONNX Cross-Encoder Reranking (Local Mode):</strong>
                <p className="text-xs text-[#c5c9ae] mt-1">Scores search candidates using a local cross-encoder model (ms-marco-MiniLM-L-12-v2 via transformers in ONNX runtime) in sub-150ms.</p>
              </div>
            </div>

            <div className="flex justify-center py-1 text-[#8fcfee]">▼</div>

            <div className="flex items-center gap-4 p-3 border border-[#353534] bg-[#131313]/90">
              <span className="w-6 h-6 rounded-full bg-[#8fcfee] text-[#003546] font-bold flex items-center justify-center">4</span>
              <div>
                <strong className="text-[#ffffef]">Heuristic Score Tuning &amp; Context Assembly:</strong>
                <p className="text-xs text-[#c5c9ae] mt-1">Applies heading keyword match boost (+0.1), entity comparison boosts (1.5x), and boilerplate reference section penalties (0.3x). Hydrates text from local sidecar.</p>
              </div>
            </div>

            <div className="flex justify-center py-1 text-[#8fcfee]">▼</div>

            <div className="flex items-center gap-4 p-3 border border-[#c9f236] bg-[#1c1b1b]/80">
              <span className="w-6 h-6 rounded-full bg-[#c9f236] text-[#171e00] font-bold flex items-center justify-center">5</span>
              <div>
                <strong className="text-[#c9f236]">Response Synthesis:</strong>
                <p className="text-xs text-[#c5c9ae] mt-1">Synthesizes the final output using local Ollama (qwen3:8b) or OpenAI Responses API with economy/balanced budgeting limits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Logic Panel */}
      <section className="p-6 md:p-12 border-b border-[#353534]">
        <div className="mb-8">
          <div className="font-mono text-xs text-[#8fcfee] mb-2 uppercase tracking-widest">&gt; SYSTEM_DECISIONS</div>
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold uppercase">Engineering Logic &amp; Constraints</h2>
        </div>

        {/* Comparison grid representation */}
        <div className="w-full border border-[#353534] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1c1b1b] border-b border-[#353534] font-mono text-xs uppercase tracking-widest py-3 px-4 text-[#c5c9ae]">
            <div>Problem Archetype</div>
            <div className="hidden md:block">Architectural Solution</div>
          </div>

          <div className="divide-y divide-[#353534]">
            {AETHEROS_ARCH.decisions.map((row, idx) => (
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
                  <div className="font-mono text-[10px] text-[#8fcfee] font-bold tracking-widest uppercase mb-1">
                    [ {idx === 0 ? 'DECOUPLED_STORAGE' : idx === 1 ? 'WORKER_THREADS' : 'CPU_SCHEDULER'} ]
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
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Retrieval Speed</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">&lt;150ms</div>
          <div className="font-mono text-[9px] text-[#8fcfee] uppercase tracking-wider font-bold">HYBRID RETRIEVAL</div>
        </div>
        <div className="p-8 border-r border-[#353534] text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Vector Memory</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">85%</div>
          <div className="font-mono text-[9px] text-[#8fcfee] uppercase tracking-wider font-bold">REDUCTION SAVINGS</div>
        </div>
        <div className="p-8 border-r border-[#353534] text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Embedding Dimension</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">768</div>
          <div className="font-mono text-[9px] text-[#8fcfee] uppercase tracking-wider font-bold font-mono">DENSE_SPARSE_SPACE</div>
        </div>
        <div className="p-8 text-center hover:bg-[#131313]/50 transition-colors">
          <div className="font-mono text-xs text-[#c5c9ae] uppercase mb-1 tracking-wider">Offline Stack</div>
          <div className="font-sans text-3xl md:text-5xl font-extrabold text-[#ffffef] my-2">100%</div>
          <div className="font-mono text-[9px] text-[#8fcfee] uppercase tracking-wider font-bold font-mono">LOCAL_FIRST_EXEC</div>
        </div>
      </section>

      {/* Screenshots visual preview grid */}
      <section className="p-6 md:p-12 bg-[#131313]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video bg-[#2a2a2a] border border-[#353534] relative overflow-hidden group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
              alt="Macro photography of coding editor context screens" 
              src="/aetheros_rag_terminal.png" 
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#131313]/85 px-2 py-1 border border-[#353534] uppercase tracking-widest text-[#e5e2e1] font-bold">
              [ Local_Retrieval_Logic ]
            </div>
          </div>

          <div className="aspect-video bg-[#2a2a2a] border border-[#353534] relative overflow-hidden group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" 
              alt="Futuristic neural networks vectors connections map" 
              src="/aetheros_vectors.png" 
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#131313]/85 px-2 py-1 border border-[#353534] uppercase tracking-widest text-[#e5e2e1] font-bold">
              [ Decoupled_Vector_Map ]
            </div>
          </div>
        </div>
      </section>

      {/* Detail Footer */}
      <footer className="border-t border-[#353534] bg-[#0e0e0e]/80 py-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-sans text-sm font-bold uppercase tracking-tight text-[#e5e2e1]">
            {PERSON.name.first} {PERSON.name.last} // AETHEROS_RAG_DEEP_DIVE
          </div>
          <button 
            onClick={onBackToWork}
            className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#c5c9ae] hover:text-[#8fcfee] transition-colors cursor-pointer focus:outline-none"
          >
            <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
            Back to Home Portfolio
          </button>
        </div>
      </footer>

    </div>
  );
}
