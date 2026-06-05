// All site content lives here. Components import from this file.
// Never hardcode content strings inside components.

export const PERSON = {
  name:       { first: 'Aritra', last: 'Jana' },
  role:       'Full Stack AI Engineer',
  location:   'India',
  year:       '2026',
  email:      'torretobraga003@gmail.com',
  github:     'https://github.com/AJBIKI',
  linkedin:   'https://linkedin.com/in/aritra-jana-0252b8292',
  phone:      '+91 98832 03782',
  status:     'available',        // 'available' | 'placed'
  statusText: 'available for hire · 2026',
  tagline: 'Full Stack Developer specializing in AI-powered systems, RAG pipelines, agentic workflows, and high-performance engineering.',
};

export const STATS = [
  { value: '6',    label: 'LIVE PRODUCTION PROJECTS' },
  { value: '85%',  label: 'VECTOR DB MEMORY SAVED'  },
  { value: '100+', label: 'DSA CORE SOLVED (GFG)'   },
  { value: 'SUB-150MS',  label: 'HYBRID RAG RETRIEVAL' },
];

export const TECH_MARQUEE = [
  'Next.js', 'FastAPI', 'Redis', 'Qdrant', 'GPT-4o', 'BullMQ', 
  'LangGraph', 'Socket.io', 'TypeScript', 'Node.js', 'Express', 'MongoDB'
];

export const PROJECTS = [
  {
    id:       'resume-analyzer',
    num:      '01',
    label:    'FLAGSHIP',
    name:     ['Resume', 'Analyzer'],
    status:   'LIVE',
    accent:   '#C8F135',   // --signal
    desc:     'A production-grade, distributed AI resume critique and ATS matching engine utilizing Next.js 15 (React 19) and a persistent Node.js/Express backend with BullMQ and WebSockets.',
    tags:     ['NEXTJS_15', 'EXPRESS', 'BULLMQ', 'REDIS', 'QDRANT', 'SOCKET_IO'],
    href:     '/work/resume-analyzer',
    github:   'https://github.com/AJBIKI',
    live:     'https://resume-analyser-upgraded.vercel.app/',
    featured: true,
  },
  {
    id:       'aetheros',
    num:      '02',
    label:    'ONGOING',
    name:     ['AetherOS', 'RAG Engine'],
    status:   'WIP',
    accent:   '#A0E0FF',  // --data
    desc:     'High-performance local-first hybrid RAG search and synthesis engine executing offline semantic Q&A with AST-based chunking and local ONNX reranking.',
    tags:     ['TYPESCRIPT', 'FASTIFY', 'TRPC', 'QDRANT', 'OLLAMA', 'ONNX'],
    href:     '/work/aetheros',
    github:   'https://github.com/AJBIKI/AetherOS',
    featured: true,
  },
  {
    id:       'block-cms',
    num:      '03',
    label:    'SHIPPED',
    name:     ['Next.js', 'Blog CMS'],
    status:   'SHIPPED',
    accent:   '#D8D4CE',  // --ink-border
    desc:     'High-performance CMS and public blog utilizing Next.js 15, React 19, MongoDB/Mongoose, Clerk, Cloudinary, and Server Actions.',
    tags:     ['NEXTJS_15', 'REACT_19', 'MONGODB', 'CLOUDINARY', 'CLERK', 'SERVER_ACTIONS'],
    href:     '/work/block-cms',
    github:   'https://github.com/AJBIKI',
    live:     'https://blog-cms-upgraded-next.vercel.app/',
    featured: false,
  },
  {
    id:       'diabetes-prediction',
    num:      '04',
    label:    'CLINICAL_AI',
    name:     ['Diabetes', 'Predictor'],
    status:   'LIVE',
    accent:   '#8FCFEE',
    desc:     'An AI-powered clinical risk assessment system predicting diabetes probability using scikit-learn classifiers (Random Forest, SVM, LR), integrated with an Express gateway proxy and MongoDB Atlas.',
    tags:     ['PYTHON_FLASK', 'SCIKIT_LEARN', 'MONGODB_ATLAS', 'EXPRESS', 'REACT_JS'],
    href:     '/work/diabetes-prediction',
    github:   'https://github.com/AJBIKI',
    live:     'https://diabetis-prediction-system-rfbb.vercel.app/',
    featured: false,
  },
  {
    id:       'note-app',
    num:      '05',
    label:    'WEB_CONCEPTS',
    name:     ['Zustand', 'Note App'],
    status:   'LIVE',
    accent:   '#D8D4CE',
    desc:     'A Next.js 15 notes management application featuring Zustand state management, MongoDB database clustering, and Tailwind CSS v4 styling.',
    tags:     ['NEXTJS_15', 'ZUSTAND', 'MONGODB', 'TAILWIND_V4'],
    href:     '/work/note-app',
    github:   'https://github.com/AJBIKI',
    live:     'https://note-app-next-concepts.vercel.app/',
    featured: false,
  },
  {
    id:       'lead-gen',
    num:      '06',
    label:    'CLIENT_DEMOS',
    name:     ['LeadGen', 'Studio'],
    status:   'LIVE',
    accent:   '#C8F135',
    desc:     'A suite of 5 premium responsive conversion-focused lead generation landing pages (coaching, gym, real estate, dental, solar) built with Next.js 16, EmailJS integration, and Framer Motion.',
    tags:     ['NEXTJS_16', 'EMAILJS', 'FRAMER_MOTION', 'ZOD'],
    href:     '/work/lead-gen',
    github:   'https://github.com/AJBIKI',
    live:     'https://leadgen-studio.vercel.app/',
    featured: false,
  },
];

