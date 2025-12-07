import React, { useState, useEffect, useRef } from 'react';
import ReactGA from "react-ga4"; // Import GA4
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
  Linkedin,
  ShieldCheck,
  SmilePlus,
  HelpCircle,
  X 
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
  duolingo: <Flame className="w-full h-full" />, 
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

// --- Default Labels for Icons (Smart Auto-Fill) ---
const DEFAULT_LABELS = {
  en: {
    coffee: "Coffees",
    book: "Books Read",
    activity: "Workouts",
    zap: "Moments",
    heart: "Kindness",
    work: "Projects",
    music: "Minutes Listened",
    globe: "Countries",
    terminal: "Lines of Code",
    feather: "Words Written",
    phone: "Screen Time",
    camera: "Photos Taken",
    star: "Achievements",
    disc: "Albums",
    duolingo: "Streak Days",
    language: "Languages",
    strava_cycle: "km Cycled",
    strava_run: "km Run",
    gym: "Gym Sessions",
    travel: "Trips",
    gaming: "Hours Played",
    coding: "Commits",
    git: "PRs Merged",
    design: "Designs",
    finance: "Savings",
    spotify: "Top Genre",
    youtube: "Hours Watched",
    food: "New Foods",
    sleep: "Avg Sleep",
    location: "Places",
    social_x: "Tweets",
    social_insta: "Posts",
    social_linked: "Connections"
  },
  id: {
    coffee: "Kopi Diminum",
    book: "Buku Tamat",
    activity: "Olahraga",
    zap: "Momen Seru",
    heart: "Kebaikan",
    work: "Proyek",
    music: "Menit Dengar",
    globe: "Negara",
    terminal: "Baris Kode",
    feather: "Kata Ditulis",
    phone: "Durasi Layar",
    camera: "Foto Diambil",
    star: "Pencapaian",
    disc: "Album",
    duolingo: "Hari Streak",
    language: "Bahasa",
    strava_cycle: "km Sepeda",
    strava_run: "km Lari",
    gym: "Sesi Gym",
    travel: "Perjalanan",
    gaming: "Jam Main",
    coding: "Total Commit",
    git: "PR Merged",
    design: "Desain",
    finance: "Tabungan",
    spotify: "Genre Top",
    youtube: "Jam Nonton",
    food: "Makanan Baru",
    sleep: "Rata-rata Tidur",
    location: "Tempat",
    social_x: "Tweets",
    social_insta: "Postingan",
    social_linked: "Koneksi"
  }
};

// --- Smart Summary Generator ---
const generateSmartSummary = (data, lang) => {
  const stats = data.stats;
  const highlights = data.highlights;
  
  let trait = 'balanced'; 
  const labels = stats.map(s => s.label.toLowerCase());
  const icons = stats.map(s => s.icon);
  
  if (icons.some(i => ['strava_run', 'strava_cycle', 'gym', 'activity'].includes(i)) || labels.some(l => l.includes('run') || l.includes('lari') || l.includes('gym'))) {
    trait = 'active';
  } else if (icons.some(i => ['book', 'feather', 'terminal', 'coding', 'git'].includes(i)) || labels.some(l => l.includes('read') || l.includes('baca') || l.includes('code'))) {
    trait = 'intellectual';
  } else if (icons.some(i => ['coffee'].includes(i)) || labels.some(l => l.includes('coffee') || l.includes('kopi'))) {
    trait = 'caffeinated';
  } else if (icons.some(i => ['travel', 'globe', 'plane', 'location'].includes(i))) {
    trait = 'traveler';
  } else if (icons.some(i => ['gaming', 'gamepad2'].includes(i))) {
    trait = 'gamer';
  }

  const highlight = highlights[0]?.title || (lang === 'en' ? 'unforgettable moments' : 'momen tak terlupakan');
  const statVal = stats[0]?.value || '100';
  const statLab = stats[0]?.label || (lang === 'en' ? 'things' : 'hal');

  const templates = {
    en: {
      active: [
        `2025 was a marathon, not a sprint. You crushed ${statVal} ${statLab} and proved that consistency is key. Keep moving!`,
        `Sweat, grit, and glory. You defined your year by action, clocking in ${statVal} ${statLab}. A true athlete's year.`
      ],
      intellectual: [
        `A year of expanding horizons. From ${statVal} ${statLab} to "${highlight}", you spent 2025 leveling up your mind.`,
        `Quiet moments, loud growth. You dedicated 2025 to learning and creating, proving that "${highlight}" was just the beginning.`
      ],
      caffeinated: [
        `Powered by ${statVal} ${statLab} and big dreams. You stayed awake long enough to make "${highlight}" happen!`,
        `High energy, higher goals. A year fueled by caffeine and ambition. ${statVal} ${statLab} later, you're still standing.`
      ],
      traveler: [
        `Chasing horizons. 2025 was about the journey, exploring new places and collecting ${statVal} ${statLab} along the way.`,
        `The world got a little smaller for you this year. From "${highlight}" to every hidden gem, you truly lived.`
      ],
      gamer: [
        `Level Up! You spent 2025 grinding for greatness. With ${statVal} ${statLab}, you absolutely dominated the game of life.`,
        `Achievement Unlocked: "${highlight}". You played hard and won big this year.`
      ],
      balanced: [
        `2025: A chapter of balance. From "${highlight}" to tracking ${statVal} ${statLab}, you made every moment count.`,
        `Defined by growth. You focused on what matters: ${statVal} ${statLab} and making memories that last.`
      ]
    },
    id: {
      active: [
        `2025 bukan lari cepat, tapi maraton. Dengan ${statVal} ${statLab}, kamu buktikan konsistensi itu kunci. Gas terus!`,
        `Keringat dan perjuangan. Tahun ini kamu definisikan dengan aksi nyata, menuntaskan ${statVal} ${statLab}. Juara!`
      ],
      intellectual: [
        `Tahun memperluas wawasan. Dari ${statVal} ${statLab} hingga "${highlight}", 2025 adalah tahun upgrade diri.`,
        `Tenang tapi menghanyutkan. Kamu habiskan 2025 untuk belajar dan berkarya. "${highlight}" cuma permulaan.`
      ],
      caffeinated: [
        `Ditenagai oleh ${statVal} ${statLab} dan mimpi besar. Kamu terjaga cukup lama untuk mewujudkan "${highlight}"!`,
        `Energi tinggi, target tinggi. Tahun yang didorong kafein dan ambisi. ${statVal} ${statLab} kemudian, kamu masih bertahan.`
      ],
      traveler: [
        `Mengejar cakrawala. 2025 adalah tentang perjalanan, mengoleksi ${statVal} ${statLab} dan kenangan baru.`,
        `Dunia terasa makin kecil buatmu tahun ini. Dari "${highlight}" ke tempat baru lainnya, kamu benar-benar hidup.`
      ],
      gamer: [
        `Level Up! 2025 adalah ajang grinding menuju kejayaan. Dengan ${statVal} ${statLab}, kamu mendominasi permainan hidup.`,
        `Achievement Unlocked: "${highlight}". Kamu main serius dan menang banyak tahun ini.`
      ],
      balanced: [
        `2025: Bab tentang keseimbangan. Dari "${highlight}" hingga mencatat ${statVal} ${statLab}, semua momen berharga.`,
        `Didefinisikan oleh pertumbuhan. Kamu fokus pada yang penting: ${statVal} ${statLab} dan kenangan abadi.`
      ]
    }
  };

  const options = templates[lang][trait];
  return options[Math.floor(Math.random() * options.length)];
};

