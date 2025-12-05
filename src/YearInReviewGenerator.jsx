import ReactGA from "react-ga4";
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  Book, 
  Activity, 
  Zap, 
  Heart, 
  Briefcase, 
  Music, 
  Globe, 
  Terminal, 
  Feather, 
  Smartphone,
  RefreshCw,
  Layout,
  Type,
  Palette,
  Play,
  Camera,
  Star,
  Disc,
  Share2,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Wand2,
  Save,
  RotateCcw,
  Download,
  Flame,
  Languages,
  Bike,
  Footprints,
  Dumbbell,
  Plane,
  Gamepad2,
  Code,
  PenTool,
  DollarSign,
  Headphones,
  Video,
  Utensils,
  Moon,
  MapPin,
  GitBranch,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

// --- Icon Mapping ---
const ICON_MAP = {
  // General
  coffee: <Coffee className="w-full h-full" />,
  book: <Book className="w-full h-full" />,
  activity: <Activity className="w-full h-full" />,
  zap: <Zap className="w-full h-full" />,
  heart: <Heart className="w-full h-full" />,
  work: <Briefcase className="w-full h-full" />,
  music: <Music className="w-full h-full" />,
  globe: <Globe className="w-full h-full" />,
  terminal: <Terminal className="w-full h-full" />,
  feather: <Feather className="w-full h-full" />,
  phone: <Smartphone className="w-full h-full" />,
  camera: <Camera className="w-full h-full" />,
  star: <Star className="w-full h-full" />,
  disc: <Disc className="w-full h-full" />,
  
  // App/Activity Specific
  duolingo: <Flame className="w-full h-full" />, // Streak
  language: <Languages className="w-full h-full" />,
  strava_cycle: <Bike className="w-full h-full" />,
  strava_run: <Footprints className="w-full h-full" />,
  gym: <Dumbbell className="w-full h-full" />,
  travel: <Plane className="w-full h-full" />,
  gaming: <Gamepad2 className="w-full h-full" />,
  coding: <Code className="w-full h-full" />,
  git: <GitBranch className="w-full h-full" />,
  design: <PenTool className="w-full h-full" />,
  finance: <DollarSign className="w-full h-full" />,
  spotify: <Headphones className="w-full h-full" />,
  youtube: <Video className="w-full h-full" />,
  food: <Utensils className="w-full h-full" />,
  sleep: <Moon className="w-full h-full" />,
  location: <MapPin className="w-full h-full" />,
  social_x: <Twitter className="w-full h-full" />,
  social_insta: <Instagram className="w-full h-full" />,
  social_linked: <Linkedin className="w-full h-full" />
};

// --- Quotes Library ---
const QUOTES = [
  "A year defined not by the destination, but by the journey.",
  "Small steps, consistent effort, and a few surprises along the way.",
  "Growth is uncomfortable, but absolutely necessary.",
  "Collecting moments, not things. 2025 was a vibe.",
  "Grateful for the ups, the downs, and everything in between.",
  "The year I finally started building my own path.",
  "Work hard in silence, let your success be your noise.",
  "Embrace the chaos. Trust the process.",
  "Not a new me, just a better version.",
  "Turning pages and writing new chapters."
];


// --- Theme Definitions ---
const THEMES = [
  { id: 'retro', name: '8-Bit Retro', vibe: 'Nostalgic, Glitch, Console', color: 'bg-emerald-600' },
  { id: 'swiss', name: 'Swiss Grid', vibe: 'Bold, Minimal, Typographic', color: 'bg-red-600' },
  { id: 'lofi', name: 'Lo-Fi Scrapbook', vibe: 'Cozy, Paper, Polaroid', color: 'bg-stone-400' },
  { id: 'neon', name: 'Cyberpunk Neon', vibe: 'Futuristic, Glowing, Dark', color: 'bg-fuchsia-500' },
  { id: 'minimal', name: 'Modern Minimalist', vibe: 'Clean, Elegant, Editorial', color: 'bg-slate-800' },
  { id: 'journal', name: 'Hand-Drawn Journal', vibe: 'Sketchy, Doodles, Notebook', color: 'bg-amber-600' },
  { id: 'glass', name: 'Glassmorphism', vibe: 'Frosted, Gradient, UI', color: 'bg-indigo-400' },
  { id: 'brutal', name: 'Neo-Brutalism', vibe: 'Raw, Contrast, Bold', color: 'bg-yellow-300' },
  { id: 'vapor', name: 'Vaporwave', vibe: 'Retro-future, Synth, Pink', color: 'bg-pink-500' },
  { id: 'academia', name: 'Dark Academia', vibe: 'Moody, Classic, Serif', color: 'bg-stone-700' },
  { id: 'pop', name: 'Pop Art', vibe: 'Comic, Halftone, Vibrant', color: 'bg-cyan-400' },
  { id: 'blueprint', name: 'Blueprint', vibe: 'Technical, Blue, Lineart', color: 'bg-blue-700' }
];

