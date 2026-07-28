import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { 
  Sparkles, 
  LineChart, 
  Star, 
  EyeOff,
  TrendingUp,
  ShieldAlert,
  MessageCircle,
  History,
  ArrowRightLeft,
  ArrowRight,
  UserCheck,
  Mic,
  Keyboard,
  X,
  ChevronLeft,
  MoreHorizontal,
  Eye,
  Heart,
  Plus,
  Play,
  ShieldCheck,
  Settings,
  Info,
  LogOut,
  Shield,
  Zap,
  Activity,
  CheckCircle2,
  Loader2,
  Filter,
  Target,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Sprout,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Link,
  List,
  FileText,
  Maximize2,
  ChevronRight,
  Clock,
  PieChart,
  Search,
  ShoppingCart,
  Database
} from 'lucide-react';

// 直接引用「头像」文件夹里的投顾猎头头像，打包后带哈希 URL 可避免缓存旧图
import 投顾猎头头像 from '../头像/投顾猎头头像.png';
import 产品买手头像 from '../头像/产品买手头像.png';
import 炒股参谋头像 from './assets/quant-avatar.png';
import 炒股参谋引导动画 from './assets/quant-guide.mp4';
// 投顾个人页顶部小头像
import 李华小头像 from '../投资顾问照片/李华小头像.png';
import 赵金胜小头像 from '../投资顾问照片/赵金胜小头像.png';
import 首页观点配图1 from '../首页观点配图/首页观点配图 1.png';

 type AgentType = 'wealth' | 'quant' | 'advisor';
 type ViewState = 'home' | 'guide' | 'chat' | 'advisorProfile' | 'trade' | 'tradeBuy' | 'watchlist';

interface AgentData {
  id: AgentType;
  name: string;
  avatar: string;
}

interface AdvisorProfileData {
  id: string;
  name: string;
  avatar: string;
  certNo: string;
  tags: string[];
  company: string;
  articles: { title: string; views: string; likes: string; image: string; isVideo?: boolean }[];
}

