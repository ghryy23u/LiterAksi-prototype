import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Mic, 
  Trophy, 
  BarChart3, 
  Settings, 
  User, 
  Lock, 
  LogOut, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Home as HomeIcon,
  HelpCircle,
  Award,
  ChevronRight,
  Flame,
  Star,
  Smile,
  Heart,
  VolumeX,
  Type,
  Zap,
  Check,
  ShieldCheck,
  Target
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Custom Logo Component (SVG Presisi & Tegak Lurus)
const LiterAksiLogo = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} rounded-2xl shadow-md border-2 border-white overflow-hidden shrink-0`}
  >
    {/* Orange Background */}
    <rect width="100" height="100" fill="#F97316" />
    
    {/* White Curved Feather / Tip Shape - Aligned straight */}
    <path 
      d="M 12 100 C 12 100 24 64 42 36 C 60 8 78 0 100 0 L 100 68 C 100 68 76 78 54 86 C 32 94 12 100 12 100 Z" 
      fill="#FFFFFF" 
    />
    
    {/* Yellow Inner Triangle Accent - Perfectly straight & upright */}
    <polygon points="26,84 46,46 70,68" fill="#FACC15" />
  </svg>
);

// Avatars
const AVATARS = [
  { id: 'avatar1', emoji: '🌟', label: 'Bintang Utama', bg: 'bg-amber-100 border-amber-300 text-amber-600' },
  { id: 'avatar2', emoji: '🚀', label: 'Penjelajah', bg: 'bg-sky-100 border-sky-300 text-sky-600' },
  { id: 'avatar3', emoji: '🌿', label: 'Pencinta Alam', bg: 'bg-emerald-100 border-emerald-300 text-emerald-600' },
  { id: 'avatar4', emoji: '🎨', label: 'Kreator', bg: 'bg-orange-100 border-orange-300 text-orange-600' },
  { id: 'avatar5', emoji: '💡', label: 'Inovator', bg: 'bg-purple-100 border-purple-300 text-purple-600' },
];

// Categories matching Flowchart
const CATEGORIES = [
  { id: 'tech', name: 'Teknologi 🚀', icon: '🚀', color: 'from-sky-400 to-blue-500', badgeBg: 'bg-sky-100 text-sky-700 border-sky-200' },
  { id: 'sports', name: 'Olahraga ⚽', icon: '⚽', color: 'from-emerald-400 to-teal-500', badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'art', name: 'Seni & Budaya 🎨', icon: '🎨', color: 'from-purple-400 to-pink-500', badgeBg: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'edu', name: 'Edukasi & Pembangunan 📚', icon: '📚', color: 'from-amber-400 to-orange-500', badgeBg: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'public', name: 'Isu Publik 🌍', icon: '🌍', color: 'from-rose-400 to-red-500', badgeBg: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const SAMPLE_ARTICLES = {
  tech: {
    title: 'Perkembangan Kecerdasan Buatan & Teknologi 🤖',
    readTime: '2 menit',
    content: 'Kecerdasan Buatan (AI) membantu sistem komputer dan perangkat cerdas bekerja dengan sangat cepat. Komputer pintar dapat dipelajari untuk menganalisis data besar, mengenali gambar, dan membantu penyelesaian tugas-tugas rumit secara efisien.',
    keywords: ['komputer', 'ai', 'teknologi', 'data', 'efisien', 'pintar', 'sistem', 'analisis']
  },
  sports: {
    title: 'Manfaat Rutin Berolahraga Kardio Bagi Tubuh 🏃‍♂️',
    readTime: '2 menit',
    content: 'Olahraga seperti berlari, renang, dan bersepeda dapat meningkatkan stamina serta kesehatan jantung. Saat bergerak aktif, tubuh memproduksi hormon endorfin yang meningkatkan suasana hati dan menjaga vitalitas fisik.',
    keywords: ['jantung', 'sehat', 'berlari', 'stamina', 'endorfin', 'olahraga', 'fisik', 'tubuh']
  },
  art: {
    title: 'Melestarikan Kekayaan Seni Batik Nusantara 🎨',
    readTime: '2 menit',
    content: 'Batik merupakan karya seni tradisional bernilai tinggi yang diakui dunia. Pengrajin melukis motif menggunakan alat bernama canting dan lilin malam khusus. Setiap motif memiliki makna filosofis khas dari daerah asalnya.',
    keywords: ['batik', 'budaya', 'canting', 'malam', 'kain', 'nusantara', 'seni', 'tradisional']
  },
  edu: {
    title: 'Transformasi Edukasi Melalui Platform Digital 📚',
    readTime: '2 menit',
    content: 'Pendidikan modern memanfaatkan platform digital untuk mempermudah akses belajar tanpa batas ruang dan waktu. Kemampuan literasi digital yang tinggi melatih daya pikir kritis serta wawasan global secara berkelanjutan.',
    keywords: ['pendidikan', 'digital', 'teknologi', 'wawasan', 'kritis', 'belajar', 'literasi', 'akses']
  },
  public: {
    title: 'Pengelolaan Sampah dan Pelestarian Lingkungan 🌍',
    readTime: '2 menit',
    content: 'Pengelolaan sampah terpadu dengan memisahkan limbah organik dan anorganik sangat penting untuk proses daur ulang. Menjaga kebersihan lingkungan membantu menciptakan bumi yang hijau, sehat, dan bebas dari dampak iklim.',
    keywords: ['sampah', 'daur', 'ulang', 'lingkungan', 'bumi', 'organik', 'bersih', 'sehat']
  }
};

const INITIAL_PROGRESS = [
  { day: 'Sen', points: 80 },
  { day: 'Sel', points: 140 },
  { day: 'Rab', points: 110 },
  { day: 'Kam', points: 190 },
  { day: 'Jum', points: 160 },
  { day: 'Sab', points: 250 },
  { day: 'Min', points: 210 }
];

export default function App() {
  // Navigation states
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  
  // User Data State
  const [userData, setUserData] = useState({
    name: 'Budi Pratama',
    email: 'budi@literaksi.id',
    avatar: AVATARS[0],
    totalPoints: 340,
    selectedInterests: ['tech', 'sports', 'edu'],
    readCount: 7,
    streak: 3
  });

  // Action State
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [currentArticle, setCurrentArticle] = useState(SAMPLE_ARTICLES.tech);
  const [fontSize, setFontSize] = useState('text-base');

  // Quiz State
  const [quizTimer, setQuizTimer] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Web Speech API Setup
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (currentScreen === 'action_quiz' && quizTimer > 0) {
      timerRef.current = setInterval(() => {
        setQuizTimer((prev) => prev - 1);
      }, 1000);
    } else if (quizTimer === 0 && currentScreen === 'action_quiz') {
      finishQuiz();
    }
    return () => clearInterval(timerRef.current);
  }, [currentScreen, quizTimer]);

  // Keyword Detection (Background Processing)
  useEffect(() => {
    if (transcript && currentArticle) {
      const words = transcript.toLowerCase().split(/\s+/);
      const found = currentArticle.keywords.filter(kw => 
        words.some(word => word.includes(kw.toLowerCase()))
      );
      setMatchedKeywords([...new Set(found)]);
    }
  }, [transcript, currentArticle]);

  // Handlers
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register') {
      setCurrentScreen('register_interests');
    } else {
      setCurrentScreen('home');
    }
  };

  const toggleInterest = (id) => {
    setUserData(prev => {
      const exists = prev.selectedInterests.includes(id);
      if (exists) {
        return { ...prev, selectedInterests: prev.selectedInterests.filter(i => i !== id) };
      } else {
        return { ...prev, selectedInterests: [...prev.selectedInterests, id] };
      }
    });
  };

  const startReading = (cat) => {
    setSelectedCategory(cat);
    setCurrentArticle(SAMPLE_ARTICLES[cat.id] || SAMPLE_ARTICLES.tech);
    setCurrentScreen('action_read');
  };

  const startQuiz = () => {
    setQuizTimer(20);
    setTranscript('');
    setMatchedKeywords([]);
    setCurrentScreen('action_quiz');
    startRecording();
  };

  const startRecording = () => {
    setIsRecording(true);
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } catch (e) {}
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  };

  const handleSimulateVoice = () => {
    const textSamples = [
      `Saya baru membaca tentang ${currentArticle.keywords.slice(0, 3).join(", ")} yang ada di artikel.`,
      `Penjelasan artikel ini mengenai ${currentArticle.keywords.slice(1, 4).join(" serta ")} secara komprehensif.`,
      `Penting sekali memahami ${currentArticle.keywords.slice(2, 5).join(" dan ")} untuk masa depan.`
    ];
    const pick = textSamples[Math.floor(Math.random() * textSamples.length)];
    setTranscript(prev => (prev ? prev + " " + pick : pick));
  };

  const finishQuiz = () => {
    stopRecording();
    clearInterval(timerRef.current);
    
    let points = 0;
    if (matchedKeywords.length > 0) {
      points = matchedKeywords.length * 35;
    } else if (transcript.trim().length > 5) {
      points = 15;
    } else {
      points = 0;
    }

    setEarnedPoints(points);
    setUserData(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      readCount: prev.readCount + (points > 0 ? 1 : 0)
    }));

    setCurrentScreen('action_result');
  };

  return (
    <div className="min-h-screen bg-emerald-50/40 text-slate-800 flex flex-col justify-between font-sans antialiased selection:bg-orange-200">
      
      {/* HEADER NAVBAR */}
      {!['auth', 'register_interests', 'howto'].includes(currentScreen) && (
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100 px-4 py-3 shadow-sm">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div 
              onClick={() => setCurrentScreen('home')} 
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition"
            >
              <LiterAksiLogo className="w-10 h-10 shadow-orange-200" />
              <div>
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 bg-clip-text text-transparent">
                  LiterAksi
                </span>
                <span className="text-[10px] block text-emerald-600 font-bold -mt-1 tracking-wider uppercase">Platform Literasi</span>
              </div>
            </div>

            {/* Total Points Pill */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-black text-xs shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{userData.totalPoints} PTS</span>
            </div>
          </div>
        </header>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-md w-full mx-auto p-4 flex-1 flex flex-col justify-center">

        {/* 1. AUTHENTICATION (LOGIN / REGISTER) */}
        {currentScreen === 'auth' && (
          <div className="w-full space-y-5 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="mx-auto flex justify-center hover:scale-105 transition duration-300">
                <LiterAksiLogo className="w-20 h-20 shadow-xl shadow-orange-200 border-4 border-white" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">LiterAksi</h1>
              <p className="text-slate-500 text-xs font-semibold">Tingkatkan Minat Baca & Keterampilan Bicara</p>
            </div>

            {/* Auth Mode Switcher */}
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex shadow-sm">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition ${
                  authMode === 'login' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition ${
                  authMode === 'register' 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Daftar
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xl shadow-emerald-100/40">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-600 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama pengguna" 
                      defaultValue={userData.name}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Pilih Avatar Profil</label>
                    <div className="flex gap-2 justify-between">
                      {AVATARS.map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setUserData(prev => ({ ...prev, avatar: av }))}
                          className={`w-11 h-11 text-xl rounded-2xl flex items-center justify-center border-2 transition ${
                            userData.avatar.id === av.id 
                              ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-sm' 
                              : 'border-slate-200 bg-slate-50 opacity-70'
                          }`}
                        >
                          {av.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-1">Surel (Email)</label>
                <input 
                  type="email" 
                  required
                  placeholder="nama@email.com" 
                  defaultValue={userData.email}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  defaultValue="password123"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none text-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-400 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>{authMode === 'login' ? 'Masuk ke Aplikasi' : 'Lanjut Pilih Minat'}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        )}

        {/* REGISTER: INTEREST SELECTION */}
        {currentScreen === 'register_interests' && (
          <div className="w-full space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-[11px] rounded-full uppercase">Langkah 2</span>
              <h2 className="text-2xl font-black text-slate-800">Pilih Minat Baca</h2>
              <p className="text-slate-500 text-xs font-semibold">Tentukan kategori topik yang Anda sukai.</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {CATEGORIES.map(cat => {
                const isSelected = userData.selectedInterests.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleInterest(cat.id)}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-sm' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-white rounded-xl shadow-sm border border-slate-100">{cat.icon}</span>
                      <span className="font-extrabold text-sm text-slate-800">{cat.name}</span>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                      isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-slate-100'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentScreen('howto')}
              disabled={userData.selectedInterests.length === 0}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Lanjut ke Cara Bermain</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* HOW TO PLAY */}
        {currentScreen === 'howto' && (
          <div className="w-full space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 font-extrabold text-[11px] rounded-full uppercase">Panduan</span>
              <h2 className="text-2xl font-black text-slate-800">Cara Bermain</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl flex gap-3.5 items-center shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-black text-lg">1</div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Pilih & Baca Artikel 📖</h3>
                  <p className="text-xs text-slate-500 font-medium">Baca artikel singkat sesuai minat yang dipilih.</p>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl flex gap-3.5 items-center shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-black text-lg">2</div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Kuis Suara Interaktif 🎙️</h3>
                  <p className="text-xs text-slate-500 font-medium">Jelaskan ulang isi cerita menggunakan suara sebelum batas waktu habis.</p>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl flex gap-3.5 items-center shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-black text-lg">3</div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Kalkulasi Poin Kata Kunci 🏆</h3>
                  <p className="text-xs text-slate-500 font-medium">Sistem otomatis mendeteksi kata kunci relevan dan memberikan poin hadiah.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('home')}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Masuk Beranda Utama</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </button>
          </div>
        )}

        {/* 2. BERANDA (HOME DASHBOARD) */}
        {currentScreen === 'home' && (
          <div className="w-full space-y-5 animate-fadeIn py-1">
            
            {/* User Greeting Card */}
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-orange-400 rounded-3xl p-5 text-white shadow-xl shadow-emerald-200/80 relative overflow-hidden border-4 border-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur border border-white/40 flex items-center justify-center text-2xl shadow-inner">
                    {userData.avatar.emoji}
                  </div>
                  <div>
                    <h2 className="text-xl font-black leading-tight">Selamat Datang, {userData.name}!</h2>
                    <p className="text-xs text-white/90 font-bold">Siap beraktivitas literasi hari ini?</p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-black flex items-center gap-1 shadow-sm">
                  <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>{userData.streak} Hari</span>
                </div>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-white/20">
                <div className="bg-white/15 backdrop-blur p-2.5 rounded-2xl border border-white/20">
                  <span className="text-[11px] text-white/80 font-bold block">Total Poin</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="text-xl font-black">{userData.totalPoints}</span>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur p-2.5 rounded-2xl border border-white/20">
                  <span className="text-[11px] text-white/80 font-bold block">Artikel Selesai</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <BookOpen className="w-5 h-5 text-white" />
                    <span className="text-xl font-black">{userData.readCount} Bacaan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Action Menu */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">Navigasi Utama</h3>
              
              {/* PRIMARY ACTION BUTTON */}
              <button
                onClick={() => setCurrentScreen('action_select')}
                className="w-full p-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-400 hover:opacity-95 text-white rounded-3xl shadow-lg shadow-emerald-200 border-4 border-white flex items-center justify-between group transition active:scale-95"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-base">Aksi Membaca & Kuis Suara</h4>
                    <p className="text-xs text-emerald-100 font-semibold">Pilih topik & ceritakan ulang</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition">
                  <ChevronRight className="w-6 h-6 stroke-[3]" />
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setCurrentScreen('progress')}
                  className="p-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-3xl flex flex-col justify-between text-left transition shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 font-black">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">Progress Bar</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">Grafik Perkembangan</p>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentScreen('settings')}
                  className="p-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-3xl flex flex-col justify-between text-left transition shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 font-black">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">Pengaturan</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">Akun & Profil</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Selected Topics List */}
            <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-600">Minat Aktif Anda</span>
                <button 
                  onClick={() => setCurrentScreen('register_interests')}
                  className="text-xs text-emerald-600 font-extrabold hover:underline"
                >
                  Kelola
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.selectedInterests.map(id => {
                  const cat = CATEGORIES.find(c => c.id === id);
                  if (!cat) return null;
                  return (
                    <span key={id} className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${cat.badgeBg}`}>
                      {cat.name}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* 3. PROGRESS BAR (GRAFIK PERKEMBANGAN HARIAN) */}
        {currentScreen === 'progress' && (
          <div className="w-full space-y-5 animate-fadeIn py-1">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-black"
              >
                <ArrowRight className="w-5 h-5 rotate-180 stroke-[2.5]" />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-800">Bilah Kemajuan</h2>
                <p className="text-xs text-slate-500 font-semibold">Grafik Perkembangan Harian</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-3">Akumulasi Poin Mingguan 📈</h3>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={INITIAL_PROGRESS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderColor: '#10b981', borderRadius: '16px', color: '#1e293b', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="points" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Achievement Collection */}
            <div className="bg-white border-2 border-slate-200 p-4 rounded-3xl space-y-3 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">Pencapaian Literasi 🏅</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">
                    📚
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800">Pembaca Aktif</span>
                  <span className="text-[9px] text-slate-500 font-semibold">7+ Artikel</span>
                </div>

                <div className="bg-sky-50 p-3 rounded-2xl border border-sky-200 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">
                    🎙️
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800">Kuis Suara</span>
                  <span className="text-[9px] text-slate-500 font-semibold">Penyampaian Jelas</span>
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">
                    ⭐
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800">Master Poin</span>
                  <span className="text-[9px] text-slate-500 font-semibold">300+ Poin</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CORE ACTION: SELECT TOPIC */}
        {currentScreen === 'action_select' && (
          <div className="w-full space-y-4 animate-fadeIn py-1">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 font-black"
              >
                <ArrowRight className="w-5 h-5 rotate-180 stroke-[2.5]" />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-800">Pilih Topik Bacaan</h2>
                <p className="text-xs text-slate-500 font-semibold">Pilih satu artikel untuk memulai aktivitas membaca</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => startReading(cat)}
                  className="w-full p-4 bg-white hover:bg-emerald-50/50 border-2 border-slate-200 hover:border-emerald-400 rounded-3xl flex items-center justify-between text-left transition shadow-sm group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm">{cat.name}</h4>
                      <p className="text-xs text-slate-400 font-semibold">Ringkasan Teks • 2 Menit</p>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition font-black">
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CORE ACTION: READING ARTICLE */}
        {currentScreen === 'action_read' && (
          <div className="w-full space-y-4 animate-fadeIn py-1">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentScreen('action_select')}
                className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 font-black"
              >
                <ArrowRight className="w-5 h-5 rotate-180 stroke-[2.5]" />
              </button>
              
              {/* Font Size Adjuster Controls */}
              <div className="flex items-center gap-1 bg-white border-2 border-slate-200 p-1 rounded-2xl">
                <button 
                  onClick={() => setFontSize('text-sm')} 
                  className={`px-2.5 py-1 rounded-xl text-xs font-black ${fontSize === 'text-sm' ? 'bg-emerald-500 text-white' : 'text-slate-600'}`}
                >
                  A-
                </button>
                <button 
                  onClick={() => setFontSize('text-base')} 
                  className={`px-2.5 py-1 rounded-xl text-xs font-black ${fontSize === 'text-base' ? 'bg-emerald-500 text-white' : 'text-slate-600'}`}
                >
                  A
                </button>
                <button 
                  onClick={() => setFontSize('text-lg')} 
                  className={`px-2.5 py-1 rounded-xl text-xs font-black ${fontSize === 'text-lg' ? 'bg-emerald-500 text-white' : 'text-slate-600'}`}
                >
                  A+
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-4 shadow-md relative">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${selectedCategory.badgeBg}`}>
                  {selectedCategory.name}
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2 Menit
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-800 leading-snug">{currentArticle.title}</h3>
              
              <div className={`p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed font-medium ${fontSize}`}>
                {currentArticle.content}
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pahami artikel di atas, lalu lanjutkan ke Kuis Suara untuk menjelaskan kembali.</span>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-400 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>Lanjut ke Kuis Suara</span>
              <Mic className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        )}

        {/* CORE ACTION: VOICE QUIZ */}
        {currentScreen === 'action_quiz' && (
          <div className="w-full space-y-5 animate-fadeIn py-1 text-center">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 font-extrabold text-[11px] rounded-full uppercase">Kuis Suara</span>
              <h2 className="text-2xl font-black text-slate-800">Jelaskan Isi Bacaan</h2>
              <p className="text-xs text-slate-500 font-semibold">Bicaralah secara langsung melalui mikrofon</p>
            </div>

            {/* Timer visual circle */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500 transition-all duration-1000"
                style={{ opacity: quizTimer / 20 }}
              ></div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-emerald-500 mb-0.5 animate-pulse" />
                <span className="text-3xl font-black text-slate-800">{quizTimer}s</span>
              </div>
            </div>

            {/* Mic & Speech Recognition Container */}
            <div className="bg-white border-2 border-slate-200 p-5 rounded-3xl space-y-3 shadow-sm">
              <div className="flex justify-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition border-4 ${
                  isRecording ? 'bg-emerald-100 border-emerald-500 text-emerald-600 animate-pulse' : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}>
                  <Mic className="w-10 h-10 stroke-[2.5]" />
                </div>
              </div>

              {/* Speech Output Box */}
              <div className="min-h-[70px] p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 text-left italic">
                {transcript || (
                  <span className="text-slate-400 not-italic">
                    Sistem sedang mendengarkan ucapan Anda... (Gunakan tombol simulasi jika mikrofon tidak aktif)
                  </span>
                )}
              </div>
            </div>

            {/* Action controls */}
            <div className="space-y-2">
              <button
                onClick={handleSimulateVoice}
                className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Simulasi Suara Ucapan (Uji Otomatis)</span>
              </button>

              <button
                onClick={finishQuiz}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                <span>Selesai & Kalkulasi Poin</span>
                <CheckCircle2 className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* CORE ACTION: REWARD & RELEVANT KEYWORDS RESULT */}
        {currentScreen === 'action_result' && (
          <div className="w-full space-y-5 animate-fadeIn py-1 text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 via-teal-400 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-200 border-4 border-white animate-bounce">
              <Trophy className="w-12 h-12 text-white stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">
                {earnedPoints > 0 ? 'Selesai & Berhasil!' : 'Belum Ada Poin'}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                {earnedPoints > 0 ? 'Sistem telah mengkalkulasi kata kunci relevan dari suara Anda.' : 'Silakan coba kembali dan sebutkan kata kunci dari artikel.'}
              </p>
            </div>

            {/* Reward Summary */}
            <div className="bg-white border-2 border-slate-200 p-5 rounded-3xl space-y-3 shadow-sm">
              <span className="text-xs font-black uppercase text-slate-500">Perolehan Poin</span>
              <div className="text-4xl font-black text-orange-500 flex items-center justify-center gap-1.5">
                <Star className="w-8 h-8 fill-orange-400 text-orange-500" />
                <span>+{earnedPoints} PTS</span>
              </div>

              {/* Matched keywords breakdown */}
              <div className="pt-3 border-t border-slate-100 text-left space-y-2">
                <span className="text-xs font-extrabold text-slate-600 block">Kata Kunci Relevan Terdeteksi:</span>
                {matchedKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {matchedKeywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs rounded-xl font-extrabold">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-semibold italic">Tidak ada kata kunci relevan yang terdeteksi.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('home')}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-400 text-white font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Kembali Ke Beranda</span>
            </button>
          </div>
        )}

        {/* 5. SETTINGS SCREEN */}
        {currentScreen === 'settings' && (
          <div className="w-full space-y-4 animate-fadeIn py-1">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-600 font-black"
              >
                <ArrowRight className="w-5 h-5 rotate-180 stroke-[2.5]" />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-800">Pengaturan</h2>
                <p className="text-xs text-slate-500 font-semibold">Kelola profil dan kata sandi</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-5 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">Informasi Pengguna</h3>
              
              <div className="space-y-3">
                {/* Avatar change */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Ganti Avatar</label>
                  <div className="flex gap-2 justify-between">
                    {AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setUserData(prev => ({ ...prev, avatar: av }))}
                        className={`w-11 h-11 text-xl rounded-2xl flex items-center justify-center border-2 transition ${
                          userData.avatar.id === av.id 
                            ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-sm' 
                            : 'border-slate-200 bg-slate-50 opacity-70'
                        }`}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Surel (Email)</label>
                  <input 
                    type="email" 
                    defaultValue={userData.email}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    placeholder="Masukkan kata sandi baru"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none"
                  />
                </div>

                <button 
                  onClick={() => alert("Profil pengguna berhasil disimpan!")}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-sm transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => setCurrentScreen('auth')}
              className="w-full p-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4 stroke-[2.5]" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="py-3 border-t border-slate-200 text-center text-[11px] font-bold text-slate-400 flex items-center justify-center gap-2">
        <LiterAksiLogo className="w-5 h-5 rounded-lg border-0 shadow-none" />
        <span>LiterAksi • Platform Membaca & Kuis Suara Interaktif</span>
      </footer>
    </div>
  );
}