// --- Initial Data ---
const INITIAL_DATA = {
  year: '2025',
  title: 'The Year of Growth',
  subtitle: 'Building Foundations',
  summary: "A year defined not by the destination, but by the journey. Small steps, consistent effort, and a few surprises along the way.",
  stats: [
    { id: 1, label: 'Books Read', value: '12', icon: 'book' },
    { id: 2, label: 'Streak Days', value: '365', icon: 'duolingo' },
    { id: 3, label: 'km Run', value: '150', icon: 'strava_run' },
    { id: 4, label: 'Commits', value: '840', icon: 'git' }
  ],
  highlights: [
    { id: 1, title: 'Career Milestone', desc: 'Started a new role and shipped my first major project.' },
    { id: 2, title: 'Travel Goal', desc: 'Finally visited Japan during cherry blossom season.' },
    { id: 3, title: 'New Hobby', desc: 'Learned photography and actually used manual mode.' }
  ],
  photos: [
    { id: 1, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500', caption: 'Big Wins' },
    { id: 2, url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=500', caption: 'Vibes' },
    { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500', caption: 'Adventure' }
  ]
};

// --- RENDERERS ---

// 1. RETRO RENDERER
const RenderRetro = ({ slide, data }) => {
  const borderStyle = "border-4 border-emerald-900 bg-emerald-50 text-emerald-900 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]";
  const watermark = <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase text-emerald-900/40 z-20 pointer-events-none">Made by YearInReview Generator</div>;
  
  if (slide === 0) return (
      <div className="h-full bg-emerald-100 p-6 font-mono flex flex-col justify-between relative overflow-hidden select-none">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        <div className="text-xs uppercase tracking-widest border-b-2 border-emerald-900 pb-2 mb-4">SYSTEM_LOG_v2.0</div>
        <div className={`${borderStyle} p-4 mb-4`}>
          <div className="text-6xl font-black mb-2 tracking-tighter">{data.year}</div>
          <div className="h-4 bg-emerald-900 w-full mb-2 animate-pulse"></div>
          <div className="text-xl font-bold uppercase">{data.title}</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
             <div className="text-sm bg-emerald-900 text-emerald-100 p-4 font-bold w-full">{`> ${data.subtitle}`}<span className="animate-pulse">_</span></div>
        </div>
        <div className="text-[10px] uppercase text-center mt-4">PRESS START TO CONTINUE</div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className="h-full bg-emerald-100 p-6 font-mono flex flex-col relative overflow-hidden select-none">
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
        <h3 className="text-xl font-black uppercase mb-6 bg-emerald-900 text-emerald-100 inline-block px-2 py-1 self-start">PLAYER_STATS</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map(stat => (
            <div key={stat.id} className={`${borderStyle} p-3 flex flex-col items-center justify-center aspect-square`}>
              <div className="w-8 h-8 mb-2 text-emerald-700">{ICON_MAP[stat.icon]}</div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className="h-full bg-emerald-100 p-6 font-mono relative overflow-hidden select-none">
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
        <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-emerald-900 pb-2">ACHIEVEMENTS</h3>
        <div className="space-y-4">
          {data.highlights.map((h, i) => (
             <div key={h.id} className={`${borderStyle} p-3 relative`}>
               <div className="absolute -top-3 -right-3 bg-emerald-900 text-emerald-100 w-6 h-6 flex items-center justify-center font-bold text-xs border-2 border-white">{i+1}</div>
               <div className="font-bold uppercase text-sm mb-1 underline decoration-2">{h.title}</div>
               <div className="text-xs leading-snug">{h.desc}</div>
             </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-cols-1 grid-rows-2'; 
    if (photoCount === 3) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount === 4) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className="h-full bg-emerald-100 p-6 font-mono relative overflow-hidden select-none flex flex-col">
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
         <h3 className="text-xl font-black uppercase mb-4 bg-emerald-900 text-emerald-100 inline-block px-2 py-1 self-start">MEMORY_DUMP</h3>
         
         <div className={`grid gap-2 flex-1 w-full ${gridClass}`}>
            {data.photos.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`${borderStyle} p-1 overflow-hidden relative ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
              >
                 <img src={photo.url} alt="" className="w-full h-full object-cover filter grayscale contrast-125" />
                 <div className="absolute bottom-1 right-1 bg-emerald-900 text-white text-[8px] px-1">IMG_0{i+1}.JPG</div>
              </div>
            ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className="h-full bg-emerald-900 p-8 font-mono flex flex-col items-center justify-center text-emerald-100 text-center relative overflow-hidden select-none">
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] z-10 bg-[length:100%_4px]"></div>
       <Terminal className="w-16 h-16 mb-6 animate-bounce" />
       <div className="border-2 border-emerald-100 p-4 bg-emerald-800 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
          <p className="text-lg font-bold leading-relaxed">"{data.summary}"</p>
       </div>
       <div className="mt-8 text-xs animate-pulse">END OF TRANSMISSION</div>
       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase text-emerald-500/40 z-20 pointer-events-none">Made by YearInReview Generator</div>
    </div>
  );
};

// 2. SWISS RENDERER
const RenderSwiss = ({ slide, data }) => {
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-black/20 z-20 pointer-events-none">Made by YearInReview Generator</div>;
  const darkWatermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-white/20 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
      <div className="h-full bg-[#f2f2f2] text-[#1a1a1a] p-4 font-sans flex flex-col relative select-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-red-600 opacity-30"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-red-600 opacity-30"></div>
        <div className="text-8xl font-black tracking-tighter leading-none mb-4 z-10">{data.year.substring(0,2)}<br/><span className="text-red-600">{data.year.substring(2)}</span>.</div>
        <div className="z-10 bg-white p-4 border border-black shadow-lg transform rotate-1 mt-4">
          <h2 className="text-3xl font-bold uppercase leading-none tracking-tight">{data.title}</h2>
          <p className="mt-2 text-sm font-medium text-gray-500">{data.subtitle}</p>
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-bold transform -rotate-90 origin-bottom-right">ANNUAL REPORT / {data.year}</div>
        <div className="absolute bottom-2 left-2 text-[8px] font-bold uppercase tracking-widest text-black/20 z-20">Made by YearInReview Generator</div>
      </div>
  );

  if (slide === 1) return (
      <div className="h-full bg-[#1a1a1a] text-[#f2f2f2] p-6 font-sans flex flex-col select-none">
        <h3 className="text-4xl font-black mb-8 border-b-2 border-red-600 pb-2">DATA.</h3>
        <div className="space-y-6">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className="flex items-baseline justify-between group">
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 w-1/3">0{idx + 1} / {stat.label}</div>
              <div className="text-5xl font-black text-white group-hover:text-red-500 transition-colors">{stat.value}</div>
            </div>
          ))}
        </div>
        {darkWatermark}
      </div>
  );

  if (slide === 2) return (
      <div className="h-full bg-[#f2f2f2] text-[#1a1a1a] font-sans flex flex-col select-none">
         <div className="bg-red-600 text-white p-6 pb-12 rounded-bl-[4rem]">
           <h3 className="text-4xl font-black leading-none">KEY<br/>POINTS.</h3>
         </div>
         <div className="flex-1 p-6 -mt-8 space-y-4">
           {data.highlights.map((h, i) => (
             <div key={h.id} className="bg-white p-5 shadow-xl border-l-8 border-black">
               <h4 className="text-xl font-black uppercase mb-1">{h.title}</h4>
               <p className="text-sm text-gray-600 font-medium leading-tight">{h.desc}</p>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-rows-2'; // 2 photos
    if (photoCount > 2) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className="h-full bg-[#f2f2f2] text-[#1a1a1a] font-sans flex flex-col relative select-none">
         <div className="absolute top-1/2 left-0 w-full h-px bg-red-600 z-20"></div>
         <div className="absolute top-0 left-1/2 w-px h-full bg-red-600 z-20"></div>
         
         <div className={`grid h-full w-full ${gridClass}`}>
           {data.photos.map((photo, i) => (
             <div 
              key={photo.id} 
              className={`overflow-hidden border border-white relative group ${photoCount === 3 && i === 0 ? 'row-span-2' : ''} ${i % 2 === 0 ? 'bg-black' : 'bg-red-600'}`}
             >
                <img src={photo.url} alt="" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-90" />
                <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-2 py-1">FIG. {String.fromCharCode(65+i)}</div>
             </div>
           ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-6 font-sans flex flex-col justify-center items-center text-center relative border-[16px] border-[#1a1a1a] select-none">
       <div className="absolute top-0 left-1/2 w-px h-full bg-red-600"></div>
       <div className="absolute top-1/2 left-0 w-full h-px bg-red-600"></div>
       <div className="z-10 bg-[#1a1a1a] text-white p-6 transform -rotate-2 shadow-2xl">
         <p className="text-2xl font-black uppercase leading-tight italic">"{data.summary}"</p>
       </div>
       <div className="z-10 mt-8 bg-red-600 text-white px-4 py-1 text-sm font-bold uppercase tracking-widest">End Report</div>
       {watermark}
    </div>
  );
};

// 3. LO-FI RENDERER
const RenderLoFi = ({ slide, data }) => {
  const paperTexture = "bg-[#fdfbf7]";
  const tapeStyle = "h-4 w-16 bg-yellow-200/80 absolute shadow-sm transform";
  const pencilColor = "text-stone-500";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-handwriting text-stone-400/40 mix-blend-multiply z-20 pointer-events-none">Made by YearInReview Generator</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col justify-center items-center relative text-stone-800 select-none`}>
        <div className={`${tapeStyle} -top-2 left-1/3 -rotate-3`}></div>
        <div className={`${tapeStyle} bottom-10 right-10 bg-pink-200/80 rotate-12`}></div>
        <div className="border border-stone-300 bg-white p-6 shadow-md rotate-2 mb-8 w-full aspect-[4/3] flex flex-col items-center justify-center">
          <div className="text-sm font-sans text-stone-400 mb-2 uppercase tracking-widest">Year In Review</div>
          <h1 className="text-6xl italic font-black text-stone-800 mb-1">{data.year}</h1>
          <div className="w-12 h-1 bg-stone-800 rounded-full"></div>
        </div>
        <div className="text-center relative">
          <h2 className="text-3xl font-bold mb-2 font-sans tracking-tight">{data.title}</h2>
          <p className="font-serif italic text-stone-500 text-lg">"{data.subtitle}"</p>
          <div className="absolute -left-4 top-0 -z-10 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-50"></div>
        </div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col relative select-none`}>
        <div className="text-center mb-8 relative inline-block self-center">
           <span className="relative z-10 text-2xl font-bold italic bg-pink-100 px-4 py-1 transform -rotate-1 inline-block border border-stone-200 shadow-sm">The Collection</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`bg-white p-3 shadow-md border border-stone-100 flex flex-col items-center justify-center aspect-square ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}>
              <div className="w-8 h-3 bg-blue-200/50 absolute -top-1.5 opacity-80"></div>
              <div className="text-stone-700 w-6 h-6 mb-1">{ICON_MAP[stat.icon]}</div>
              <div className="text-3xl font-bold font-sans text-stone-800">{stat.value}</div>
              <div className="text-xs font-serif italic text-stone-500 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden select-none`}>
         <h3 className="text-5xl font-sans font-black text-stone-200 absolute -right-4 top-10 rotate-90 z-0 select-none">MOMENTS</h3>
         <div className="relative z-10 space-y-6 mt-4">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`bg-white p-4 shadow-sm border border-stone-200 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
               <div className="flex items-center gap-2 mb-2 border-b border-stone-100 pb-2">
                 <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                 <h4 className="font-bold font-sans text-sm uppercase tracking-wide text-stone-800">{h.title}</h4>
               </div>
               <p className="text-stone-600 italic leading-snug">{h.desc}</p>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    // Scale down items if there are many to ensure they fit in the frame
    const itemWidth = photoCount > 4 ? 'w-24' : 'w-32';
    
    return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden select-none flex flex-col items-center justify-center`}>
         <div className="flex flex-wrap justify-center content-center gap-4 h-full w-full">
           {data.photos.map((photo, i) => (
             <div 
              key={photo.id} 
              className={`bg-white p-2 pb-6 shadow-md border border-stone-200 relative ${itemWidth} ${i % 2 === 0 ? 'rotate-3' : '-rotate-2'} ${i % 3 === 0 ? 'z-10' : ''}`}
              style={{ zIndex: i }}
             >
                <div className={`${tapeStyle} -top-2 left-1/2 -translate-x-1/2 ${i%2===0 ? 'bg-blue-200/60' : 'bg-yellow-200/60'}`}></div>
                <div className="aspect-square bg-stone-100 overflow-hidden filter sepia-[.2]">
                   <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
             </div>
           ))}
         </div>
         <Star className={`absolute bottom-8 right-8 w-6 h-6 ${pencilColor} animate-pulse`} />
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
      <div className="bg-white p-8 shadow-xl rotate-1 border-8 border-white relative">
         <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-stone-200 border-l-transparent"></div>
         <p className="text-xl leading-relaxed italic text-stone-800 mb-4">{data.summary}</p>
         <div className="flex justify-center gap-1 text-stone-400">
           <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
         </div>
      </div>
      <div className="mt-12 font-handwriting text-stone-500 transform -rotate-6">See you next year...</div>
      {watermark}
    </div>
  );
};

// 4. CYBERPUNK NEON RENDERER
const RenderNeon = ({ slide, data }) => {
  const bgStyle = "bg-slate-950";
  const textPrimary = "text-cyan-400";
  const textSecondary = "text-fuchsia-500";
  const borderStyle = `border-2 border-cyan-500/50 shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-slate-900/50 backdrop-blur-md`;
  const glowText = "drop-shadow-[0_0_5px_rgba(0,255,255,0.7)]";
  const glowTextSecondary = "drop-shadow-[0_0_5px_rgba(217,70,239,0.7)]";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.2em] text-cyan-500/30 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
      <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative overflow-hidden select-none`}>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.1),transparent_70%)]"></div>
        <div className={`text-sm font-bold uppercase tracking-[0.2em] ${textSecondary} mb-4 animate-pulse ${glowTextSecondary}`}>:: SYSTEM_BOOT :: v.2025.1</div>
        <h1 className={`text-7xl font-black tracking-tighter leading-none mb-2 ${textPrimary} ${glowText}`}>{data.year}</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full mb-6 shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
        <h2 className={`text-2xl font-bold uppercase tracking-tight text-white mb-2 ${glowText}`}>{data.title}</h2>
        <p className={`text-lg ${textPrimary} font-medium text-center opacity-80`}>[{data.subtitle}]</p>
        <div className="mt-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
          <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping delay-150"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping delay-300"></div>
        </div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col relative overflow-hidden select-none`}>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <h3 className={`text-xl font-bold uppercase mb-8 ${textSecondary} flex items-center gap-2 ${glowTextSecondary}`}><Activity className="w-5 h-5 animate-pulse" /> Neural Net Stats</h3>
        <div className="grid grid-cols-2 gap-4 z-10">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`${borderStyle} p-4 flex flex-col items-center justify-center aspect-square rounded-lg relative overflow-hidden group`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className={`w-8 h-8 mb-2 ${textSecondary} group-hover:scale-110 transition-transform ${glowTextSecondary}`}>{ICON_MAP[stat.icon]}</div>
              <div className={`text-3xl font-black ${textPrimary} ${glowText}`}>{stat.value}</div>
              <div className={`text-[10px] uppercase tracking-wider text-white opacity-70`}>{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${bgStyle} p-6 font-sans relative overflow-hidden flex flex-col`}>
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
         <h3 className={`text-xl font-bold uppercase mb-8 ${textPrimary} ${glowText} flex items-center gap-2`}><Zap className="w-5 h-5" /> Core Memory Units</h3>
         <div className="flex-1 space-y-6 z-10">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`${borderStyle} p-4 rounded-lg relative`}>
               <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-cyan-500 to-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]`}></div>
               <div className={`font-bold uppercase text-sm mb-1 ${textSecondary} ${glowTextSecondary}`}>// {h.title}</div>
               <div className={`text-sm leading-snug text-white opacity-90`}>{h.desc}</div>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-cols-1 grid-rows-2'; 
    if (photoCount >= 3) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className={`h-full ${bgStyle} p-6 font-sans relative overflow-hidden flex flex-col`}>
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
         <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_60%)]"></div>
         <h3 className={`text-xl font-bold uppercase mb-8 ${textSecondary} ${glowTextSecondary} flex items-center gap-2`}>
           <Camera className="w-5 h-5" /> VISUAL_LOGS
         </h3>
         
         <div className={`grid gap-4 h-full pb-8 w-full ${gridClass}`}>
           {data.photos.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`relative rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.2)] group ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
              >
                <div className="absolute inset-0 bg-cyan-900/20 z-10 group-hover:bg-transparent transition-colors"></div>
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 text-[10px] text-cyan-400 font-mono z-20">IMG_{i+1}.RAW</div>
             </div>
           ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${bgStyle} p-8 font-sans flex flex-col justify-center items-center text-center relative overflow-hidden select-none`}>
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
       <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.15),transparent_60%)] animate-pulse"></div>
       <div className={`${borderStyle} p-6 rounded-xl relative z-10`}>
         <Terminal className={`w-8 h-8 mb-4 mx-auto ${textPrimary} ${glowText}`} />
         <p className={`text-xl font-bold leading-relaxed text-white italic ${glowText}`}>"{data.summary}"</p>
       </div>
       <div className={`mt-8 text-xs font-bold uppercase tracking-[0.2em] ${textSecondary} animate-pulse ${glowTextSecondary}`}>End of Line_</div>
       {watermark}
    </div>
  );
};