// --- Translations ---
const TRANSLATIONS = {
  en: {
    // UI - Modern & Editorial Tone
    title: "MY YEAR EDIT", 
    subtitle: "Curate your moments, design your story.",
    reset: "Start Over",
    chooseVibe: "6. Vibe Check",
    scroll: "Scroll",
    coreInfo: "1. The Intro",
    year: "Year",
    themeTitle: "Theme Title",
    metaSubtitle: "Subtitle / Metaphor",
    numbers: "2. The Receipts", 
    highlights: "3. Core Memories", 
    highlightTitle: "Moment Title",
    desc: "Description",
    gallery: "4. Photo Dump",
    change: "Swap",
    add: "Add",
    summary: "5. The Outro",
    autoGen: "Magic Write",
    privacyTitle: "100% Private",
    privacyText: "Your data stays on your device. Nothing is sent to any server.",
    preview: "Preview Story",
    saveSlide: "Save Image",
    saving: "Saving...",
    exitScreenshot: "Exit Capture Mode",
    screenshotHint: "Tap 'Save Image' to download & share to stories",
    madeBy: "made with year-in-review-generator",
    songPlaceholder: "Song Title",
    artistPlaceholder: "Artist Name",
    // Help Modal
    helpTitle: "How to use",
    helpDesc: "Create your own aesthetic year-in-review in minutes.",
    step1: "Fill in your stats & memories",
    step2: "Upload your favorite photos",
    step3: "Choose a visual theme",
    step4: "Save & share to stories",
    close: "Got it, let's go!",
    // Themes
    pressStart: "PRESS START",
    playerStats: "PLAYER_STATS",
    achievements: "ACHIEVEMENTS",
    audioLogs: "AUDIO_LOGS",
    memoryDump: "MEMORY_DUMP",
    endTrans: "END_OF_TRANSMISSION",
    annualReport: "ANNUAL REPORT",
    keyPoints: "KEY POINTS",
    topTracks: "TOP TRACKS",
    endReport: "END REPORT",
    collection: "The Collection",
    moments: "MOMENTS",
    mixtape: "MIXTAPE",
    seeYou: "See you next year...",
    systemBoot: ":: SYSTEM_BOOT ::",
    neuralStats: "NEURAL_STATS",
    coreMem: "CORE_MEMORY",
    visualLogs: "VISUAL_LOGS",
    endLine: "END_OF_LINE_",
    keyFigures: "Key Figures",
    fin: "Fin.",
    someNumbers: "By The Numbers",
    bigMoments: "Big Moments",
    scrapbook: "Scrapbook",
    recap: "RECAP",
    myStats: "MY STATS",
    wins: "WINS",
    pics: "PICS",
    aesthetics: "A E S T H E T I C S",
    memoriesExe: "memories.exe",
    visuals: "V I S U A L S",
    volume: "VOL",
    indexRerum: "INDEX RERUM",
    chronicles: "CHRONICLES",
    plates: "PLATES",
    finis: "— FINIS —",
    wow: "WOW!",
    pow: "POW!",
    snap: "SNAP!",
    fig: "FIG"
  },
  id: {
    // UI - Santai & Personal
    title: "EDISI TAHUNKU",
    subtitle: "Kurasi momenmu, desain ceritamu.",
    reset: "Ulang Awal",
    chooseVibe: "6. Cek Vibe",
    scroll: "Geser",
    coreInfo: "1. Intro Dulu",
    year: "Tahun",
    themeTitle: "Judul Utama",
    metaSubtitle: "Subjudul / Mood",
    numbers: "2. Spill Angka", 
    highlights: "3. Highlight Seru",
    highlightTitle: "Judul Momen",
    desc: "Deskripsi",
    gallery: "4. Dump Foto", 
    change: "Ganti",
    add: "Tambah",
    summary: "5. Pesan & Kesan", 
    autoGen: "Tulis Ajaib",
    privacyTitle: "100% Privat",
    privacyText: "Data kamu aman di perangkat ini. Tidak ada yang dikirim ke server.",
    preview: "Pratinjau",
    saveSlide: "Simpan Gambar",
    saving: "Menyimpan...",
    exitScreenshot: "Keluar Mode Foto",
    screenshotHint: "Ketuk 'Simpan Gambar' untuk share ke story",
    madeBy: "dibuat dengan year-in-review-generator",
    songPlaceholder: "Judul Lagu",
    artistPlaceholder: "Nama Artis",
    // Help Modal
    helpTitle: "Cara Pakai",
    helpDesc: "Bikin rekap tahunan estetikmu dalam hitungan menit.",
    step1: "Isi statistik & kenanganmu",
    step2: "Upload foto-foto favoritmu",
    step3: "Pilih tema visual yang cocok",
    step4: "Simpan & bagikan ke story",
    close: "Siap, gas!",
    // Themes
    pressStart: "TEKAN MULAI",
    playerStats: "STATISTIK_PEMAIN",
    achievements: "PENCAPAIAN",
    memoryDump: "MEMORI_DUMP",
    endTrans: "TRANSMISI SELESAI",
    annualReport: "LAPORAN TAHUNAN",
    keyPoints: "POIN UTAMA",
    topTracks: "LAGU TERATAS",
    endReport: "LAPORAN SELESAI",
    collection: "Koleksi",
    moments: "MOMEN",
    mixtape: "MIXTAPE",
    seeYou: "Sampai jumpa...",
    systemBoot: ":: SISTEM_MULAI ::",
    neuralStats: "STAT_NEURAL",
    coreMem: "MEMORI_INTI",
    visualLogs: "LOG_VISUAL",
    endLine: "AKHIR_BARIS_",
    keyFigures: "Angka Kunci",
    fin: "Selesai.",
    someNumbers: "Dalam Angka",
    bigMoments: "Momen Besar",
    scrapbook: "Buku Kliping",
    recap: "REKAP",
    myStats: "STATISTIKKU",
    wins: "MENANG",
    pics: "FOTO",
    aesthetics: "E S T E T I K A",
    memoriesExe: "memori.exe",
    visuals: "V I S U A L",
    volume: "JILID",
    indexRerum: "INDEKS",
    chronicles: "KRONIK",
    plates: "PELAT",
    finis: "— TAMAT —",
    wow: "WAH!",
    pow: "DUAR!",
    snap: "JEPRET!",
    fig: "GBR"
  }
};

const THEMES = [
  // 1. Retro Group
  { id: 'retro', name: '8-Bit Retro', vibe: 'Nostalgic, Console', color: 'bg-emerald-600' },
  { id: 'terminal', name: 'Hacker Terminal', vibe: 'Matrix, Code', color: 'bg-green-900' },
  { id: 'glitch', name: 'System Error', vibe: 'Distorted, Cyber', color: 'bg-red-700' },
  // ... (Other themes same)
  // 2. Swiss Group
  { id: 'swiss', name: 'Swiss Grid', vibe: 'Bold, Typographic', color: 'bg-red-600' },
  { id: 'monochrome', name: 'Mono Lux', vibe: 'Black & White', color: 'bg-black' },
  { id: 'y2k', name: 'Y2K Chrome', vibe: '2000s, Liquid', color: 'bg-blue-700' },

  // 3. LoFi Group
  { id: 'lofi', name: 'Lo-Fi Scrapbook', vibe: 'Cozy, Polaroid', color: 'bg-stone-400' },
  { id: 'botanical', name: 'Botanical', vibe: 'Nature, Organic', color: 'bg-green-700' },
  { id: 'boho', name: 'Boho Earth', vibe: 'Warm, Clay', color: 'bg-orange-800' },

  // 4. Neon Group
  { id: 'neon', name: 'Cyberpunk Neon', vibe: 'Glowing, Dark', color: 'bg-fuchsia-500' },
  { id: 'midnight', name: 'Midnight', vibe: 'Deep Space, Stars', color: 'bg-indigo-950' },

  // 5. Minimal Group
  { id: 'minimal', name: 'Modern Minimalist', vibe: 'Clean, Editorial', color: 'bg-slate-800' },
  { id: 'corporate', name: 'Tech Corp', vibe: 'Professional, Blue', color: 'bg-blue-600' },
  { id: 'warm', name: 'Warm Beige', vibe: 'Soft, Neutral', color: 'bg-[#e5e0d8]' },

  // 6. Journal Group
  { id: 'journal', name: 'Hand-Drawn', vibe: 'Sketchy, Notebook', color: 'bg-amber-600' },
  { id: 'newspaper', name: 'The Daily News', vibe: 'Vintage Press', color: 'bg-gray-400' },

  // 7. Glass Group
  { id: 'glass', name: 'Glassmorphism', vibe: 'Frosted, Gradient', color: 'bg-indigo-400' },
  { id: 'pastel', name: 'Pastel Dream', vibe: 'Soft, Candy', color: 'bg-pink-300' },
  { id: 'aura', name: 'Aura Blur', vibe: 'Abstract, Haze', color: 'bg-violet-400' },

  // 8. Brutal Group
  { id: 'brutal', name: 'Neo-Brutalism', vibe: 'Raw, Contrast', color: 'bg-yellow-400' },
  { id: 'bauhaus', name: 'Bauhaus', vibe: 'Geometric, Art', color: 'bg-blue-500' },

  // 9. Vapor Group
  { id: 'vapor', name: 'Vaporwave', vibe: 'Retro-future, Pink', color: 'bg-pink-500' },
  { id: 'synth', name: 'Synthwave', vibe: 'Sunset, Grid', color: 'bg-purple-700' },

  // 10. Others
  { id: 'academia', name: 'Dark Academia', vibe: 'Classic, Serif', color: 'bg-stone-700' },
  { id: 'blueprint', name: 'Blueprint', vibe: 'Technical, Blue', color: 'bg-blue-800' },
  { id: 'pop', name: 'Pop Art', vibe: 'Comic, Halftone', color: 'bg-cyan-400' }
];