export const TECH_STACK = [
  {
    category: 'LANGUAGES',
    items:    ['01. JAVASCRIPT (ES6+)', '02. TYPESCRIPT', '03. PYTHON', '04. SQL'],
    inverted: false,
  },
  {
    category: 'AI_LLM_CORE',
    items:    ['01. GPT-4O & LLMS', '02. RAG PIPELINES', '03. LANGGRAPH / LANGCHAIN', '04. VECTOR_DB (QDRANT / PINECONE)'],
    inverted: true,   // stays dark even in light theme
    accent:   true,   // left border --signal
  },
  {
    category: 'INFRA_BACKEND',
    items:    ['01. NODE.JS & EXPRESS', '02. FASTAPI & REST APIS', '03. BULLMQ & REDIS', '04. WEBSOCKETS (SOCKET.IO)'],
    inverted: false,
  },
  {
    category: 'FRONTEND',
    items:    ['01. NEXT.JS & REACT', '02. TAILWIND CSS', '03. SHADCN UI DESIGN', '04. FRAMER MOTION'],
    inverted: false,
  },
];

export const TIMELINE = [
  { date: '2022 - 2026', title: 'B.TECH IN INFORMATION TECHNOLOGY', sub: 'Netaji Subhas Engineering College (CGPA: 7.1)' },
  { date: 'Jun 2023 - Dec 2023', title: 'BLOCK CMS PLATFORM', sub: 'Designed MERN full-stack block editor & role-based auth' },
  { date: 'Jan 2024 - Present', title: 'RESUME ANALYZER PIPELINE', sub: 'Built distributed 6-stage AI critique pipeline with Redis/BullMQ' },
  { date: 'Aug 2024 - Present', title: 'AETHEROS ENGINE', sub: 'Built local-first hybrid RAG with local GPU & memory bypass' },
  { date: 'PRESENT', title: 'DSA & PROFILE BUILD', sub: '100+ DSA Core solved on GeeksforGeeks' },
];

export const LIGHTHOUSE = [
  { score: 100, label: 'LIGHTHOUSE' },
  { score: 100, label: 'ACCESSIBILITY' },
  { score: 100, label: 'BEST PRACTICES' },
  { score: 100, label: 'SEO' },
];

export const CMD_PALETTE_ITEMS = [
  { id: 'resume-analyzer',    label: 'Go to Resume Analyzer',    category: 'SYSTEM',  href: 'resume-analyzer' },
  { id: 'aetheros',           label: 'View AetherOS Detail',      category: 'PROJECT',  href: 'aetheros' },
  { id: 'diabetes-prediction',label: 'View Diabetes Predictor',   category: 'PROJECT',  href: 'diabetes-prediction' },
  { id: 'note-app',           label: 'View Note App',             category: 'PROJECT',  href: 'note-app' },
  { id: 'lead-gen',           label: 'View Lead Gen Studio',      category: 'PROJECT',  href: 'lead-gen' },
  { id: 'resume-pdf',         label: 'Download Resume PDF',        category: 'ACTIVE', href: '/aritra_jana_resume.pdf' },
  { id: 'toggle-theme',       label: 'Toggle Theme',               category: 'PREFERENCE',   action: 'TOGGLE_THEME' },
  { id: 'contact',            label: 'Contact Email',             category: 'ACTION',   href: `mailto:${PERSON.email}` },
  { id: 'github',             label: 'GitHub Profile',                category: 'EXTERNAL',     href: PERSON.github },
  { id: 'linkedin',           label: 'LinkedIn Profile',              category: 'EXTERNAL',     href: PERSON.linkedin },
];