// 5. MODERN MINIMALIST RENDERER
const RenderMinimal = ({ slide, data }) => {
  const bgStyle = "bg-stone-50";
  const textPrimary = "text-stone-900";
  const textSecondary = "text-stone-500";
  const watermark = <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.2em] text-stone-400/30 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
        <div className="absolute top-8 font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-400">The Annual Review</div>
        <h1 className={`text-8xl font-light tracking-tight leading-none mb-4 ${textPrimary}`}>{data.year}</h1>
        <div className="w-16 h-px bg-stone-300 mb-8"></div>
        <h2 className={`text-2xl font-normal uppercase tracking-widest ${textPrimary} mb-2`}>{data.title}</h2>
        <p className={`text-lg ${textSecondary} font-light italic`}>{data.subtitle}</p>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
        <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-12 ${textPrimary}`}>Key Figures</h3>
        <div className="grid grid-cols-2 gap-px bg-stone-200 border border-stone-200">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`bg-white p-6 flex flex-col items-center justify-center aspect-square`}>
              <div className={`text-4xl font-light ${textPrimary} mb-2`}>{stat.value}</div>
              <div className={`text-xs font-sans font-bold uppercase tracking-widest ${textSecondary}`}>{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
         <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-12 ${textPrimary}`}>Highlights</h3>
         <div className="flex-1 space-y-8">
           {data.highlights.map((h, i) => (
             <div key={h.id} className="text-center">
               <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">0{i+1}.</div>
               <h4 className={`text-lg font-normal uppercase tracking-wide mb-2 ${textPrimary}`}>{h.title}</h4>
               <p className={`text-sm leading-relaxed ${textSecondary} font-light italic px-4`}>{h.desc}</p>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-rows-2'; 
    if (photoCount >= 3) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
         <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-8 ${textPrimary}`}>Gallery</h3>
         <div className={`grid gap-2 h-full pb-8 w-full ${gridClass}`}>
           {data.photos.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`bg-stone-200 overflow-hidden ${photoCount === 3 && i === 0 ? 'col-span-2' : ''}`}
              >
                <img src={photo.url} alt="" className="w-full h-full object-cover opacity-90" />
              </div>
           ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${bgStyle} p-12 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-stone-300"></div>
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-stone-300"></div>
       <p className={`text-2xl leading-relaxed font-light italic ${textPrimary} mb-8`}>"{data.summary}"</p>
       <div className={`font-sans text-xs font-bold uppercase tracking-[0.2em] ${textSecondary}`}>Fin.</div>
       {watermark}
    </div>
  );
};

// 6. HAND-DRAWN JOURNAL RENDERER
const RenderJournal = ({ slide, data }) => {
  const paperTexture = "bg-[#fcfaf2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]";
  const tapeStyle = "h-4 w-16 bg-yellow-200/80 absolute shadow-sm transform";
  const penColor = "text-amber-900";
  const pencilColor = "text-slate-500";
  const highlightColor = "bg-yellow-200/50";
  const sketchBorder = "border-2 border-dashed border-amber-900/50";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-handwriting text-amber-900/30 z-20 pointer-events-none">Made by YearInReview Generator</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col justify-center items-center relative select-none`}>
        <Star className={`absolute top-10 left-10 w-8 h-8 ${pencilColor} opacity-50 animate-spin-slow`} />
        <Heart className={`absolute bottom-16 right-10 w-6 h-6 ${pencilColor} opacity-50`} />
        <div className={`relative z-10 text-center transform -rotate-1`}>
          <div className={`font-handwriting text-2xl ${pencilColor} mb-2`}>My Year in Review...</div>
          <div className="relative inline-block">
            <span className={`absolute inset-0 ${highlightColor} transform -skew-y-2 rounded-sm`}></span>
            <h1 className={`relative text-7xl font-black ${penColor} tracking-tighter leading-none mb-2`}>{data.year}</h1>
          </div>
        </div>
        <div className={`mt-8 text-center relative z-10`}>
          <h2 className={`text-3xl font-bold ${penColor} mb-2 font-handwriting underline decoration-wavy decoration-amber-500/50`}>{data.title}</h2>
          <p className={`text-lg ${pencilColor} font-handwriting italic`}>"{data.subtitle}"</p>
        </div>
        <div className={`absolute bottom-8 font-handwriting text-sm ${pencilColor}`}>( drawings by me )</div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col relative select-none`}>
        <h3 className={`text-2xl font-bold text-center mb-8 ${penColor} font-handwriting underline decoration-2 decoration-amber-500/30`}>Some Numbers I Tracked</h3>
        <div className="grid grid-cols-2 gap-6">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`p-4 flex flex-col items-center justify-center aspect-square relative ${idx%2 ? 'rotate-1' : '-rotate-1'}`}>
              <div className={`absolute inset-0 ${sketchBorder} rounded-lg`}></div>
              <div className="w-10 h-10 mb-2 relative flex items-center justify-center">
                 <div className="absolute inset-0 border-2 border-amber-900/30 rounded-full transform rotate-3"></div>
                 <div className={`relative z-10 ${penColor}`}>{ICON_MAP[stat.icon]}</div>
              </div>
              <div className={`text-3xl font-black ${penColor} font-handwriting`}>{stat.value}</div>
              <div className={`text-sm ${pencilColor} font-handwriting text-center`}>{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden flex flex-col select-none`}>
         <h3 className={`text-2xl font-bold text-center mb-8 ${penColor} font-handwriting`}>
           <span className="relative inline-block px-2">
             <span className={`absolute inset-0 ${highlightColor} transform skew-x-6 rounded-sm`}></span>
             <span className="relative">Big Moments!</span>
           </span>
         </h3>
         <div className="flex-1 space-y-6 relative z-10">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`p-4 relative ${i%2 ? 'rotate-1' : '-rotate-1'}`}>
               <div className={`absolute inset-0 ${sketchBorder} rounded-md bg-white/50`}></div>
               <div className="relative z-10 flex items-start gap-3">
                 <div className={`font-handwriting text-lg font-bold ${pencilColor}`}>#{i+1}</div>
                 <div>
                  <h4 className={`font-bold ${penColor} font-handwriting text-lg mb-1`}>{h.title}</h4>
                  <p className={`text-sm leading-snug ${pencilColor} font-handwriting`}>{h.desc}</p>
                 </div>
               </div>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    // Scale down items if there are many to ensure they fit in the frame
    const itemWidth = photoCount > 4 ? 'w-24' : 'w-32';
    
    return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden select-none flex flex-col items-center justify-center`}>
         <div className="flex flex-wrap justify-center content-center gap-4 h-full w-full">
           {data.photos.map((photo, i) => (
             <div 
              key={photo.id} 
              className={`bg-white p-2 pb-6 shadow-md border border-stone-200 relative ${itemWidth} ${i % 2 === 0 ? 'rotate-3' : '-rotate-2'} ${i % 3 === 0 ? 'z-10' : ''}`}
              style={{ zIndex: i }}
             >
                <div className={`${tapeStyle} -top-2 left-1/2 -translate-x-1/2 ${i%2===0 ? 'bg-blue-200/60' : 'bg-yellow-200/60'}`}></div>
                <div className="aspect-square bg-stone-100 overflow-hidden filter sepia-[.2]">
                   <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
             </div>
           ))}
         </div>
         <Star className={`absolute bottom-8 right-8 w-6 h-6 ${pencilColor} animate-pulse`} />
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
      <div className="bg-white p-8 shadow-xl rotate-1 border-8 border-white relative">
         <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-stone-200 border-l-transparent"></div>
         <p className="text-xl leading-relaxed italic text-stone-800 mb-4">{data.summary}</p>
         <div className="flex justify-center gap-1 text-stone-400">
           <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
         </div>
      </div>
      <div className="mt-12 font-handwriting text-stone-500 transform -rotate-6">See you next year...</div>
      {watermark}
    </div>
  );
};

// 7. GLASSMORPHISM RENDERER
const RenderGlass = ({ slide, data }) => {
  const bgStyle = "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500";
  const glassCard = "backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg text-white";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-medium uppercase tracking-widest text-white/50 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-sans flex flex-col justify-center items-center text-center relative select-none overflow-hidden`}>
      <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className={`${glassCard} p-8 rounded-3xl w-full flex flex-col items-center gap-4`}>
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Recap</div>
        <h1 className="text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{data.year}</h1>
        <div className="w-12 h-1 bg-white/50 rounded-full"></div>
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-white/80">{data.subtitle}</p>
      </div>
      {watermark}
    </div>
  );

  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col relative select-none overflow-hidden`}>
      <div className="absolute top-[20%] right-[-10%] w-[200px] h-[200px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-md">My Stats</h3>
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {data.stats.map(stat => (
          <div key={stat.id} className={`${glassCard} p-4 rounded-2xl flex flex-col items-center justify-center aspect-square`}>
            <div className="w-8 h-8 mb-2 text-white drop-shadow">{ICON_MAP[stat.icon]}</div>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none overflow-hidden`}>
      <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-md">Highlights</h3>
      <div className="space-y-4 relative z-10">
        {data.highlights.map((h, i) => (
          <div key={h.id} className={`${glassCard} p-5 rounded-2xl`}>
            <h4 className="text-lg font-bold mb-1">{h.title}</h4>
            <p className="text-sm text-white/90 leading-snug">{h.desc}</p>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-rows-2'; 
    if (photoCount > 2) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col relative select-none overflow-hidden`}>
        <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Gallery</h3>
        <div className={`grid gap-3 flex-1 w-full ${gridClass}`}>
          {data.photos.map((photo, i) => (
            <div 
              key={photo.id} 
              className={`${glassCard} p-1 overflow-hidden relative rounded-xl ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
            >
               <img src={photo.url} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
        {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${bgStyle} p-8 font-sans flex flex-col justify-center items-center text-center relative select-none overflow-hidden`}>
      <div className={`${glassCard} p-8 rounded-3xl`}>
        <p className="text-xl font-medium leading-relaxed italic">"{data.summary}"</p>
      </div>
      {watermark}
    </div>
  );
};

// 8. NEO-BRUTALISM RENDERER
const RenderBrutal = ({ slide, data }) => {
  const bgStyle = "bg-[#FFFDF5]";
  const cardStyle = "bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-tighter bg-black text-white px-2 py-1 transform -rotate-2 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative select-none`}>
      <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-400 rounded-full border-4 border-black"></div>
      <div className={`${cardStyle} p-8 w-full rotate-2 mb-8`}>
        <h1 className="text-8xl font-black text-black leading-[0.8]">{data.year}</h1>
      </div>
      <div className="bg-purple-400 border-4 border-black p-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black text-white uppercase">{data.title}</h2>
      </div>
      <p className="mt-8 font-bold text-xl text-center max-w-xs">{data.subtitle}</p>
      {watermark}
    </div>
  );

  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none`}>
      <h3 className="text-4xl font-black text-black mb-8 underline decoration-wavy decoration-4 decoration-purple-500">STATS_</h3>
      <div className="grid grid-cols-2 gap-6">
        {data.stats.map((stat, i) => (
          <div key={stat.id} className={`${cardStyle} p-4 flex flex-col items-center justify-center aspect-square hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}>
            <div className="w-10 h-10 mb-2 text-black">{ICON_MAP[stat.icon]}</div>
            <div className="text-4xl font-black">{stat.value}</div>
            <div className="text-xs font-bold uppercase bg-yellow-300 px-2 border-2 border-black">{stat.label}</div>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none`}>
      <h3 className="text-4xl font-black text-black mb-8 bg-green-400 border-4 border-black inline-block p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">WINS</h3>
      <div className="space-y-6">
        {data.highlights.map((h, i) => (
          <div key={h.id} className={`${cardStyle} p-4`}>
            <h4 className="text-xl font-black uppercase mb-1 bg-pink-300 inline-block px-1 border-2 border-black">{h.title}</h4>
            <p className="text-black font-bold leading-tight mt-2">{h.desc}</p>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-cols-1 grid-rows-2'; 
    if (photoCount >= 3) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className={`h-full ${bgStyle} p-6 font-sans relative select-none flex flex-col`}>
        <h3 className="text-4xl font-black text-black mb-6 italic">PICS</h3>
        <div className={`grid gap-4 flex-1 w-full ${gridClass}`}>
          {data.photos.map((photo, i) => (
            <div key={photo.id} className={`${cardStyle} p-0 overflow-hidden relative ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}>
               <img src={photo.url} alt="" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all" />
            </div>
          ))}
        </div>
        {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${bgStyle} p-8 font-sans flex flex-col justify-center items-center text-center relative select-none`}>
      <div className={`${cardStyle} p-8 bg-blue-400 rotate-1`}>
        <p className="text-2xl font-black text-white leading-tight">"{data.summary}"</p>
      </div>
      {watermark}
    </div>
  );
};

// 9. VAPORWAVE RENDERER
const RenderVapor = ({ slide, data }) => {
  const bgStyle = "bg-gradient-to-b from-fuchsia-900 to-purple-900";
  const gridStyle = "bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[length:40px_40px] perspective-[500px]";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400 z-20 pointer-events-none drop-shadow-[2px_2px_0px_rgba(255,0,255,1)]">Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative select-none overflow-hidden`}>
      <div className={`absolute inset-0 ${gridStyle} opacity-50 transform-gpu rotate-x-12`}></div>
      <div className="w-40 h-40 bg-gradient-to-t from-yellow-400 to-red-500 rounded-full absolute bottom-20 blur-xl opacity-80"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transform -skew-x-12">{data.year}</h1>
        <h2 className="text-2xl text-white font-mono mt-4 uppercase tracking-widest text-shadow-neon">{data.title}</h2>
        <p className="text-pink-300 font-mono text-xs mt-2">{data.subtitle}</p>
      </div>
      {watermark}
    </div>
  );

  // ... (Implementing simplified versions for other slides to save space, but keeping style consistent)
  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden`}>
       <div className={`absolute inset-0 ${gridStyle} opacity-30`}></div>
       <h3 className="text-2xl text-cyan-400 mb-6 relative z-10 italic">A E S T H E T I C S</h3>
       <div className="grid grid-cols-2 gap-4 relative z-10">
         {data.stats.map(stat => (
           <div key={stat.id} className="bg-black/40 border border-pink-500 p-4 backdrop-blur-sm shadow-[4px_4px_0px_rgba(0,255,255,0.5)]">
             <div className="text-pink-400 w-8 h-8 mb-2">{ICON_MAP[stat.icon]}</div>
             <div className="text-2xl text-white font-bold">{stat.value}</div>
             <div className="text-[10px] text-cyan-300 uppercase">{stat.label}</div>
           </div>
         ))}
       </div>
       {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden`}>
       <div className={`absolute inset-0 ${gridStyle} opacity-30`}></div>
       <h3 className="text-2xl text-pink-400 mb-6 relative z-10 uppercase">Memories.exe</h3>
       <div className="space-y-4 relative z-10">
         {data.highlights.map(h => (
           <div key={h.id} className="bg-gradient-to-r from-cyan-900/80 to-purple-900/80 p-4 border-l-4 border-cyan-400">
             <h4 className="text-white font-bold text-lg">{h.title}</h4>
             <p className="text-pink-200 text-sm">{h.desc}</p>
           </div>
         ))}
       </div>
       {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden flex flex-col`}>
       <h3 className="text-2xl text-white mb-6 italic text-center drop-shadow-[2px_2px_0px_#ff00ff]">V I S U A L S</h3>
       <div className={`grid gap-3 flex-1 w-full grid-cols-1 ${data.photos.length > 1 ? 'grid-rows-2' : ''}`}>
          {/* Simplified grid for Vaporwave to keep aesthetic simple/glitchy */}
          <div className="relative border-2 border-pink-500 p-1 shadow-[4px_4px_0px_cyan]">
             <img src={data.photos[0].url} alt="" className="w-full h-full object-cover filter hue-rotate-15 contrast-125" />
          </div>
          {data.photos.length > 1 && (
             <div className="relative border-2 border-cyan-500 p-1 shadow-[-4px_4px_0px_magenta]">
                <img src={data.photos[1].url} alt="" className="w-full h-full object-cover filter sepia contrast-125" />
             </div>
          )}
       </div>
       {watermark}
    </div>
  );

  return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col justify-center items-center text-center relative select-none overflow-hidden`}>
       <div className="border-4 border-white p-6 bg-black/50 backdrop-blur-sm shadow-[8px_8px_0px_cyan]">
         <p className="text-xl text-pink-300 leading-relaxed">"{data.summary}"</p>
       </div>
       {watermark}
    </div>
  );
};