// --- Initial Data (Templates - Music Removed) ---
const TEMPLATES = {
  en: {
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
      { id: 1, title: 'Career Milestone', desc: 'Started a new role and shipped my first major project.', emoji: '🚀' },
      { id: 2, title: 'Travel Goal', desc: 'Finally visited Japan during cherry blossom season.', emoji: '🌸' },
      { id: 3, title: 'New Hobby', desc: 'Learned photography and actually used manual mode.', emoji: '📸' }
    ],
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500', caption: 'Big Wins' },
      { id: 2, url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=500', caption: 'Vibes' },
      { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500', caption: 'Adventure' }
    ]
  },
  id: {
    year: '2025',
    title: 'Tahun Bertumbuh',
    subtitle: 'Membangun Pondasi',
    summary: "Tahun yang didefinisikan bukan oleh tujuan, tapi perjalanannya. Langkah kecil, usaha konsisten, dan kejutan di sepanjang jalan.",
    stats: [
      { id: 1, label: 'Buku Tamat', value: '12', icon: 'book' },
      { id: 2, label: 'Hari Streak', value: '365', icon: 'duolingo' },
      { id: 3, label: 'km Lari', value: '150', icon: 'strava_run' },
      { id: 4, label: 'Total Commit', value: '840', icon: 'git' }
    ],
    highlights: [
      { id: 1, title: 'Karir Baru', desc: 'Memulai peran baru dan menyelesaikan proyek besar pertama.', emoji: '🚀' },
      { id: 2, title: 'Liburan Impian', desc: 'Akhirnya mengunjungi Jepang saat musim sakura.', emoji: '🌸' },
      { id: 3, title: 'Hobi Baru', desc: 'Belajar fotografi dan akhirnya paham mode manual.', emoji: '📸' }
    ],
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500', caption: 'Big Wins' },
      { id: 2, url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=500', caption: 'Vibes' },
      { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500', caption: 'Adventure' }
    ]
  }
};

// --- RENDERERS ---

// 1. RETRO RENDERER
const RenderRetro = ({ slide, data, themeId, t }) => {
  const isTerminal = themeId === 'terminal';
  const isGlitch = themeId === 'glitch';

  let bgColor = "bg-emerald-100";
  let textColor = "text-emerald-900";
  let borderColor = "border-emerald-900";
  let watermarkColor = "text-emerald-900/30";

  if (isTerminal) {
    bgColor = "bg-black";
    textColor = "text-green-500";
    borderColor = "border-green-500";
    watermarkColor = "text-green-500/30";
  } else if (isGlitch) {
    bgColor = "bg-zinc-900";
    textColor = "text-red-500";
    borderColor = "border-red-500";
    watermarkColor = "text-red-500/30";
  }

  const borderStyle = `border-4 ${borderColor} ${bgColor} ${textColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]`;
  const watermark = <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] font-mono uppercase ${watermarkColor} z-20 pointer-events-none`}>{t.madeBy}</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${bgColor} p-6 font-mono flex flex-col justify-between relative overflow-hidden select-none`}>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        <div className={`text-xs uppercase tracking-widest border-b-2 ${borderColor} pb-2 mb-4 ${textColor}`}>SYSTEM_LOG_v2.0</div>
        <div className={`${borderStyle} p-4 mb-4`}>
          <div className="text-6xl font-black mb-2 tracking-tighter">{data.year}</div>
          <div className={`h-4 ${isTerminal ? 'bg-green-500' : isGlitch ? 'bg-red-500' : 'bg-emerald-900'} w-full mb-2 animate-pulse`}></div>
          <div className="text-xl font-bold uppercase">{data.title}</div>
        </div>
        <div className={`flex-1 flex items-center justify-center ${textColor}`}>
             <div className={`text-sm ${isTerminal ? 'bg-green-900/20' : 'bg-black/5'} p-4 font-bold w-full`}>{`> ${data.subtitle}`}<span className="animate-pulse">_</span></div>
        </div>
        <div className={`text-[10px] uppercase text-center mt-4 ${textColor}`}>{t.pressStart}</div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${bgColor} p-6 font-mono flex flex-col relative overflow-hidden select-none`}>
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
        <h3 className={`text-xl font-black uppercase mb-6 ${isTerminal ? 'bg-green-900 text-green-100' : isGlitch ? 'bg-red-900 text-red-100' : 'bg-emerald-900 text-emerald-100'} inline-block px-2 py-1 self-start`}>{t.playerStats}</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map(stat => (
            <div key={stat.id} className={`${borderStyle} p-3 flex flex-col items-center justify-center aspect-square`}>
              <div className={`w-8 h-8 mb-2 ${isTerminal ? 'text-green-600' : isGlitch ? 'text-red-600' : 'text-emerald-700'}`}>{ICON_MAP[stat.icon]}</div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${bgColor} p-6 font-mono relative overflow-hidden select-none flex flex-col`}>
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
        <h3 className={`text-xl font-black uppercase mb-6 border-b-4 ${borderColor} pb-2 ${textColor} shrink-0`}>{t.achievements}</h3>
        <div className="space-y-4 flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {data.highlights.map((h, i) => (
             <div key={h.id} className={`${borderStyle} p-3 relative flex gap-3`}>
               {/* Emoji Badge */}
               <div className={`shrink-0 w-10 h-10 ${isTerminal ? 'bg-green-900' : 'bg-emerald-900'} text-white flex items-center justify-center text-xl font-bold border-2 border-white`}>
                 {h.emoji || (i+1)}
               </div>
               <div className="min-w-0 flex-1">
                  <div className="font-bold uppercase text-sm mb-1 underline decoration-2 truncate">{h.title}</div>
                  <div className="text-xs leading-snug line-clamp-2">{h.desc}</div>
               </div>
             </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  // Photos now slide 3
  if (slide === 3) {
    const photoCount = data.photos.length;
    let gridClass = 'grid-cols-1 grid-rows-2'; 
    if (photoCount >= 3) gridClass = 'grid-cols-2 grid-rows-2';
    if (photoCount >= 5) gridClass = 'grid-cols-2 grid-rows-3';

    return (
      <div className={`h-full ${bgColor} p-4 font-mono relative overflow-hidden select-none flex flex-col`}>
         <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px]"></div>
         <h3 className={`text-xl font-black uppercase mb-4 ${isTerminal ? 'bg-green-900 text-green-100' : 'bg-emerald-900 text-emerald-100'} inline-block px-2 py-1 self-start`}>{t.memoryDump}</h3>
         
         {/* Fix: Added min-h-0 and adjusted padding */}
         <div className={`grid gap-2 flex-1 w-full ${gridClass} min-h-0`}>
            {data.photos.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`${borderStyle} p-1 overflow-hidden relative ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
              >
                 <img src={photo.url} alt="" className={`w-full h-full object-cover ${isTerminal ? 'filter grayscale contrast-150 brightness-75 sepia hue-rotate-90 saturate-200' : 'filter grayscale contrast-125'}`} />
                 <div className={`absolute bottom-1 right-1 ${isTerminal ? 'bg-green-900' : 'bg-emerald-900'} text-white text-[8px] px-1`}>IMG_0{i+1}.JPG</div>
              </div>
            ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${isTerminal ? 'bg-green-900' : isGlitch ? 'bg-zinc-900' : 'bg-emerald-900'} p-8 font-mono flex flex-col items-center justify-center ${isTerminal ? 'text-green-100' : isGlitch ? 'text-red-100' : 'text-emerald-100'} text-center relative overflow-hidden select-none`}>
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] z-10 bg-[length:100%_4px]"></div>
       <Terminal className="w-16 h-16 mb-6 animate-bounce" />
       <div className={`border-2 ${isTerminal ? 'border-green-100 bg-green-800' : isGlitch ? 'border-red-500 bg-red-950' : 'border-emerald-100 bg-emerald-800'} p-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]`}>
          <p className="text-lg font-bold leading-relaxed">"{data.summary}"</p>
       </div>
       <div className="mt-8 text-xs animate-pulse">{t.endTrans}</div>
       <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-mono uppercase ${isTerminal ? 'text-green-400/30' : 'text-emerald-500/30'} z-20 pointer-events-none`}>{t.madeBy}</div>
    </div>
  );
};

// 2. SWISS RENDERER
const RenderSwiss = ({ slide, data, themeId, t }) => {
  const isMono = themeId === 'monochrome';
  const isY2k = themeId === 'y2k';

  let bgClass = isMono ? 'bg-black text-white' : isY2k ? 'bg-slate-300 text-blue-900' : 'bg-[#f2f2f2] text-[#1a1a1a]';
  let accentClass = isMono ? 'text-gray-400' : isY2k ? 'text-pink-500' : 'text-red-600';
  let borderClass = isMono ? 'border-white' : isY2k ? 'border-blue-900' : 'border-black';
  let cardBg = isMono ? 'bg-stone-900' : 'bg-white';

  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-bold uppercase tracking-widest ${isMono ? 'text-white/30' : 'text-black/20'} z-20 pointer-events-none`}>{t.madeBy}</div>;
  const darkWatermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-bold uppercase tracking-widest ${isMono ? 'text-black/20' : 'text-white/20'} z-20 pointer-events-none`}>{t.madeBy}</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${bgClass} p-4 font-sans flex flex-col relative select-none`}>
        <div className={`absolute top-0 left-1/3 w-px h-full ${isMono ? 'bg-white/30' : isY2k ? 'bg-blue-900/30' : 'bg-red-600'} opacity-30`}></div>
        <div className={`absolute top-2/3 left-0 w-full h-px ${isMono ? 'bg-white/30' : isY2k ? 'bg-blue-900/30' : 'bg-red-600'} opacity-30`}></div>
        <div className="text-8xl font-black tracking-tighter leading-none mb-4 z-10">{data.year.substring(0,2)}<br/><span className={accentClass}>{data.year.substring(2)}</span>.</div>
        <div className={`z-10 ${cardBg} p-4 border ${borderClass} shadow-lg transform rotate-1 mt-4`}>
          <h2 className="text-3xl font-bold uppercase leading-none tracking-tight">{data.title}</h2>
          <p className="mt-2 text-sm font-medium opacity-60">{data.subtitle}</p>
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-bold transform -rotate-90 origin-bottom-right">{t.annualReport} / {data.year}</div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${isMono ? 'bg-white text-black' : isY2k ? 'bg-blue-900 text-white' : 'bg-[#1a1a1a] text-[#f2f2f2]'} p-6 font-sans flex flex-col select-none`}>
        <h3 className={`text-4xl font-black mb-8 border-b-2 ${isMono ? 'border-black' : isY2k ? 'border-pink-500' : 'border-red-600'} pb-2`}>{t.keyPoints}</h3>
        <div className="space-y-6">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className="flex items-baseline justify-between group">
              <div className="text-sm font-bold uppercase tracking-widest opacity-50 w-1/3">0{idx + 1} / {stat.label}</div>
              <div className={`text-5xl font-black ${isMono ? 'text-black' : 'text-white'} group-hover:${accentClass} transition-colors`}>{stat.value}</div>
            </div>
          ))}
        </div>
        {darkWatermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${bgClass} font-sans flex flex-col select-none`}>
         <div className={`${isMono ? 'bg-gray-800' : isY2k ? 'bg-pink-500' : 'bg-red-600'} text-white p-6 pb-12 rounded-bl-[4rem]`}>
           <h3 className="text-4xl font-black leading-none">{t.keyPoints}</h3>
         </div>
         <div className="flex-1 p-6 -mt-8 space-y-4 min-h-0 overflow-y-auto scrollbar-hide">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`${cardBg} p-5 shadow-xl border-l-8 ${borderClass} flex gap-4 items-start`}>
               {/* Emoji Big & Bold */}
               <div className="text-4xl shrink-0">{h.emoji}</div>
               <div className="min-w-0">
                  <h4 className="text-xl font-black uppercase mb-1 truncate">{h.title}</h4>
                  <p className="text-sm opacity-70 font-medium leading-tight line-clamp-2">{h.desc}</p>
               </div>
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
      <div className={`h-full ${bgClass} font-sans flex flex-col relative select-none`}>
         <div className={`absolute top-1/2 left-0 w-full h-px ${isMono ? 'bg-white' : 'bg-red-600'} z-20 opacity-30`}></div>
         <div className={`absolute top-0 left-1/2 w-px h-full ${isMono ? 'bg-white' : 'bg-red-600'} z-20 opacity-30`}></div>
         
         <div className={`grid h-full w-full ${gridClass}`}>
           {data.photos.map((photo, i) => (
             <div 
              key={photo.id} 
              className={`overflow-hidden border ${isMono ? 'border-black' : 'border-white'} relative group ${photoCount === 3 && i === 0 ? 'row-span-2' : ''} ${i % 2 === 0 ? 'bg-black' : 'bg-gray-500'}`}
             >
                <img src={photo.url} alt="" className={`w-full h-full object-cover filter ${isMono ? 'grayscale contrast-125' : ''} hover:grayscale-0 transition-all duration-500 opacity-90`} />
                <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-2 py-1">{t.fig}. {String.fromCharCode(65+i)}</div>
             </div>
           ))}
         </div>
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${cardBg} p-6 font-sans flex flex-col justify-center items-center text-center relative border-[16px] ${borderClass} select-none`}>
       <div className={`absolute top-0 left-1/2 w-px h-full ${accentClass} opacity-30`}></div>
       <div className={`absolute top-1/2 left-0 w-full h-px ${accentClass} opacity-30`}></div>
       <div className={`z-10 ${isMono ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'} p-6 transform -rotate-2 shadow-2xl`}>
         <p className="text-2xl font-black uppercase leading-tight italic">"{data.summary}"</p>
       </div>
       <div className={`z-10 mt-8 ${isMono ? 'bg-black' : isY2k ? 'bg-pink-500' : 'bg-red-600'} text-white px-4 py-1 text-sm font-bold uppercase tracking-widest`}>{t.endReport}</div>
       {watermark}
    </div>
  );
};