function PhoneStatusBar() {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-[80] flex h-9 items-center justify-between px-8 pt-1 text-[12px] font-semibold text-slate-100">
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex h-3.5 items-end gap-0.5">
          {[4, 6, 8, 10].map(height => (
            <span key={height} className="w-0.5 rounded-full bg-slate-100" style={{ height }} />
          ))}
        </div>
        <div className="relative h-3 w-5 rounded-[3px] border border-slate-100/90">
          <span className="absolute -right-1 top-1 h-1 w-0.5 rounded-r bg-slate-100/90" />
          <span className="absolute inset-y-0.5 left-0.5 w-3.5 rounded-[2px] bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

type ThinkingStep = {
  title: string;
  desc: React.ReactNode;
  icon: React.ReactNode;
};

function ThinkingProcessCard({ steps, step, completed, avatarSrc }: { steps: ThinkingStep[]; step: number; completed: boolean; avatarSrc?: string }) {
  const [expanded, setExpanded] = useState(!completed);

  React.useEffect(() => {
    setExpanded(!completed);
  }, [completed]);

  const currentStep = Math.min(step + 1, steps.length);

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(value => !value)}
        className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          {avatarSrc ? (
            <div className="relative h-8 w-8 shrink-0">
              <img src={avatarSrc} className="h-8 w-8 rounded-full border border-blue-500/30 object-cover" alt="" />
              <span className={`absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-800 ${
                completed ? 'bg-blue-500 text-white' : 'bg-slate-900 text-blue-300'
              }`}>
                {completed ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Loader2 className="h-2.5 w-2.5 animate-spin" />}
              </span>
            </div>
          ) : (
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
              completed
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                : 'bg-blue-600/20 border-blue-500/40 text-blue-300'
            }`}>
              {completed ? <CheckCircle2 className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-100">思考过程</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {completed ? `已完成 ${steps.length} 个步骤` : `正在分析 ${currentStep}/${steps.length}`}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1">
              <div className="space-y-4 relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-700/50 z-0" />

                {steps.map((s, i) => {
                  const isActive = i === step;
                  const isCompleted = i < step;
                  if (i > step) return null;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative z-10 flex gap-4"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        isCompleted ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' :
                        isActive ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' :
                        'bg-slate-800 border-slate-600 text-slate-500'
                      }`}>
                        {isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : s.icon}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className={`text-sm font-bold flex items-center justify-between ${isActive ? 'text-blue-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                          <span>{s.title}</span>
                        </div>
                        <div className={`mt-1 leading-relaxed ${isActive ? 'text-slate-300' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                          {s.desc}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ADVISOR_PROFILES: Record<string, AdvisorProfileData> = {
  'zhao': {
    id: 'zhao',
    name: '赵金胜',
    avatar: 赵金胜小头像,
    certNo: '执业证号:S1220619110019',
    tags: ['高级投资顾问', 'CFA'],
    company: '华创证券',
    articles: [
      { title: '金胜看盘：政策利好频出，科技股能否延续强势？', views: '2.1k', likes: '156', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80', isVideo: true },
      { title: '价值投资实战：如何识别被错杀的优质标的', views: '1.8k', likes: '98', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80' },
      { title: '新能源产业链深度解析：从上游原材料到下游应用', views: '3.2k', likes: '234', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=300&q=80', isVideo: true },
      { title: 'ETF投资入门：指数基金的优势与配置策略', views: '1.5k', likes: '87', image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?auto=format&fit=crop&w=300&q=80' },
      { title: 'AI概念股投资机会：技术突破与商业化进程分析', views: '4.1k', likes: '312', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80', isVideo: true },
      { title: '投资心态管理：如何在市场波动中保持理性', views: '2.8k', likes: '189', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=300&q=80' },
    ]
  },
  'li': {
    id: 'li',
    name: '李华',
    avatar: 李华小头像,
    certNo: '执业证号:S1220619110020',
    tags: ['金牌投顾', '新能源', '半导体', '15年经验'],
    company: '华创证券官方认证投资顾问',
    articles: [
      { title: '半导体行业周期拐点已至？', views: '5.2k', likes: '420', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80', isVideo: true },
      { title: '新能源车出海逻辑深度剖析', views: '3.8k', likes: '280', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&w=300&q=80' },
    ]
  }
};

const AGENTS: Record<AgentType, AgentData> = {
  wealth: {
    id: 'wealth',
    name: '产品买手',
    avatar: 产品买手头像,
  },
  quant: {
    id: 'quant',
    name: '炒股参谋',
    avatar: 炒股参谋头像,
  },
  advisor: {
    id: 'advisor',
    name: '投顾猎头',
    avatar: 投顾猎头头像,
  }
};

function AgentMedia({ src, poster, className, videoClassName, loop = false }: { src?: string; poster: string; className: string; videoClassName?: string; loop?: boolean }) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (src && !videoFailed) {
    return (
      <video
        src={src}
        poster={poster}
        className={videoClassName ?? className}
        autoPlay
        muted
        playsInline
        loop={loop}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return <img src={poster} className={className} referrerPolicy="no-referrer" alt="" />;
}

function TypewriterText({ text }: { text: string, key?: string }) {
  const [displayedText, setDisplayedText] = useState('');
  
  React.useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<ViewState | null>(null); // 追踪前一个页面
  const [showDrawer, setShowDrawer] = useState(false); // 控制左侧抽屉显示

  // 跳转到买入页面
  const handleGoToBuy = () => {
    setPreviousView(currentView);
    setCurrentView('tradeBuy');
  };

  // 从买入页面返回
  const handleBackFromBuy = () => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    } else {
      setCurrentView('home');
    }
  };

  const handleAgentClick = (agentId: AgentType) => {
    setActiveAgent(agentId);
    setCurrentView('guide');
    setInitialPrompt(null);
  };

  const handleStartChat = (prompt?: string) => {
    setInitialPrompt(prompt || null);
    setCurrentView('chat');
  };

  const handleViewProfile = (advisorId: string) => {
    setSelectedAdvisorId(advisorId);
    setCurrentView('advisorProfile');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Ambient Background Glows for Glassmorphism */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Mobile Phone Frame */}
      <div className="w-[390px] h-[844px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 rounded-[3rem] border-[12px] border-slate-950 relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <PhoneStatusBar />
        
        {/* Hardware Notch / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-[90]">
          <div className="w-32 h-6 bg-slate-950 rounded-b-3xl shadow-[inset_0_-2px_4px_rgba(255,255,255,0.05)]"></div>
        </div>

        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView onAgentClick={handleAgentClick} onTradeClick={() => setCurrentView('trade')} onBuyClick={handleGoToBuy} onWatchlistClick={() => setCurrentView('watchlist')} onOpenDrawer={() => setShowDrawer(true)} />
          )}
          {currentView === 'trade' && (
            <TradeView
              onBack={() => setCurrentView('home')}
              onBuy={handleGoToBuy}
            />
          )}
          {currentView === 'tradeBuy' && (
            <TradeBuyView onBack={handleBackFromBuy} />
          )}
          {currentView === 'watchlist' && (
            <WatchlistView onBack={() => setCurrentView('home')} onBuyClick={handleGoToBuy} />
          )}
          {currentView === 'guide' && activeAgent && (
            activeAgent === 'wealth' ? (
              <WealthGuideView onStartChat={handleStartChat} onBack={() => { setCurrentView('home'); setActiveAgent(null); }} />
            ) : activeAgent === 'quant' ? (
              <QuantGuideView onStartChat={handleStartChat} onBack={() => { setCurrentView('home'); setActiveAgent(null); }} />
            ) : activeAgent === 'advisor' ? (
              <AdvisorGuideView onStartChat={handleStartChat} onBack={() => { setCurrentView('home'); setActiveAgent(null); }} />
            ) : (
              <GuideView agent={AGENTS[activeAgent]} onStartChat={handleStartChat} />
            )
          )}
          {currentView === 'chat' && activeAgent && (
            <ChatView agent={AGENTS[activeAgent]} initialPrompt={initialPrompt} onExit={() => { setCurrentView('home'); setActiveAgent(null); }} onViewProfile={handleViewProfile} onBuyClick={handleGoToBuy} />
          )}
          {currentView === 'advisorProfile' && selectedAdvisorId && (
            <AdvisorProfileView profile={ADVISOR_PROFILES[selectedAdvisorId]} onBack={() => setCurrentView('chat')} />
          )}
        </AnimatePresence>

        {/* 左侧用户抽屉 - 在所有视图之上 */}
        <UserDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />

      </div>
    </div>
  );
}

function WatchlistView({ onBack, onBuyClick }: { onBack: () => void; onBuyClick: () => void }) {
  const [activeTab, setActiveTab] = useState<'自选' | '信号'>('自选');
  const [filters, setFilters] = useState({ 上涨趋势: false, 短线强势: false, 利好事件: false });

  // 模拟自选股数据
  const watchlistStocks = [
    { name: '天顺风能', code: '002531', sector: '融', price: 12.42, change: 10.01, chartData: [20, 30, 35, 45, 55, 65, 75, 85, 95, 100] },
    { name: '南网科技', code: '688248', sector: '科', price: 70.20, change: 0.37, chartData: [50, 55, 60, 58, 55, 52, 50, 52, 55, 58] },
    { name: '锡华科技', code: '603248', sector: '融', price: 28.20, change: 9.98, chartData: [25, 35, 40, 50, 60, 70, 80, 85, 92, 98] },
    { name: '*ST高斯', code: '002848', sector: '', price: 12.83, change: 1.58, chartData: [60, 65, 70, 75, 78, 80, 75, 72, 75, 78] },
    { name: '常润股份', code: '603201', sector: '', price: 18.51, change: 0.71, chartData: [65, 67, 70, 68, 66, 65, 64, 65, 67, 68] },
  ];

  const toggleFilter = (filter: '上涨趋势' | '短线强势' | '利好事件') => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 z-40 flex flex-col bg-[#0a1628]"
    >
      {/* Header */}
      <div className="pt-10 pb-3 px-4 bg-[#0d1929]">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a2332] text-slate-400 hover:text-white shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Tab Navigation with Rounded Pills - Centered */}
          <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 shrink-0">
              {(['自选', '信号'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1a2332] text-slate-400 hover:bg-[#1f2937]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-9 shrink-0"></div>
        </div>
      </div>

      {/* Stock List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#0a1628]">
        {/* Filter Bar */}
        <div className="px-4 py-2.5 flex items-center gap-3 bg-[#0d1929] border-b border-slate-800/50 overflow-x-auto scrollbar-hide">
          <button className="text-slate-400 shrink-0">
            <List className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 text-xs text-white bg-[#1a2332] rounded font-medium whitespace-nowrap shrink-0">
            全部
          </button>
          {(['上涨趋势', '短线强势', '利好事件'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1.5 text-xs rounded font-medium transition-colors whitespace-nowrap shrink-0 ${
                filters[filter] ? 'text-white bg-[#1a2332]' : 'text-slate-500 bg-transparent hover:text-slate-400'
              }`}
            >
              {filter}
            </button>
          ))}
          <button className="ml-auto text-slate-400 shrink-0">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Info Bar - moved below filter */}
        <div className="px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-500 bg-[#0a1628]">
          <div className="flex items-center gap-2">
            <span>更新于03-15 23:40:43</span>
            <button className="text-blue-400">刷新</button>
          </div>
          <div className="flex items-center gap-2">
            <span>共 <span className="text-white font-medium">295</span> 只股票</span>
            <button className="text-blue-400">分组条件</button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="px-3 py-2 flex items-center text-xs text-slate-400 bg-[#0d1929]/50 font-medium">
          <div className="w-24">名称</div>
          <div className="flex-1 min-w-[84px] text-center">走势</div>
          <div className="w-20 text-center">最新▼</div>
          <div className="w-20 text-center">涨幅▼</div>
          <div className="w-10"></div>
        </div>

        {/* Stock Items */}
        <div className="px-3">
          {watchlistStocks.map((stock, idx) => (
            <div
              key={idx}
              className="flex items-center py-3.5 border-b border-slate-800/30"
            >
              {/* Stock Info: Name + Code + Sector */}
              <div className="w-24 flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-medium text-white leading-tight">{stock.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-mono">{stock.code}</span>
                  {stock.sector && (
                    <span className="px-1.5 py-0.5 text-[9px] text-slate-400 bg-[#1a2838] border border-slate-700/60 rounded-sm">
                      {stock.sector}
                    </span>
                  )}
                </div>
              </div>

              {/* Mini Chart - 缩小30% (宽度和高度) */}
              <div className="flex-1 min-w-[84px] h-8 flex items-center justify-center">
                <svg className="w-[70%] h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stock.change >= 5 ? "#dc2626" : "#ef4444"} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={stock.change >= 5 ? "#dc2626" : "#ef4444"} stopOpacity="0" />
                    </linearGradient>
                    <filter id={`shadow-${idx}`}>
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                      <feOffset dx="0" dy="1" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Filled area */}
                  <path
                    d={`M 0 100 ${stock.chartData.map((val, i) => `L ${i * 11.11} ${100 - val}`).join(' ')} L 100 100 Z`}
                    fill={`url(#gradient-${idx})`}
                  />
                  {/* Line with shadow */}
                  <path
                    d={`M ${stock.chartData.map((val, i) => `${i * 11.11} ${100 - val}`).join(' L ')}`}
                    fill="none"
                    stroke={stock.change >= 5 ? "#dc2626" : "#ef4444"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#shadow-${idx})`}
                  />
                </svg>
              </div>

              {/* Price */}
              <div className="w-20 flex items-center justify-center shrink-0">
                <div className="text-base font-medium text-white tabular-nums">{stock.price.toFixed(2)}</div>
              </div>

              {/* Change */}
              <div className="w-20 flex items-center justify-center shrink-0">
                <div className={`text-sm font-medium tabular-nums ${stock.change >= 5 ? 'text-red-500' : 'text-red-400'}`}>
                  {stock.change.toFixed(2)}%
                </div>
              </div>

              {/* More Button */}
              <div className="w-10 flex items-center justify-center shrink-0">
                <button className="text-slate-600 hover:text-slate-400">
                  <MoreHorizontal className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TradeBuyView({ onBack }: { onBack: () => void }) {
  const [price, setPrice] = useState('99.67');
  const [quantity, setQuantity] = useState('2000');

  const holdings = [
    { name: '中际旭创', symbol: '300308', marketValue: '150,800.00', quantity: '1,800', currentPrice: '83.78', costPrice: '71.00', pnl: '+23,204.00', pnlPercent: '+18.18%', isPositive: true },
    { name: '比亚迪', symbol: '002594', marketValue: '182,400.00', quantity: '800', currentPrice: '228.00', costPrice: '201.00', pnl: '+21,600.00', pnlPercent: '+13.43%', isPositive: true },
    { name: '新易盛', symbol: '300502', marketValue: '86,400.00', quantity: '1,200', currentPrice: '72.00', costPrice: '79.50', pnl: '-9,000.00', pnlPercent: '-10.38%', isPositive: false },
    { name: '工业富联', symbol: '601138', marketValue: '74,800.00', quantity: '2,000', currentPrice: '37.40', costPrice: '41.00', pnl: '-7,200.00', pnlPercent: '-8.78%', isPositive: false },
    { name: '易方达平稳增长混合', symbol: '110001', marketValue: '32,600.00', quantity: '2,000', currentPrice: '16.30', costPrice: '15.00', pnl: '+2,600.00', pnlPercent: '+8.67%', isPositive: true },
    { name: '富国天惠精选成长A', symbol: '161005', marketValue: '28,000.00', quantity: '1,600', currentPrice: '17.50', costPrice: '16.00', pnl: '+2,400.00', pnlPercent: '+9.38%', isPositive: true },
  ];

  const amount = (() => {
    const p = parseFloat(price);
    const q = parseFloat(quantity);
    if (Number.isNaN(p) || Number.isNaN(q)) return '—';
    return (p * q).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 z-40 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Header：左 返回+交易，右 委托+新建条件单 */}
      <div className="pt-10 pb-3 px-4 flex items-center justify-between border-b border-white/5 bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-100">交易</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-blue-400 text-xs font-medium">
            委托
          </button>
          <button className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-blue-400 text-xs font-medium">
            新建条件单
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="px-4 pt-4 space-y-4">
          {/* Form Card：统一左侧标签宽度为 48px */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="space-y-4">
              {/* 名称 row */}
              <div className="flex gap-4">
                <div className="w-12 shrink-0 flex items-start justify-end pt-1">
                  <div className="text-xs text-slate-400 text-right leading-none">名称</div>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between bg-slate-800/70 rounded-lg px-3 py-2">
                    <span className="text-sm font-semibold text-slate-100">比亚迪 002594</span>
                    <button className="text-slate-500 hover:text-slate-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                      <span className="font-bold text-slate-100">99.67</span>
                      <span className="text-red-400 text-xs">+0.57</span>
                      <span className="text-red-400 text-xs">+0.58%</span>
                    </div>
                    <button className="text-[10px] text-slate-400 bg-slate-800/60 rounded px-2 py-1 flex items-center gap-0.5 border border-white/5 shrink-0 ml-2">
                      <span className="whitespace-nowrap">行情图</span>
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 类型 row */}
              <div className="flex gap-4">
                <div className="w-12 shrink-0 flex items-center justify-end gap-1 pt-1">
                  <span className="text-xs text-slate-400 leading-none">类型</span>
                  <HelpCircle className="w-3 h-3 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <button className="w-full flex items-center justify-between bg-slate-800/70 rounded-lg px-3 py-2 text-sm text-slate-100">
                    <span>限价委托</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  <div className="flex items-center justify-between text-[11px] px-0.5">
                    <span className="text-emerald-400 font-medium">89.70</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <span>预估跌停/涨停</span>
                      <HelpCircle className="w-3 h-3" />
                    </span>
                    <span className="text-red-400 font-medium">109.64</span>
                  </div>
                </div>
              </div>

              {/* 价格 row */}
              <div className="flex gap-4 items-center">
                <div className="w-12 shrink-0 flex items-center justify-end gap-0.5">
                  <span className="text-xs text-slate-400 leading-none">价格</span>
                  <div className="flex flex-col -space-y-1">
                    <ChevronUp className="w-3 h-3 text-slate-500" />
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center bg-slate-800/70 rounded-lg overflow-hidden">
                  <button className="w-20 h-10 flex items-center justify-center text-slate-300 border-r border-slate-700/50 hover:bg-slate-700/50 text-2xl active:bg-slate-700/70 shrink-0">
                    −
                  </button>
                  <input
                    className="flex-1 bg-transparent border-0 outline-none text-center text-base text-slate-100 px-3 py-2 font-medium min-w-0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button className="w-20 h-10 flex items-center justify-center text-slate-300 border-l border-slate-700/50 hover:bg-slate-700/50 text-2xl active:bg-slate-700/70 shrink-0">
                    +
                  </button>
                </div>
              </div>

              {/* 数量 row */}
              <div className="flex gap-4">
                <div className="w-12 shrink-0 flex items-center justify-end gap-0.5 pt-1">
                  <span className="text-xs text-slate-400 leading-none">数量</span>
                  <span className="text-slate-500 text-xs">=</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center bg-slate-800/70 rounded-lg overflow-hidden">
                    <button className="w-20 h-10 flex items-center justify-center text-slate-300 border-r border-slate-700/50 hover:bg-slate-700/50 text-2xl active:bg-slate-700/70 shrink-0">
                      −
                    </button>
                    <input
                      className="flex-1 bg-transparent border-0 outline-none text-center text-base text-slate-100 px-3 py-2 font-medium min-w-0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="w-20 h-10 flex items-center justify-center text-slate-300 border-l border-slate-700/50 hover:bg-slate-700/50 text-2xl active:bg-slate-700/70 shrink-0">
                      +
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 text-right px-0.5">可买——股 可卖——股</div>
                </div>
              </div>

              {/* 仓位区域 */}
              <div className="flex gap-4 items-start">
                <div className="w-12 shrink-0 flex items-center justify-end gap-0.5 pt-2">
                  <span className="text-xs text-slate-400 leading-none">仓位</span>
                  <ChevronUp className="w-3 h-3 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-2.5">
                      {['全仓', '1/2仓', '1/3仓', '1/4仓'].map((label, idx) => (
                        <button
                          key={label}
                          className={`text-xs py-2 rounded-lg font-medium transition-colors ${
                            idx === 0
                              ? 'bg-slate-700 text-slate-200 border border-white/10'
                              : 'bg-slate-800/60 text-slate-400 border border-white/5 hover:bg-slate-700/50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 金额 row */}
              <div className="flex gap-4 items-center pt-2">
                <div className="w-12 shrink-0 text-right">
                  <span className="text-xs text-slate-400 leading-none">金额</span>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-slate-100 font-mono">
                    {amount === '—' ? '—' : `${amount}元`}
                  </div>
                </div>
              </div>

              {/* 买入/卖出按钮 */}
              <div className="pt-3 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <button className="w-full h-11 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white text-base font-bold shadow-lg shadow-red-500/40">
                    买入
                  </button>
                  <span className="text-[10px] text-slate-500">买入后仓位 --</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button className="w-full h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-base font-bold shadow-lg shadow-blue-500/40">
                    卖出
                  </button>
                  <span className="text-[10px] text-slate-500">卖出后仓位 --</span>
                </div>
              </div>
            </div>
          </div>

          {/* 底部标签栏 */}
          <div className="border-b border-white/5 flex gap-6 px-1 text-sm">
            <button className="pb-2 font-medium border-b-2 border-blue-500 -mb-px flex items-center gap-1">
              <span className="text-red-400">持仓</span>
              <span className="text-red-400">{holdings.length}</span>
            </button>
            <button className="pb-2 text-slate-500">委托</button>
            <button className="pb-2 text-slate-500">条件单</button>
            <button className="pb-2 text-slate-500">历史</button>
          </div>

          {/* 持仓列表：与交易总页面保持一致 */}
          <div className="bg-slate-900/70 rounded-2xl border border-white/5 mt-1 overflow-hidden">
            <div className="p-4">
              <div className="grid grid-cols-4 text-[11px] text-slate-500 mb-3 px-1">
                <div className="col-span-1 flex items-center gap-1">名称/代码</div>
                <div className="col-span-1 text-right">市值/数量</div>
                <div className="col-span-1 text-right">现价/成本</div>
                <div className="col-span-1 text-right">持仓盈亏</div>
              </div>
              <div className="space-y-3">
                {holdings.map((stock, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 items-center px-1 py-1 border-b border-white/5 last:border-0 pb-3 last:pb-1"
                  >
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-slate-200">{stock.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.symbol}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className="text-sm text-slate-200 font-mono">{stock.marketValue}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.quantity}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className="text-sm text-slate-200 font-mono">{stock.currentPrice}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.costPrice}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className={`text-sm font-medium font-mono ${stock.isPositive ? 'text-red-400' : 'text-green-400'}`}>
                        {stock.pnl}
                      </div>
                      <div className={`text-xs font-mono mt-0.5 ${stock.isPositive ? 'text-red-400' : 'text-green-400'}`}>
                        {stock.pnlPercent}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** 仅首页顶部三个智能体入口的展示名称（与 AGENTS.name 区分，其它页面仍用原名） */
const HOME_AGENT_ENTRY_LABELS: Record<AgentType, string> = {
  wealth: '买产品',
  quant: '选股票',
  advisor: '找投顾',
};

/** 首页横向卡片内：头像右侧标签，带指向头像的小三角（与原有配色一致） */
function HomeCardAgentTagBubble({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'orange' }) {
  const isOrange = variant === 'orange';
  return (
    <span className="relative inline-flex items-center">
      {/* 外圈三角：与标签描边同色，与气泡边框衔接 */}
      <span
        className={`pointer-events-none absolute right-full top-1/2 z-[1] -translate-y-1/2 translate-x-px w-0 h-0 border-y-[6px] border-y-transparent border-r-[7px] border-l-0 ${
          isOrange ? 'border-r-orange-500/30' : 'border-r-blue-500/30'
        }`}
        aria-hidden
      />
      {/* 内层三角：与标签底色一致 */}
      <span
        className={`pointer-events-none absolute right-full top-1/2 z-[2] -translate-y-1/2 translate-x-[3px] w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-l-0 ${
          isOrange ? 'border-r-orange-500/10' : 'border-r-blue-500/10'
        }`}
        aria-hidden
      />
      <span
        className={`relative z-[3] text-xs font-bold px-2 py-1 rounded-md shadow-sm border ${
          isOrange
            ? 'text-orange-400 bg-orange-500/10 border-orange-500/20'
            : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        }`}
      >
        {children}
      </span>
    </span>
  );
}

/** 左侧抽屉：用户信息与设置菜单 */
function UserDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* 抽屉容器 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 bottom-0 left-0 w-4/5 max-w-sm bg-slate-900 border-r border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* 头部 - 用户信息 */}
            <div className="p-6 pt-12 border-b border-white/5 bg-gradient-to-b from-slate-800/50 to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500/50 p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" 
                    alt="用户头像" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">张三</h3>
                  <p className="text-sm text-slate-400 font-mono mt-0.5">ID: 88**123</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/20">普通账户</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/20">已实名</span>
              </div>
            </div>

            {/* 菜单列表 */}
            <div className="flex-1 overflow-y-auto py-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
                <UserCheck className="w-5 h-5 text-slate-400" />
                <span className="font-medium">个人形象设置</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
                <MessageCircle className="w-5 h-5 text-slate-400" />
                <span className="font-medium">消息中心</span>
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <span className="font-medium">登录与安全</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
                <span className="font-medium">系统设置</span>
              </button>

              <div className="mt-6 px-8">
                <div className="h-px bg-white/5 w-full"></div>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors mt-2">
                <Info className="w-5 h-5 text-slate-400" />
                <span className="font-medium">关于 E 智通</span>
              </button>
            </div>

            {/* 底部 - 退出登录 */}
            <div className="p-6 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-red-400 hover:text-red-300 font-bold border border-red-500/10 hover:border-red-500/30 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const QUANT_HISTORY_RECORDS = [
  { title: '高股息低波动股票', time: '今天 09:28', summary: '股息率高、波动又小的股票有哪些？' },
  { title: '低估值成长组合', time: '昨天 16:42', summary: '筛选下估值不高、成长还不错的股票' },
  { title: '产业景气度选股', time: '昨天 11:05', summary: '产业增长好、个股营收也增长的股票有哪些？' },
  { title: '新兴产业成长股', time: '07-26 14:18', summary: '只看成长评分高、短期表现靠前的股票' },
];

function QuantHistoryDrawer({ isOpen, onClose, onSelect }: { isOpen: boolean; onClose: () => void; onSelect: (question: string) => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[72] bg-slate-950/55 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 top-0 z-[73] flex w-[82%] max-w-[320px] flex-col border-r border-white/10 bg-slate-900/98 shadow-2xl"
          >
            <div className="border-b border-white/5 px-5 pb-4 pt-14">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-bold text-slate-100">历史对话</div>
                  <div className="mt-1 text-[11px] text-slate-500">继续查看之前的选股记录</div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="mx-auto h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3 scrollbar-hide">
              {QUANT_HISTORY_RECORDS.map(record => (
                <button
                  key={`${record.title}-${record.time}`}
                  type="button"
                  onClick={() => {
                    onSelect(record.summary);
                    onClose();
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/45 px-3.5 py-3 text-left transition-colors hover:border-blue-400/25 hover:bg-slate-800/75"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-100">{record.title}</span>
                    <span className="shrink-0 text-[10px] text-slate-500">{record.time}</span>
                  </div>
                  <div className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400">{record.summary}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HomeView({ onAgentClick, onTradeClick, onBuyClick, onWatchlistClick, onOpenDrawer }: { onAgentClick: (id: AgentType) => void, onTradeClick: () => void, onBuyClick: () => void, onWatchlistClick: () => void, onOpenDrawer: () => void }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleCardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const centerPosition = scrollLeft + clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.offsetWidth / 2;
      const distance = Math.abs(childCenter - centerPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex >= 0 && closestIndex < 4) {
      setActiveCardIndex(closestIndex);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col"
    >
      {/* App Header */}
      <header className="pt-10 pb-2 px-6 flex items-center justify-between z-10 relative">
        {/* 左上角抽屉按钮 */}
        <button 
          onClick={onOpenDrawer}
          className="w-8 h-8 rounded-full bg-slate-800/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors shadow-sm flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* 居中的标题文字 - 绝对定位确保完全居中 */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <h1 className="text-xl font-bold text-slate-100 tracking-tight drop-shadow-md">E 智通</h1>
        </div>
        {/* 右侧占位（保持布局平衡） */}
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 scrollbar-hide z-10">
        
        {/* Top Agents Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 mt-4"
        >
          <div className="flex justify-between gap-3 px-6">
            {(Object.values(AGENTS) as AgentData[]).map((a) => (
              <button
                key={a.id}
                onClick={() => onAgentClick(a.id)}
                className="relative flex flex-col items-center flex-1 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 rounded-full p-1 mb-2 bg-slate-800/50 backdrop-blur-md border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] group-hover:border-blue-500/50 transition-colors">
                  <img src={a.avatar} alt={HOME_AGENT_ENTRY_LABELS[a.id]} className="w-full h-full rounded-full object-cover border-2 border-slate-700" referrerPolicy="no-referrer" />
                </div>
                <span className="text-sm font-bold text-slate-200 drop-shadow-sm">{HOME_AGENT_ENTRY_LABELS[a.id]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Scroll Cards */}
        <motion.div 
          ref={scrollContainerRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 scrollbar-hide" 
          style={{ scrollPaddingLeft: '1.5rem' }}
          onScroll={handleCardScroll}
        >
          {/* Card 1: 盯盘 (产品买手) */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-[400px] flex flex-col border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <img src={AGENTS.wealth.avatar} className="w-6 h-6 rounded-full object-cover border border-slate-600" alt="Agent" referrerPolicy="no-referrer" />
                <HomeCardAgentTagBubble>盯盘提醒：持仓产品净值波动</HomeCardAgentTagBubble>
              </div>
              
              <div className="flex items-end gap-2 mb-3 relative z-10">
                <span className="text-2xl font-bold text-slate-100">富国天惠精选成长A</span>
              </div>
              
              <div className="bg-red-500/10 rounded-xl p-3 mb-4 text-sm text-slate-200 flex items-start gap-2 border border-red-500/20 shadow-inner relative z-10">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  近一周产品净值下跌-10%
                </span>
              </div>
              
              <div className="text-sm text-slate-400 mb-auto leading-relaxed relative z-10">
                <p>
                  近一月科技股普跌，该基金因重仓科技股，净值向下波动幅度较大。建议降低该基金持仓比例至{'\u00A0'}<span className="text-blue-400 font-medium bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-md mx-0.5 inline">20%</span>，剩余持仓我会持续跟踪。
                </p>
              </div>
              
              <div className="mt-4 relative z-10 flex justify-center">
                <button 
                  onClick={onBuyClick}
                  className="w-[70%] h-[42px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
                >
                  <span className="font-medium text-[14px] tracking-wide">一键调仓</span>
                  <ArrowRightLeft className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 盯盘 (炒股参谋) */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-[400px] flex flex-col border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <img src={AGENTS.quant.avatar} className="w-6 h-6 rounded-full object-cover border border-slate-600" alt="Agent" referrerPolicy="no-referrer" />
                <HomeCardAgentTagBubble>盯盘发现：自选股与持仓股异动</HomeCardAgentTagBubble>
              </div>

              {/* 赛力斯 - 买入信号（红色） */}
              <div className="mb-3 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-slate-100">赛力斯</span>
                  <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400">自选股</span>
                </div>
                <div className="bg-red-500/10 rounded-lg p-2.5 text-xs text-slate-300 border border-red-500/20">
                  <div className="flex items-start gap-1.5 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">出现短线强势信号，连续 5 日收盘价高于 5 日线且成交量放大</span>
                  </div>
                  <div className="flex justify-center">
                    <button onClick={onBuyClick} className="px-3 py-1 rounded-full bg-red-500/15 hover:bg-red-500/25 text-red-100 text-xs font-medium border border-red-500/30 backdrop-blur-md flex items-center gap-1 transition-all active:scale-95 shadow-sm">
                      买入
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-slate-700/50 my-3 relative z-10"></div>

              {/* 新易盛 - 卖出信号（绿色） */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-slate-100">新易盛</span>
                  <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400">持仓股</span>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-2.5 text-xs text-slate-300 border border-emerald-500/20">
                  <div className="flex items-start gap-1.5 mb-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">近五日主力资金流出（占成交额 20%），由上涨趋势转为震荡趋势，建议减仓</span>
                  </div>
                  <div className="flex justify-center">
                    <button className="px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-100 text-xs font-medium border border-emerald-500/30 backdrop-blur-md flex items-center gap-1 transition-all active:scale-95 shadow-sm">
                      卖出
                      <ArrowDownRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 重要事件 (炒股参谋) */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-[400px] flex flex-col border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <img src={AGENTS.quant.avatar} className="w-6 h-6 rounded-full object-cover border border-slate-600" alt="Agent" referrerPolicy="no-referrer" />
                <HomeCardAgentTagBubble>大事提醒</HomeCardAgentTagBubble>
              </div>
              
              <div className="bg-blue-500/10 rounded-xl p-3 mb-4 border border-blue-500/20 shadow-inner relative z-10">
                <div className="flex items-start gap-2">
                  <Flame className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-base font-bold text-slate-100 leading-snug">AI算力基础设施建设政策出台</span>
                </div>
              </div>
              
              <div className="space-y-2.5 mb-auto relative z-10">
                <div className="text-xs font-semibold text-slate-400">相关影响</div>
                
                {/* 利好板块 */}
                <div className="bg-red-500/5 rounded-lg p-2.5 border border-red-500/10">
                  <div className="text-[10px] text-red-400 font-medium mb-1.5">利好板块</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px] font-medium">光模块</span>
                    <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px] font-medium">AI服务器</span>
                    <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px] font-medium">数据中心</span>
                  </div>
                </div>

                {/* 利空板块 */}
                <div className="bg-emerald-500/5 rounded-lg p-2.5 border border-emerald-500/10">
                  <div className="text-[10px] text-emerald-400 font-medium mb-1.5">利空板块</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/25 rounded text-emerald-400 text-[10px] font-medium">传统IDC</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 relative z-10 flex justify-center">
                <button 
                  onClick={() => {
                    onAgentClick('quant');
                  }}
                  className="w-[70%] h-[42px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
                >
                  <span className="font-medium text-[14px] tracking-wide">查看详情</span>
                  <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: 已签约投顾动态 */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] h-[400px] flex flex-col border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <img src={赵金胜小头像} className="w-6 h-6 rounded-full object-cover border border-slate-600" alt="赵金胜" />
                <HomeCardAgentTagBubble variant="orange">赵金胜：组合调仓</HomeCardAgentTagBubble>
              </div>

              <div className="flex-1 overflow-y-auto relative z-10 pr-1">
                {/* 动态1: 调仓 */}
                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/60 shadow-lg mb-4">
                  <div className="mb-3">
                    <span className="text-sm font-bold text-orange-400">《华创3号-均衡配置组合》</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-slate-400 shrink-0">调入：</span>
                      <span className="text-sm text-slate-100 font-semibold">科大讯飞(002230)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-slate-400 shrink-0">原因：</span>
                      <span className="text-sm text-slate-200 leading-relaxed">AI大模型应用加速落地，营收增长超预期</span>
                    </div>
                  </div>
                </div>

                {/* 动态2: 观点更新 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">观点更新</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img 
                      src={首页观点配图1} 
                      alt="观点配图" 
                      className="w-24 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-100 line-clamp-2 leading-snug">《科技股回调后的调仓思路》</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 relative z-10 flex justify-center">
                <button className="w-[70%] h-[42px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-[0_4px_20px_rgba(59,130,246,0.15)]">
                  <span className="font-medium text-[14px] tracking-wide">查看详情</span>
                  <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-2 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const child = container.children[index] as HTMLElement;
                  if (child) {
                    // Calculate scroll position to center the card
                    const scrollLeft = child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                  }
                }
              }}
              className={`rounded-full transition-all duration-300 ease-out ${
                activeCardIndex === index
                  ? 'w-6 h-1.5 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                  : 'w-1.5 h-1.5 bg-slate-700/60 hover:bg-slate-600'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[2rem] p-2 flex justify-between items-center z-20 gap-2">
        
        {/* Chat Input - 与右侧按钮同高 h-10 */}
        <div className="flex-1 h-10 flex bg-slate-800/60 rounded-full px-4 flex items-center gap-2 border border-white/5 transition-all focus-within:bg-slate-800 focus-within:border-blue-500/50 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
          <input 
            type="text" 
            placeholder="提问" 
            className="bg-transparent text-sm outline-none w-full text-slate-200 placeholder:text-slate-500"
          />
        </div>

        {/* Action Buttons - 与左侧提问框同高 h-10 */}
        <div className="flex items-center gap-2 shrink-0 pr-1">
          <button 
            onClick={onWatchlistClick}
            className="h-10 flex items-center gap-1.5 bg-slate-800 border border-white/10 text-slate-200 px-4 rounded-full hover:bg-slate-700 transition-all shadow-lg active:scale-95"
          >
            <Star className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold tracking-wide">自选</span>
          </button>
          <button 
            onClick={onTradeClick}
            className="h-10 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] border border-white/10 active:scale-95"
          >
            <LineChart className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wide">交易</span>
          </button>
        </div>
      </nav>
    </motion.div>
  );
}

function GuideView({ agent, onStartChat }: { agent: AgentData, onStartChat: (prompt?: string) => void }) {
  const isAdvisor = agent.id === 'advisor';
  
  const introText = agent.id === 'advisor' 
    ? <>你好，我是你的<span className="text-orange-400 font-bold">{agent.name}</span>。我可以根据你的投资偏好、交易风格自动匹配合适的投资顾问，同时，你也可以自己输入自己的要求，我来帮你找。</>
    : agent.id === 'quant'
    ? <>
        <span className="block mb-2">您好，张女士，我是您的专属<span className="text-blue-400 font-bold">{agent.name}</span>，为您选股、择时、盯盘、调仓提供建议。</span>
        <span className="block">最近市场热议的“钨矿涨价事件”，我已通过事件驱动选股模型完成分析，找到 5 只值得重点关注的标的，供您参考。</span>
      </>
    : <>你好，我是你的<span className="text-blue-400 font-bold">{agent.name}</span>。我将通过深度分析了解你的投资偏好，并提供明确的资产配置建议。不管是基金评价、产品筛选，还是组合推荐，都可以随时问我，我就在这儿。</>;

  const prompts = isAdvisor 
    ? ['查看适合我的投资顾问', '了解 AI 领域的投资顾问', '擅长债券类基金研究的投资顾问']
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex justify-end relative z-20">
        <button onClick={() => onStartChat()} className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors">
          跳过
        </button>
      </div>
      
      {/* Avatar */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
        <motion.img 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          src={agent.avatar} 
          className="w-48 h-48 rounded-full object-cover border-4 border-slate-700/50 shadow-[0_0_50px_rgba(59,130,246,0.3)] relative z-10" 
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Text & Controls */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="px-8 pb-12 relative z-10 flex flex-col items-center"
      >
        <p className="text-slate-300 text-base leading-relaxed mb-8 text-center drop-shadow-md">
          {introText}
        </p>

        {prompts.length > 0 && (
          <div className="flex flex-col gap-3 mb-8 w-full max-w-xs">
            {prompts.map((p, i) => (
              <button 
                key={i} 
                onClick={() => onStartChat(p)} 
                className="bg-slate-800/60 backdrop-blur-md border border-white/10 text-slate-200 py-3 px-4 rounded-xl text-sm hover:bg-slate-700 hover:text-white transition-all shadow-md flex items-center justify-between group"
              >
                <span>{p}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-center items-center gap-6">
          <button className="w-14 h-14 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md hover:bg-slate-700 hover:text-white transition-all active:scale-95">
            <Mic className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md hover:bg-slate-700 hover:text-white transition-all active:scale-95">
            <Keyboard className="w-6 h-6" />
          </button>
          <button onClick={() => onStartChat()} className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md hover:bg-red-500/30 hover:text-red-300 transition-all active:scale-95">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center mt-6 text-xs text-slate-500">说话或点击打断</div>
      </motion.div>
    </motion.div>
  );
}

function QuantGuideView({ onStartChat, onBack }: { onStartChat: (prompt?: string) => void, onBack: () => void }) {
  const p1 = "您好，张女士，我可以通过多种选股模型，帮您选股票。";
  const p2_1 = "最近市场热议的“";
  const p2_stat1 = "钨矿涨价事件";
  const p2_2 = "”，我已通过事件驱动选股模型完成分析，找到 ";
  const p2_stat2 = "5 只";
  const p2_3 = " 值得重点关注的标的，供您参考。";
  
  const totalLength = p1.length + p2_1.length + p2_stat1.length + p2_2.length + p2_stat2.length + p2_3.length;

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCharCount(prev => {
        if (prev >= totalLength) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [totalLength]);

  const p1_start = 0;
  const p2_1_start = p1.length;
  const p2_stat1_start = p2_1_start + p2_1.length;
  const p2_2_start = p2_stat1_start + p2_stat1.length;
  const p2_stat2_start = p2_2_start + p2_2.length;
  const p2_3_start = p2_stat2_start + p2_stat2.length;

  const renderText = (text: string, startIdx: number) => {
    if (charCount <= startIdx) return null;
    return <span>{text.slice(0, charCount - startIdx)}</span>;
  };

  const renderStat = (text: string, startIdx: number, colorClass: string) => {
    if (charCount <= startIdx) return null;
    const visibleText = text.slice(0, charCount - startIdx);
    return (
      <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 mx-1 font-bold ${colorClass}`}>
        {visibleText}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Top Header */}
      <div className="flex justify-between items-start px-6 pt-12 pb-2 relative z-20">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:bg-slate-700 transition-colors backdrop-blur-md">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <button onClick={() => onStartChat()} className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors mt-1">
          跳过
        </button>
      </div>

      {/* Avatar Area：炒股参谋虚拟人视频，仅播放一次。容器无动画、视频固定裁切，避免播放中放大。 */}
      <div className="flex-[4] relative flex flex-col items-center justify-end mt-2">
        <div 
          className="relative w-full max-w-[280px] aspect-[4/5] flex items-end justify-center overflow-hidden"
          style={{ contain: 'layout style paint' }}
        >
          <AgentMedia
            src={炒股参谋引导动画}
            poster={AGENTS.quant.avatar}
            loop
            className="absolute inset-0 w-full h-full object-cover object-top"
            videoClassName="absolute inset-0 w-full h-full object-cover object-top [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
          />
          {/* Floor Reflection */}
          <div className="absolute -bottom-4 w-2/3 h-4 bg-blue-500/20 blur-xl rounded-[100%]"></div>
        </div>
      </div>

      {/* Text & Highlights Area */}
      <div className="flex-[6] px-6 pb-8 flex flex-col items-center z-10 w-full max-w-[340px] mx-auto">
        
        {/* Unified Speech Bubble：延迟 0.5s 出现，比视频晚一点 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-full mb-8"
        >
          {/* Bubble Tail */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800/80 border-t border-l border-white/10 rotate-45"></div>
          
          <div className="relative z-10 text-[14px] text-slate-200 leading-relaxed">
            {charCount > p1_start && (
              <div className="flex items-start gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <div className="flex-1">
                  {renderText(p1, p1_start)}
                  {charCount > p1_start && charCount <= p2_1_start && <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-400 animate-pulse"></span>}
                </div>
              </div>
            )}
            
            {charCount > p2_1_start && (
              <div className="flex items-start gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <div className="flex-1 leading-relaxed">
                  {renderText(p2_1, p2_1_start)}
                  {renderStat(p2_stat1, p2_stat1_start, "bg-orange-500/10 border border-orange-500/20 text-orange-400")}
                  {renderText(p2_2, p2_2_start)}
                  {renderStat(p2_stat2, p2_stat2_start, "bg-red-500/10 border border-red-500/20 text-red-400")}
                  {renderText(p2_3, p2_3_start)}
                  {charCount > p2_1_start && <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-400 animate-pulse"></span>}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Button：仅针对引导页钨矿涨价事件，进入专属选股过程与结果页 */}
        {charCount >= totalLength && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => onStartChat('钨矿涨价事件')}
            className="mt-auto mb-6 inline-flex items-center gap-2.5 bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 px-6 py-3 rounded-full font-medium text-[15px] border border-blue-500/30 backdrop-blur-md transition-all active:scale-95 group shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
          >
            <Eye className="w-4.5 h-4.5 text-blue-400" />
            <span className="tracking-wide">立即查看</span>
            <div className="bg-blue-500/20 rounded-full p-1 ml-1 group-hover:bg-blue-500/40 transition-colors">
              <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function WealthGuideView({ onStartChat, onBack }: { onStartChat: () => void, onBack: () => void }) {
  const p1 = "张女士，您好～已为您筛选适合您的基金产品。";
  const p2_1 = "这些基金产品在过去 3 年，实现了不错的投资收益";
  const p2_stat1 = "平均年化 +15%";
  const p2_2 = "，同时保持了最大向下波动不超过";
  const p2_stat2 = "-20%";
  const p2_3 = "，适合做 ";
  const p2_stat3 = "1-3年";
  const p2_4 = " 中长期投资。";
  const p3 = "不用您动手，一切我来搞定！";
  
  const totalLength = p1.length + p2_1.length + p2_stat1.length + p2_2.length + p2_stat2.length + p2_3.length + p2_stat3.length + p2_4.length + p3.length;

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCharCount(prev => {
        if (prev >= totalLength) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [totalLength]);

  const p1_start = 0;
  const p2_1_start = p1.length;
  const p2_stat1_start = p2_1_start + p2_1.length;
  const p2_2_start = p2_stat1_start + p2_stat1.length;
  const p2_stat2_start = p2_2_start + p2_2.length;
  const p2_3_start = p2_stat2_start + p2_stat2.length;
  const p2_stat3_start = p2_3_start + p2_3.length;
  const p2_4_start = p2_stat3_start + p2_stat3.length;
  const p3_start = p2_4_start + p2_4.length;

  const renderText = (text: string, startIdx: number) => {
    if (charCount <= startIdx) return null;
    return <span>{text.slice(0, charCount - startIdx)}</span>;
  };

  const renderStat = (text: string, startIdx: number, colorClass: string) => {
    if (charCount <= startIdx) return null;
    const visibleText = text.slice(0, charCount - startIdx);
    return (
      <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 mx-1 font-bold ${colorClass}`}>
        {visibleText}
      </span>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Top Header */}
      <div className="flex justify-between items-start px-6 pt-12 pb-2 relative z-20">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:bg-slate-700 transition-colors backdrop-blur-md">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <button onClick={() => onStartChat()} className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors mt-1">
          跳过
        </button>
      </div>

      {/* Avatar Area (Clean, ready for digital human) */}
      <div className="flex-[4] relative flex flex-col items-center justify-end mt-2">
        <motion.div 
          animate={{ y: [0, -4, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-full max-w-[280px] aspect-[4/5] flex items-end justify-center"
        >
          {/* 虚拟人形象：使用本地「产品买手虚拟人」视频，只播放一次 */}
          <AgentMedia
            src="/虚拟人引导/产品买手虚拟人.mov"
            poster={AGENTS.wealth.avatar}
            className="w-full h-full object-cover object-top"
            videoClassName="w-full h-full object-cover object-top [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
          />
          {/* Floor Reflection */}
          <div className="absolute -bottom-4 w-2/3 h-4 bg-blue-500/20 blur-xl rounded-[100%]"></div>
        </motion.div>
      </div>

      {/* Text & Highlights Area（底部留白约 10vh，气泡与按钮整体上移） */}
      <div className="flex-[6] px-6 pb-[10vh] flex flex-col items-center z-10 w-full max-w-[340px] mx-auto">
        
        {/* Unified Speech Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-full mb-8"
        >
          {/* Bubble Tail */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800/80 border-t border-l border-white/10 rotate-45"></div>
          
          <div className="relative z-10 text-[14px] text-slate-200 leading-relaxed">
            {charCount > p1_start && (
              <div className="mb-3">
                {renderText(p1, p1_start)}
                {charCount > p1_start && charCount <= p2_1_start && <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-400 animate-pulse"></span>}
              </div>
            )}
            
            {charCount > p2_1_start && (
              <div className="flex items-start gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <div className="flex-1 leading-relaxed">
                  {renderText(p2_1, p2_1_start)}
                  {renderStat(p2_stat1, p2_stat1_start, "bg-red-500/10 border border-red-500/20 text-red-400")}
                  {renderText(p2_2, p2_2_start)}
                  {renderStat(p2_stat2, p2_stat2_start, "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400")}
                  {renderText(p2_3, p2_3_start)}
                  {renderStat(p2_stat3, p2_stat3_start, "bg-blue-500/10 border border-blue-500/20 text-blue-400")}
                  {renderText(p2_4, p2_4_start)}
                  {charCount > p2_1_start && charCount <= p3_start && <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-400 animate-pulse"></span>}
                </div>
              </div>
            )}

            {charCount > p3_start && (
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                <div className="flex-1">
                  {renderText(p3, p3_start)}
                  {charCount > p3_start && <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-400 animate-pulse"></span>}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        {charCount >= totalLength && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onStartChat}
            className="mt-auto mb-6 inline-flex items-center gap-2.5 bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 px-6 py-3 rounded-full font-medium text-[15px] border border-blue-500/30 backdrop-blur-md transition-all active:scale-95 group shadow-[0_4px_20px_rgba(59,130,246,0.15)]"
          >
            <Eye className="w-4.5 h-4.5 text-blue-400" />
            <span className="tracking-wide">立即查看</span>
            <div className="bg-blue-500/20 rounded-full p-1 ml-1 group-hover:bg-blue-500/40 transition-colors">
              <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/** 投顾猎头-引导页：展示方式参考产品买手引导页 */
function AdvisorGuideView({ onStartChat, onBack }: { onStartChat: (prompt?: string) => void, onBack: () => void }) {
  const p1 = "张女士～，根据您的投资偏好与交易风格，已为您找到";
  const p1_highlight = "两位匹配的投资顾问";
  const p2 = "。您也可以直接输入要求，我来帮您找。";
  const totalLength = p1.length + p1_highlight.length + p2.length;

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCharCount(prev => {
        if (prev >= totalLength) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [totalLength]);

  const p1_end = p1.length;
  const highlight_end = p1_end + p1_highlight.length;

  const renderText = (text: string, startIdx: number, endIdx: number) => {
    if (charCount <= startIdx) return null;
    return <span>{text.slice(0, Math.min(charCount - startIdx, endIdx - startIdx))}</span>;
  };

  const prompts = ['查看适合我的投资顾问', '了解 AI 领域的投资顾问', '擅长债券类基金研究的投资顾问'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Top Header */}
      <div className="flex justify-between items-start px-6 pt-12 pb-2 relative z-20">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:bg-slate-700 transition-colors backdrop-blur-md">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <button onClick={() => onStartChat()} className="text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors mt-1">
          跳过
        </button>
      </div>

      {/* Avatar Area：虚拟人视频（仅投顾猎头引导页） */}
      <div className="flex-[4] relative flex flex-col items-center justify-end mt-2">
        <motion.div 
          animate={{ y: [0, -4, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-full max-w-[280px] aspect-[4/5] flex items-end justify-center"
        >
          <AgentMedia
            src="/虚拟人引导/投顾猎头虚拟人.mov"
            poster={AGENTS.advisor.avatar}
            className="w-full h-full object-cover object-top rounded-lg"
            videoClassName="w-full h-full object-cover object-top rounded-lg [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
          />
          <div className="absolute -bottom-4 w-2/3 h-4 bg-orange-500/20 blur-xl rounded-[100%]"></div>
        </motion.div>
      </div>

      {/* Text & Actions Area */}
      <div className="flex-[6] px-6 pb-8 flex flex-col items-center z-10 w-full max-w-[340px] mx-auto">
        
        {/* Unified Speech Bubble (含文案 + 三个提示词) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl w-full mb-6"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800/80 border-t border-l border-white/10 rotate-45"></div>
          
          <div className="relative z-10">
            <div className="text-[14px] text-slate-200 leading-relaxed mb-4">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                <div className="flex-1">
                  {renderText(p1, 0, p1_end)}
                  {charCount > p1_end && (
                    <span className="text-orange-400 font-bold">
                      {p1_highlight.slice(0, Math.min(charCount - p1_end, p1_highlight.length))}
                    </span>
                  )}
                  {charCount > highlight_end && renderText(p2, highlight_end, totalLength)}
                  {charCount > 0 && charCount < totalLength && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-orange-400 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>

            {/* 三个提示词放在气泡内 */}
            {charCount >= totalLength && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 pt-2 border-t border-white/10"
              >
                {prompts.map((p, i) => (
                  <button 
                    key={i} 
                    onClick={() => onStartChat(p)} 
                    className="w-full text-left bg-slate-700/50 hover:bg-slate-700 border border-white/5 hover:border-orange-500/30 text-slate-200 py-2.5 px-3 rounded-lg text-[13px] transition-all flex items-center justify-between group"
                  >
                    <span>{p}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-orange-400 transition-colors shrink-0" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function QuantTaskOrchestration({ modelName }: { modelName: string }) {
  const [step, setStep] = useState(0);

  const steps = [
    { title: '全市场扫描', desc: '正在扫描沪深京A股共5300+只股票...', icon: <Target className="w-4 h-4" /> },
    { title: '趋势过滤', desc: '筛选均线多头排列、MACD金叉的标的，剩余 342 只...', icon: <Filter className="w-4 h-4" /> },
    { title: '量能确认', desc: '过滤缩量上涨和无量空涨标的，要求近5日温和放量，剩余 56 只...', icon: <Activity className="w-4 h-4" /> },
    { title: '基本面防雷', desc: '剔除ST股、业绩亏损及存在违规风险的标的，剩余 12 只...', icon: <Shield className="w-4 h-4" /> },
    { title: '最终优选', desc: '结合行业景气度与资金流向，为您精选以下 3 只趋势龙头：', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  React.useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [step, steps.length]);

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="w-5 h-5 text-blue-400" />
        <span className="text-base font-bold text-slate-100">{modelName} 运行中</span>
      </div>
      
      <div className="space-y-4 relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-700/50 z-0"></div>

        {steps.map((s, i) => {
          const isActive = i === step;
          const isCompleted = i < step;
          const isPending = i > step;

          if (isPending) return null;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex gap-4"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                isCompleted ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 
                isActive ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 
                'bg-slate-800 border-slate-600 text-slate-500'
              }`}>
                {isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : s.icon}
              </div>
              <div className="flex-1 pt-1">
                <div className={`text-sm font-bold ${isActive ? 'text-blue-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                  {s.title}
                </div>
                <div className={`text-xs mt-1 leading-relaxed ${isActive ? 'text-slate-300' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                  {s.desc}
                </div>
                
                {/* Result Cards for the final step */}
                {i === steps.length - 1 && isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 space-y-2"
                  >
                    {[
                      { name: '中际旭创', code: '300308', reason: '算力核心标的，量价齐升' },
                      { name: '工业富联', code: '601138', reason: 'AI服务器龙头，突破平台' },
                      { name: '新易盛', code: '300502', reason: '光模块高景气，资金持续流入' }
                    ].map((stock, idx) => (
                      <div key={idx} className="bg-slate-900/50 rounded-xl p-3 border border-white/5 flex justify-between items-center">
                        <div>
                          <div className="text-sm font-bold text-slate-200">{stock.name} <span className="text-xs text-slate-500 font-mono ml-1">{stock.code}</span></div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{stock.reason}</div>
                        </div>
                        <button className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30 hover:bg-blue-600/40 transition-colors">
                          查看
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('reset-quant-model'))}
                      className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      重新选择模型
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** 炒股参谋-对话页「成长股模型」：行业景气轮动 + 个股优选的成长股选股流程。 */
function GrowthStockFlowView({ onComplete, onBuyClick, onQuestionClick }: { onComplete?: () => void; onBuyClick?: () => void; onQuestionClick?: (question: string) => void }) {
  const [step, setStep] = useState(0);
  const completedRef = React.useRef(false);
  const [expandedSectors, setExpandedSectors] = useState(false);

  const steps: { title: string; desc: React.ReactNode; icon: React.ReactNode; editable?: boolean }[] = [
    {
      title: '行业景气度筛选',
      desc: (
        <div className="space-y-2">
          <div className="text-xs font-medium text-blue-400 mb-1.5">锁定 5 条高景气成长产业</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 text-[10px] font-bold">高景气</span>
              <span className="text-[11px] text-slate-400">AI 算力 · 利润增速中位数 +42%，指数站上 MA60</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 text-[10px] font-bold">高景气</span>
              <span className="text-[11px] text-slate-400">半导体设备 · 国产替代加速，营收增速 +38%</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-400 text-[10px] font-bold">高景气</span>
              <span className="text-[11px] text-slate-400">新能源车 · 出海订单回暖，龙头份额提升</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 text-[10px] font-bold">回升</span>
              <span className="text-[11px] text-slate-400">创新药 · 管线催化密集，景气得分回升</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 text-[10px] font-bold">回升</span>
              <span className="text-[11px] text-slate-400">军工电子 · 订单能见度改善，业绩加速</span>
            </div>
          </div>
        </div>
      ),
      icon: <Sprout className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '成长产业龙头锁定',
      desc: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-blue-400 font-medium">优选 12 个细分产业龙头池</div>
            <button 
              onClick={() => setExpandedSectors(!expandedSectors)}
              className="text-[10px] text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <span>{expandedSectors ? '收起' : '展开'}</span>
              <ChevronLeft className={`w-3 h-3 transition-transform ${expandedSectors ? 'rotate-90' : '-rotate-90'}`} />
            </button>
          </div>
          
          {expandedSectors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 pt-1"
            >
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-medium">AI 算力产业 → 龙头方向：</div>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">光模块</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">AI 芯片</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">服务器</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-medium">半导体设备产业 → 龙头方向：</div>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">刻蚀设备</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">薄膜沉积</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">检测设备</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-medium">新能源车产业 → 龙头方向：</div>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">整车龙头</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">动力电池</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">热管理</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-500 font-medium">创新药产业 → 龙头方向：</div>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">ADC 药物</span>
                  <span className="px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded text-red-400 text-[10px]">双抗</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ),
      icon: <LineChart className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '成长股初筛',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• 扣非净利润增速 &gt; 行业均值 1.5 倍</div>
          <div className="text-xs text-slate-400">• 连续 2 季度业绩加速</div>
          <div className="text-xs text-slate-400">• 细分产业市值 / 营收排名前 20%</div>
        </div>
      ),
      icon: <Filter className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '基本面排雷',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• 非 ST 股票</div>
          <div className="text-xs text-slate-400">• 大股东质押率 &lt; 50%</div>
          <div className="text-xs text-slate-400">• 商誉 / 净资产 &lt; 30%</div>
          <div className="text-xs text-slate-400">• 流通市值 ≥ 50 亿</div>
          <div className="text-xs text-slate-400">• 经营现金流连续两年为正</div>
        </div>
      ),
      icon: <Shield className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '成长性与择时确认',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">PE 估值 &lt; 行业中位数 × 1.3</div>
          <div className="text-xs text-slate-400">ROE &gt; 行业中位数且 &gt; 5%</div>
          <div className="text-xs text-slate-400">股价站上 MA60，近 20 日趋势向上</div>
          <div className="text-xs text-blue-400 font-medium mt-1">最终精选 3 只高景气成长股</div>
        </div>
      ),
      icon: <TrendingUp className="w-4 h-4" />,
      editable: true,
    },
  ];

  React.useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, steps.length]);

  React.useEffect(() => {
    if (step === steps.length && step > 0 && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [step, steps.length, onComplete]);

  const allStepsCompleted = step >= steps.length;

  const suggestedQuestions = [
    '研发费用连续 3 年递增',
    '研发占比高于行业均值',
    '营收增速行业前 30%',
    '利润增速行业前 30%',
    '经营现金流为正',
    'ROE 高于 15%',
  ];

  // 选股结果：展示 3 只高景气成长股
  const resultStocks: {
    name: string;
    code: string;
    reason: string;
    price: string;
    change: string;
    changeUp: boolean;
    recentGain: string;
    valuation: string;
    growthScore: string;
  }[] = [
    { 
      name: '中际旭创', 
      code: '300308', 
      reason: '经营现金流：2025Q1 为 18.6 亿元；利润增速：2025Q1 扣非净利润同比 +85%。', 
      price: '86.42', 
      change: '+3.21%', 
      changeUp: true,
      recentGain: '近5日 +12.8%',
      valuation: 'PE 35.2',
      growthScore: '9.2分'
    },
    { 
      name: '北方华创', 
      code: '002371', 
      reason: '营收增速：2025Q1 营业收入同比 +38%；利润增速：2025Q1 扣非净利润同比 +42%。', 
      price: '312.60', 
      change: '+2.48%', 
      changeUp: true,
      recentGain: '近5日 +8.6%',
      valuation: 'PE 42.5',
      growthScore: '8.8分'
    },
    { 
      name: '宁德时代', 
      code: '300750', 
      reason: '经营现金流：2025Q1 为 126.4 亿元；营收增速：2025Q1 营业收入同比 +18%。', 
      price: '198.50', 
      change: '+1.86%', 
      changeUp: true,
      recentGain: '近5日 +5.2%',
      valuation: 'PE 22.8',
      growthScore: '8.5分'
    },
  ];

  return (
    <>
      <ThinkingProcessCard steps={steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

      {allStepsCompleted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mt-4"
          >
            {resultStocks.map((stock, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${stock.changeUp ? 'bg-red-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl pointer-events-none`} />
              
              <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.price}</span>
                  <span className={`text-sm font-bold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>
                    {stock.change}
                  </span>
                </div>
              </div>

              {/* 关键数据区：三个指标并排 */}
              <div className="flex items-center justify-around py-2.5 mb-3 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-white/5 relative z-10">
                <div className="text-center flex-1">
                  <div className={`text-base font-bold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>
                    {stock.recentGain.split(' ')[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">近5日涨幅</div>
                </div>
                <div className="w-px h-7 bg-slate-700/50" />
                <div className="text-center flex-1">
                  <div className="text-base font-bold text-blue-400 tabular-nums">
                    {stock.valuation.split(' ')[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{stock.valuation.split(' ')[0]}</div>
                </div>
                <div className="w-px h-7 bg-slate-700/50" />
                <div className="text-center flex-1">
                  <div className="text-base font-bold text-slate-300 tabular-nums">
                    {stock.growthScore}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">成长评分</div>
                </div>
              </div>

              <div className="mb-3 relative z-10">
                <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 mb-1 inline-block">
                  入选理由
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stock.reason}
                </p>
              </div>

              <div className="flex justify-center">
                <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                  <span className="font-medium text-[13px] tracking-wide">买入</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            </div>
            ))}
          </motion.div>

          <ModelSuggestedQuestions questions={suggestedQuestions} onQuestionClick={onQuestionClick} />
        </>
      )}
    </>
  );
}

/** Q-05: 趋势跟随模型-选股结果页 */
function TrendFollowingFlowView({ onComplete, onBuyClick, onAddToWatchlist }: { onComplete?: () => void; onBuyClick?: () => void; onAddToWatchlist?: () => void }) {
  const [step, setStep] = useState(0);
  const completedRef = React.useRef(false);

  const steps: { title: string; desc: React.ReactNode; icon: React.ReactNode; editable?: boolean }[] = [
    {
      title: '确定选股范围',
      desc: (
        <div className="space-y-1.5">
          <div className="text-xs text-slate-400">从以下指数成分股中筛选：</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-xs font-medium">沪深 300 成分股</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-xs font-medium">中证 500 成分股</span>
          </div>
          <div className="text-xs text-blue-400 font-medium mt-2">共计 800 只优质股票池</div>
        </div>
      ),
      icon: <Target className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '趋势状态识别',
      desc: (
        <div className="space-y-2">
          <div className="text-xs text-slate-400 mb-1">基于均线系统和价格走势，识别每只股票的趋势状态：</div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-2 py-1.5 bg-slate-900/40 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                <span className="text-xs text-slate-300 font-medium">上升趋势</span>
              </div>
              <span className="text-xs font-bold text-red-400">220 只</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 bg-slate-900/40 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <span className="text-xs text-slate-300 font-medium">震荡趋势</span>
              </div>
              <span className="text-xs font-bold text-amber-400">318 只</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 bg-slate-900/40 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-xs text-slate-300 font-medium">下跌趋势</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">262 只</span>
            </div>
          </div>
        </div>
      ),
      icon: <TrendingUp className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '趋势跟随信号',
      desc: (
        <div className="space-y-2">
          <div className="text-xs text-slate-400 mb-1">捕捉趋势转折和突破信号：</div>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">下跌趋势转为上涨趋势</span>
                  <span className="text-xs font-bold text-red-400">23 只</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">向上突破震荡趋势</span>
                  <span className="text-xs font-bold text-red-400">12 只</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">上涨趋势回调获得支撑</span>
                  <span className="text-xs font-bold text-red-400">8 只</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-blue-400 font-medium mt-2 pt-2 border-t border-white/5">合计触发信号 43 只</div>
          </div>
        </div>
      ),
      icon: <Activity className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '基本面过滤',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• 最近两季度净利润同比增长 &gt; 20%</div>
          <div className="text-xs text-slate-400">• 近三月研究报告评级为"买入"</div>
          <div className="text-xs text-slate-400">• 非 ST 股票</div>
          <div className="text-xs text-slate-400">• 未来三月无减持计划</div>
          <div className="text-xs text-red-400 font-medium mt-2">最终精选 4 只优质趋势标的</div>
        </div>
      ),
      icon: <Shield className="w-4 h-4" />,
      editable: true,
    },
  ];

  React.useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, steps.length]);

  React.useEffect(() => {
    if (step === steps.length && step > 0 && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [step, steps.length, onComplete]);

  const allStepsCompleted = step >= steps.length;

  // 选股结果：4只趋势强劲的股票
  const resultStocks: {
    name: string;
    code: string;
    price: string;
    change: string;
    changeUp: boolean;
    trend20d: string;
    trend60d: string;
    macdStatus: string;
    support: string;
    target: string;
    reason: string;
    signalType: 'breakout' | 'reversal' | 'support' | 'strong';
    signalLabel: string;
    klineImage: string;
    trendStatus: string;
    entryPrice: string;
    pressureLevel: string;
    catalyst: string;
  }[] = [
    {
      name: '宁德时代',
      code: '300750',
      price: '188.60',
      change: '+3.45%',
      changeUp: true,
      trend20d: '近20日 +22.3%',
      trend60d: '近60日 +41.8%',
      macdStatus: 'MACD金叉 第12天',
      support: '支撑位 ¥175',
      target: '目标位 ¥218',
      reason: '动力电池全球龙头，前期在170-190区间震荡整理近两月，成交量持续萎缩。近期放量突破震荡平台上沿，创出近期新高，均线系统转为多头排列。一季度业绩预增超预期，机构密集调研，基本面拐点向上确认。突破后回踩确认有效，当前为追涨买点。',
      signalType: 'breakout',
      signalLabel: '向上突破震荡趋势',
      klineImage: '/K 线图/震荡突破.png',
      trendStatus: '当前处于震荡突破后的上涨初期阶段。',
      entryPrice: '185-187元',
      pressureLevel: '短期压力位195元',
      catalyst: '一季度业绩预增超预期，动力电池出货量持续增长，钠电池技术突破'
    },
    {
      name: '比亚迪',
      code: '002594',
      price: '232.80',
      change: '+2.68%',
      changeUp: true,
      trend20d: '近20日 +18.5%',
      trend60d: '近60日 +38.2%',
      macdStatus: 'MACD金叉 第8天',
      support: '支撑位 ¥218',
      target: '目标位 ¥268',
      reason: '新能源汽车龙头，前期受行业杀跌影响持续下行，在200附近构筑底部。出海订单持续增长叠加比亚迪海豹销量超预期，驱动股价从底部启动反转。MACD零轴下方金叉后快速上穿零轴，下跌趋势反转为上升趋势。当前突破所有均线压力，趋势反转确立。',
      signalType: 'reversal',
      signalLabel: '下跌趋势转为上涨趋势',
      klineImage: '/K 线图/趋势反转.png',
      trendStatus: '已完成下跌趋势向上涨趋势的反转。',
      entryPrice: '218-222元',
      pressureLevel: '短期压力位245元，关键支撑位218元',
      catalyst: '2月销量同比增长32%，海外市场持续突破，插混车型市占率提升至行业第一'
    },
    {
      name: '中际旭创',
      code: '300308',
      price: '89.20',
      change: '+5.23%',
      changeUp: true,
      trend20d: '近20日 +31.8%',
      trend60d: '近60日 +55.6%',
      macdStatus: 'MACD金叉 第15天',
      support: '支撑位 ¥82',
      target: '目标位 ¥105',
      reason: '光模块龙头，AI算力需求推动股价持续强势上涨。前期快速拉升后出现健康回调，回踩至30日均线（82元）位置获强支撑，成交量明显萎缩。近日再度放量拉升突破前高，均线系统保持完美多头排列。MACD持续金叉已15天，动量充沛，上升趋势延续性强。',
      signalType: 'support',
      signalLabel: '上涨趋势回调获得支撑',
      klineImage: '/K 线图/上升趋势回调.png',
      trendStatus: '处于强势上涨趋势中，已回调至关键支撑位，有望延续上涨趋势。',
      entryPrice: '82-85元',
      pressureLevel: '关键支撑位82元',
      catalyst: 'AI大模型训练需求激增，800G光模块订单爆发，英伟达GB200服务器大规模出货'
    },
    {
      name: '隆基绿能',
      code: '601012',
      price: '22.85',
      change: '+4.12%',
      changeUp: true,
      trend20d: '近20日 +25.7%',
      trend60d: '近60日 +48.3%',
      macdStatus: 'MACD金叉 第10天',
      support: '支撑位 ¥20.8',
      target: '目标位 ¥27.5',
      reason: '光伏组件龙头，底部放量突破后持续走强，趋势斜率陡峭显示多头力量强劲。均线系统呈现完美发散状态，5日、10日、20日、60日均线依次排列向上。硅料价格持续回落改善成本端，盈利能力修复预期强烈，为全市场趋势最强板块之一。',
      signalType: 'strong',
      signalLabel: '下跌趋势转为上涨趋势',
      klineImage: '/K 线图/趋势反转.png',
      trendStatus: '底部反转后进入强势上涨阶段。',
      entryPrice: '20.8-21.5元',
      pressureLevel: '关键支撑位20.8元',
      catalyst: '硅料价格下跌改善成本端，海外光伏装机需求超预期，BC电池技术领先优势扩大'
    },
  ];

  return (
    <>
      <ThinkingProcessCard steps={steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

      {allStepsCompleted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mt-4"
          >
            {resultStocks.map((stock, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden group"
              >
                {/* 装饰性背景光晕 */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${stock.changeUp ? 'bg-red-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl pointer-events-none`} />
                
                {/* 头部：股票名称、代码、价格与涨跌幅 */}
                <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                        <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.price}</span>
                    <span className={`text-sm font-bold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>
                      {stock.change}
                    </span>
                  </div>
                </div>

                {/* 趋势状态变化卡片 */}
                <div className="mb-3 relative z-10">
                  <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-3 flex items-center justify-center gap-3">
                    <span className="text-sm font-bold text-blue-400">
                      {stock.signalType === 'breakout' ? '震荡趋势' : 
                       stock.signalType === 'reversal' ? '下跌趋势' : 
                       stock.signalType === 'support' ? '回调整理' : '震荡趋势'}
                    </span>
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-sm font-bold text-red-400">
                      上涨趋势
                    </span>
                  </div>
                </div>

                {/* K线图 */}
                <div className="mb-3 relative z-10 bg-slate-900/40 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] text-slate-500 mb-2">近60日K线走势</div>
                  <img 
                    src={stock.klineImage} 
                    alt={`${stock.name} K线图`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* 入选理由 */}
                <div className="mb-3 relative z-10">
                  <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 mb-2 inline-block">
                    入选理由
                  </div>
                  <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <div>
                      <span className="text-slate-500">趋势状态：</span>
                      <span className="text-slate-300">{stock.trendStatus}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">建仓参考价位：</span>
                      <span className="text-slate-300">{stock.entryPrice}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">压力支撑：</span>
                      <span className="text-slate-300">{stock.pressureLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">催化事件：</span>
                      <span className="text-slate-300">{stock.catalyst}</span>
                    </div>
                  </div>
                </div>

                {/* 买入按钮 */}
                <div className="flex justify-center">
                  <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                    <span className="font-medium text-[13px] tracking-wide">买入</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </>
  );
}

type MetricStock = {
  name: string;
  code: string;
  price: string;
  change: string;
  changeUp: boolean;
  industry?: string;
  industryChange?: string;
  industryMomentum?: string;
  stockFactors?: { label: string; value: string }[];
  reasonFacts?: string[];
  detailReasonText?: string;
  detailReasonFactors?: { label: string; value: string }[];
  detailReasonFacts?: string[];
  score?: string;
  metrics: { label: string; value: string; tone?: 'blue' | 'red' | 'emerald' | 'amber' }[];
  reason: string;
};

type MetricModelConfig = {
  title: string;
  accent: 'blue' | 'indigo' | 'cyan' | 'emerald' | 'amber' | 'red';
  steps: { title: string; desc: React.ReactNode; icon: React.ReactNode }[];
  stocks: MetricStock[];
  suggestedQuestions?: string[];
};

const metricToneClass: Record<NonNullable<MetricStock['metrics'][number]['tone']>, string> = {
  blue: 'text-blue-400',
  red: 'text-red-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
};

const getBriefReasonText = (facts?: string[]) => {
  if (!facts || facts.length === 0) return '';

  const growthFact = facts.find(fact => /增速|加速/.test(fact));
  if (growthFact) return growthFact;

  return facts.slice(0, 2).join('，');
};

const getTopFactorBriefText = (factors?: { label: string; value: string }[]) => {
  if (!factors || factors.length === 0) return '';

  return factors
    .slice(0, 2)
    .map(factor => `${factor.label} ${factor.value.split('，')[0]}`)
    .join('，');
};

function ModelSuggestedQuestions({ questions, onQuestionClick }: { questions: string[]; onQuestionClick?: (question: string) => void }) {
  const [page, setPage] = useState(0);
  if (questions.length === 0) return null;

  const visibleQuestions = Array.from({ length: Math.min(3, questions.length) }, (_, i) => questions[(page + i) % questions.length]);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="text-[11px] text-slate-500">继续筛选</div>
        <button
          type="button"
          onClick={() => setPage(prev => (prev + 1) % questions.length)}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-800/50 px-2 py-1 text-[10px] font-medium text-slate-400 hover:border-indigo-400/30 hover:text-indigo-200 transition-colors"
        >
          <ArrowRightLeft className="h-3 w-3" />
          重新生成
        </button>
      </div>
      {visibleQuestions.map((question, i) => (
        <motion.button
          key={`${question}-${page}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.16 }}
          onClick={() => onQuestionClick?.(question)}
          className="w-full text-left bg-slate-800/55 backdrop-blur-xl hover:bg-slate-700/70 border border-white/10 hover:border-indigo-500/35 rounded-xl px-3.5 py-3 flex items-center justify-between gap-3 transition-all group shadow-md"
        >
          <span className="text-xs text-slate-300 group-hover:text-white leading-snug">{question}</span>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-300 shrink-0" />
        </motion.button>
      ))}
    </div>
  );
}

const QUANT_HOME_SUGGESTED_QUESTIONS = [
  '股息率高、波动又小的股票有哪些？',
  '筛选下估值不高、成长还不错的股票',
  '产业增长好、个股营收也增长的股票有哪些？',
];

function MetricFactorFlowView({ config, onComplete, onBuyClick, onQuestionClick }: { config: MetricModelConfig; onComplete?: () => void; onBuyClick?: () => void; onQuestionClick?: (question: string) => void }) {
  const [step, setStep] = useState(0);
  const completedRef = React.useRef(false);
  const allStepsCompleted = step >= config.steps.length;

  React.useEffect(() => {
    if (step < config.steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, config.steps.length]);

  React.useEffect(() => {
    if (allStepsCompleted && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [allStepsCompleted, onComplete]);

  return (
    <>
      <ThinkingProcessCard steps={config.steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

      {allStepsCompleted && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3 mt-4">
          {config.stocks.map((stock, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${stock.changeUp ? 'bg-red-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl pointer-events-none`} />
              <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                    <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.price}</span>
                  <span className={`text-sm font-bold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.change}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-0 mb-3 relative z-10 bg-slate-900/35 border border-white/5 rounded-xl overflow-hidden">
                {stock.metrics.slice(0, 3).map((metric, i) => (
                  <div key={metric.label} className={`px-2 py-2.5 text-center ${i > 0 ? 'border-l border-white/5' : ''}`}>
                    <div className={`text-base font-bold tabular-nums ${metricToneClass[metric.tone ?? 'blue']}`}>{metric.value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-3 relative z-10">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 inline-block">入选理由</div>
                  {stock.score && (
                    <div className="rounded-full border border-white/10 bg-slate-800/45 px-2 py-0.5 text-[11px] font-semibold leading-5 tabular-nums text-slate-400">
                      {stock.score}分
                    </div>
                  )}
                </div>
                {stock.industry && stock.industryChange && stock.industryMomentum && stock.detailReasonFactors ? (
                  <div className="mt-1 space-y-1.5 text-xs text-slate-400 leading-relaxed">
                    <p>产业增长情况：{stock.industry}产业，涨幅为 {stock.industryChange}，增速为 {stock.industryMomentum}。</p>
                    <p>
                      个股增长情况：
                      {stock.detailReasonFactors.slice(0, 3).map((factor, i) => (
                        <React.Fragment key={factor.label}>
                          {i > 0 ? '；' : ''}
                          {factor.label}为 {factor.value}
                        </React.Fragment>
                      ))}
                      。
                    </p>
                  </div>
                ) : stock.detailReasonText ? (
                  <p className="text-xs text-slate-400 leading-relaxed">{stock.detailReasonText}</p>
                ) : stock.industry && stock.industryChange && stock.industryMomentum && stock.stockFactors ? (
                  <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed">
                    <div>
                      {stock.industry}行业 / 涨幅 {stock.industryChange} / 增速 {stock.industryMomentum}
                    </div>
                    <div>
                      个股数据：
                      {stock.stockFactors.slice(0, 2).map(factor => (
                        <span key={factor.label} className="mr-2">
                          {factor.label} {factor.value}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : stock.detailReasonFacts ? (
                  <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed">
                    {stock.detailReasonFacts.slice(0, 4).map(fact => (
                      <div key={fact}>{fact}</div>
                    ))}
                  </div>
                ) : stock.reasonFacts ? (
                  <p className="text-xs text-slate-400 leading-relaxed">{stock.reasonFacts.slice(0, 2).join('；')}。</p>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">{stock.reason}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                  <span className="font-medium text-[13px] tracking-wide">买入</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      {allStepsCompleted && (
        <ModelSuggestedQuestions questions={config.suggestedQuestions ?? []} onQuestionClick={onQuestionClick} />
      )}
    </>
  );
}

const METRIC_MODEL_CONFIGS: Record<string, MetricModelConfig> = {
  '低估值选股': {
    title: '低估值选股',
    accent: 'amber',
    steps: [
      { title: '估值样本筛选', icon: <Filter className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">剔除亏损股，保留滚动市盈率为正且市值大于 80 亿的股票。</div> },
      { title: '市盈率历史分位计算', icon: <PieChart className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">计算滚动市盈率绝对值、滚动市盈率历史百分位和市盈增长比率。</div> },
      { title: '市净率分位复核', icon: <Shield className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">追加市净率历史百分位过滤，保留估值处于历史低位的样本。</div> },
    ],
    stocks: [
      { name: '美的集团', code: '000333', price: '64.20', change: '+1.18%', changeUp: true, metrics: [{ label: '5日涨幅', value: '+3.6%', tone: 'red' }, { label: 'PE', value: '12.6x', tone: 'amber' }, { label: 'PEG', value: '0.82', tone: 'emerald' }], reasonFacts: ['PE (TTM) 12.6x', '营业收入 1061.0 亿元，增速为 10.3%'], detailReasonText: '市盈增长比率（PEG）为 0.82，营业收入为 1061.0 亿元、增速为 10.3%，扣非净利润为 87.6 亿元、增速为 12.1%，滚动市盈率（PE TTM）为 12.6x。', reason: '滚动市盈率 12.6x，滚动市盈率历史百分位 18%；市盈增长比率（PEG）0.82，市净率历史百分位 22%。' },
      { name: '海螺水泥', code: '600585', price: '22.74', change: '+0.64%', changeUp: true, metrics: [{ label: '5日涨幅', value: '+2.1%', tone: 'red' }, { label: 'PE', value: '9.8x', tone: 'amber' }, { label: 'PEG', value: '0.76', tone: 'emerald' }], reasonFacts: ['净资产收益率 7.8%', '扣非净利润 18.4 亿元，增速为 8.6%'], detailReasonText: '滚动市盈率（PE TTM）为 9.8x，净资产收益率为 7.8%，扣非净利润为 18.4 亿元、增速为 8.6%。', reason: '滚动市盈率 9.8x，滚动市盈率历史百分位 14%；市盈增长比率（PEG）0.76，市净率历史百分位 19%。' },
      { name: '格力电器', code: '000651', price: '39.35', change: '+0.92%', changeUp: true, metrics: [{ label: '5日涨幅', value: '+2.8%', tone: 'red' }, { label: 'PE', value: '8.9x', tone: 'amber' }, { label: 'PEG', value: '0.69', tone: 'emerald' }], reasonFacts: ['PE (TTM) 8.9x', '归母净利润 90.0 亿元，增速为 13.8%'], detailReasonText: '滚动市盈率（PE TTM）为 8.9x，市净率为 1.86x，市盈增长比率（PEG）为 0.69，扣非净利润为 86.3 亿元、增速为 11.4%。', reason: '滚动市盈率 8.9x，滚动市盈率历史百分位 16%；市盈增长比率（PEG）0.69，市净率历史百分位 24%。' },
    ],
    suggestedQuestions: [
      '筛选下 PE 和 PEG 都不高的股票',
      '再看看估值低但 ROE 还不错的股票',
      '只看扣非利润增长、估值又不贵的股票',
    ],
  },
  '产业景气度选股': {
    title: '产业景气度选股',
    accent: 'red',
    steps: [
      { title: '产业池构建', icon: <Database className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">按申万三级行业和产业链标签聚合样本，计算产业层面扣非净利润增长率。</div> },
      { title: '景气指标排序', icon: <TrendingUp className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">按产业扣非净利润增长率、综合涨跌幅、单季度 ROE 排序。</div> },
      { title: '龙头个股映射', icon: <Target className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">在高景气产业内筛选流动性和财务指标满足条件的个股。</div> },
    ],
    stocks: [
      { name: '中际旭创', code: '300308', price: '86.42', change: '+3.21%', changeUp: true, industry: '通信', industryChange: '+18.4%', industryMomentum: '+3.2%', stockFactors: [{ label: '营收同比增长率', value: '+54%' }, { label: '净资产收益率', value: '6.8%' }], metrics: [{ label: '5日涨幅', value: '+12.8%', tone: 'red' }, { label: '净利润', value: '12.4亿', tone: 'blue' }, { label: '同比增长', value: '+62%', tone: 'emerald' }], detailReasonFactors: [{ label: '营收增速', value: '32.8 亿 / +54%，产业内前 16%' }, { label: '销售毛利率', value: '21.6%，产业内前 28%' }, { label: '利润加速度', value: '+18%，产业内前 20%' }], detailReasonText: '产业增长情况：通信产业，涨幅为 +18.4%，增速为 +3.2%。个股增长情况：营收增速为 32.8 亿元 / +54%，产业内前 16%；销售毛利率为 21.6%，产业内前 28%；利润加速度为 +18%，产业内前 20%。', reason: '所属行业：通信；光模块产业扣非净利润增长率 +62%，产业综合涨跌幅 +18.4%，净资产收益率（单季度）6.8%。' },
      { name: '北方华创', code: '002371', price: '312.60', change: '+2.48%', changeUp: true, industry: '电子', industryChange: '+13.6%', industryMomentum: '+2.4%', stockFactors: [{ label: '市盈率', value: '42.5' }, { label: '销售毛利率', value: '44.2%' }], metrics: [{ label: '5日涨幅', value: '+8.6%', tone: 'red' }, { label: '净利润', value: '10.8亿', tone: 'blue' }, { label: '同比增长', value: '+47%', tone: 'emerald' }], detailReasonFactors: [{ label: '销售毛利率', value: '44.2%，产业内前 12%' }, { label: '营收增速', value: '56.3 亿 / +38%，产业内前 22%' }, { label: '净资产收益率', value: '5.9%，产业内前 35%' }], detailReasonText: '产业增长情况：电子产业，涨幅为 +13.6%，增速为 +2.4%。个股增长情况：销售毛利率为 44.2%，产业内前 12%；营收增速为 56.3 亿元 / +38%，产业内前 22%；净资产收益率为 5.9%，产业内前 35%。', reason: '所属行业：电子；半导体设备产业扣非净利润增长率 +47%，产业综合涨跌幅 +13.6%，净资产收益率（单季度）5.9%。' },
      { name: '阳光电源', code: '300274', price: '81.56', change: '+1.76%', changeUp: true, industry: '电力设备', industryChange: '+11.2%', industryMomentum: '+1.8%', stockFactors: [{ label: '营收同比增长率', value: '+31%' }, { label: '市盈率增长比率', value: '0.86' }], metrics: [{ label: '5日涨幅', value: '+6.4%', tone: 'red' }, { label: '净利润', value: '9.6亿', tone: 'blue' }, { label: '同比增长', value: '+39%', tone: 'emerald' }], detailReasonFactors: [{ label: '市盈率增长比率', value: '0.86，产业内前 30%' }, { label: '营收增速', value: '81.6 亿 / +31%，产业内前 26%' }, { label: '净资产收益率', value: '5.4%，产业内前 38%' }], detailReasonText: '产业增长情况：电力设备产业，涨幅为 +11.2%，增速为 +1.8%。个股增长情况：市盈率增长比率为 0.86，产业内前 30%；营收增速为 81.6 亿元 / +31%，产业内前 26%；净资产收益率为 5.4%，产业内前 38%。', reason: '所属行业：电力设备；逆变器产业扣非净利润增长率 +39%，产业综合涨跌幅 +11.2%，净资产收益率（单季度）5.4%。' },
    ],
    suggestedQuestions: [
      '筛选下所属产业涨幅和增速都靠前的股票',
      '再看看产业增长好、营收增速也快的股票',
      '只看销售毛利率高且产业内排名靠前的股票',
    ],
  },
  '新兴产业+成长股模型': {
    title: '新兴产业+成长股模型',
    accent: 'indigo',
    steps: [
      { title: '新兴产业范围确定', icon: <Sprout className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">覆盖 AI 算力、机器人、半导体设备、新能源链和创新药方向。</div> },
      { title: '成长增速筛选', icon: <LineChart className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">计算营业收入同比增长率、净利润同比增长率和两项增速加速度。</div> },
      { title: '加速度确认', icon: <Activity className="w-4 h-4" />, desc: <div className="text-xs text-slate-400">保留收入增速加速度和净利润增速加速度为正的股票。</div> },
    ],
    stocks: [
      { name: '新易盛', code: '300502', price: '72.00', change: '+2.16%', changeUp: true, industry: '通信', industryChange: '+18.4%', industryMomentum: '+3.2%', score: '92', metrics: [{ label: '近5日涨幅', value: '+16.8%', tone: 'red' }, { label: '净利润', value: '8.2亿', tone: 'blue' }, { label: '同比增长', value: '+88%', tone: 'emerald' }], reasonFacts: ['净利润 8.2 亿，增速 88%', '净利润增速加速度 21%'], detailReasonFactors: [{ label: '净利加速度', value: '+21%，产业内前 18%' }, { label: '营收加速度', value: '+12%，产业内前 25%' }, { label: 'PEG', value: '0.82，产业内前 30%' }], detailReasonText: '产业增长情况：通信产业，涨幅为 +18.4%，增速为 +3.2%。个股增长情况：净利加速度为 +21%，产业内前 18%；营收加速度为 +12%，产业内前 25%；PEG 为 0.82，产业内前 30%。', reason: '营业收入同比增长率 +54%，净利润同比增长率 +88%；营业收入增速加速度 +12%，净利润增速加速度 +21%。' },
      { name: '汇川技术', code: '300124', price: '58.40', change: '+1.34%', changeUp: true, industry: '电力设备', industryChange: '+11.2%', industryMomentum: '+1.8%', score: '86', metrics: [{ label: '近5日涨幅', value: '+9.4%', tone: 'red' }, { label: '净利润', value: '12.8亿', tone: 'blue' }, { label: '同比增长', value: '+36%', tone: 'emerald' }], reasonFacts: ['营业收入 64.5 亿，增速 31%', '净资产收益率 17.5%'], detailReasonFactors: [{ label: '净利加速度', value: '+10%，产业内前 24%' }, { label: '营收加速度', value: '+8%，产业内前 31%' }, { label: '净资产收益率', value: '17.5%，产业内前 20%' }], detailReasonText: '产业增长情况：电力设备产业，涨幅为 +11.2%，增速为 +1.8%。个股增长情况：净利加速度为 +10%，产业内前 24%；营收加速度为 +8%，产业内前 31%；净资产收益率为 17.5%，产业内前 20%。', reason: '营业收入同比增长率 +31%，净利润同比增长率 +36%；营业收入增速加速度 +8%，净利润增速加速度 +10%。' },
      { name: '药明康德', code: '603259', price: '52.18', change: '+1.08%', changeUp: true, industry: '医药生物', industryChange: '+7.6%', industryMomentum: '+1.1%', score: '81', metrics: [{ label: '近5日涨幅', value: '+5.8%', tone: 'red' }, { label: '净利润', value: '19.6亿', tone: 'blue' }, { label: '同比增长', value: '+29%', tone: 'emerald' }], reasonFacts: ['净利润 19.6 亿，增速 29%', 'PEG 0.94'], detailReasonFactors: [{ label: 'PEG', value: '0.94，产业内前 28%' }, { label: '净资产收益率', value: '21.4%，产业内前 16%' }, { label: '营收加速度', value: '+6%，产业内前 35%' }], detailReasonText: '产业增长情况：医药生物产业，涨幅为 +7.6%，增速为 +1.1%。个股增长情况：PEG 为 0.94，产业内前 28%；净资产收益率为 21.4%，产业内前 16%；营收加速度为 +6%，产业内前 35%。', reason: '营业收入同比增长率 +24%，净利润同比增长率 +29%；营业收入增速加速度 +6%，净利润增速加速度 +9%。' },
    ],
    suggestedQuestions: [
      '筛选下新兴产业里近 5 日涨幅靠前的股票',
      '再看看 PE 和成长评分更匹配的股票',
      '只看成长评分高、短期表现靠前的股票',
    ],
  },
};

/** Q-06: 高股息低波动模型-选股结果页 */
/** Q-06: 高股息低波动模型-选股结果页 */
function DividendFlowView({ onComplete, onBuyClick, onQuestionClick }: { onComplete?: () => void; onBuyClick?: () => void; onQuestionClick?: (question: string) => void }) {
  const [step, setStep] = useState(0);
  const completedRef = React.useRef(false);

  const steps: { title: string; desc: React.ReactNode; icon: React.ReactNode; editable?: boolean }[] = [
    {
      title: '确定选股范围',
      editable: true,
      desc: (
        <div className="space-y-1.5 text-[11px]">
          <div className="text-slate-400">沪深 300 成分股</div>
          <div className="text-slate-400">中证 500 成分股</div>
        </div>
      ),
      icon: <Database className="w-4 h-4" />,
    },
    {
      title: '股息率筛选',
      editable: true,
      desc: (
        <div className="space-y-1.5 text-[11px]">
          <div className="text-slate-400">近三年平均股息率 ≥ 4%</div>
          <div className="text-slate-400">连续三年分红 <span className="text-emerald-400 font-semibold ml-1">156 只</span></div>
        </div>
      ),
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      title: '波动率过滤',
      editable: true,
      desc: (
        <div className="space-y-1.5 text-[11px]">
          <div className="text-slate-400">近一年日收益率标准差 &lt; 2.5%</div>
          <div className="text-slate-400">近60日最大回撤 &lt; 20%</div>
          <div className="text-slate-400">低波动稳健标的 <span className="text-blue-400 font-semibold ml-1">68 只</span></div>
        </div>
      ),
      icon: <Activity className="w-4 h-4" />,
    },
    {
      title: '基本面稳健性验证',
      editable: true,
      desc: (
        <div className="space-y-1.5 text-[11px]">
          <div className="text-slate-400">ROE（净资产收益率）≥ 10%</div>
          <div className="text-slate-400">资产负债率 &lt; 60%</div>
          <div className="text-slate-400">经营现金流连续三年为正</div>
          <div className="text-slate-400">非 ST 股票</div>
        </div>
      ),
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  const allStepsCompleted = step === steps.length;

  React.useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, steps.length]);

  React.useEffect(() => {
    if (allStepsCompleted && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [allStepsCompleted, onComplete]);

  const resultStocks: {
    name: string;
    code: string;
    price: string;
    change: string;
    changeUp: boolean;
    gain5d: string;
    marketCap: string;
    volume: string;
    reason: string;
    trendStatus: string;
    entryPrice: string;
    pressureLevel: string;
    catalyst: string;
    klineImage: string;
    fromTrend: string;
  }[] = [
    {
      name: '长江电力',
      code: '600900',
      price: '25.68',
      change: '+1.15%',
      changeUp: true,
      gain5d: '+3.2%',
      marketCap: '5,820亿',
      volume: '18.6亿',
      reason: '股息率 TTM 为 4.6%，5 年均股息率为 4.2%，已连续分红 10 年。',
      trendStatus: '处于稳健上涨通道，波动率低，适合长期持有。',
      entryPrice: '24.5-25.2元',
      pressureLevel: '短期压力位27元，关键支撑位24元',
      catalyst: '来水情况良好发电量增长，电价市场化改革推进，分红率稳定',
      klineImage: '/K 线图/震荡突破.png',
      fromTrend: '震荡整理'
    },
    {
      name: '中国神华',
      code: '601088',
      price: '38.50',
      change: '+0.78%',
      changeUp: true,
      gain5d: '+2.4%',
      marketCap: '7,126亿',
      volume: '24.8亿',
      reason: '股息率 TTM 为 6.8%，5 年均股息率为 6.1%，已连续分红 9 年。',
      trendStatus: '底部企稳后缓慢上涨，高股息提供安全垫。',
      entryPrice: '37-38元',
      pressureLevel: '短期压力位40元，关键支撑位36.5元',
      catalyst: '煤炭价格中枢稳定，特别分红预期强烈，业绩稳健增长',
      klineImage: '/K 线图/趋势反转.png',
      fromTrend: '下跌趋势'
    },
    {
      name: '招商银行',
      code: '600036',
      price: '38.20',
      change: '+1.32%',
      changeUp: true,
      gain5d: '+4.1%',
      marketCap: '9,180亿',
      volume: '31.2亿',
      reason: 'ROE 近 3 年均值为 16.5%，股息率 TTM 为 4.5%，5 年均股息率为 3.9%。',
      trendStatus: '经过充分调整后企稳回升，基本面优质。',
      entryPrice: '36.5-37.5元',
      pressureLevel: '短期压力位39.5元，关键支撑位36元',
      catalyst: '零售银行龙头地位稳固，资产质量优异，分红稳定性高',
      klineImage: '/K 线图/上升趋势回调.png',
      fromTrend: '回调整理'
    },
    {
      name: '中国石化',
      code: '600028',
      price: '6.15',
      change: '+0.82%',
      changeUp: true,
      gain5d: '+1.9%',
      marketCap: '7,530亿',
      volume: '15.4亿',
      reason: '股息率 TTM 为 5.8%，5 年均股息率为 5.2%，已连续分红 12 年。',
      trendStatus: '低位震荡后温和上涨，高股息低估值特征明显。',
      entryPrice: '5.9-6.1元',
      pressureLevel: '短期压力位6.5元，关键支撑位5.8元',
      catalyst: '炼化利润率改善，成品油销量回升，油价相对稳定',
      klineImage: '/K 线图/震荡突破.png',
      fromTrend: '震荡趋势'
    },
  ];

  const suggestedQuestions = [
    '筛选下股息率更高且连续分红的股票',
    '再看看分红更稳定、股价波动更小的股票',
    '只看 ROE 表现稳定且年化波动率更低的股票',
  ];

  return (
    <>
      <ThinkingProcessCard steps={steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

      {allStepsCompleted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mt-4"
          >
            {resultStocks.map((stock, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${stock.changeUp ? 'bg-red-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl pointer-events-none`} />
                
                <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                        <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.price}</span>
                    <span className={`text-sm font-bold tabular-nums ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>
                      {stock.change}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-0 mb-3 relative z-10 bg-slate-900/35 border border-white/5 rounded-xl overflow-hidden">
                  <div className="px-2 py-2.5 text-center">
                    <div className="text-sm font-bold text-red-400 tabular-nums">{stock.gain5d}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">5日涨幅</div>
                  </div>
                  <div className="px-2 py-2.5 text-center border-l border-white/5">
                    <div className="text-sm font-bold text-blue-300 tabular-nums">{stock.marketCap}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">市值</div>
                  </div>
                  <div className="px-2 py-2.5 text-center border-l border-white/5">
                    <div className="text-sm font-bold text-slate-300 tabular-nums">{stock.volume}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">成交量</div>
                  </div>
                </div>

                <div className="mb-3 relative z-10">
                  <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 mb-2 inline-block">
                    入选理由
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stock.reason}</p>
                </div>

                <div className="flex justify-center">
                  <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                    <span className="font-medium text-[13px] tracking-wide">买入</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
          <ModelSuggestedQuestions questions={suggestedQuestions} onQuestionClick={onQuestionClick} />
        </>
      )}
    </>
  );
}

/** Q-07: 短线强势模型-选股结果页 */
function MomentumFlowView({ onComplete, onBuyClick, initialCompleted }: { onComplete?: () => void; onBuyClick?: () => void; initialCompleted?: boolean }) {
  const STEP_COUNT = 4;
  const [step, setStep] = useState(initialCompleted ? STEP_COUNT : 0);
  const completedRef = React.useRef(initialCompleted ?? false);

  const steps: { title: string; desc: React.ReactNode; icon: React.ReactNode; editable?: boolean }[] = [
    {
      title: '确定选股范围',
      desc: (
        <div className="space-y-1.5">
          <div className="text-xs text-slate-400">从以下范围中筛选：</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-xs font-medium">全市场 A 股</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-xs font-medium">剔除 ST / 停牌</span>
          </div>
          <div className="text-xs text-blue-400 font-medium mt-1">共计 4,800+ 只可交易股票</div>
        </div>
      ),
      icon: <Target className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '短线强势信号筛选',
      desc: (
        <div className="space-y-2">
          <div className="text-xs text-slate-400 mb-1">捕捉短线爆发信号：</div>
          <div className="space-y-1.5">
            {[
              { label: '当日成交量 > 近30日均量 × 150%', count: '154 只' },
              { label: '过去5日出现涨停，近15日最高价 > 近120日最高价', count: '86 只' },
              { label: '近30日均价 > 60日 > 120日 > 240日均价', count: '71 只' },
              { label: '连续5日收盘价 > 近5日均价', count: '53 只' },
              { label: '收盘价 = 近一年最高价，3日前出现涨停，收盘价 > 3日前收盘价', count: '22 只' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
                <div className="flex-1 flex items-start justify-between gap-2">
                  <span className="text-xs text-slate-400 leading-snug flex-1">{item.label}</span>
                  <span className="text-xs font-bold text-red-400 shrink-0">{item.count}</span>
                </div>
              </div>
            ))}
            <div className="text-xs text-blue-400 font-medium mt-1 pt-2 border-t border-white/5">符合短线强势信号 22 只</div>
          </div>
        </div>
      ),
      icon: <Activity className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '基本面过滤',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• PE 排名前 30%</div>
          <div className="text-xs text-slate-400">• 非 ST 股、无重大违规</div>
          <div className="text-xs text-slate-400">• 最近一季度净利润环比上涨</div>
          <div className="text-xs text-blue-400 font-medium mt-2">过滤后剩余 <span className="text-red-400">18 只</span></div>
        </div>
      ),
      icon: <Shield className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '消息面过滤',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• 近 30 日出现利好事件</div>
          <div className="text-xs text-red-400 font-medium mt-2">最终精选 <span className="text-red-400">4 只</span>短线强势标的</div>
        </div>
      ),
      icon: <Flame className="w-4 h-4" />,
      editable: true,
    },
  ];

  const allStepsCompleted = step === steps.length;

  React.useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, steps.length]);

  React.useEffect(() => {
    if (allStepsCompleted && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [allStepsCompleted, onComplete]);

  const resultStocks: {
    name: string;
    code: string;
    price: string;
    change: string;
    changeUp: boolean;
    gain5d: string;
    gain10d: string;
    gain20d: string;
    signals: string[];
    reason: string;
  }[] = [
    {
      name: '通富微电',
      code: '002156',
      price: '18.65',
      change: '+10.01%',
      changeUp: true,
      gain5d: '+32.8%',
      gain10d: '+48.5%',
      gain20d: '+61.2%',
      signals: [
        '当日成交量 > 近30日均量 × 150%',
        '近30日均价 > 60日 > 120日 > 240日均价',
        '收盘价 = 近一年最高价，3日前出现涨停，收盘价 > 3日前收盘价',
      ],
      reason: '2025年归母净利润预增62%~99%，深度绑定AMD，高端FCBGA先进封装订单持续放量',
    },
    {
      name: '京山轻机',
      code: '000821',
      price: '12.38',
      change: '+9.98%',
      changeUp: true,
      gain5d: '+28.5%',
      gain10d: '+41.3%',
      gain20d: '+53.7%',
      signals: [
        '当日成交量 > 近30日均量 × 150%',
        '过去5日出现涨停，近15日最高价 > 近120日最高价',
      ],
      reason: '子公司三协精密再签锂电龙头10.05亿元锂电设备生产线采购订单（2025年9月）',
    },
    {
      name: '容知日新',
      code: '688768',
      price: '35.80',
      change: '+19.99%',
      changeUp: true,
      gain5d: '+45.6%',
      gain10d: '+67.8%',
      gain20d: '+89.3%',
      signals: [
        '过去5日出现涨停，近15日最高价 > 近120日最高价',
        '收盘价 = 近一年最高价，3日前出现涨停，收盘价 > 3日前收盘价',
        '连续5日收盘价 > 近5日均价',
      ],
      reason: '2025年上半年净利润同比暴增2063%，成功接入DeepSeek大模型升级"虚拟诊断工程师"产品',
    },
    {
      name: '晶方科技',
      code: '603005',
      price: '28.90',
      change: '+10.00%',
      changeUp: true,
      gain5d: '+38.2%',
      gain10d: '+55.4%',
      gain20d: '+72.6%',
      signals: [
        '当日成交量 > 近30日均量 × 150%',
        '近30日均价 > 60日 > 120日 > 240日均价',
        '连续5日收盘价 > 近5日均价',
      ],
      reason: '2025年业绩预增44%~52%，车规CIS与先进封装双轮驱动，受益汽车智能化渗透率快速提升',
    },
  ];

  return (
    <>
      <ThinkingProcessCard steps={steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

      {allStepsCompleted && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mt-4"
          >
            {resultStocks.map((stock, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* 头部：名称 + 价格 */}
                <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-red-400 to-red-600 rounded-full" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                        <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums text-red-400">{stock.price}</span>
                    <span className="text-sm font-bold tabular-nums text-red-400">{stock.change}</span>
                  </div>
                </div>

                {/* 关键数据：近5日 / 近10日 / 近20日涨幅 */}
                <div className="flex items-center justify-around py-2.5 mb-3 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-white/5 relative z-10">
                  <div className="text-center flex-1">
                    <div className="text-base font-bold tabular-nums text-red-400">{stock.gain5d}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">近5日涨幅</div>
                  </div>
                  <div className="w-px h-7 bg-slate-700/50" />
                  <div className="text-center flex-1">
                    <div className="text-base font-bold text-red-400 tabular-nums">{stock.gain10d}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">近10日涨幅</div>
                  </div>
                  <div className="w-px h-7 bg-slate-700/50" />
                  <div className="text-center flex-1">
                    <div className="text-base font-bold text-red-400 tabular-nums">{stock.gain20d}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">近20日涨幅</div>
                  </div>
                </div>

                {/* 触发信号 */}
                <div className="mb-3 relative z-10">
                  <div className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded mb-1.5 inline-block">入选理由</div>
                  <div className="space-y-1">
                    {stock.signals.map((signal, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span className="text-[11px] text-slate-400 leading-snug">{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 催化事件 */}
                <div className="mb-3 relative z-10">
                  <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 mb-1 inline-block">
                    催化事件
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{stock.reason}</p>
                </div>

                {/* 买入按钮 */}
                <div className="flex justify-center">
                  <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                    <span className="font-medium text-[13px] tracking-wide">买入</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </>
  );
}

/** 炒股参谋-引导页「钨矿涨价事件」专属：选股过程与结果五步流程。与事件驱动模型等其它策略/事件分开，仅从引导页「立即查看」进入。 */
function WuguEventFlowView({ onComplete, onViewOtherStrategies, onBuyClick }: { onComplete?: () => void; onViewOtherStrategies?: () => void; onBuyClick?: () => void }) {
  const [step, setStep] = useState(0);
  const completedRef = React.useRef(false);

  const steps: { title: string; desc: React.ReactNode; icon: React.ReactNode; editable?: boolean; count?: string }[] = [
    {
      title: '确定事件类型',
      desc: (
        <div>
          <div className="text-xs text-slate-400 mb-1">事件类型：<span className="text-blue-400 font-medium">行业事件</span></div>
          <div className="text-xs text-slate-400">事件：<span className="text-slate-200 font-medium">钨矿持续涨价</span></div>
        </div>
      ),
      icon: <Zap className="w-4 h-4" />,
    },
    {
      title: '事件影响分析',
      desc: (
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
            <div className="text-xs text-slate-400 flex items-center gap-1 flex-wrap">
              <span className="text-blue-400 font-bold">上游</span>
              <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-[10px] font-bold">利好</span>
              <span>（钨精矿、白钨矿）：钨矿涨价直接受益</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
            <div className="text-xs text-slate-400 flex items-center gap-1 flex-wrap">
              <span className="text-blue-400 font-bold">中游</span>
              <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-[10px] font-bold">利好</span>
              <span>（APT、钨粉）：向下游价格传导顺利</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></div>
            <div className="text-xs text-slate-400">
              <span className="text-blue-400 font-bold">下游</span>（硬质合金、切削刀具、钨丝）：价格传导滞后，暂时无法确定影响
            </div>
          </div>
        </div>
      ),
      icon: <LineChart className="w-4 h-4" />,
    },
    {
      title: '受益标的初筛',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">钨业务占营收比例 &gt; 20%</div>
          <div className="text-xs text-slate-400">所属板块为 钨精矿、白钨矿、钨粉</div>
        </div>
      ),
      icon: <Filter className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '基本面过滤',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">• 资产负债率 &lt; 65%</div>
          <div className="text-xs text-slate-400">• 近两年归母净利润 &gt; 0</div>
          <div className="text-xs text-slate-400">• 经营现金流 &gt; 0</div>
          <div className="text-xs text-slate-400">• PE &lt; 近三年历史 PE 平均值</div>
        </div>
      ),
      icon: <Shield className="w-4 h-4" />,
      editable: true,
    },
    {
      title: '技术面过滤',
      desc: (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">趋势跟随模型：<span className="text-red-400 font-medium">趋势看多</span></div>
          <div className="text-xs text-slate-400">短线强势模型：<span className="text-red-400 font-medium">短线强势</span></div>
          <div className="text-xs text-blue-400 font-medium mt-1">最终精选 5 只标的</div>
        </div>
      ),
      icon: <TrendingUp className="w-4 h-4" />,
      editable: true,
    },
  ];

  React.useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep(s => s + 1), 700);
      return () => clearTimeout(t);
    }
  }, [step, steps.length]);

  React.useEffect(() => {
    if (step === steps.length && step > 0 && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [step, steps.length, onComplete]);

  const coreStocks: {
    name: string;
    code: string;
    reason: string;
    price: string;
    change: string;
    changeUp: boolean;
    recentGain: string;
    valuation: string;
  }[] = [
    { name: '中钨高新', code: '000657', price: '12.86', change: '+2.31%', changeUp: true, recentGain: '近5日 +8.2%', valuation: 'PE 28.2', reason: '主营硬质合金与切削刀具，钨为核心原材料。钨矿价格上涨后，产品售价同步提升，毛利率显著增厚，为钨矿涨价核心受益标的。' },
    { name: '厦门钨业', code: '600549', price: '18.42', change: '+1.54%', changeUp: true, recentGain: '近5日 +5.6%', valuation: 'PE 22.5', reason: '钨钼全产业链龙头企业，业务覆盖采选、冶炼至深加工。自有矿山资源优势明显，成本锁定能力强，钨价上涨带来业绩弹性最大。' },
    { name: '章源钨业', code: '002378', price: '9.68', change: '+3.09%', changeUp: true, recentGain: '近5日 +12.1%', valuation: 'PE 31.0', reason: '专注钨精矿与仲钨酸铵生产，位于产业链最上游。钨矿涨价直接传导至公司营收，受益程度最为直接，无成本传导时滞。' },
    { name: '翔鹭钨业', code: '002842', price: '7.25', change: '-0.41%', changeUp: false, recentGain: '近5日 +4.3%', valuation: 'PB 1.8', reason: '主营钨制品深加工业务，产品线覆盖钨粉、碳化钨等。长期协议矿源保障供应稳定性，钨价上涨时中游环节价差扩大。' },
    { name: '洛阳钼业', code: '603993', price: '6.88', change: '+0.88%', changeUp: true, recentGain: '近5日 +2.9%', valuation: 'PE 18.6', reason: '多金属矿业龙头，钨产量位居国内前列。钨矿涨价增厚钨业务板块利润，公司体量大、估值处于低位，具备估值修复空间。' },
  ];

  const allStepsCompleted = step >= steps.length;

  return (
    <>
      <ThinkingProcessCard steps={steps} step={step} completed={allStepsCompleted} avatarSrc={AGENTS.quant.avatar} />

    {allStepsCompleted && (
      <>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mt-4"
        >
          {coreStocks.map((stock, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all relative overflow-hidden group"
            >
              {/* 装饰性背景光晕 */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${stock.changeUp ? 'bg-red-500/5' : 'bg-emerald-500/5'} rounded-full blur-3xl pointer-events-none`} />
              
              {/* 头部：股票名称、代码、价格与涨跌幅（上下居中对齐） */}
              <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-100">{stock.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums text-slate-200">{stock.price}</span>
                  <span className={`text-sm font-bold tabular-nums ${stock.changeUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change}
                  </span>
                </div>
              </div>

              {/* 关键数据区：三个指标并排 */}
              <div className="flex items-center justify-around py-2.5 mb-3 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-white/5 relative z-10">
                <div className="text-center flex-1">
                  <div className={`text-base font-bold tabular-nums ${stock.changeUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.recentGain.split(' ')[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">近5日涨幅</div>
                </div>
                <div className="w-px h-7 bg-slate-700/50" />
                <div className="text-center flex-1">
                  <div className="text-base font-bold text-blue-400 tabular-nums">
                    {stock.valuation.split(' ')[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{stock.valuation.split(' ')[0]}</div>
                </div>
                <div className="w-px h-7 bg-slate-700/50" />
                <div className="text-center flex-1">
                  <div className="text-base font-bold text-slate-300 tabular-nums">
                    {idx === 0 ? '95%' : idx === 1 ? '88%' : idx === 2 ? '92%' : idx === 3 ? '78%' : '85%'}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">钨业务占比</div>
                </div>
              </div>

              {/* 入选理由：参考图片布局，第一行紧跟标签，第二行从标签下方开始 */}
              <div className="mb-3 relative z-10">
                <div className="shrink-0 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] font-bold text-amber-400 mb-1 inline-block">
                  入选理由
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stock.reason}
                </p>
              </div>

              {/* 买入按钮：参考首页一键调仓按钮样式 */}
              <div className="flex justify-center">
                <button onClick={onBuyClick} className="w-[60%] h-[36px] rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-100 border border-blue-500/30 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all active:scale-95 group/btn shadow-[0_4px_20px_rgba(59,130,246,0.15)] relative z-10">
                  <span className="font-medium text-[13px] tracking-wide">买入</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-300 group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </>
    )}
    </>
  );
}

function FundTaskOrchestration({ step }: { step: number }) {
  const steps = [
    { title: '收益目标设定', desc: '年化收益超过 +10%', icon: <Target className="w-4 h-4" />, editable: true },
    { title: '风险承受能力评估', desc: '可接受产品净值下滑波动 -10% 到 -20%', icon: <Shield className="w-4 h-4" />, editable: true },
    { title: '目标持仓周期确认', desc: '1年 - 3年', icon: <Clock className="w-4 h-4" />, editable: true },
    { title: '偏好产品类型', desc: '公募基金、混合型基金', icon: <PieChart className="w-4 h-4" />, editable: true },
    { title: '全市场筛选', desc: step > 4 ? '筛选完成，已形成产品备选池，共包含 128 只优质备选产品。' : '正在筛选全市场公募基金，综合考量基金规模、成立年限、机构持仓比例等多维数据...', icon: <Search className="w-4 h-4" /> },
    { title: '评价模型分析', desc: '启动基金产品评价模型，深度分析备选池产品历史业绩、收益波动、基金经理管理能力...', icon: <Activity className="w-4 h-4" /> },
    { title: '产品匹配完成', desc: '为您精选以下 3 只优质基金：', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="space-y-4 relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-700/50 z-0"></div>

        {steps.map((s, i) => {
          const isActive = i === step;
          const isCompleted = i < step;
          const isPending = i > step;

          if (isPending) return null;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex gap-4"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                isCompleted ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 
                isActive ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 
                'bg-slate-800 border-slate-600 text-slate-500'
              }`}>
                {isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : s.icon}
              </div>
              <div className="flex-1 pt-1">
                <div className={`text-sm font-bold flex items-center justify-between ${isActive ? 'text-blue-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                  <span>{s.title}</span>
                  {s.editable && (
                    <button className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600 transition-colors flex items-center gap-1">
                      修改
                    </button>
                  )}
                </div>
                <div className={`text-xs mt-1 leading-relaxed ${s.editable ? 'bg-slate-900/50 px-3 py-2 rounded-lg border border-blue-500/10 text-blue-200 inline-block mt-2 shadow-inner' : ''} ${isActive ? 'text-slate-300' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                  {s.desc}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FundCards({ onBuyClick }: { onBuyClick?: () => void }) {
  const funds = [
    {
      name: '易方达平稳增长混合',
      code: '110001',
      return3y: '15.2%',
      maxDrawdown: '12.5%',
      note: '该基金近3年保持年化收益超过 10%的同时，净值波动小，符合您的收益目标与风险偏好，建议配置30%仓位。',
      chartData: [20, 25, 22, 28, 35, 32, 40, 45, 42, 50, 48, 55, 60, 58, 65, 70]
    },
    {
      name: '广发稳健增长混合A',
      code: '270002',
      return3y: '18.4%',
      maxDrawdown: '16.1%',
      note: '历史业绩优秀，对比同类基金，在同等风险偏好下，具有更高的投资收益，适合搭配持有，分散您投资组合风险，建议配置20%仓位。',
      chartData: [15, 20, 18, 25, 30, 28, 40, 45, 42, 55, 60, 58, 70, 75, 85, 90]
    },
    {
      name: '富国天惠精选成长A',
      code: '161005',
      return3y: '13.8%',
      maxDrawdown: '10.2%',
      note: '基金经理管理经验丰富，过去 3 年产品净值波动小（最大浮动亏损不超过 -8%），在市场下跌时表现出极强的抗跌能力，建议配置20%仓位，增加投资组合稳定性。',
      chartData: [30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 mt-4"
    >
      {funds.map((fund, idx) => (
        <div key={idx} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-base font-bold text-slate-100 flex items-center gap-2">
                {fund.name}
                <span className="text-xs font-mono text-slate-500 font-normal">{fund.code}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[11px] bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 font-medium">近3年年化收益 {fund.return3y}</span>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-medium">最大向下波动 {fund.maxDrawdown}</span>
              </div>
            </div>
          </div>
          
          {/* Area Chart */}
          <div className="mb-4 relative h-24 bg-slate-900/40 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-slate-500 mb-2 absolute top-3 left-3 z-10">产品净值走势</div>
            <svg className="w-full h-full pt-4" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id={`grad-${idx}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(239 68 68)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 100 ${fund.chartData.map((val, i) => `L ${i * (100 / (fund.chartData.length - 1))} ${100 - val}`).join(' ')} L 100 100 Z`}
                fill={`url(#grad-${idx})`}
              />
              <path 
                d={`M 0 ${100 - fund.chartData[0]} ${fund.chartData.map((val, i) => `L ${i * (100 / (fund.chartData.length - 1))} ${100 - val}`).join(' ')}`}
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="text-[11px] text-slate-300 bg-slate-700/30 p-3.5 rounded-xl border border-white/5 mb-5 leading-relaxed">
            {fund.note}
          </div>

          <div className="flex justify-center mt-auto">
            <button onClick={onBuyClick} className="flex items-center justify-center gap-2 w-full max-w-[220px] py-2.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group">
              <ShoppingCart className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
              <span className="text-[15px] font-medium text-blue-200 tracking-wider group-hover:text-white transition-colors">立即下单</span>
              <div className="bg-blue-500/20 rounded-full p-1 group-hover:bg-blue-400/30 transition-colors ml-1">
                <ArrowRight className="w-3.5 h-3.5 text-blue-300 group-hover:text-white transition-colors" />
              </div>
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function WatchlistDrawer({ onClose }: { onClose: () => void }) {
  const FULL_TEXT = '已将选股结果加入您的自选股，我将自动为您盯盘，当股票发生趋势变化时提醒您。';
  const [displayedText, setDisplayedText] = useState('');

  React.useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const highlightText = (text: string) => {
    return text.replace('自选股', '§自选股§');
  };

  const renderText = (text: string) => {
    const parts = highlightText(text).split('§');
    return parts.map((part, i) =>
      part === '自选股'
        ? <span key={i} className="text-blue-400 font-semibold">自选股</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 z-[70] h-[30%] bg-gradient-to-b from-slate-800/95 to-slate-900/98 backdrop-blur-2xl border-t border-white/10 rounded-t-[2rem] shadow-[0_-12px_40px_rgba(0,0,0,0.5)] flex flex-col"
    >
      {/* 拖拽条 */}
      <div className="flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-10 h-1 bg-slate-700 rounded-full" />
      </div>

      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 w-7 h-7 rounded-full bg-slate-700/60 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* 内容区 */}
      <div className="flex-1 flex items-center gap-3 px-5 pb-5 min-h-0">
        {/* 左：虚拟人视频（无外框，直接放置） */}
        <AgentMedia
          src={炒股参谋引导动画}
          poster={AGENTS.quant.avatar}
          className="shrink-0 w-20 h-24 object-cover"
          loop
        />

        {/* 右：气泡 */}
        <div className="flex-1 min-w-0 relative">
          {/* 气泡左侧三角 */}
          <div className="absolute -left-2 top-5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-blue-500/20" />
          <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/80 border border-blue-500/20 rounded-2xl rounded-tl-md px-4 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <p className="text-sm text-slate-100 leading-relaxed mb-2.5">
              {renderText(displayedText)}
              {displayedText.length < FULL_TEXT.length && (
                <span className="inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 animate-pulse align-middle" />
              )}
            </p>
            {displayedText.length >= FULL_TEXT.length && (
              <motion.button
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <Activity className="w-3 h-3" />
                设置盯盘条件
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 持久化选股模型状态，防止跳转买入页返回后状态丢失
let _persistedChatQuantModel: string | null = null;
let _persistedMomentumCompleted = false;
let _persistedTrendFollowingCompleted = false;
let _persistedDividendCompleted = false;
let _persistedEventDrivenCompleted = false;

function ChatView({ agent, initialPrompt, onExit, onViewProfile, onBuyClick }: { agent: AgentData, initialPrompt: string | null, onExit: () => void, onViewProfile: (id: string) => void, onBuyClick: () => void }) {
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'agent', content: React.ReactNode}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeQuantModel, _setActiveQuantModel] = useState<string | null>(
    _persistedChatQuantModel || (agent.id === 'quant' && initialPrompt === '成长股模型' ? '成长股模型' : null)
  );
  const [showWuguEventFlow, setShowWuguEventFlow] = useState(agent.id === 'quant' && initialPrompt === '钨矿涨价事件');
  const [showEventDrivenFlow, setShowEventDrivenFlow] = useState(false);
  const [eventDrivenCompleted, setEventDrivenCompleted] = useState(_persistedEventDrivenCompleted);
  const [wuguFlowCompleted, setWuguFlowCompleted] = useState(false);
  const [trendFollowingCompleted, setTrendFollowingCompleted] = useState(_persistedTrendFollowingCompleted);
  const [dividendCompleted, setDividendCompleted] = useState(_persistedDividendCompleted);
  const [momentumCompleted, setMomentumCompleted] = useState(_persistedMomentumCompleted);
  // setActiveQuantModel 定义在所有 state 之后，以便在清空时重置已完成状态
  const setActiveQuantModel = (model: string | null) => {
    _persistedChatQuantModel = model;
    if (model === null) {
      // 用户主动返回，清除所有持久化状态，下次重新运行模型时从头开始
      _persistedMomentumCompleted = false;
      _persistedTrendFollowingCompleted = false;
      _persistedDividendCompleted = false;
      _persistedEventDrivenCompleted = false;
      setMomentumCompleted(false);
      setTrendFollowingCompleted(false);
      setDividendCompleted(false);
      setEventDrivenCompleted(false);
    }
    _setActiveQuantModel(model);
  };
  const [wealthTaskStep, setWealthTaskStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [quantCardIndex, setQuantCardIndex] = useState(0);
  const quantScrollRef = React.useRef<HTMLDivElement>(null);
  const [showWatchlistDrawer, setShowWatchlistDrawer] = useState(false);
  const [showQuantHistoryDrawer, setShowQuantHistoryDrawer] = useState(false);
  const [inputMode, setInputMode] = useState<'keyboard' | 'voice'>('keyboard');
  const [isRecording, setIsRecording] = useState(false);
  const [toastText, setToastText] = useState('');

  const showToast = (text: string) => {
    setToastText(text);
    window.setTimeout(() => setToastText(''), 1800);
  };

  // 使用 useCallback 稳定 onComplete 回调，避免每次渲染创建新函数
  const handleWuguFlowComplete = useCallback(() => {
    setWuguFlowCompleted(true);
  }, []);

  const handleEventDrivenComplete = useCallback(() => {
    _persistedEventDrivenCompleted = true;
    setEventDrivenCompleted(true);
  }, []);

  const handleTrendFollowingComplete = useCallback(() => {
    _persistedTrendFollowingCompleted = true;
    setTrendFollowingCompleted(true);
  }, []);

  const handleDividendComplete = useCallback(() => {
    _persistedDividendCompleted = true;
    setDividendCompleted(true);
  }, []);

  const handleMomentumComplete = useCallback(() => {
    _persistedMomentumCompleted = true;
    setMomentumCompleted(true);
  }, []);

  const handleQuantScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const centerPosition = scrollLeft + clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.offsetWidth / 2;
      const distance = Math.abs(childCenter - centerPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex >= 0 && closestIndex < 7) {
      setQuantCardIndex(closestIndex);
    }
  };

  React.useEffect(() => {
    if (agent.id === 'wealth' && wealthTaskStep < 7) {
      const timer = setTimeout(() => {
        setWealthTaskStep(s => s + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [wealthTaskStep, agent.id]);

  React.useEffect(() => {
    const handleReset = () => setActiveQuantModel(null);
    window.addEventListener('reset-quant-model', handleReset);
    return () => window.removeEventListener('reset-quant-model', handleReset);
  }, []);

  const handlePromptClick = (text: string) => {
    setChatHistory(prev => [
      ...prev,
      { role: 'user', content: text },
      { role: 'agent', content: '好的，我正在为您分析并整理相关信息，请稍候...' }
    ]);
  };

  const handleSendInput = () => {
    const text = inputValue.trim();
    if (!text) return;
    handlePromptClick(text);
    setInputValue('');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setInputMode('keyboard');
    setInputValue('筛选近20日趋势向上、营收增速高于行业中位数的股票');
    showToast('语音已识别，可继续修改后发送');
  };

  const renderWealthContent = () => (
    <>
      <FundTaskOrchestration step={wealthTaskStep} />
      {wealthTaskStep >= 7 && <FundCards onBuyClick={onBuyClick} />}

      {/* Prompt Suggestions */}
      {wealthTaskStep >= 7 && (
        <div className="space-y-3 mt-4">
          {[
            '批量下单',
            '加入自选',
            '换一批'
          ].map((text, i) => (
            <button 
              key={i} 
              onClick={() => handlePromptClick(text)}
              className="w-full text-left bg-slate-800/60 backdrop-blur-xl hover:bg-slate-700/80 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">#</div>
                <span className="text-sm text-slate-200 group-hover:text-white leading-snug font-medium">{text}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
            </button>
          ))}
        </div>
      )}
    </>
  );

  const renderAdvisorContent = () => {
    let showLiHua = true;
    let showZhaoJinSheng = true;

    if (initialPrompt === '了解 AI 领域的投资顾问') {
      showZhaoJinSheng = false;
    } else if (initialPrompt === '擅长债券类基金研究的投资顾问') {
      showLiHua = false;
    }

    return (
      <>
        <div className="space-y-4 mb-4">
          {showZhaoJinSheng && (
            <div onClick={() => onViewProfile('zhao')} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg relative overflow-hidden cursor-pointer hover:bg-slate-800/80 transition-all group">
              {/* Large Photo Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img src={赵金胜小头像} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">赵金胜</h3>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded border border-blue-500/30">资深投顾</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); }} className="text-slate-300 text-xs hover:text-white transition-colors bg-slate-900/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">关注</button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span className="text-sm font-bold text-slate-200">投资风格</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    擅长股票、债券、基金等多资产类别均衡配置，严控市场波动风险，以 1-3 年中长期资产稳健增值为目标，不追逐短期热点。
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-sm font-bold text-slate-200">专业能力</span>
                  </div>
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      其管理的基金投顾组合，过去 3 年平均年化收益 <span className="text-red-400 font-bold">+15%</span>，组合净值最大向下波动 <span className="text-emerald-400 font-bold">-12%</span>。
                    </p>
                    <div className="relative h-24 bg-slate-800/50 rounded-lg p-2 border border-white/5 overflow-hidden">
                      <div className="text-[10px] text-slate-500 mb-1 absolute top-2 left-2 z-10">《华创 3 号-行业均衡配置组合》收益率走势</div>
                      <svg className="w-full h-full pt-4" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="zhao-grad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="rgb(239 68 68)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 100 L 0 80 L 20 75 L 40 60 L 60 55 L 80 30 L 100 20 L 100 100 Z" fill="url(#zhao-grad)" />
                        <path d="M 0 80 L 20 75 L 40 60 L 60 55 L 80 30 L 100 20" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <span className="text-sm font-bold text-slate-200">服务特色</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    按周进行持仓复盘与市场解读，资产选择与调仓逻辑清晰透明，风险提示及时。
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-center">
                  <button onClick={(e) => { e.stopPropagation(); onViewProfile('zhao'); }} className="px-12 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-colors">立即签约</button>
                </div>
              </div>
            </div>
          )}

          {showLiHua && (
            <div onClick={() => onViewProfile('li')} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg relative overflow-hidden cursor-pointer hover:bg-slate-800/80 transition-all group">
              <div className="relative h-48 w-full overflow-hidden">
                <img src={李华小头像} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">李华</h3>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded border border-blue-500/30">首席投顾</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); }} className="text-slate-300 text-xs hover:text-white transition-colors bg-slate-900/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">关注</button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span className="text-sm font-bold text-slate-200">投资风格</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    专注股票投资研究 15 年，以价值投资为核心投资理念，善于挖掘 AI、半导体、新能源等细分领域成长股。有完整的选股、止盈、止损交易体系。
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-sm font-bold text-slate-200">专业能力</span>
                  </div>
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      其推荐的股票池，过去三年，交易胜率保持在 <span className="text-red-400 font-bold">65% 以上</span>，平均持股周期 <span className="text-blue-400 font-bold">6 个月</span>。
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <span className="text-sm font-bold text-slate-200">服务特色</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-white/5">
                    提供每日投资观点，及时解读市场变化、行业事件、股票池个股异动，股票池调入调出严格遵守交易纪律，不受市场情绪干扰。
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-center">
                  <button onClick={(e) => { e.stopPropagation(); onViewProfile('li'); }} className="px-12 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-colors">立即签约</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {[
            '了解 AI 领域的投资顾问',
            '擅长债券类基金研究的投资顾问'
          ].map((text, i) => (
            <button 
              key={i} 
              onClick={() => handlePromptClick(text)}
              className="w-full text-left bg-slate-800/60 backdrop-blur-xl hover:bg-slate-700/80 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">#</div>
                <span className="text-sm text-slate-200 group-hover:text-white leading-snug font-medium">{text}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
            </button>
          ))}
        </div>
      </>
    );
  };

  const quantModels = [
    { title: '趋势跟随模型', desc: '捕捉市场主线，顺势而为', icon: <TrendingUp className="w-6 h-6 text-blue-400" /> },
    { title: '高股息低波动模型', desc: '稳健防御，追求长期复利', icon: <Shield className="w-6 h-6 text-emerald-400" /> },
    { title: '成长股模型', desc: '景气产业，优选高成长龙头', icon: <Sprout className="w-6 h-6 text-indigo-400" /> },
    { title: '短线强势模型', desc: '量价共振，寻找爆发点', icon: <Activity className="w-6 h-6 text-red-400" /> }
  ];

  const renderQuantContent = () => {
    // Q-03: 引导页进入的钨矿涨价事件选股
    if (agent.id === 'quant' && initialPrompt === '钨矿涨价事件' && showWuguEventFlow) {
      return (
        <WuguEventFlowView
          onComplete={handleWuguFlowComplete}
          onViewOtherStrategies={() => setShowWuguEventFlow(false)}
          onBuyClick={onBuyClick}
        />
      );
    }
    // Q-04: 对话页成长股模型选股
    if (activeQuantModel === '成长股模型' || showEventDrivenFlow) {
      return <GrowthStockFlowView onComplete={handleEventDrivenComplete} onBuyClick={onBuyClick} onQuestionClick={handlePromptClick} />;
    }
    // Q-05: 趋势跟随模型选股
    if (activeQuantModel === '趋势跟随模型') {
      return <TrendFollowingFlowView onComplete={handleTrendFollowingComplete} onBuyClick={onBuyClick} onAddToWatchlist={() => setShowWatchlistDrawer(true)} />;
    }
    // Q-06: 高股息低波动模型选股
    if (activeQuantModel === '高股息低波动模型') {
      return <DividendFlowView onComplete={handleDividendComplete} onBuyClick={onBuyClick} onQuestionClick={handlePromptClick} />;
    }
    if (activeQuantModel && METRIC_MODEL_CONFIGS[activeQuantModel]) {
      return <MetricFactorFlowView config={METRIC_MODEL_CONFIGS[activeQuantModel]} onComplete={handleDividendComplete} onBuyClick={onBuyClick} onQuestionClick={handlePromptClick} />;
    }
    // Q-07: 短线强势模型选股
    if (activeQuantModel === '短线强势模型') {
      return <MomentumFlowView onComplete={handleMomentumComplete} onBuyClick={onBuyClick} initialCompleted={momentumCompleted} />;
    }

    // Q-02: 默认显示4个模型卡片
    return (
      <div className="space-y-4">
        <div 
          ref={quantScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-hide -mx-4 mt-2"
          onScroll={handleQuantScroll}
        >
          
          {/* Card 1: 趋势跟随模型 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-blue-900/30 to-transparent relative overflow-hidden">
              <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-blue-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-base font-bold text-slate-100">趋势跟随模型</div>
              </div>
              <div className="text-xs text-blue-200/70 relative z-10">顺势而为，做趋势的朋友</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-slate-400" />
                最新趋势信号
              </div>
              
              {/* Item 1: 下跌转上涨 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">中际旭创</span>
                  <span className="text-sm font-bold text-red-400">+2.35%</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-2 py-1.5 rounded border border-white/5 bg-slate-800/50">
                  <span className="text-[11px] text-emerald-400">下跌趋势</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] text-red-400 font-bold">上涨趋势</span>
                </div>
              </div>

              {/* Item 2: 震荡转上涨 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">工业富联</span>
                  <span className="text-sm font-bold text-red-400">+1.20%</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-2 py-1.5 rounded border border-white/5 bg-slate-800/50">
                  <span className="text-[11px] text-slate-400">震荡趋势</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] text-red-400 font-bold">突破震荡</span>
                </div>
              </div>

              {/* Item 3: 回调支撑 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">新易盛</span>
                  <span className="text-sm font-bold text-emerald-400">-0.44%</span>
                </div>
                <div className="flex items-center justify-center gap-2 px-2 py-1.5 rounded border border-white/5 bg-slate-800/50">
                  <span className="text-[11px] text-amber-400">上涨趋势回调</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] text-red-400 font-bold">到达支撑位</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <button onClick={() => setActiveQuantModel('趋势跟随模型')} className="w-full py-2.5 bg-blue-600/20 text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-600/30 transition-colors border border-blue-500/30">运行该模型</button>
            </div>
          </div>

          {/* Card 2: 成长股模型 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-indigo-900/30 to-transparent relative overflow-hidden">
              <Sprout className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-indigo-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Sprout className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-base font-bold text-slate-100">成长股模型</div>
              </div>
              <div className="text-xs text-indigo-200/70 relative z-10">按经营现金流、利润增速、营收增速筛选</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-slate-400" />
                成长指标信号
              </div>

              {/* Item 1 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">中际旭创 <span className="text-xs text-slate-500 font-mono font-normal">300308</span></span>
                  <span className="text-sm font-bold text-red-400">+3.21%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-indigo-500/20 bg-indigo-500/10">
                  <span className="text-[11px] text-indigo-200/90">经营现金流 18.6 亿元，利润增速 +85%</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">北方华创 <span className="text-xs text-slate-500 font-mono font-normal">002371</span></span>
                  <span className="text-sm font-bold text-red-400">+2.48%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-indigo-500/20 bg-indigo-500/10">
                  <span className="text-[11px] text-indigo-200/90">营收增速 +38%，利润增速 +42%</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">宁德时代 <span className="text-xs text-slate-500 font-mono font-normal">300750</span></span>
                  <span className="text-sm font-bold text-red-400">+1.86%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-indigo-500/20 bg-indigo-500/10">
                  <span className="text-[11px] text-indigo-200/90">经营现金流 126.4 亿元，营收增速 +18%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <button onClick={() => setActiveQuantModel('成长股模型')} className="w-full py-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-600/30 transition-colors border border-indigo-500/30">运行该模型</button>
            </div>
          </div>

          {/* Card 3: 短线强势模型 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-sky-900/30 to-transparent relative overflow-hidden">
              <Activity className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-sky-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                  <Activity className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-base font-bold text-slate-100">短线强势模型</div>
              </div>
              <div className="text-xs text-sky-200/70 relative z-10">追强抓快，短线强势股猎手</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              {/* Item 1 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">万丰奥威 <span className="text-xs text-slate-500 font-mono font-normal">002085</span></span>
                  <span className="text-sm font-bold text-red-400">+9.98%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-sky-500/20 bg-sky-500/10">
                  <span className="text-[11px] text-sky-200/90">过去5日出现涨停，创15日新高</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">赛力斯 <span className="text-xs text-slate-500 font-mono font-normal">601127</span></span>
                  <span className="text-sm font-bold text-red-400">+6.54%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-sky-500/20 bg-sky-500/10">
                  <span className="text-[11px] text-sky-200/90">连5日收盘高于5日线且成交量放大</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">高新发展 <span className="text-xs text-slate-500 font-mono font-normal">000628</span></span>
                  <span className="text-sm font-bold text-red-400">+8.21%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-sky-500/20 bg-sky-500/10">
                  <span className="text-[11px] text-sky-200/90">股价创新高，成交量大于30日均量150%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <button onClick={() => setActiveQuantModel('短线强势模型')} className="w-full py-2.5 bg-sky-600/20 text-sky-400 rounded-xl text-sm font-medium hover:bg-sky-600/30 transition-colors border border-sky-500/30">运行该模型</button>
            </div>
          </div>

          {/* Card 4: 高股息低波动模型 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-cyan-900/30 to-transparent relative overflow-hidden">
              <Shield className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-cyan-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-base font-bold text-slate-100">高股息低波动模型</div>
              </div>
              <div className="text-xs text-cyan-200/70 relative z-10">股息打底、风控为先，追求长期稳健收益</div>
            </div>
            <div className="p-5 flex-1 space-y-3 overflow-y-auto scrollbar-hide">
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">工商银行 <span className="text-xs text-slate-500 font-mono">601398</span></span>
                  <span className="text-sm font-bold text-red-400">+0.56%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-cyan-500/20 bg-cyan-500/10">
                  <span className="block truncate text-[11px] text-cyan-200/90">股息率 TTM 5.2%，连续分红 10 年</span>
                </div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">长江电力 <span className="text-xs text-slate-500 font-mono">600900</span></span>
                  <span className="text-sm font-bold text-red-400">+1.15%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-cyan-500/20 bg-cyan-500/10">
                  <span className="block truncate text-[11px] text-cyan-200/90">5年均股息率 4.2%，年化波动率 18.3%</span>
                </div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-200">中国神华 <span className="text-xs text-slate-500 font-mono">601088</span></span>
                  <span className="text-sm font-bold text-red-400">+0.78%</span>
                </div>
                <div className="px-2 py-1.5 rounded border border-cyan-500/20 bg-cyan-500/10">
                  <span className="block truncate text-[11px] text-cyan-200/90">股息率 TTM 6.8%，ROE近3年均值 18.2%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <button onClick={() => setActiveQuantModel('高股息低波动模型')} className="w-full py-2.5 bg-cyan-600/20 text-cyan-400 rounded-xl text-sm font-medium hover:bg-cyan-600/30 transition-colors border border-cyan-500/30">运行该模型</button>
            </div>
          </div>

          {/* Card 5: 低估值选股 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-amber-900/30 to-transparent relative overflow-hidden">
              <PieChart className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-amber-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30"><PieChart className="w-4 h-4 text-amber-400" /></div>
                <div className="text-base font-bold text-slate-100">低估值选股</div>
              </div>
              <div className="text-xs text-amber-200/70 relative z-10">按 PE 绝对值、历史百分位和 PEG 筛选</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              {METRIC_MODEL_CONFIGS['低估值选股'].stocks.map(stock => (
                <div key={stock.code} className="bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-sm font-bold text-slate-200">{stock.name} <span className="text-xs text-slate-500 font-mono">{stock.code}</span></span>
                    <span className={`text-sm font-bold ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.change}</span>
                  </div>
                  <div className="px-2 py-1.5 rounded border border-amber-500/20 bg-amber-500/10">
                    <span className="block truncate text-[11px] text-amber-200/90">{getBriefReasonText(stock.reasonFacts)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5"><button onClick={() => setActiveQuantModel('低估值选股')} className="w-full py-2.5 bg-amber-600/20 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-600/30 transition-colors border border-amber-500/30">运行该模型</button></div>
          </div>

          {/* Card 6: 产业景气度选股 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-red-900/30 to-transparent relative overflow-hidden">
              <Flame className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-red-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30"><Flame className="w-4 h-4 text-red-400" /></div>
                <div className="text-base font-bold text-slate-100">产业景气度选股</div>
              </div>
              <div className="text-xs text-red-200/70 relative z-10">按产业利润、涨跌幅和单季 ROE 筛选</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              {METRIC_MODEL_CONFIGS['产业景气度选股'].stocks.map(stock => (
                <div key={stock.code} className="bg-slate-900/60 hover:bg-slate-900/65 rounded-lg p-2.5 border border-white/5 hover:border-red-400/20 transition-colors flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-200">
                      <span>{stock.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                      {stock.industry && (
                        <span className="rounded-md bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-red-200">
                          {stock.industry}
                        </span>
                      )}
                    </span>
                    <span className={`text-sm font-bold ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.change}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="rounded border border-red-500/20 bg-red-500/10 px-2 py-1.5 leading-none">
                      <div className="text-[9px] text-red-200/55">5日内行业涨幅</div>
                      <div className="mt-1 text-[12px] font-semibold text-red-200 tabular-nums">{stock.industryChange}</div>
                    </div>
                    <div className="rounded border border-red-500/20 bg-red-500/10 px-2 py-1.5 leading-none">
                      <div className="text-[9px] text-red-200/55">5日内股票涨幅</div>
                      <div className="mt-1 text-[12px] font-semibold text-red-200 tabular-nums">
                        {stock.metrics[0].value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5"><button onClick={() => setActiveQuantModel('产业景气度选股')} className="w-full py-2.5 bg-red-600/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30">运行该模型</button></div>
          </div>

          {/* Card 7: 新兴产业+成长股模型 */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-center bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-gradient-to-r from-indigo-900/30 to-transparent relative overflow-hidden">
              <Sprout className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-indigo-500/10" />
              <div className="relative z-10 flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><Sprout className="w-4 h-4 text-indigo-400" /></div>
                <div className="text-base font-bold text-slate-100">新兴产业+成长股模型</div>
              </div>
              <div className="text-xs text-indigo-200/70 relative z-10">参考成长股模型，叠加增速加速度</div>
            </div>
            <div className="p-5 flex-1 space-y-3">
              {METRIC_MODEL_CONFIGS['新兴产业+成长股模型'].stocks.map(stock => (
                <div key={stock.code} className="bg-slate-900/60 hover:bg-slate-900/65 rounded-lg p-2.5 border border-white/5 hover:border-indigo-400/20 transition-colors flex flex-col gap-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm font-bold text-slate-200">
                      <span>{stock.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{stock.code}</span>
                      {stock.industry && (
                        <span className="rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-indigo-200">
                          {stock.industry}
                        </span>
                      )}
                    </span>
                    <span className={`text-sm font-bold ${stock.changeUp ? 'text-red-400' : 'text-emerald-400'}`}>{stock.change}</span>
                  </div>
                  <div className="px-2 py-1.5 rounded border border-indigo-500/20 bg-indigo-500/10">
                    <span className="block truncate text-[11px] text-indigo-200/90">
                      {getTopFactorBriefText(stock.detailReasonFactors)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5"><button onClick={() => setActiveQuantModel('新兴产业+成长股模型')} className="w-full py-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-600/30 transition-colors border border-indigo-500/30">运行该模型</button></div>
          </div>

        </div>

        {/* Quant Cards Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-2 mb-2">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <button
              key={index}
              onClick={() => {
                if (quantScrollRef.current) {
                  const container = quantScrollRef.current;
                  const child = container.children[index] as HTMLElement;
                  if (child) {
                    const scrollLeft = child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                  }
                }
              }}
              className={`rounded-full transition-all duration-300 ease-out ${
                quantCardIndex === index
                  ? 'w-6 h-1.5 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                  : 'w-1.5 h-1.5 bg-slate-700/60 hover:bg-slate-600'
              }`}
              aria-label={`Go to quant card ${index + 1}`}
            />
          ))}
        </div>
        <div className="px-1 space-y-2">
          <div className="text-[11px] text-slate-500">推荐问题</div>
          <div className="space-y-2">
            {QUANT_HOME_SUGGESTED_QUESTIONS.map(question => (
              <button
                key={question}
                type="button"
                onClick={() => handlePromptClick(question)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/45 px-3.5 py-3 text-left text-xs leading-snug text-slate-300 transition-colors hover:border-indigo-500/35 hover:bg-slate-700/60 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const quickActions = agent.id === 'advisor' 
    ? ['已关注', '已签约']
    : agent.id === 'wealth'
      ? ['推荐更多产品', '产品评价', '产品对比']
      : [];
  const isQuantModelDetail = agent.id === 'quant' && Boolean(activeQuantModel || showWuguEventFlow || showEventDrivenFlow);
  const quantDetailTitle = showWuguEventFlow
    ? '事件驱动选股模型'
    : showEventDrivenFlow
      ? '成长股模型'
      : activeQuantModel ?? '';
  const compactHeaderTitle = isQuantModelDetail ? quantDetailTitle : HOME_AGENT_ENTRY_LABELS[agent.id];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"
    >
      {/* Always-visible Back Button */}
      <div className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none ${
        isQuantModelDetail
          ? 'px-4 pt-9 pb-2 bg-slate-900/92 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_24px_rgba(15,23,42,0.35)]'
          : agent.id === 'quant' && scrollY > 40
            ? 'px-4 pt-9 pb-2 bg-slate-900/92 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_24px_rgba(15,23,42,0.35)]'
            : 'px-6 pt-10 pb-3'
      }`}>
        <div className="h-9 flex min-w-0 items-center gap-3">
          <button 
            onClick={() => {
              if (activeQuantModel) {
                setActiveQuantModel(null);
              } else if (showWuguEventFlow || showEventDrivenFlow) {
                setShowWuguEventFlow(false);
                setShowEventDrivenFlow(false);
              } else {
                onExit();
              }
            }} 
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-colors shadow-sm pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {isQuantModelDetail && (
            <div className="min-w-0 text-base font-semibold leading-none text-slate-100 truncate">
              {quantDetailTitle}
            </div>
          )}
          {agent.id === 'quant' && !isQuantModelDetail && scrollY > 40 && (
            <div className="min-w-0 text-base font-semibold leading-none text-slate-100 truncate">
              {HOME_AGENT_ENTRY_LABELS[agent.id]}
            </div>
          )}
        </div>
        {agent.id === 'quant' && (
          <div className="flex h-9 shrink-0 items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => setShowQuantHistoryDrawer(true)}
              className="h-8 w-8 rounded-full border border-white/10 bg-slate-800/80 text-slate-300 shadow-sm backdrop-blur-md transition-colors hover:text-white"
              aria-label="历史对话"
            >
              <History className="mx-auto h-4 w-4" />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${scrollY > 40 ? 'w-8 opacity-100' : 'w-0 opacity-0'}`}>
              <img
                src={agent.avatar}
                className="h-8 w-8 rounded-full border border-white/10 object-cover shadow-sm"
                referrerPolicy="no-referrer"
                alt=""
              />
            </div>
          </div>
        )}
      </div>

      {/* Compact Sticky Header (Fades in on scroll) */}
      <header className={`absolute top-0 left-0 right-0 z-40 px-6 pt-10 pb-3 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-sm flex items-center justify-between transition-all duration-300 ${agent.id !== 'quant' && !isQuantModelDetail && scrollY > 40 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 shrink-0"></div> {/* Spacer for back button */}
          <h2 className="font-bold text-slate-100 text-lg drop-shadow-md">
            {compactHeaderTitle}
          </h2>
        </div>
        <div className="relative shrink-0 w-11 h-11">
          <img src={agent.avatar} className="w-full h-full object-cover rounded-full border border-white/10 shadow-sm" referrerPolicy="no-referrer" />
        </div>
      </header>

      <main 
        className="flex-1 overflow-y-auto scrollbar-hide pb-40 relative"
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        
        {/* Hero Section (Normal flow, fades out on scroll to prevent jitter) */}
        {!isQuantModelDetail && (
        <div className={`px-6 pt-20 pb-8 flex justify-between items-start relative transition-opacity duration-300 ${scrollY > 40 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="z-10 pt-4">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 drop-shadow-md">
              {agent.id === 'wealth' ? '张女士，您好！' : agent.id === 'quant' ? '您好，张女士' : 'hi~张女士'} <Sparkles className="w-5 h-5 text-blue-400" />
            </h2>
            <div className="text-slate-300 mt-2 font-medium drop-shadow-md text-sm leading-relaxed">
              {agent.id === 'wealth' ? (
                <TypewriterText 
                  text={wealthTaskStep < 7 
                    ? "正在根据您的投资偏好与目标，匹配适合您的基金产品" 
                    : "已为您完成基金产品匹配"} 
                  key={wealthTaskStep < 7 ? 'running' : 'completed'}
                />
              ) : agent.id === 'quant' ? (
                initialPrompt === '钨矿涨价事件' && showWuguEventFlow ? (
                  <TypewriterText
                    text={wuguFlowCompleted
                      ? '已完成筛选，为您找到 5 只重点关注投资标的。'
                      : '正在运行事件驱动选股模型，为您筛选"钨矿涨价事件"重点关注投资标的。'}
                    key={wuguFlowCompleted ? 'wugu-done' : 'wugu-running'}
                  />
                ) : (activeQuantModel === '成长股模型' || showEventDrivenFlow) ? (
                  <TypewriterText
                    text={eventDrivenCompleted
                      ? '已完成筛选，为您找到 3 只高景气成长股。'
                      : '正在运行成长股模型，从景气产业中筛选高成长龙头标的。'}
                    key={eventDrivenCompleted ? 'growth-done' : 'growth-running'}
                  />
                ) : activeQuantModel === '趋势跟随模型' ? (
                  <TypewriterText
                    text={trendFollowingCompleted
                      ? '已完成筛选，为您找到 4 只强势趋势标的。'
                      : '正在运行趋势跟随选股模型，在上涨趋势中寻找投资机会。'}
                    key={trendFollowingCompleted ? 'trend-done' : 'trend-running'}
                  />
                ) : activeQuantModel === '高股息低波动模型' ? (
                  <TypewriterText
                    text={dividendCompleted
                      ? '已完成筛选，为您找到 4 只高股息稳健标的。'
                      : '正在运行高股息低波动模型，筛选稳健分红的价值标的。'}
                    key={dividendCompleted ? 'dividend-done' : 'dividend-running'}
                  />
                ) : activeQuantModel && METRIC_MODEL_CONFIGS[activeQuantModel] ? (
                  <TypewriterText
                    text={`正在运行${activeQuantModel}，按模型指标筛选股票。`}
                    key={`${activeQuantModel}-running`}
                  />
                ) : activeQuantModel === '短线强势模型' ? (
                  <TypewriterText
                    text={momentumCompleted
                      ? '已完成筛选，为您找到 4 只短线强势标的。'
                      : '正在运行短线强势模型，捕捉量价齐升的短线机会。'}
                    key={momentumCompleted ? 'momentum-done' : 'momentum-running'}
                  />
                ) : (
                <div className="space-y-1">
                  <TypewriterText text="运行您喜欢的选股模型，剩下的事情交给我" />
                </div>
                )
              ) : agent.id === 'advisor' ? (
                <TypewriterText text="根据您的投资偏好，已为您找到两位匹配的投资顾问" />
              ) : (
                '愿你投资顺利又闪亮'
              )}
            </div>
          </div>
          <div className="relative w-28 h-28 shrink-0">
            {agent.id === 'wealth' ? (
              <AgentMedia
                src="/对话页虚拟人/产品买手对话虚拟人.mov"
                poster={agent.avatar}
                className="w-28 h-28 object-cover"
              />
            ) : agent.id === 'quant' ? (
              <AgentMedia
                src={炒股参谋引导动画}
                poster={agent.avatar}
                className="w-28 h-28 object-cover"
                loop
              />
            ) : agent.id === 'advisor' ? (
              <AgentMedia
                src="/对话页虚拟人/投顾猎头对话虚拟人.mov"
                poster={agent.avatar}
                className="w-28 h-28 object-cover"
              />
            ) : (
              <img src={agent.avatar} className="w-28 h-28 object-cover rounded-full border-2 border-white/10 shadow-lg" referrerPolicy="no-referrer" alt="" />
            )}
          </div>
        </div>
        )}

        {/* Content Area */}
        <div className={`px-4 space-y-4 relative z-20 ${isQuantModelDetail ? 'pt-16' : '-mt-4'}`}>
          
          {agent.id === 'wealth' && renderWealthContent()}
          {agent.id === 'advisor' && renderAdvisorContent()}
          {agent.id === 'quant' && renderQuantContent()}

          {/* Chat History Divider */}
          {chatHistory.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="pt-8 pb-4 flex items-center justify-center gap-4 opacity-60"
            >
              <div className="h-px w-12 bg-slate-500"></div>
              <span className="text-xs text-slate-400">以下为对话内容</span>
              <div className="h-px w-12 bg-slate-500"></div>
            </motion.div>
          )}

          {/* Chat Bubbles */}
          {chatHistory.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'agent' && (
                <img src={agent.avatar} className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0 shadow-sm" referrerPolicy="no-referrer" />
              )}
              <div className={`max-w-[80%] text-sm p-3.5 rounded-2xl shadow-md leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none border border-white/10' 
                  : 'bg-slate-800/60 backdrop-blur-md border border-white/10 text-slate-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

        </div>
      </main>

      <QuantHistoryDrawer
        isOpen={showQuantHistoryDrawer}
        onClose={() => setShowQuantHistoryDrawer(false)}
        onSelect={handlePromptClick}
      />

      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-slate-950/95"
            onMouseUp={handleStopRecording}
            onTouchEnd={handleStopRecording}
          >
            <div className="text-sm tracking-wide text-slate-400">松开发送，上滑取消</div>
            <div className="mt-8 flex h-16 items-end justify-center gap-1.5">
              {[22, 38, 56, 44, 64, 35, 50, 27, 42].map((height, index) => (
                <div
                  key={index}
                  className="w-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-300 animate-pulse"
                  style={{ height, animationDelay: `${index * 70}ms` }}
                />
              ))}
            </div>
            <button onClick={handleStopRecording} className="mt-8 rounded-full border border-white/10 px-5 py-2 text-xs text-slate-400">
              完成识别
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastText && (
          <motion.div
            initial={{ opacity: 0, y: 12, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 12, x: '-50%' }}
            className="absolute bottom-24 left-1/2 z-[80] whitespace-nowrap rounded-2xl bg-slate-100 px-4 py-2 text-xs font-medium text-slate-900 shadow-xl"
          >
            {toastText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Input Area */}
      <div className="absolute bottom-6 left-4 right-4 z-30 flex flex-col gap-3">
        
        {/* Quick Action Pills - 仅在非Q-02页面显示 */}
        {quickActions.length > 0 && !(agent.id === 'quant' && !activeQuantModel && !showWuguEventFlow && !showEventDrivenFlow) && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-2">
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => handlePromptClick(action)}
                className="shrink-0 bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-300 text-xs px-4 py-2 rounded-full shadow-lg hover:bg-slate-700 hover:text-white transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Floating Input Card */}
        {inputMode === 'voice' ? (
          <button
            onMouseDown={() => setIsRecording(true)}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsRecording(true);
            }}
            onClick={() => setInputMode('keyboard')}
            className="rounded-[2rem] border border-blue-300/30 bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-[0.99]"
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.16em] text-white">
              <Mic className="h-5 w-5" />
              按住说话
            </div>
            <div className="mt-1 text-[11px] text-white/60">点击切换键盘输入</div>
          </button>
        ) : (
          <div className="bg-slate-800/90 backdrop-blur-2xl rounded-[2rem] p-2 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2 focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
            <button
              onClick={() => setInputMode('voice')}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
              aria-label="语音输入"
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onFocus={() => setInputMode('keyboard')}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendInput();
              }}
              placeholder={agent.id === 'quant' ? '输入选股偏好' : '发消息或按住说话...'}
              className="bg-transparent text-sm outline-none w-full text-slate-200 placeholder:text-slate-500 py-2"
            />
            <button
              onClick={handleSendInput}
              disabled={!inputValue.trim()}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white shrink-0 shadow-md transition-colors hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:shadow-none"
              aria-label="发送"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* 加入自选股 - 底部抽屉浮层（absolute 定位，在手机容器内，高度30%） */}
      <AnimatePresence>
        {showWatchlistDrawer && (
          <WatchlistDrawer onClose={() => setShowWatchlistDrawer(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const portfolioData = [
  { name: '1月', value1: 0 },
  { name: '2月', value1: 3.2 },
  { name: '3月', value1: 5.8 },
  { name: '4月', value1: 8.1 },
  { name: '5月', value1: 6.4 },
  { name: '6月', value1: 9.7 },
  { name: '7月', value1: 12.8 },
];

const insightsData = [
  { title: '组合每周复盘报告', views: '3.2k', likes: 248, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80', isVideo: true },
  { title: '金胜看盘：政策利好频出，科技股能否延续强势?', views: '2.1k', likes: 156, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80', isVideo: true },
  { title: '价值投资实战：如何识别被错杀的优质标的', views: '1.8k', likes: 98, image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80', isVideo: false },
  { title: 'ETF投资入门：指数基金的优势与配置策略', views: '1.5k', likes: 87, image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?auto=format&fit=crop&w=300&q=80', isVideo: false },
];

function AdvisorProfileView({ profile, onBack }: { profile: AdvisorProfileData, onBack: () => void }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleCardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const centerPosition = scrollLeft + clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.offsetWidth / 2;
      const distance = Math.abs(childCenter - centerPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex >= 0 && closestIndex < 2) {
      setActiveCardIndex(closestIndex);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 z-50 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 pt-12 pb-2 px-4 flex items-center justify-between z-30">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10 pb-32">
        
        {/* Tech-Savvy Digital Human Header (Card Style) */}
        <div className="relative pt-8 pb-4 px-4 overflow-hidden mb-2">
          {/* Background Tech Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </div>

          {/* Card Container */}
          <div className="relative z-10 w-full mt-16 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5 pt-16 shadow-2xl">
            
            {/* Overlapping Avatar */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
              <div className="relative w-28 h-28">
                {/* Glow */}
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                {/* Avatar Image */}
                <img 
                  src={profile.avatar} 
                  className="w-full h-full object-cover rounded-full border-4 border-slate-900 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
                  referrerPolicy="no-referrer" 
                  alt="" 
                />
              </div>
            </div>

            {/* Name & Action */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 tracking-tight drop-shadow-lg">
                {profile.name}
              </h2>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors">
                <UserCheck className="w-4 h-4" />
                关注
              </button>
            </div>

            {/* Tags & Company */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="text-xs px-2.5 py-1 rounded bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border border-blue-500/30 text-blue-200 flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-blue-400" />
                {profile.company}
              </div>
              {profile.tags.slice(0, 3).map((tag, i) => (
                <div key={i} className="text-xs px-2.5 py-1 rounded bg-orange-900/30 border border-orange-500/30 text-orange-300 font-medium">
                  {tag}
                </div>
              ))}
            </div>

            {/* Speech Bubble */}
            <div className="relative mt-2">
              {/* Upward pointing arrow/tail */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800/95 border-t border-l border-blue-500/40 transform rotate-45 z-20"></div>
              
              <div className="bg-slate-800/95 border border-blue-500/40 rounded-2xl p-4 backdrop-blur-xl relative z-10 shadow-xl">
                <div className="text-sm text-blue-50 leading-relaxed font-medium drop-shadow-sm line-clamp-3">
                  <TypewriterText text="我的组合近三月收益 +13%，表现稳健。在当前市场震荡回调情况下，我将严控风险，减少权益类资产仓位，增加债券类基金配置。" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div className="flex justify-center gap-1.5 mb-3">
          {[0, 1].map((idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-600'
              }`}
            />
          ))}
        </div>
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 gap-4"
          onScroll={handleCardScroll}
        >
          
          {/* Card 1: Portfolio */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-lg relative overflow-hidden h-[440px] flex flex-col">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              {/* Header */}
              <div className="mb-4 relative z-10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  华创 3 号-均衡配置组合
                </h3>
              </div>

              {/* Mini Chart */}
              <div className="flex-1 w-full mb-4 relative z-10 min-h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} minTickGap={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                    <Area type="monotone" dataKey="value1" stroke="#f87171" strokeWidth={2} fillOpacity={1} fill="url(#colorValue1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Key Metrics */}
              <div className="flex gap-2 relative z-10 mt-auto">
                <div className="flex-1 bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="text-[10px] text-slate-400 mb-0.5">近一年</div>
                  <div className="text-sm font-bold text-red-400">+42.38%</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="text-[10px] text-slate-400 mb-0.5">近三年</div>
                  <div className="text-sm font-bold text-red-400">+112.5%</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-2 text-center border border-white/5">
                  <div className="text-[10px] text-slate-400 mb-0.5">三年平均</div>
                  <div className="text-sm font-bold text-red-400">+28.5%</div>
                </div>
              </div>

              <div className="mt-4 flex justify-center relative z-10">
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 font-medium py-2 px-10 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all flex items-center justify-center gap-2 text-sm">
                  立即签约 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Latest Insights */}
          <div className="snap-center shrink-0 w-[85%] flex flex-col">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-lg relative overflow-hidden h-[440px] flex flex-col">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" /> 最新观点
                </h3>
                <button className="text-xs text-blue-400 flex items-center gap-1">
                  更多 <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Highlighted Insight */}
              <div className="relative rounded-2xl overflow-hidden mb-3 group cursor-pointer shrink-0">
                <img src={insightsData[0].image} className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-105" alt="Highlight" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">深度解析</span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1"><Clock className="w-3 h-3" /> 2小时前</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">{insightsData[0].title}</h4>
                </div>
                {insightsData[0].isVideo && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <Play className="w-3 h-3 ml-0.5" />
                  </div>
                )}
              </div>

              {/* Other Insights */}
              <div className="space-y-3 relative z-10 mt-auto">
                {insightsData.slice(1, 4).map((item, i) => (
                  <div key={i} className="flex gap-3 items-center cursor-pointer group">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt="Thumbnail" referrerPolicy="no-referrer" />
                      {item.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-3 h-3 text-white/80" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-slate-200 line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      <div className="text-[10px] text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Prompt Suggestions */}
        <div className="space-y-3 mt-6 mb-4 px-4">
          {[
            '详细说明组合的投资方法',
            '组合的签约费用',
            '签约后可以享受什么服务'
          ].map((text, i) => (
            <button 
              key={i} 
              className="w-full text-left bg-slate-800/60 backdrop-blur-xl hover:bg-slate-700/80 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">#</div>
                <span className="text-sm text-slate-200 group-hover:text-white leading-snug font-medium">{text}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0" />
            </button>
          ))}
        </div>

      </main>

      {/* Floating Bottom Input Area */}
      <div className="absolute bottom-6 left-4 right-4 z-30 flex flex-col gap-3">
        {/* Floating Input Card */}
        <div className="bg-slate-800/90 backdrop-blur-2xl rounded-[2rem] p-2 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2 focus-within:border-blue-500/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors shrink-0">
            <Mic className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder={`向 ${profile.name} 提问...`}
            className="bg-transparent text-sm outline-none w-full text-slate-200 placeholder:text-slate-500 py-2"
          />
          <button 
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white shrink-0 shadow-md hover:from-blue-500 hover:to-cyan-500 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type AssetTypeTab = 'all' | 'stock' | 'fund' | 'bond';

function TradeView({ onBack, onBuy }: { onBack: () => void; onBuy: () => void }) {
  const [assetTypeTab, setAssetTypeTab] = useState<AssetTypeTab>('all');

  const holdings: { name: string; symbol: string; marketValue: string; quantity: string; currentPrice: string; costPrice: string; pnl: string; pnlPercent: string; isPositive: boolean; type: 'stock' | 'fund' | 'bond' }[] = [
    { name: '中际旭创', symbol: '300308', marketValue: '150,800.00', quantity: '1,800', currentPrice: '83.78', costPrice: '71.00', pnl: '+23,204.00', pnlPercent: '+18.18%', isPositive: true, type: 'stock' },
    { name: '比亚迪', symbol: '002594', marketValue: '182,400.00', quantity: '800', currentPrice: '228.00', costPrice: '201.00', pnl: '+21,600.00', pnlPercent: '+13.43%', isPositive: true, type: 'stock' },
    { name: '新易盛', symbol: '300502', marketValue: '86,400.00', quantity: '1,200', currentPrice: '72.00', costPrice: '79.50', pnl: '-9,000.00', pnlPercent: '-10.38%', isPositive: false, type: 'stock' },
    { name: '工业富联', symbol: '601138', marketValue: '74,800.00', quantity: '2,000', currentPrice: '37.40', costPrice: '41.00', pnl: '-7,200.00', pnlPercent: '-8.78%', isPositive: false, type: 'stock' },
    { name: '易方达平稳增长混合', symbol: '110001', marketValue: '32,600.00', quantity: '2,000', currentPrice: '16.30', costPrice: '15.00', pnl: '+2,600.00', pnlPercent: '+8.67%', isPositive: true, type: 'fund' },
    { name: '富国天惠精选成长A', symbol: '161005', marketValue: '28,000.00', quantity: '1,600', currentPrice: '17.50', costPrice: '16.00', pnl: '+2,400.00', pnlPercent: '+9.38%', isPositive: true, type: 'fund' },
  ];

  const filteredHoldings = assetTypeTab === 'all'
    ? holdings
    : holdings.filter((h) => h.type === assetTypeTab);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-40 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black overflow-hidden"
    >
      {/* Header */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-center border-b border-white/5 bg-slate-900/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors absolute left-4">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">普通</div>
          <span className="text-slate-200 font-medium flex items-center gap-1 text-base">
            88**123 <ChevronDown className="w-4 h-4 text-slate-400" />
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
        <div className="px-4 py-4 space-y-6">
          {/* Total Asset Header */}
          <div className="flex justify-between items-end mb-1.5">
            <div>
              <div className="text-slate-400 text-xs flex items-center gap-1 mb-1">
                总资产 · CNY <Eye className="w-3.5 h-3.5" />
              </div>
              <div className="text-3xl font-bold text-white font-mono leading-tight">
                568,000.00
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xs mb-1">今日盈亏</div>
              <div className="text-red-400 font-bold font-mono text-lg">+1,250.00</div>
            </div>
          </div>

          {/* Asset Type Tabs: 全部 / 股票 / 基金 / 债券 */}
          <div className="flex items-center gap-1 mb-2">
            {[
              { key: 'all' as const, label: '全部', activeClass: 'bg-blue-500/20 border-blue-500/50 text-blue-300', inactiveClass: 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200' },
              { key: 'stock' as const, label: '股票', activeClass: 'bg-amber-500/20 border-amber-500/50 text-amber-300', inactiveClass: 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200' },
              { key: 'fund' as const, label: '基金', activeClass: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300', inactiveClass: 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200' },
              { key: 'bond' as const, label: '债券', activeClass: 'bg-violet-500/20 border-violet-500/50 text-violet-300', inactiveClass: 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200' },
            ].map(({ key, label, activeClass, inactiveClass }) => (
              <button
                key={key}
                onClick={() => setAssetTypeTab(key)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${assetTypeTab === key ? activeClass : inactiveClass}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Asset Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-white/10 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="mb-3 relative z-10 flex items-center justify-between">
              <div className="text-slate-300 text-xs">
                资产净值 · CNY
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-1 border-t border-white/10 relative z-10">
              <div>
                <div className="text-slate-400 text-xs mb-1">持仓盈亏</div>
                <div className="text-red-400 font-medium font-mono text-sm">+33,604.00</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">证券市值</div>
                <div className="text-slate-200 font-medium font-mono text-sm">555,000.00</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">可用资金</div>
                <div className="text-slate-200 font-medium font-mono text-sm">13,000.00</div>
              </div>
            </div>
          </div>

          {/* Quick Actions (4 Main) */}
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={onBuy}
              className="bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 border border-white/5 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-lg font-bold border border-red-500/20">买</div>
              <span className="text-xs text-slate-300 font-medium">买入</span>
            </button>
            <button className="bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 border border-white/5 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg font-bold border border-blue-500/20">卖</div>
              <span className="text-xs text-slate-300 font-medium">卖出</span>
            </button>
            <button className="bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 border border-white/5 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-lg font-bold border border-orange-500/20">撤</div>
              <span className="text-xs text-slate-300 font-medium">撤单</span>
            </button>
            <button className="bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 border border-white/5 transition-colors shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg font-bold border border-indigo-500/20">转</div>
              <span className="text-xs text-slate-300 font-medium">银证转账</span>
            </button>
          </div>

          {/* More Entry (subtle, centered) */}
          <div className="flex justify-center mt-1">
            <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/40 border border-white/5 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
              <span>更多</span>
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </div>

          {/* Holdings Section */}
          <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/5 px-4">
              <button className="py-3 px-2 text-sm font-bold text-white border-b-2 border-blue-500 mr-6 relative">
                持仓
                <span className="absolute top-2 -right-3 text-[10px] text-slate-400 font-normal">({filteredHoldings.length})</span>
              </button>
              <button className="py-3 px-2 text-sm font-medium text-slate-400 hover:text-slate-200 mr-6">
                订单
              </button>
              <button className="py-3 px-2 text-sm font-medium text-slate-400 hover:text-slate-200">
                历史
              </button>
            </div>

            {/* Holdings List */}
            <div className="p-4">
              {/* List Header */}
              <div className="grid grid-cols-4 text-[11px] text-slate-500 mb-3 px-1">
                <div className="col-span-1 flex items-center gap-1">名称/代码 <ChevronDown className="w-3 h-3" /></div>
                <div className="col-span-1 text-right flex items-center justify-end gap-1">市值/数量 <ChevronDown className="w-3 h-3" /></div>
                <div className="col-span-1 text-right flex items-center justify-end gap-1">现价/成本 <ChevronDown className="w-3 h-3" /></div>
                <div className="col-span-1 text-right flex items-center justify-end gap-1">今日盈亏 <ChevronDown className="w-3 h-3" /></div>
              </div>

              {/* List Items */}
              <div className="space-y-4">
                {filteredHoldings.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-sm">暂无{assetTypeTab === 'stock' ? '股票' : assetTypeTab === 'fund' ? '基金' : assetTypeTab === 'bond' ? '债券' : ''}持仓</div>
                ) : null}
                {filteredHoldings.map((stock, i) => (
                  <div key={i} className="grid grid-cols-4 items-center px-1 py-1 border-b border-white/5 last:border-0 pb-3 last:pb-1">
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-slate-200">{stock.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.symbol}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className="text-sm text-slate-200 font-mono">{stock.marketValue}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.quantity}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className="text-sm text-slate-200 font-mono">{stock.currentPrice}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{stock.costPrice}</div>
                    </div>
                    <div className="col-span-1 text-right">
                      <div className={`text-sm font-medium font-mono ${stock.isPositive ? 'text-red-400' : 'text-green-400'}`}>
                        {stock.pnl}
                      </div>
                      <div className={`text-xs font-mono mt-0.5 ${stock.isPositive ? 'text-red-400' : 'text-green-400'}`}>
                        {stock.pnlPercent}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