// 10. DARK ACADEMIA RENDERER
const RenderAcademia = ({ slide, data }) => {
  const bgStyle = "bg-[#2c241b] text-[#e0d8c3]";
  const watermark = <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-serif uppercase tracking-[0.2em] text-[#e0d8c3]/30 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none border-[12px] border-double border-[#5c4d3c]`}>
      <div className="uppercase tracking-[0.3em] text-xs text-[#8a7e68] mb-4">Volume MMXXV</div>
      <h1 className="text-7xl font-bold text-[#d4af37] mb-2">{data.year}</h1>
      <div className="w-full h-px bg-[#5c4d3c] my-6"></div>
      <h2 className="text-3xl italic">{data.title}</h2>
      <p className="text-[#8a7e68] mt-2 text-sm">{data.subtitle}</p>
      {watermark}
    </div>
  );
  
  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
      <h3 className="text-2xl text-[#d4af37] border-b border-[#5c4d3c] pb-2 mb-8 italic">Index Rerum</h3>
      <div className="space-y-6">
        {data.stats.map(stat => (
          <div key={stat.id} className="flex items-center justify-between">
            <span className="text-[#8a7e68] uppercase text-xs tracking-widest">{stat.label}</span>
            <span className="text-3xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  // ... Keeping Academia minimal for brevity in this large file
  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
      <h3 className="text-2xl text-[#d4af37] border-b border-[#5c4d3c] pb-2 mb-8 italic">Chronicles</h3>
      <div className="space-y-8">
        {data.highlights.map((h, i) => (
          <div key={h.id}>
            <span className="text-[#d4af37] text-xl font-bold mr-2">§ {i+1}</span>
            <h4 className="inline text-lg font-bold">{h.title}</h4>
            <p className="text-[#8a7e68] mt-1 text-sm leading-relaxed pl-8">{h.desc}</p>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
       <h3 className="text-2xl text-[#d4af37] mb-6 italic text-center">Plates</h3>
       <div className="grid grid-cols-1 gap-6 h-full pb-8">
          {data.photos.slice(0, 2).map((photo, i) => (
             <div key={photo.id} className="border-[8px] border-[#e0d8c3] shadow-xl overflow-hidden h-40">
                <img src={photo.url} alt="" className="w-full h-full object-cover sepia-[.6] contrast-125" />
             </div>
          ))}
       </div>
       {watermark}
    </div>
  );

  return (
    <div className={`h-full ${bgStyle} p-12 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
       <div className="italic text-xl text-[#d4af37] leading-loose">
         "{data.summary}"
       </div>
       <div className="mt-8 text-xs text-[#8a7e68] uppercase tracking-widest">— Finis —</div>
       {watermark}
    </div>
  );
};

// 11. POP ART RENDERER
const RenderPop = ({ slide, data }) => {
  const bgStyle = "bg-cyan-300";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase bg-white px-1 z-20 pointer-events-none">Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative select-none overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:10px_10px] opacity-20"></div>
      <div className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_black] rotate-3 mb-6">
        <h1 className="text-8xl font-black text-black leading-none italic">{data.year}!</h1>
      </div>
      <div className="bg-magenta-500 bg-fuchsia-500 text-white p-2 border-4 border-black -rotate-2">
        <h2 className="text-2xl font-bold uppercase">{data.title}</h2>
      </div>
      {watermark}
    </div>
  );
  
  // Simplified for brevity
  if (slide === 1) return (
    <div className={`h-full bg-yellow-300 p-6 font-sans relative select-none`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:10px_10px] opacity-10"></div>
       <h3 className="text-5xl font-black text-black mb-6 italic drop-shadow-[2px_2px_0px_white]">WOW!</h3>
       <div className="grid grid-cols-2 gap-4 relative z-10">
         {data.stats.map(stat => (
           <div key={stat.id} className="bg-white border-4 border-black p-2 shadow-[4px_4px_0px_black] rounded-full aspect-square flex flex-col items-center justify-center">
             <div className="text-3xl font-black">{stat.value}</div>
             <div className="text-[10px] font-bold uppercase">{stat.label}</div>
           </div>
         ))}
       </div>
       {watermark}
    </div>
  );

  return <RenderRetro slide={slide} data={data} />; // Fallback for brevity
};

// 12. BLUEPRINT RENDERER
const RenderBlueprint = ({ slide, data }) => {
  const bgStyle = "bg-[#003399] text-white";
  const grid = "bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]";
  const watermark = <div className="absolute bottom-2 right-2 text-[8px] font-mono border border-white/50 px-2 py-1 z-20 pointer-events-none">DWG: Made by YearInReview Generator</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col justify-center relative select-none`}>
      <div className={`absolute inset-0 ${grid}`}></div>
      <div className="border-4 border-white p-6 relative z-10">
        <div className="absolute top-0 left-0 bg-white text-[#003399] px-2 text-xs font-bold">FIG 1.0</div>
        <h1 className="text-6xl font-bold mb-4">{data.year}</h1>
        <h2 className="text-xl border-t border-white pt-2">{data.title}</h2>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-white"></div>
      </div>
      {watermark}
    </div>
  );

  return <RenderRetro slide={slide} data={data} />; // Fallback
};


export default function YearInReviewGenerator() {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('yearInReviewData');
      return savedData ? JSON.parse(savedData) : INITIAL_DATA;
    } catch (e) {
      console.error("Failed to load from local storage", e);
      return INITIAL_DATA;
    }
  });
  
  const [currentTheme, setCurrentTheme] = useState('retro'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); 

  const totalSlides = 4; // Normalized for new themes simplicity

  // --- Persistence ---
  useEffect(() => {
    try {
      localStorage.setItem('yearInReviewData', JSON.stringify(data));
      setSaveStatus('Saved');
      const timer = setTimeout(() => setSaveStatus(''), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("Failed to save to local storage", e);
      setSaveStatus('Error saving');
    }
  }, [data]);

  // --- Inject html2canvas ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    script.async = true;
    script.onload = () => console.log("html2canvas loaded");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // --- Handlers ---
  const handleInputChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };
  
  const addStat = () => {
    if (data.stats.length < 6) {
      setData(prev => ({
        ...prev,
        stats: [...prev.stats, { id: Date.now(), label: 'New Stat', value: '0', icon: 'star' }]
      }));
    }
  };

  const removeStat = (id) => {
    if (data.stats.length > 2) {
      setData(prev => ({
        ...prev,
        stats: prev.stats.filter(s => s.id !== id)
      }));
    }
  };

  const handleHighlightChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      highlights: prev.highlights.map(h => h.id === id ? { ...h, [field]: value } : h)
    }));
  };

  const addHighlight = () => {
    if (data.highlights.length < 4) {
      setData(prev => ({
        ...prev,
        highlights: [...prev.highlights, { id: Date.now(), title: 'New Highlight', desc: 'Description here.' }]
      }));
    }
  };

  const removeHighlight = (id) => {
    if (data.highlights.length > 2) {
      setData(prev => ({
        ...prev,
        highlights: prev.highlights.filter(h => h.id !== id)
      }));
    }
  };

  const handlePhotoUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          photos: prev.photos.map(p => p.id === id ? { ...p, url: reader.result } : p)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = () => {
    if (data.photos.length < 6) {
      const placeholders = [
         'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=500',
         'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=500',
         'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=500'
      ];
      const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
      
      setData(prev => ({
        ...prev,
        photos: [...prev.photos, { id: Date.now(), url: randomPlaceholder, caption: 'New Memory' }]
      }));
    }
  };

  const removePhoto = (id) => {
    if (data.photos.length > 2) {
      setData(prev => ({
        ...prev,
        photos: prev.photos.filter(p => p.id !== id)
      }));
    }
  };

  const resetData = () => {
    if (confirm("Are you sure you want to reset all data to the default template? This cannot be undone.")) {
      setData(INITIAL_DATA);
      localStorage.removeItem('yearInReviewData');
    }
  };