// 3. LO-FI RENDERER
const RenderLoFi = ({ slide, data, themeId, t }) => {
  // ... existing variables ...
  const isBotanical = themeId === 'botanical';
  const isBoho = themeId === 'boho';
  
  const paperTexture = isBotanical ? "bg-[#f1f8f1]" : isBoho ? "bg-[#f5efe6]" : "bg-[#fdfbf7]";
  const tapeStyle = "h-4 w-16 bg-yellow-200/80 absolute shadow-sm transform";
  
  let textColor = "text-stone-800";
  let secondaryColor = "text-stone-500";
  let accentColor = "text-pink-500";
  const penColor = isBotanical ? "text-green-900" : isBoho ? "text-amber-900" : "text-stone-800";

  if (isBotanical) {
    textColor = "text-green-900";
    secondaryColor = "text-green-700";
    accentColor = "text-emerald-600";
  } else if (isBoho) {
    textColor = "text-amber-900";
    secondaryColor = "text-amber-700";
    accentColor = "text-orange-600";
  }

  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-handwriting ${secondaryColor} mix-blend-multiply z-20 pointer-events-none`}>{t.madeBy}</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col justify-center items-center relative ${textColor} select-none`}>
        <div className={`${tapeStyle} -top-2 left-1/3 -rotate-3 ${isBotanical ? 'bg-green-200/80' : ''}`}></div>
        <div className={`${tapeStyle} bottom-10 right-10 bg-pink-200/80 rotate-12`}></div>
        <div className="border border-stone-300 bg-white p-6 shadow-md rotate-2 mb-8 w-full aspect-[4/3] flex flex-col items-center justify-center">
          <div className={`text-sm font-sans ${secondaryColor} mb-2 uppercase tracking-widest`}>{t.recap}</div>
          <h1 className="text-6xl italic font-black mb-1">{data.year}</h1>
          <div className={`w-12 h-1 ${isBotanical ? 'bg-green-800' : 'bg-stone-800'} rounded-full`}></div>
        </div>
        <div className="text-center relative">
          <h2 className="text-3xl font-bold mb-2 font-sans tracking-tight">{data.title}</h2>
          <p className={`font-serif italic ${secondaryColor} text-lg`}>"{data.subtitle}"</p>
        </div>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col relative select-none`}>
        <div className="text-center mb-8 relative inline-block self-center">
           <span className="relative z-10 text-2xl font-bold italic bg-white/50 px-4 py-1 transform -rotate-1 inline-block border border-stone-200 shadow-sm">{t.collection}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`bg-white p-3 shadow-md border border-stone-100 flex flex-col items-center justify-center aspect-square ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}>
              <div className="w-8 h-3 bg-blue-200/50 absolute -top-1.5 opacity-80"></div>
              <div className={`${secondaryColor} w-6 h-6 mb-1`}>{ICON_MAP[stat.icon]}</div>
              <div className="text-3xl font-bold font-sans">{stat.value}</div>
              <div className={`text-xs font-serif italic ${secondaryColor} text-center`}>{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  // HIGHLIGHTS WITH EMOJI UPDATE
  if (slide === 2) return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden select-none flex flex-col`}>
         <h3 className={`text-5xl font-sans font-black ${isBotanical ? 'text-green-100' : 'text-stone-200'} absolute -right-4 top-10 rotate-90 z-0 select-none`}>{t.moments}</h3>
         <div className="relative z-10 space-y-6 mt-4 flex-1 min-h-0 overflow-y-auto scrollbar-hide pt-4">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`bg-white p-4 shadow-sm border border-stone-200 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} relative`}>
               {/* Sticker Emoji */}
               <div className="absolute -top-3 -right-3 text-3xl filter drop-shadow-md transform rotate-12">{h.emoji}</div>
               
               <div className="flex items-center gap-2 mb-2 border-b border-stone-100 pb-2">
                 <div className={`w-2 h-2 rounded-full ${isBotanical ? 'bg-green-400' : 'bg-stone-300'}`}></div>
                 <h4 className="font-bold font-sans text-sm uppercase tracking-wide truncate">{h.title}</h4>
               </div>
               <p className={`${secondaryColor} italic leading-snug line-clamp-2`}>{h.desc}</p>
             </div>
           ))}
         </div>
         {watermark}
      </div>
  );

  if (slide === 3) {
    const photoCount = data.photos.length;
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
         <Star className={`absolute bottom-8 right-8 w-6 h-6 ${accentColor} animate-pulse`} />
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
      <div className="bg-white p-8 shadow-xl rotate-1 border-8 border-white relative">
         <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-stone-200 border-l-transparent"></div>
         <p className={`text-xl leading-relaxed italic ${textColor} mb-4`}>{data.summary}</p>
         <div className={`flex justify-center gap-1 ${secondaryColor}`}>
           <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
         </div>
      </div>
      <div className={`mt-12 font-handwriting ${secondaryColor} transform -rotate-6`}>{t.seeYou}</div>
      {watermark}
    </div>
  );
};

// 4. CYBERPUNK NEON RENDERER
const RenderNeon = ({ slide, data, themeId, t }) => {
  // ... existing variables ...
  const isMidnight = themeId === 'midnight';
  
  const bgStyle = isMidnight ? "bg-indigo-950" : "bg-slate-950";
  const textPrimary = isMidnight ? "text-purple-400" : "text-cyan-400";
  const textSecondary = isMidnight ? "text-blue-300" : "text-fuchsia-500";
  const borderStyle = `border-2 ${isMidnight ? 'border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'border-cyan-500/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]'} bg-slate-900/50 backdrop-blur-md`;
  const glowText = isMidnight ? "drop-shadow-[0_0_5px_rgba(168,85,247,0.7)]" : "drop-shadow-[0_0_5px_rgba(0,255,255,0.7)]";
  const glowTextSecondary = isMidnight ? "drop-shadow-[0_0_5px_rgba(147,197,253,0.7)]" : "drop-shadow-[0_0_5px_rgba(217,70,239,0.7)]";
  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] uppercase tracking-[0.2em] ${textPrimary} z-20 pointer-events-none font-bold`}>{t.madeBy}</div>;

  if (slide === 0) return (
      <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative overflow-hidden select-none`}>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className={`text-sm font-bold uppercase tracking-[0.2em] ${textSecondary} mb-4 animate-pulse ${glowTextSecondary}`}>{t.systemBoot}</div>
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
        <h3 className={`text-xl font-bold uppercase mb-8 ${textSecondary} flex items-center gap-2 ${glowTextSecondary}`}><Activity className="w-5 h-5 animate-pulse" /> {t.neuralStats}</h3>
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
         <h3 className={`text-xl font-bold uppercase mb-8 ${textPrimary} ${glowText} flex items-center gap-2`}><Zap className="w-5 h-5" /> {t.coreMem}</h3>
         <div className="flex-1 space-y-6 z-10 min-h-0 overflow-y-auto scrollbar-hide">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`${borderStyle} p-4 rounded-lg relative flex gap-3 items-start`}>
               {/* Neon Emoji */}
               <div className={`text-2xl ${glowTextSecondary}`}>{h.emoji}</div>
               <div>
                  <div className={`font-bold uppercase text-sm mb-1 ${textSecondary} ${glowTextSecondary} truncate`}>// {h.title}</div>
                  <div className={`text-sm leading-snug text-white opacity-90 line-clamp-2`}>{h.desc}</div>
               </div>
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
           <Camera className="w-5 h-5" /> {t.visualLogs}
         </h3>
         
         <div className={`grid gap-2 flex-1 w-full ${gridClass} min-h-0`}>
           {data.photos.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`relative rounded-xl overflow-hidden border ${isMidnight ? 'border-purple-500/50' : 'border-cyan-500/50'} shadow-[0_0_15px_rgba(0,255,255,0.2)] group ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
              >
                <div className={`absolute inset-0 ${isMidnight ? 'bg-purple-900/20' : 'bg-cyan-900/20'} z-10 group-hover:bg-transparent transition-colors`}></div>
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
       <div className={`${borderStyle} p-6 rounded-xl relative z-10`}>
         <Terminal className={`w-8 h-8 mb-4 mx-auto ${textPrimary} ${glowText}`} />
         <p className={`text-xl font-bold leading-relaxed text-white italic ${glowText}`}>"{data.summary}"</p>
       </div>
       <div className={`mt-8 text-xs font-bold uppercase tracking-[0.2em] ${textSecondary} animate-pulse ${glowTextSecondary}`}>{t.endLine}</div>
       {watermark}
    </div>
  );
};

// 5. MODERN MINIMALIST RENDERER
const RenderMinimal = ({ slide, data, themeId, t }) => {
  const isCorporate = themeId === 'corporate';
  const isWarm = themeId === 'warm';

  let bgStyle = "bg-stone-50";
  let textPrimary = "text-stone-900";
  let textSecondary = "text-stone-500";

  if (isCorporate) {
    bgStyle = "bg-slate-100";
    textPrimary = "text-blue-900";
    textSecondary = "text-blue-600";
  } else if (isWarm) {
    bgStyle = "bg-[#f5f0e6]";
    textPrimary = "text-[#5c4d3c]";
    textSecondary = "text-[#8a7e68]";
  }

  const watermark = <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-[6px] uppercase tracking-[0.2em] ${textSecondary} opacity-50 z-20 pointer-events-none`}>{t.madeBy}</div>;

  if (slide === 0) return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
        <div className={`absolute top-8 font-sans text-xs font-bold uppercase tracking-[0.2em] ${textSecondary}`}>{t.annualReport}</div>
        <h1 className={`text-8xl font-light tracking-tight leading-none mb-4 ${textPrimary}`}>{data.year}</h1>
        <div className={`w-16 h-px ${isCorporate ? 'bg-blue-300' : 'bg-stone-300'} mb-8`}></div>
        <h2 className={`text-2xl font-normal uppercase tracking-widest ${textPrimary} mb-2`}>{data.title}</h2>
        <p className={`text-lg ${textSecondary} font-light italic`}>{data.subtitle}</p>
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
        <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-12 ${textPrimary}`}>{t.keyFigures}</h3>
        <div className={`grid grid-cols-2 gap-px ${isCorporate ? 'bg-blue-200 border-blue-200' : 'bg-stone-200 border-stone-200'} border`}>
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
         <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-12 ${textPrimary}`}>{t.highlights}</h3>
         <div className="flex-1 space-y-8 min-h-0 overflow-y-auto scrollbar-hide">
           {data.highlights.map((h, i) => (
             <div key={h.id} className="text-center">
               <div className="flex justify-center mb-2 text-2xl">{h.emoji}</div>
               <div className={`font-sans text-xs font-bold uppercase tracking-[0.2em] ${textSecondary} mb-1`}>0{i+1}.</div>
               <h4 className={`text-lg font-normal uppercase tracking-wide mb-2 ${textPrimary} truncate`}>{h.title}</h4>
               <p className={`text-sm leading-relaxed ${textSecondary} font-light italic px-4 line-clamp-2`}>{h.desc}</p>
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
         <h3 className={`text-xl font-normal uppercase tracking-widest text-center mb-8 ${textPrimary}`}>{t.gallery}</h3>
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
       <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 ${isCorporate ? 'bg-blue-300' : 'bg-stone-300'}`}></div>
       <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 ${isCorporate ? 'bg-blue-300' : 'bg-stone-300'}`}></div>
       <p className={`text-2xl leading-relaxed font-light italic ${textPrimary} mb-8`}>"{data.summary}"</p>
       <div className={`font-sans text-xs font-bold uppercase tracking-[0.2em] ${textSecondary}`}>{t.fin}</div>
       {watermark}
    </div>
  );
};