export const RESUME_ANALYZER_ARCH = {
  layers: [
    { id: 'input',  label: 'Input Layer',  color: '#8fcfee', nodes: [
      { id: 'user',  title: 'Upload UI', sub: 'Next.js Client / Tailwind' },
      { id: 'clerk', title: 'Clerk Auth',  sub: 'JWT Verification' },
    ]},
    { id: 'queue',  label: 'Queue Layer',  color: '#c9f236', nodes: [
      { id: 'redis',   title: 'Upstash Redis', sub: 'BullMQ Broker' },
      { id: 'worker',  title: 'BullMQ Workers', sub: 'Node.js Express Server' },
    ]},
    { id: 'ai',     label: 'AI & Data Layer',     color: '#8fcfee', nodes: [
      { id: 'gpt',    title: 'GPT-4o JSON',       sub: 'Structured Critique' },
      { id: 'qdrant', title: 'Qdrant Cloud',        sub: '384-dim Vector DB' },
      { id: 'hf',     title: 'HuggingFace',  sub: 'all-MiniLM-L6-v2 Embeddings' },
    ]},
    { id: 'output', label: 'Output Layer', color: '#c9f236', nodes: [
      { id: 'ws',  title: 'Socket.io WebSocket',  sub: 'Real-time telemetry room' },
      { id: 'mongo',  title: 'MongoDB Atlas',    sub: 'Persistent Analysis Cache' },
    ]},
  ],
  caption: "Decoupled background worker architecture bypassing Vercel serverless execution limits",
  decisions: [
    { problem: 'Vercel 10s Timeout limit',       solution: 'Decoupled Worker Queue', type: 'TIMEOUT_LIMIT', typeText: 'Vercel 10s Timeout limit', solSub: 'Offloaded compute-heavy parsing and scoring to a persistent Node.js Express server via BullMQ and Upstash Redis.' },
    { problem: 'Context contamination in vectors',  solution: 'Section-Aware Semantic Chunking', type: 'VECTOR_DILUTION', typeText: 'Context contamination in vectors', solSub: 'Splits resume at canonical section boundaries and pre-pends section tags (e.g. [EXPERIENCE]) to keep search semantic scopes pure.' },
    { problem: 'High API duplicate query costs',      solution: 'SHA-256 JD Cache', type: 'API_OVERHEAD', typeText: 'High API duplicate query costs', solSub: 'Implements content-addressable cache using SHA-256 hashing on JD text in MongoDB, saving ~$0.02/search and 5s latency.' },
    { problem: 'Eavesdropping on status sockets',  solution: '3-Guard WebSocket Protocol', type: 'WEBSOCKET_SECURITY', typeText: 'Eavesdropping on status sockets', solSub: 'Verifies Clerk JWT, checks BullMQ job existence, and validates user ownership before socket room entrance.' },
  ],
};

export const AETHEROS_ARCH = {
  layers: [
    { id: 'input',  label: 'Ingestion Layer',  color: '#8fcfee', nodes: [
      { id: 'unified',  title: 'AST Parser', sub: 'unified / remark Markdown' },
      { id: 'chokidar', title: 'Chokidar Watcher',  sub: 'Real-time Local sync' },
    ]},
    { id: 'storage',  label: 'Storage Layer',  color: '#c9f236', nodes: [
      { id: 'qdrant',   title: 'Qdrant Embeddings', sub: 'Dense/Sparse Collection' },
      { id: 'disk',  title: 'Disk Sidecar', sub: 'Raw chunk cache' },
    ]},
    { id: 'processing',     label: 'Retrieval Layer',     color: '#8fcfee', nodes: [
      { id: 'qwen',    title: 'Qwen Classifier',       sub: 'qwen3:4b intent classification' },
      { id: 'rrf', title: 'RRF Hybrid',        sub: 'Dense + Sparse Lexical fusion' },
      { id: 'onnx',     title: 'Local ONNX',  sub: '@xenova ms-marco reranker' },
    ]},
    { id: 'output', label: 'Synthesis Layer', color: '#c9f236', nodes: [
      { id: 'ollama',  title: 'Ollama qwen3:8b',  sub: '100% Offline Generation' },
      { id: 'openai',  title: 'Responses API',    sub: 'Dynamic cost-budget cloud fallback' },
    ]},
  ],
  caption: "Local-first hybrid dense/sparse RAG engine with decoupled disk storage and CPU-bypass scheduler",
  decisions: [
    { problem: 'High Vector DB memory cost',       solution: 'Decoupled Vector-Disk Layout', type: 'MEMORY_LIMIT', typeText: 'High Vector DB memory cost', solSub: 'Moved raw chunk text from Qdrant payloads to a disk-based sidecar cache, saving 85% memory while keeping DB operations light.' },
    { problem: 'Event loop blocking on updates',  solution: 'Worker Thread TF-IDF', type: 'CONCURRENCY_LIMIT', typeText: 'Event loop blocking on updates', solSub: 'Offloaded compute-heavy sparse matrix calculations to background Node.js Worker Threads on batch file imports.' },
    { problem: 'High CPU reranking overhead in cloud',      solution: 'Cloud CPU Bypass Scheduler', type: 'RESOURCE_WASTE', typeText: 'High CPU reranking overhead in cloud', solSub: 'Skips execution of local ONNX reranker when cloud mode is enabled, leveraging cloud model reasoning to process raw candidates.' },
  ],
};