// Inside your main component function, before the return:
useEffect(() => {
  ReactGA.initialize("G-E8TW7JKQYT");
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}, []);
const handleDownload = () => {
  // ... existing download logic ...
  ReactGA.event({
    category: "User Action",
    action: "Download Slide",
    label: `Theme: ${currentTheme}`
  });
};

  const generateQuote = () => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    handleInputChange('summary', randomQuote);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleCleanMode = () => {
    setIsCleanMode(!isCleanMode);
  };

  const handleDownload = () => {
    const element = document.getElementById('preview-capture-area'); 
    if (window.html2canvas && element) {
      setIsDownloading(true);
      window.html2canvas(element, {
        scale: 2, 
        backgroundColor: null, 
        useCORS: true 
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `year-in-review-slide-${currentSlide + 1}.png`;
        link.href = canvas.toDataURL();
        link.click();
        setIsDownloading(false);
      });
    }
  };

  const renderContent = () => {
    switch(currentTheme) {
      case 'retro': return <RenderRetro slide={currentSlide} data={data} />;
      case 'swiss': return <RenderSwiss slide={currentSlide} data={data} />;
      case 'lofi': return <RenderLoFi slide={currentSlide} data={data} />;
      case 'neon': return <RenderNeon slide={currentSlide} data={data} />;
      case 'minimal': return <RenderMinimal slide={currentSlide} data={data} />;
      case 'journal': return <RenderJournal slide={currentSlide} data={data} />;
      case 'glass': return <RenderGlass slide={currentSlide} data={data} />;
      case 'brutal': return <RenderBrutal slide={currentSlide} data={data} />;
      case 'vapor': return <RenderVapor slide={currentSlide} data={data} />;
      case 'academia': return <RenderAcademia slide={currentSlide} data={data} />;
      case 'pop': return <RenderPop slide={currentSlide} data={data} />;
      case 'blueprint': return <RenderBlueprint slide={currentSlide} data={data} />;
      default: return <RenderRetro slide={currentSlide} data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
      
      {/* --- LEFT PANEL: EDITOR --- */}
      <div className={`w-full lg:w-1/2 p-6 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white shadow-xl z-20 h-auto lg:h-full transition-opacity duration-300 ${isCleanMode ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-xl mx-auto pb-20">
          <header className="mb-8 border-b pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900">
                <RefreshCw className="text-indigo-600" /> RECAP GENERATOR
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Turn your year into a visual story.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
               <button 
                 onClick={resetData}
                 className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
               >
                 <RotateCcw className="w-3 h-3" /> Reset Data
               </button>
               {saveStatus && (
                 <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider animate-pulse flex items-center gap-1">
                   <Save className="w-3 h-3" /> {saveStatus}
                 </span>
               )}
            </div>
          </header>
          <section className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Palette className="w-4 h-4" /> 1. Choose Vibe</h3>
            <div className="grid grid-cols-3 gap-4">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                    currentTheme === t.id 
                    ? 'border-indigo-600 ring-4 ring-indigo-50 bg-indigo-50/50' 
                    : 'border-slate-100 hover:border-slate-300 bg-white shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mb-3 ${t.color} shadow-sm group-hover:scale-110 transition-transform`}></div>
                  <div className="font-bold text-slate-800">{t.name}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">{t.vibe}</div>
                </button>
              ))}
            </div>
          </section>
          
          <section className="mb-10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Type className="w-4 h-4" /> 2. Core Info</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                <input type="text" value={data.year} onChange={(e) => handleInputChange('year', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1">Theme Title</label>
                <input type="text" value={data.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Subtitle / Metaphor</label>
              <input type="text" value={data.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
          </section>

          {/* STATS SECTION */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Activity className="w-4 h-4" /> 3. The Numbers</h3>
               <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{data.stats.length} / 6</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {data.stats.map((stat) => (
                <div key={stat.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
                  <button 
                    onClick={() => removeStat(stat.id)}
                    disabled={data.stats.length <= 2}
                    className="absolute bottom-2 right-2 p-1 text-slate-300 hover:text-red-500 disabled:opacity-0 transition-colors z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex justify-between mb-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">{ICON_MAP[stat.icon]}</div>
                    <select value={stat.icon} onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)} className="text-xs bg-transparent text-slate-400 font-medium outline-none cursor-pointer hover:text-indigo-600">
                      {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                  <input type="text" placeholder="Value" value={stat.value} onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)} className="w-full mb-1 text-xl font-bold border-none p-0 focus:ring-0 placeholder:text-slate-300"/>
                  <input type="text" placeholder="Label" value={stat.label} onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)} className="w-full text-xs font-medium text-slate-500 border-none p-0 focus:ring-0 placeholder:text-slate-300 pr-6"/>
                </div>
              ))}
            </div>
            {data.stats.length < 6 && (
              <button onClick={addStat} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold uppercase hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            )}
          </section>

          {/* HIGHLIGHTS SECTION */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Layout className="w-4 h-4" /> 4. Highlights</h3>
               <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{data.highlights.length} / 4</span>
            </div>
            <div className="space-y-4 mb-4">
              {data.highlights.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm relative group">
                   <button 
                    onClick={() => removeHighlight(item.id)}
                    disabled={data.highlights.length <= 2}
                    className="absolute top-4 right-4 p-1 text-slate-300 hover:text-red-500 disabled:opacity-0 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                   <input type="text" value={item.title} onChange={(e) => handleHighlightChange(item.id, 'title', e.target.value)} className="w-full mb-2 text-sm font-bold border-b border-slate-100 pb-2 focus:border-indigo-500 outline-none pr-8" placeholder="Highlight Title"/>
                  <textarea value={item.desc} onChange={(e) => handleHighlightChange(item.id, 'desc', e.target.value)} className="w-full text-xs text-slate-600 resize-none outline-none h-12" placeholder="Description"/>
                </div>
              ))}
            </div>
            {data.highlights.length < 4 && (
              <button onClick={addHighlight} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold uppercase hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            )}
          </section>

          {/* PHOTOS SECTION */}
          <section className="mb-10">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> 5. Photo Gallery</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{data.photos.length} / 6</span>
             </div>
             
             <div className="grid grid-cols-3 gap-4 mb-4">
                {data.photos.map((photo) => (
                   <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={photo.url} alt="User Upload" className="w-full h-full object-cover" />
                      
                      {/* Delete Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                        disabled={data.photos.length <= 2}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 disabled:hidden transition-colors z-20"
                      >
                         <Trash2 className="w-3 h-3" />
                      </button>

                      {/* Upload Overlay */}
                      <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-white z-10">
                         <Upload className="w-6 h-6 mb-1" />
                         <span className="text-[10px] uppercase font-bold">Change</span>
                         <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(photo.id, e)} />
                      </label>
                   </div>
                ))}
                
                {data.photos.length < 6 && (
                   <button onClick={addPhoto} className="aspect-square border-2 border-dashed border-slate-200 rounded-lg text-slate-400 flex flex-col items-center justify-center gap-1 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
                      <Plus className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase">Add</span>
                   </button>
                )}
             </div>
             <p className="text-[10px] text-slate-400 mt-2">Tap an image to upload your own.</p>
          </section>

           <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Feather className="w-4 h-4" /> 6. The Summary</h3>
              <button onClick={generateQuote} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-indigo-100 transition-colors">
                <Wand2 className="w-3 h-3" /> Auto-Generate
              </button>
            </div>
            <textarea value={data.summary} onChange={(e) => handleInputChange('summary', e.target.value)} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 text-sm leading-relaxed shadow-sm resize-none" placeholder="Sum up the year..."/>
          </section>

          {/* Site Footer */}
          <div className="text-center text-slate-400 text-xs py-4 border-t border-slate-100">
            <p>
              &copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/fadlyzaki/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-indigo-600 transition-colors">@fadlyzaki</a>. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className="w-full lg:w-1/2 bg-[#0f172a] flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-screen lg:min-h-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-slate-900 to-slate-900 z-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl -top-20 -right-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
            {/* Header Controls - Hidden in Clean Mode */}
            <div className={`flex items-center justify-between w-full max-w-[340px] mb-6 transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Play className="w-3 h-3 text-indigo-400 fill-current" /> Live Preview
                </div>
                <button 
                  onClick={handleDownload} disabled={isDownloading} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                >
                   {isDownloading ? <><RefreshCw className="w-3 h-3 animate-spin" /> Saving...</> : <><Download className="w-3 h-3" /> Save Slide</>}
                </button>
            </div>

            {/* PHONE FRAME */}
            <div className={`relative w-[340px] max-w-full h-[600px] bg-black rounded-[3rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10 transition-transform duration-500 ${isCleanMode ? 'scale-110' : 'scale-100'}`}>
              <div id="preview-capture-area" className="w-full h-full bg-white relative flex flex-col">
                  {/* Story Progress Bars - Kept in Clean Mode (often desired), but can be hidden if preferred. 
                      Let's hide them in clean mode for a pure 'card' look, or keep them for 'story' look. 
                      Keeping them makes it look like a genuine story screenshot. */}
                  <div className="absolute top-0 left-0 right-0 p-3 pt-5 z-50 flex gap-1.5 pointer-events-none">
                  {[0, 1, 2, 3, 4].map(idx => (
                      <div key={idx} className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                          className={`h-full transition-all duration-300 ${
                            currentTheme === 'retro' ? 'bg-emerald-800' : 
                            currentTheme === 'swiss' ? 'bg-red-600' : 
                            currentTheme === 'lofi' ? 'bg-stone-800' :
                            currentTheme === 'neon' ? 'bg-cyan-400' : 
                            currentTheme === 'minimal' ? 'bg-stone-900' :
                            'bg-amber-900'
                          }`}
                          style={{ width: idx <= currentSlide ? '100%' : '0%' }}
                      ></div>
                      </div>
                  ))}
                  </div>

                  {/* Render Selected Theme */}
                  <div className="flex-1 w-full h-full">
                      {renderContent()}
                  </div>

                  {/* Navigation Touch Zones (Hidden in Clean Mode to prevent accidental clicks while screenshotting) */}
                  <div className={`absolute top-0 left-0 w-1/3 h-full z-40 cursor-w-resize active:bg-black/5 transition-colors ${isCleanMode ? 'pointer-events-none' : ''}`} onClick={prevSlide}></div>
                  <div className={`absolute top-0 right-0 w-1/3 h-full z-40 cursor-e-resize active:bg-black/5 transition-colors ${isCleanMode ? 'pointer-events-none' : ''}`} onClick={nextSlide}></div>
              </div>
            </div>

            {/* Footer Controls - Hidden in Clean Mode */}
            <div className={`mt-8 flex gap-6 items-center transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button onClick={prevSlide} className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors shadow-lg border border-slate-700 group">
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="text-slate-500 font-mono text-xs">
                  {currentSlide + 1} / {totalSlides}
              </div>
              <button onClick={nextSlide} className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors shadow-lg border border-slate-700 group">
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Clean Mode Exit Button (Only visible in Clean Mode) */}
            {isCleanMode && (
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                 <button 
                  onClick={toggleCleanMode}
                  className="px-6 py-2 bg-slate-800 text-white rounded-full font-bold uppercase text-xs tracking-wider shadow-xl hover:bg-slate-700 transition-colors flex items-center gap-2"
                 >
                   <Minimize2 className="w-3 h-3" /> Exit Screenshot Mode
                 </button>
               </div>
            )}

            {!isCleanMode && (
              <p className="mt-6 text-slate-500 text-[10px] uppercase tracking-wider opacity-60 flex items-center gap-1">
              <Share2 className="w-3 h-3" /> Use Screenshot Mode to Share
              </p>
            )}
        </div>
      </div>
    </div>
  );
}