// 6. HAND-DRAWN JOURNAL RENDERER
const RenderJournal = ({ slide, data, themeId, t }) => {
  const isNewspaper = themeId === 'newspaper';
  
  const paperTexture = isNewspaper ? "bg-stone-200" : "bg-[#fcfaf2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]";
  const tapeStyle = "h-4 w-16 bg-yellow-200/80 absolute shadow-sm transform";
  const penColor = isNewspaper ? "text-slate-900" : "text-amber-900";
  const pencilColor = isNewspaper ? "text-slate-600" : "text-slate-500";
  const highlightColor = isNewspaper ? "bg-slate-300/50" : "bg-yellow-200/50";
  const sketchBorder = isNewspaper ? "border-2 border-slate-900" : "border-2 border-dashed border-amber-900/50";
  const fontStyle = isNewspaper ? "font-serif" : "font-handwriting";
  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] ${fontStyle} ${pencilColor} z-20 pointer-events-none`}>{t.madeBy}</div>;
  
  if (slide === 0) return (
      <div className={`h-full ${paperTexture} p-6 font-serif flex flex-col justify-center items-center relative select-none`}>
        {!isNewspaper && (
          <>
            <Star className={`absolute top-10 left-10 w-8 h-8 ${pencilColor} opacity-50 animate-spin-slow`} />
            <Heart className={`absolute bottom-16 right-10 w-6 h-6 ${pencilColor} opacity-50`} />
          </>
        )}
        <div className={`relative z-10 text-center ${isNewspaper ? '' : 'transform -rotate-1'}`}>
          <div className={`${fontStyle} text-2xl ${pencilColor} mb-2`}>{isNewspaper ? 'EXTRA! EXTRA!' : 'My Year in Review...'}</div>
          <div className="relative inline-block">
            <span className={`absolute inset-0 ${highlightColor} transform -skew-y-2 rounded-sm`}></span>
            <h1 className={`relative text-7xl font-black ${penColor} tracking-tighter leading-none mb-2`}>{data.year}</h1>
          </div>
        </div>
        <div className={`mt-8 text-center relative z-10`}>
          <h2 className={`text-3xl font-bold ${penColor} mb-2 ${fontStyle} ${isNewspaper ? 'uppercase tracking-widest' : 'underline decoration-wavy decoration-amber-500/50'}`}>{data.title}</h2>
          <p className={`text-lg ${pencilColor} ${fontStyle} italic`}>"{data.subtitle}"</p>
        </div>
        {!isNewspaper && <div className={`absolute bottom-8 font-handwriting text-sm ${pencilColor}`}>( drawings by me )</div>}
        {watermark}
      </div>
  );

  if (slide === 1) return (
      <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col relative select-none`}>
        <h3 className={`text-2xl font-bold text-center mb-8 ${penColor} ${fontStyle} ${isNewspaper ? 'border-b-2 border-black pb-2' : 'underline decoration-2 decoration-amber-500/30'}`}>{t.someNumbers}</h3>
        <div className="grid grid-cols-2 gap-6">
          {data.stats.map((stat, idx) => (
            <div key={stat.id} className={`p-4 flex flex-col items-center justify-center aspect-square relative ${!isNewspaper && (idx%2 ? 'rotate-1' : '-rotate-1')}`}>
              <div className={`absolute inset-0 ${sketchBorder} ${!isNewspaper && 'rounded-lg'}`}></div>
              <div className="w-10 h-10 mb-2 relative flex items-center justify-center">
                 {!isNewspaper && <div className="absolute inset-0 border-2 border-amber-900/30 rounded-full transform rotate-3"></div>}
                 <div className={`relative z-10 ${penColor}`}>{ICON_MAP[stat.icon]}</div>
              </div>
              <div className={`text-3xl font-black ${penColor} ${fontStyle}`}>{stat.value}</div>
              <div className={`text-sm ${pencilColor} ${fontStyle} text-center`}>{stat.label}</div>
            </div>
          ))}
        </div>
        {watermark}
      </div>
  );

  if (slide === 2) return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden flex flex-col select-none`}>
         <h3 className={`text-2xl font-bold text-center mb-8 ${penColor} ${fontStyle}`}>
           <span className="relative inline-block px-2">
             <span className={`absolute inset-0 ${highlightColor} transform skew-x-6 rounded-sm`}></span>
             <span className="relative">{t.bigMoments}</span>
           </span>
         </h3>
         <div className="flex-1 space-y-6 relative z-10 min-h-0 overflow-y-auto scrollbar-hide pt-2">
           {data.highlights.map((h, i) => (
             <div key={h.id} className={`p-4 relative ${!isNewspaper && (i%2 ? 'rotate-1' : '-rotate-1')}`}>
               <div className={`absolute inset-0 ${sketchBorder} ${!isNewspaper && 'rounded-md'} bg-white/50`}></div>
               <div className="relative z-10 flex items-start gap-3">
                 <div className={`${fontStyle} text-lg font-bold ${pencilColor}`}>#{i+1}</div>
                 <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-xl">{h.emoji}</span>
                     <h4 className={`font-bold ${penColor} ${fontStyle} text-lg`}>{h.title}</h4>
                  </div>
                  <p className={`text-sm leading-snug ${pencilColor} ${fontStyle} line-clamp-2`}>{h.desc}</p>
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
    const itemWidth = photoCount > 4 ? 'w-24' : 'w-32';
    
    return (
      <div className={`h-full ${paperTexture} p-6 font-serif relative overflow-hidden select-none flex flex-col items-center justify-center`}>
         <div className="flex flex-wrap justify-center content-center gap-4 h-full w-full">
           {data.photos.map((photo, i) => (
             <div 
              key={photo.id} 
              className={`bg-white p-2 pb-6 shadow-md border ${isNewspaper ? 'border-black' : 'border-stone-200'} relative ${itemWidth} ${!isNewspaper && (i % 2 === 0 ? 'rotate-3' : '-rotate-2')} ${i % 3 === 0 ? 'z-10' : ''}`}
              style={{ zIndex: i }}
             >
                {!isNewspaper && <div className={`${tapeStyle} -top-2 left-1/2 -translate-x-1/2 ${i%2===0 ? 'bg-blue-200/60' : 'bg-yellow-200/60'}`}></div>}
                <div className={`aspect-square ${isNewspaper ? 'grayscale' : 'bg-stone-100'} overflow-hidden ${!isNewspaper && 'filter sepia-[.2]'}`}>
                   <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
             </div>
           ))}
         </div>
         {!isNewspaper && <Star className={`absolute bottom-8 right-8 w-6 h-6 ${pencilColor} animate-pulse`} />}
         {watermark}
      </div>
    );
  }

  return (
    <div className={`h-full ${paperTexture} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none`}>
      <div className={`bg-white p-8 shadow-xl ${!isNewspaper && 'rotate-1'} border-8 border-white relative`}>
         {!isNewspaper && <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-stone-200 border-l-transparent"></div>}
         <p className={`text-xl leading-relaxed italic ${penColor} mb-4 ${fontStyle}`}>{data.summary}</p>
         <div className={`flex justify-center gap-1 ${pencilColor}`}>
           <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
         </div>
      </div>
      <div className={`mt-12 ${fontStyle} ${pencilColor} ${!isNewspaper && 'transform -rotate-6'}`}>{t.seeYou}</div>
      {watermark}
    </div>
  );
};

// 7. GLASSMORPHISM RENDERER (Handles: Glass, Pastel, Gradient)
const RenderGlass = ({ slide, data, themeId, t }) => {
  const isPastel = themeId === 'pastel';
  const isGradient = themeId === 'gradient';

  let bgStyle = "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500";
  let cardStyle = "backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg text-white";
  let textColor = "text-white";
  
  if (isPastel) {
    bgStyle = "bg-gradient-to-tr from-pink-200 via-yellow-100 to-blue-200";
    cardStyle = "backdrop-blur-md bg-white/60 border border-white/50 shadow-sm text-slate-700";
    textColor = "text-slate-700";
  } else if (isGradient) {
    bgStyle = "bg-gradient-to-bl from-blue-400 via-teal-300 to-green-400";
    cardStyle = "backdrop-blur-2xl bg-black/10 border border-white/20 shadow-2xl text-white";
  }

  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-medium uppercase tracking-widest ${textColor} opacity-50 z-20 pointer-events-none`}>{t.madeBy}</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-sans flex flex-col justify-center items-center text-center relative select-none overflow-hidden`}>
      <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className={`${cardStyle} p-8 rounded-3xl w-full flex flex-col items-center gap-4`}>
        <div className={`text-xs font-bold uppercase tracking-[0.3em] ${textColor} opacity-70`}>{t.recap}</div>
        <h1 className="text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{data.year}</h1>
        <div className="w-12 h-1 bg-white/50 rounded-full"></div>
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className={`${textColor} opacity-80`}>{data.subtitle}</p>
      </div>
      {watermark}
    </div>
  );

  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col relative select-none overflow-hidden`}>
      <div className="absolute top-[20%] right-[-10%] w-[200px] h-[200px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <h3 className={`text-2xl font-bold ${textColor} mb-8 drop-shadow-md`}>{t.myStats}</h3>
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {data.stats.map(stat => (
          <div key={stat.id} className={`${cardStyle} p-4 rounded-2xl flex flex-col items-center justify-center aspect-square`}>
            <div className={`w-8 h-8 mb-2 ${textColor} drop-shadow`}>{ICON_MAP[stat.icon]}</div>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className={`text-xs font-bold uppercase tracking-wider ${textColor} opacity-80`}>{stat.label}</div>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none overflow-hidden`}>
      <h3 className={`text-2xl font-bold ${textColor} mb-8 drop-shadow-md`}>{t.highlights}</h3>
      <div className="space-y-4 relative z-10 min-h-0 overflow-y-auto scrollbar-hide">
        {data.highlights.map((h, i) => (
          <div key={h.id} className={`${cardStyle} p-5 rounded-2xl`}>
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-lg font-bold">{h.title}</h4>
                <span className="text-xl">{h.emoji}</span>
            </div>
            <p className={`text-sm ${textColor} opacity-90 leading-snug`}>{h.desc}</p>
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
        <h3 className={`text-2xl font-bold ${textColor} mb-6 drop-shadow-md`}>{t.gallery}</h3>
        <div className={`grid gap-3 flex-1 w-full grid-cols-1 ${data.photos.length > 1 ? 'grid-rows-2' : ''}`}>
          {data.photos.map((photo, i) => (
            <div 
              key={photo.id} 
              className={`${cardStyle} p-1 overflow-hidden relative rounded-xl ${photoCount === 3 && i === 0 ? 'row-span-2' : ''}`}
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
      <div className={`${cardStyle} p-8 rounded-3xl`}>
        <p className="text-xl font-medium leading-relaxed italic">"{data.summary}"</p>
      </div>
      {watermark}
    </div>
  );
};

// 8. NEO-BRUTALISM RENDERER (Handles: Brutal, Bauhaus)
const RenderBrutal = ({ slide, data, themeId, t }) => {
  const isBauhaus = themeId === 'bauhaus';
  const bgStyle = isBauhaus ? "bg-[#f0f0f0]" : "bg-[#FFFDF5]";
  const cardStyle = isBauhaus ? "bg-white border-4 border-blue-600 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]" : "bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
  const textPrimary = isBauhaus ? "text-blue-900" : "text-black";
  const accent1 = isBauhaus ? "bg-yellow-400" : "bg-yellow-400";
  const accent2 = isBauhaus ? "bg-red-600" : "bg-purple-400";
  
  const watermark = <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-tighter ${isBauhaus ? 'bg-blue-600 text-white' : 'bg-black text-white'} px-2 py-1 transform -rotate-2 z-20 pointer-events-none`}>{t.madeBy}</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-6 font-sans flex flex-col justify-center items-center relative select-none`}>
      <div className={`absolute top-10 right-10 w-16 h-16 ${accent1} rounded-full border-4 ${isBauhaus ? 'border-blue-600' : 'border-black'}`}></div>
      <div className={`${cardStyle} p-8 w-full rotate-2 mb-8`}>
        <h1 className={`text-8xl font-black ${textPrimary} leading-[0.8]`}>{data.year}</h1>
      </div>
      <div className={`${accent2} border-4 ${isBauhaus ? 'border-blue-600' : 'border-black'} p-4 -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
        <h2 className="text-3xl font-black text-white uppercase">{data.title}</h2>
      </div>
      <p className="mt-8 font-bold text-xl text-center max-w-xs">{data.subtitle}</p>
      {watermark}
    </div>
  );

  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none`}>
      <h3 className={`text-4xl font-black ${textPrimary} mb-8 underline decoration-wavy decoration-4 decoration-purple-500`}>{t.myStats}_</h3>
      <div className="grid grid-cols-2 gap-6">
        {data.stats.map((stat, i) => (
          <div key={stat.id} className={`${cardStyle} p-4 flex flex-col items-center justify-center aspect-square hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}>
            <div className={`w-10 h-10 mb-2 ${textPrimary}`}>{ICON_MAP[stat.icon]}</div>
            <div className={`text-4xl font-black ${textPrimary}`}>{stat.value}</div>
            <div className="text-xs font-bold uppercase bg-yellow-300 px-2 border-2 border-black">{stat.label}</div>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-6 font-sans relative select-none flex flex-col`}>
      <h3 className={`text-4xl font-black ${textPrimary} mb-8 bg-green-400 border-4 border-black inline-block p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0`}>{t.wins}</h3>
      <div className="space-y-6 flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        {data.highlights.map((h, i) => (
          <div key={h.id} className={`${cardStyle} p-4`}>
             <div className="flex justify-between">
                <h4 className="text-xl font-black uppercase mb-1 bg-pink-300 inline-block px-1 border-2 border-black truncate max-w-[80%]">{h.title}</h4>
                <span className="text-2xl">{h.emoji}</span>
             </div>
            <p className={`${textPrimary} font-bold leading-tight mt-2 line-clamp-2`}>{h.desc}</p>
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
        <h3 className={`text-4xl font-black ${textPrimary} mb-6 italic`}>{t.pics}</h3>
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

// 9. VAPORWAVE RENDERER (Handles: Vapor, Synth)
const RenderVapor = ({ slide, data, themeId, t }) => {
  const isSynth = themeId === 'synth';
  const bgStyle = isSynth ? "bg-gradient-to-b from-orange-500 via-red-500 to-purple-900" : "bg-gradient-to-b from-fuchsia-900 to-purple-900";
  const gridStyle = "bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[length:40px_40px] perspective-[500px]";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-mono text-cyan-400/50 z-20 pointer-events-none drop-shadow-[1px_1px_0px_rgba(255,0,255,0.5)]">{t.madeBy}</div>;
  
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
  
  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden`}>
       <div className={`absolute inset-0 ${gridStyle} opacity-30`}></div>
       <h3 className="text-2xl text-cyan-400 mb-6 relative z-10 italic">{t.aesthetics}</h3>
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
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden flex flex-col`}>
       <div className={`absolute inset-0 ${gridStyle} opacity-30`}></div>
       <h3 className="text-2xl text-pink-400 mb-6 relative z-10 uppercase shrink-0">{t.memoriesExe}</h3>
       <div className="space-y-4 relative z-10 flex-1 min-h-0 overflow-y-auto scrollbar-hide pt-2">
         {data.highlights.map(h => (
           <div key={h.id} className="bg-gradient-to-r from-cyan-900/80 to-purple-900/80 p-4 border-l-4 border-cyan-400 relative">
             <div className="absolute top-2 right-2 text-2xl opacity-50">{h.emoji}</div>
             <h4 className="text-white font-bold text-lg">{h.title}</h4>
             <p className="text-pink-200 text-sm line-clamp-2">{h.desc}</p>
           </div>
         ))}
       </div>
       {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full ${bgStyle} p-6 font-mono relative select-none overflow-hidden flex flex-col`}>
       <h3 className="text-2xl text-white mb-6 italic text-center drop-shadow-[2px_2px_0px_#ff00ff]">{t.visuals}</h3>
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
const RenderAcademia = ({ slide, data, t }) => {
  const bgStyle = "bg-[#2c241b] text-[#e0d8c3]";
  const watermark = <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[6px] font-serif uppercase tracking-[0.2em] text-[#e0d8c3]/20 z-20 pointer-events-none">{t.madeBy}</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col justify-center items-center text-center relative select-none border-[12px] border-double border-[#5c4d3c]`}>
      <div className="uppercase tracking-[0.3em] text-xs text-[#8a7e68] mb-4">{t.volume} MMXXV</div>
      <h1 className="text-7xl font-bold text-[#d4af37] mb-2">{data.year}</h1>
      <div className="w-full h-px bg-[#5c4d3c] my-6"></div>
      <h2 className="text-3xl italic">{data.title}</h2>
      <p className="text-[#8a7e68] mt-2 text-sm">{data.subtitle}</p>
      {watermark}
    </div>
  );
  
  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
      <h3 className="text-2xl text-[#d4af37] border-b border-[#5c4d3c] pb-2 mb-8 italic">{t.indexRerum}</h3>
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
      <h3 className="text-2xl text-[#d4af37] border-b border-[#5c4d3c] pb-2 mb-8 italic shrink-0">{t.chronicles}</h3>
      <div className="space-y-8 flex-1 min-h-0 overflow-y-auto scrollbar-hide pt-4">
        {data.highlights.map((h, i) => (
          <div key={h.id}>
            <span className="text-[#d4af37] text-xl font-bold mr-2">§ {i+1}</span>
            <span className="mr-2 text-xl">{h.emoji}</span>
            <h4 className="inline text-lg font-bold">{h.title}</h4>
            <p className="text-[#8a7e68] mt-1 text-sm leading-relaxed pl-8 line-clamp-2">{h.desc}</p>
          </div>
        ))}
      </div>
      {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full ${bgStyle} p-8 font-serif flex flex-col select-none`}>
       <h3 className="text-2xl text-[#d4af37] mb-6 italic text-center">{t.plates}</h3>
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
       <div className="mt-8 text-xs text-[#8a7e68] uppercase tracking-widest">{t.finis}</div>
       {watermark}
    </div>
  );
};

// 11. POP ART RENDERER
const RenderPop = ({ slide, data, t }) => {
  const bgStyle = "bg-cyan-300";
  const watermark = <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] font-black uppercase bg-white/50 text-black/50 px-1 z-20 pointer-events-none">{t.madeBy}</div>;

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
       <h3 className="text-5xl font-black text-black mb-6 italic drop-shadow-[2px_2px_0px_white]">{t.wow}</h3>
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

  if (slide === 2) return (
    <div className={`h-full bg-cyan-300 p-6 font-sans relative select-none flex flex-col`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:10px_10px] opacity-10"></div>
       <h3 className="text-5xl font-black text-black mb-6 italic drop-shadow-[2px_2px_0px_white] shrink-0">{t.pow}</h3>
       <div className="space-y-4 relative z-10 flex-1 min-h-0 overflow-y-auto scrollbar-hide pt-2">
         {data.highlights.map(h => (
           <div key={h.id} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black] relative mt-2">
             <div className="absolute -top-3 -right-3 text-3xl transform rotate-12">{h.emoji}</div>
             <h4 className="text-xl font-black uppercase">{h.title}</h4>
             <p className="text-sm font-bold line-clamp-2">{h.desc}</p>
           </div>
         ))}
       </div>
       {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full bg-yellow-300 p-6 font-sans relative select-none`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[length:10px_10px] opacity-10"></div>
       <h3 className="text-5xl font-black text-black mb-6 italic drop-shadow-[2px_2px_0px_white]">{t.snap}</h3>
       <div className="grid grid-cols-1 gap-4 relative z-10">
          {data.photos.map((photo, i) => (
            <div key={photo.id} className="bg-white border-4 border-black p-2 shadow-[4px_4px_0px_black] h-40 overflow-hidden">
              <img src={photo.url} alt="" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
          ))}
       </div>
       {watermark}
    </div>
  );

  return <RenderRetro slide={slide} data={data} themeId='retro' t={t} />; 
};

// 12. BLUEPRINT RENDERER
const RenderBlueprint = ({ slide, data, t }) => {
  const bgStyle = "bg-[#003399] text-white";
  const grid = "bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]";
  const watermark = <div className="absolute bottom-2 right-2 text-[6px] font-mono border border-white/50 px-2 py-0.5 z-20 pointer-events-none bg-[#003399]/50 text-white/50">DWG: {t.madeBy}</div>;

  if (slide === 0) return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col justify-center relative select-none`}>
      <div className={`absolute inset-0 ${grid}`}></div>
      <div className="border-4 border-white p-6 relative z-10">
        <div className="absolute top-0 left-0 bg-white text-[#003399] px-2 text-xs font-bold">{t.fig} 1.0</div>
        <h1 className="text-6xl font-bold mb-4">{data.year}</h1>
        <h2 className="text-xl border-t border-white pt-2">{data.title}</h2>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-white"></div>
      </div>
      {watermark}
    </div>
  );

  if (slide === 1) return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col relative select-none`}>
      <div className={`absolute inset-0 ${grid}`}></div>
      <div className="border-4 border-white p-6 relative z-10 h-full">
        <div className="absolute top-0 left-0 bg-white text-[#003399] px-2 text-xs font-bold">{t.fig} 1.1 - {t.playerStats}</div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {data.stats.map(stat => (
            <div key={stat.id} className="border border-white p-2 text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-[10px] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {watermark}
    </div>
  );

  if (slide === 2) return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col relative select-none`}>
      <div className={`absolute inset-0 ${grid}`}></div>
      <div className="border-4 border-white p-6 relative z-10 h-full flex flex-col">
        <div className="absolute top-0 left-0 bg-white text-[#003399] px-2 text-xs font-bold">{t.fig} 1.2 - {t.highlights}</div>
        <div className="space-y-4 mt-8 flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {data.highlights.map((h, i) => (
            <div key={h.id} className="border-b border-white pb-2 flex justify-between">
              <div className="min-w-0">
                <div className="text-xs font-bold">ITEM {i+1}</div>
                <div className="text-sm truncate">{h.title}</div>
              </div>
              <div className="text-xl">{h.emoji}</div>
            </div>
          ))}
        </div>
      </div>
      {watermark}
    </div>
  );

  if (slide === 3) return (
    <div className={`h-full ${bgStyle} p-8 font-mono flex flex-col relative select-none`}>
      <div className={`absolute inset-0 ${grid}`}></div>
      <div className="border-4 border-white p-6 relative z-10 h-full">
        <div className="absolute top-0 left-0 bg-white text-[#003399] px-2 text-xs font-bold">{t.fig} 1.3 - {t.visuals}</div>
        <div className="grid grid-cols-1 gap-4 mt-8 h-full pb-8">
          {data.photos.map((photo, i) => (
             <div key={photo.id} className="border border-white h-32 overflow-hidden relative">
                <img src={photo.url} alt="" className="w-full h-full object-cover opacity-50 grayscale" />
                <div className="absolute top-0 left-0 bg-white text-[#003399] text-[8px] px-1">IMG_{i+1}</div>
             </div>
          ))}
        </div>
      </div>
      {watermark}
    </div>
  );

  return <RenderRetro slide={slide} data={data} themeId='retro' t={t} />; 
};


export default function YearInReviewGenerator() {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('yearInReviewData');
      return savedData ? JSON.parse(savedData) : TEMPLATES.id; 
    } catch (e) {
      console.error("Failed to load from local storage", e);
      return TEMPLATES.id; 
    }
  });
  
  const [currentTheme, setCurrentTheme] = useState('retro'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); 
  const [language, setLanguage] = useState('id'); // Default to Indonesian
  const [showHelp, setShowHelp] = useState(false);

  const t = TRANSLATIONS[language]; // Translation helper
  const totalSlides = 5; 

  const scrollContainerRef = useRef(null);

  const scrollThemes = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'id' : 'en';
    const currentDefault = TEMPLATES[language];
    const isDefaultData = data.title === currentDefault.title && 
                          data.stats[0].label === currentDefault.stats[0].label;

    if (isDefaultData) {
      setData(TEMPLATES[newLang]);
    }
    setLanguage(newLang);
  };

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

  const handleInputChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.map(s => {
        if (s.id !== id) return s;
        const newStat = { ...s, [field]: value };
        if (field === 'icon') {
          const newLabel = DEFAULT_LABELS[language][value];
          if (newLabel) {
            newStat.label = newLabel;
          }
        }
        return newStat;
      })
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
        highlights: [...prev.highlights, { id: Date.now(), title: 'New Highlight', desc: 'Description here.', emoji: '✨' }]
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
      setData(TEMPLATES[language]);
      localStorage.removeItem('yearInReviewData');
    }
  };

  const generateQuote = () => {
    const smartQuote = generateSmartSummary(data, language);
    handleInputChange('summary', smartQuote);
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
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `year-in-review-slide-${currentSlide + 1}.png`, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
               try {
                 await navigator.share({
                   files: [file],
                   title: 'My 2025 Year in Review',
                   text: 'Created with YearInReview Generator'
                 });
                 setIsDownloading(false);
                 return;
               } catch (err) {
                 console.log("Share failed, falling back to download", err);
               }
            }
          }
          const link = document.createElement('a');
          link.download = `year-in-review-slide-${currentSlide + 1}.png`;
          link.href = canvas.toDataURL();
          link.click();
          setIsDownloading(false);
        });
      });
    }
  };

  const renderContent = () => {
    const props = { slide: currentSlide, data, themeId: currentTheme, t };
    switch(currentTheme) {
      case 'retro': case 'terminal': case 'glitch': return <RenderRetro {...props} />;
      case 'swiss': case 'monochrome': case 'y2k': return <RenderSwiss {...props} />;
      case 'lofi': case 'botanical': case 'boho': return <RenderLoFi {...props} />;
      case 'neon': case 'midnight': return <RenderNeon {...props} />;
      case 'minimal': case 'corporate': case 'warm': return <RenderMinimal {...props} />;
      case 'journal': case 'newspaper': return <RenderJournal {...props} />;
      case 'glass': case 'pastel': case 'gradient': case 'aura': return <RenderGlass {...props} />;
      case 'brutal': case 'bauhaus': return <RenderBrutal {...props} />;
      case 'vapor': case 'synth': return <RenderVapor {...props} />;
      case 'academia': return <RenderAcademia {...props} />;
      case 'pop': return <RenderPop {...props} />;
      case 'blueprint': return <RenderBlueprint {...props} />;
      default: return <RenderRetro {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
      
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
           <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-black text-slate-900 mb-2">{t.helpTitle}</h3>
              <p className="text-slate-500 text-sm mb-6">{t.helpDesc}</p>
              
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-sm text-slate-700 font-medium pt-1.5">{t.step1}</p>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-sm text-slate-700 font-medium pt-1.5">{t.step2}</p>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <p className="text-sm text-slate-700 font-medium pt-1.5">{t.step3}</p>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">4</div>
                    <p className="text-sm text-slate-700 font-medium pt-1.5">{t.step4}</p>
                 </div>
              </div>

              <button onClick={() => setShowHelp(false)} className="w-full mt-8 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
                 {t.close}
              </button>
           </div>
        </div>
      )}

      {/* --- LEFT PANEL: EDITOR --- */}
      <div className={`w-full lg:w-1/2 p-6 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white shadow-xl z-20 h-auto lg:h-full transition-opacity duration-300 ${isCleanMode ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-xl mx-auto pb-20">
          <header className="mb-8 border-b pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-slate-900">
                <RefreshCw className="text-indigo-600" /> {t.title}
              </h1>
               <p className="text-slate-500 mt-2 font-medium">{t.subtitle}</p>
               <div className="mt-2 text-xs text-slate-400 bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                  <ShieldCheck className="w-3 h-3 mt-0.5 text-green-600 shrink-0" />
                  <span>{t.privacyText}</span>
               </div>
            </div>
            <div className="flex flex-col items-end gap-2">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowHelp(true)}
                    className="text-[10px] font-bold bg-slate-100 p-2 rounded hover:bg-slate-200 flex items-center justify-center"
                    title="Help"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={toggleLanguage}
                    className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" /> {language === 'en' ? 'EN' : 'ID'}
                  </button>
                  <button 
                    onClick={resetData}
                    className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> {t.reset}
                  </button>
               </div>
               {saveStatus && (
                 <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider animate-pulse flex items-center gap-1">
                   <Save className="w-3 h-3" /> {saveStatus}
                 </span>
               )}
            </div>
          </header>
          
          <section className="mb-10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Type className="w-4 h-4" /> {t.coreInfo}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">{t.year}</label>
                <input type="text" value={data.year} onChange={(e) => handleInputChange('year', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-500 mb-1">{t.themeTitle}</label>
                <input type="text" value={data.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">{t.metaSubtitle}</label>
              <input type="text" value={data.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
          </section>

          {/* STATS SECTION */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Activity className="w-4 h-4" /> {t.numbers}</h3>
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
                <Plus className="w-4 h-4" /> {t.add} Stat
              </button>
            )}
          </section>

          {/* HIGHLIGHTS SECTION */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Layout className="w-4 h-4" /> {t.highlights}</h3>
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
                   <div className="flex gap-2 mb-2 items-center">
                     <div className="w-10 flex-shrink-0">
                       <input 
                         type="text" 
                         value={item.emoji || ''} 
                         onChange={(e) => handleHighlightChange(item.id, 'emoji', e.target.value)} 
                         className="w-full h-10 text-center text-xl border border-slate-200 rounded-lg focus:border-indigo-500 outline-none"
                         placeholder="✨"
                         maxLength={2}
                       />
                     </div>
                     <input type="text" value={item.title} onChange={(e) => handleHighlightChange(item.id, 'title', e.target.value)} className="flex-1 text-sm font-bold border-b border-slate-100 pb-2 focus:border-indigo-500 outline-none pr-8" placeholder={t.highlightTitle}/>
                   </div>
                  <textarea value={item.desc} onChange={(e) => handleHighlightChange(item.id, 'desc', e.target.value)} className="w-full text-xs text-slate-600 resize-none outline-none h-12" placeholder={t.desc}/>
                </div>
              ))}
            </div>
            {data.highlights.length < 4 && (
              <button onClick={addHighlight} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold uppercase hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> {t.add} Highlight
              </button>
            )}
          </section>

          {/* PHOTOS SECTION */}
          <section className="mb-10">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> {t.gallery}</h3>
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
                         <span className="text-[10px] uppercase font-bold">{t.change}</span>
                         <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(photo.id, e)} />
                      </label>
                   </div>
                ))}
                
                {data.photos.length < 6 && (
                   <button onClick={addPhoto} className="aspect-square border-2 border-dashed border-slate-200 rounded-lg text-slate-400 flex flex-col items-center justify-center gap-1 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
                      <Plus className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase">{t.add}</span>
                   </button>
                )}
             </div>
             <p className="text-[10px] text-slate-400 mt-2">Tap an image to upload your own.</p>
          </section>

           <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Feather className="w-4 h-4" /> {t.summary}</h3>
              <button onClick={generateQuote} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-indigo-100 transition-colors">
                <Wand2 className="w-3 h-3" /> {t.autoGen}
              </button>
            </div>
            <textarea value={data.summary} onChange={(e) => handleInputChange('summary', e.target.value)} className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 text-sm leading-relaxed shadow-sm resize-none" placeholder="Sum up the year..."/>
          </section>

          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Palette className="w-4 h-4" /> {t.chooseVibe}</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollThemes('left')} className="p-1 bg-slate-100 rounded hover:bg-slate-200">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                </button>
                <button onClick={() => scrollThemes('right')} className="p-1 bg-slate-100 rounded hover:bg-slate-200">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div ref={scrollContainerRef} className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTheme(t.id)}
                    className={`flex-shrink-0 p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden group w-32 snap-center ${
                      currentTheme === t.id 
                      ? 'border-indigo-600 ring-2 ring-indigo-50 bg-indigo-50/50' 
                      : 'border-slate-100 hover:border-slate-300 bg-white shadow-sm'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg mb-2 ${t.color} shadow-sm group-hover:scale-105 transition-transform`}></div>
                    <div className="font-bold text-slate-800 text-xs leading-tight">{t.name}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mt-1 truncate">{t.vibe}</div>
                  </button>
                ))}
              </div>
              {/* Right Edge Fade Indicator */}
              <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none flex items-center justify-end pr-1"></div>
            </div>
          </section>

          {/* Site Footer */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-center text-slate-400 text-xs">
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
                    <Play className="w-3 h-3 text-indigo-400 fill-current" /> {t.preview}
                </div>
                <button 
                  onClick={handleDownload} disabled={isDownloading} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                >
                   {isDownloading ? <><RefreshCw className="w-3 h-3 animate-spin" /> {t.saving}</> : <><Download className="w-3 h-3" /> {t.saveSlide}</>}
                </button>
            </div>

            {/* PHONE FRAME */}
            <div className={`relative w-[340px] max-w-full h-[600px] bg-black rounded-[3rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10 transition-transform duration-500 ${isCleanMode ? 'scale-110' : 'scale-100'}`}>
              <div id="preview-capture-area" className="w-full h-full bg-white relative flex flex-col">
                  {/* Story Progress Bars - Kept in Clean Mode */}
                  <div className="absolute top-0 left-0 right-0 p-3 pt-5 z-50 flex gap-1.5 pointer-events-none">
                  {/* Dynamic Progress Bar based on totalSlides */}
                  {Array.from({ length: totalSlides }).map((_, idx) => (
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
                   <Minimize2 className="w-3 h-3" /> {t.exitScreenshot}
                 </button>
               </div>
            )}

            {!isCleanMode && (
              <p className="mt-6 text-slate-500 text-[10px] uppercase tracking-wider opacity-60 flex items-center gap-1">
              <Share2 className="w-3 h-3" /> {t.screenshotHint}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}