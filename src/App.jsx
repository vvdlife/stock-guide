import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Clock, 
  BarChart3, 
  Info, 
  ChevronRight, 
  CheckCircle2,
  Search,
  ArrowRightLeft,
  Briefcase,
  Menu, 
  X,
  Sparkles,     // AI 기능용 아이콘
  MessageCircle,// AI 기능용 아이콘
  Send,         // AI 기능용 아이콘
  Loader2       // 로딩 아이콘
} from 'lucide-react';

// --- 데이터 정의 ---
const MARKET_COMPARISON = [
  { label: '거래 시간(한국기준)', kr: '09:00 - 15:30', us: '23:30 - 06:00 (서머타임 시 1시간 앞당김)' },
  { label: '가격 제한폭', kr: '상하한가 ±30%', us: '제한 없음' },
  { label: '결제 주기', kr: 'T+2 (2영업일 뒤)', us: 'T+1 (미국 기준)' },
  { label: '세금', kr: '거래세 0.15% / 양도세(대주주)', us: '수익 250만원 초과 시 양도세 22%' },
];

const GLOSSARY = [
  { term: 'EPS (주당순이익)', desc: '회사가 벌어들인 순이익을 주식 1주로 나눈 값. 수익성의 핵심 지표입니다.' },
  { term: '가이던스 (Guidance)', desc: '기업이 전망하는 다음 분기 실적 예상치. 주가의 미래 가치를 결정합니다.' },
  { term: '컨센서스', desc: '증권사 애널리스트들의 실적 전망 평균치. 실제 실적과의 차이가 중요합니다.' },
  { term: '사이드카', desc: '선물 가격 급변 시 프로그램 매매를 5분간 정지시켜 시장 충격을 완화하는 장치입니다.' },
  { term: '상한가/하한가', desc: '하루 동안 주가가 오르거나 내릴 수 있는 최대한도(±30%). 한국 시장의 안전장치입니다.' },
  { term: '서킷브레이커', desc: '지수가 급락할 때 시장 전체의 매매를 일시 중단하여 패닉을 막는 제도입니다.' },
];

const ORDER_TYPES = [
  { title: '지정가 주문', desc: '내가 원하는 가격을 직접 정해놓고 대기하는 방식.' },
  { title: '시장가 주문', desc: '가격을 따지지 않고 즉시 체결하는 방식 (가장 빠름).' },
  { title: '조건부 지정가', desc: '장중에는 지정가로, 마감 시에는 시장가로 전환.' },
];

// --- AI 컴포넌트 ---
const AITutorModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setAnswer('');
    setError('');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const prompt = `당신은 친절한 주식 투자 튜터입니다. 주식 초보자가 이해하기 쉽게 다음 질문에 대해 한국어로 답변해주세요. 전문 용어는 쉽게 풀어서 설명하고, 격려하는 말투를 사용하세요. 질문: "${query}"`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('API 호출 실패');
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setAnswer(text);
      } else {
        throw new Error('답변을 생성하지 못했습니다.');
      }
    } catch (err) {
      // Exponential backoff 로직은 간소화하여 에러 메시지 처리에 집중
      setError("죄송합니다. 답변을 가져오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-400" />
            <h3 className="font-bold text-lg">AI 투자 튜터에게 물어보세요</h3>
          </div>
          <button onClick={onClose} className="hover:bg-slate-800 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50">
          {!answer && !isLoading && !error && (
            <div className="text-center text-slate-400 py-10">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
              <p>궁금한 주식 용어나 개념을 입력해주세요.<br/>Gemini가 친절하게 설명해드립니다!</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["PER이 뭔가요?", "공매도 쉽게 설명해줘", "ETF 장점이 뭐야?"].map((q) => (
                  <button 
                    key={q} 
                    onClick={() => setQuery(q)}
                    className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              <p className="text-sm text-slate-500 animate-pulse">열심히 답변을 작성하고 있어요...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          {answer && (
            <div className="prose prose-sm max-w-none">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900">AI</div>
                  <span className="font-bold text-slate-900">답변</span>
                </div>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {answer}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="질문을 입력하세요..."
              className="w-full bg-slate-100 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-12 py-3"
              disabled={isLoading}
            />
            <button 
              onClick={handleAsk}
              disabled={!query.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [activeTab, setActiveTab] = useState('KR');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false); // AI 모달 상태

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredGlossary = GLOSSARY.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-100" style={{ scrollBehavior: 'smooth' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">UPPITY Stock Guide</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#comparison" className="hover:text-yellow-600 transition-colors">시장 비교</a>
            <a href="#market-detail" className="hover:text-yellow-600 transition-colors">국장/미장 상세</a>
            <a href="#glossary" className="hover:text-yellow-600 transition-colors">용어 사전</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
              구독하기
            </button>
            <button 
              className="md:hidden z-50 p-2 text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
            <a href="#comparison" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">시장 비교</a>
            <a href="#market-detail" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">국장/미장 상세</a>
            <a href="#glossary" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">용어 사전</a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAIModalOpen(true);
              }}
              className="text-xl font-bold text-blue-600 flex items-center gap-2"
            >
              <Sparkles size={20} /> AI 튜터에게 질문
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-6">
            <Briefcase size={14} /> 미장·국장 사용설명서 통합본
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            어제는 <span className="text-blue-600">국장</span>,<br />
            오늘은 <span className="text-red-500">미장</span>의 주주가 되다.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            복잡한 지표와 어려운 용어 때문에 투자를 망설였나요? 
            어피티가 정리한 핵심 가이드로 시장의 흐름을 읽는 눈을 기르세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#market-detail" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:translate-y-[-2px] transition-all">
              가이드 시작하기 <ChevronRight size={18} />
            </a>
            <button 
              onClick={() => setIsAIModalOpen(true)}
              className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 text-blue-600 hover:shadow-md transition-all"
            >
              <Sparkles size={18} /> AI 튜터에게 질문하기
            </button>
          </div>
        </div>
      </header>

      {/* Quick Comparison Section */}
      <section id="comparison" className="py-20 bg-white border-y border-slate-100 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">한눈에 비교하는 국장 vs 미장</h2>
            <p className="text-slate-500">투자 전략의 시작은 시장의 규칙을 이해하는 것입니다.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl shadow-sm border border-slate-100">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-left text-sm font-bold text-slate-500">구분</th>
                  <th className="py-4 px-6 text-left text-lg font-bold text-blue-600">한국 증시 (국장)</th>
                  <th className="py-4 px-6 text-left text-lg font-bold text-red-500">미국 증시 (미장)</th>
                </tr>
              </thead>
              <tbody>
                {MARKET_COMPARISON.map((row, idx) => (
                  <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                    <td className="py-6 px-6 text-sm font-semibold text-slate-500">{row.label}</td>
                    <td className="py-6 px-6 font-medium text-slate-800">{row.kr}</td>
                    <td className="py-6 px-6 font-medium text-slate-800">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main Market Detail (Tabs) */}
      <section id="market-detail" className="py-24 px-6 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-center mb-12">
            <div className="bg-slate-200 p-1.5 rounded-2xl inline-flex">
              <button 
                onClick={() => setActiveTab('KR')}
                className={`px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${activeTab === 'KR' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                국장 사용법
              </button>
              <button 
                onClick={() => setActiveTab('US')}
                className={`px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${activeTab === 'US' ? 'bg-white shadow-sm text-red-500' : 'text-slate-500 hover:text-slate-700'}`}
              >
                미장 사용법
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'KR' ? (
              <>
                <div className="space-y-8">
                  <div className="bg-blue-50 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-900">
                      <ArrowRightLeft className="text-blue-600" /> 주문 방식 선택하기
                    </h3>
                    <div className="space-y-4">
                      {ORDER_TYPES.map((type, i) => (
                        <div key={type.title} className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-blue-700 mb-1 text-lg">{type.title}</h4>
                          <p className="text-sm text-slate-600">{type.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Clock className="text-slate-400" /> 넥스트레이드 (ATS)
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      2025년 3월부터는 퇴근 후에도 거래가 가능해집니다. <br/>
                      <span className="font-bold text-slate-800">프리마켓(08:00)</span>부터 <span className="font-bold text-slate-800">애프터마켓(20:00)</span>까지 더 길어진 거래 시간을 전략적으로 활용해보세요.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">국장의 안전장치</h3>
                  <div className="grid gap-4">
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 hover:shadow-md transition-all group">
                      <span className="text-blue-600 font-bold mb-2 block text-lg group-hover:translate-x-1 transition-transform">서킷브레이커</span>
                      <p className="text-sm text-slate-600">지수가 10% 이상 급락 시 모든 매매를 20분간 정지하여 패닉을 방지합니다.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 hover:shadow-md transition-all group">
                      <span className="text-blue-600 font-bold mb-2 block text-lg group-hover:translate-x-1 transition-transform">상·하한가 제도</span>
                      <p className="text-sm text-slate-600">하루 주가 변동폭을 ±30%로 제한하여 개인 투자자를 보호합니다.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-8">
                  <div className="bg-red-50 p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-700">
                      <BarChart3 /> 실적 발표 읽는 법
                    </h3>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">1</div>
                        <div>
                          <h4 className="font-bold mb-1 text-red-900">EPS & 매출 확인</h4>
                          <p className="text-sm text-slate-700">지난 분기 기업이 실제로 얼마나 남겼는지 확인합니다.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">2</div>
                        <div>
                          <h4 className="font-bold mb-1 text-red-900">컨센서스 대비 실제치</h4>
                          <p className="text-sm text-slate-700">어닝 서프라이즈인지 쇼크인지에 따라 주가의 단기 방향이 결정됩니다.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">3</div>
                        <div>
                          <h4 className="font-bold mb-1 text-red-900">가이던스 경청</h4>
                          <p className="text-sm text-slate-700">과거보다 중요한 것은 기업이 바라보는 '미래'입니다.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">미국 증시 3대 지수</h3>
                  <div className="space-y-4">
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">S&P500</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Standard</span>
                      </div>
                      <p className="text-sm text-slate-500">미국 500개 대형 상장기업을 포함하는 가장 대중적인 지수</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">나스닥 종합지수</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Tech</span>
                      </div>
                      <p className="text-sm text-slate-500">엔비디아, 애플 등 혁신·성장 기업의 흐름을 파악하기 용이</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">다우 존스</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Tradition</span>
                      </div>
                      <p className="text-sm text-slate-500">전통적인 대기업 중심의 안정적인 산업 지수</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Glossary Bento Grid */}
      <section id="glossary" className="py-24 bg-slate-900 text-white px-6 rounded-t-[3rem] scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-yellow-400" /> 주린이 필수 용어 사전
              </h2>
              <p className="text-slate-400">모르면 손해 보는 최소한의 주식 언어들을 정리했습니다.</p>
            </div>
            <div className="relative group w-full md:w-auto">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="용어 검색하기 (예: EPS)" 
                className="bg-slate-800 border-none rounded-2xl px-12 py-3 text-sm focus:ring-2 focus:ring-yellow-400 w-full md:w-72 transition-all placeholder:text-slate-600 text-white"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors" size={16} />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Visual Cards (Static) */}
            <div className="md:col-span-2 bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700 hover:border-yellow-400/30 transition-all group">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">캔들차트 읽는 법</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-red-500 mb-[-1px]"></div>
                    <div className="w-10 h-20 bg-red-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]"></div>
                    <div className="w-0.5 h-4 bg-red-500 mt-[-1px]"></div>
                    <span className="text-[10px] mt-2 text-red-400 font-bold">양봉</span>
                  </div>
                  <div className="flex flex-col items-center mt-8">
                    <div className="w-0.5 h-4 bg-blue-500 mb-[-1px]"></div>
                    <div className="w-10 h-20 bg-blue-500 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                    <div className="w-0.5 h-4 bg-blue-500 mt-[-1px]"></div>
                    <span className="text-[10px] mt-2 text-blue-400 font-bold">음봉</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300"><span className="text-white font-bold">양봉(붉은색):</span> 시가보다 종가가 높게 마감 (매수세 우위)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300"><span className="text-white font-bold">음봉(푸른색):</span> 시가보다 종가가 낮게 마감 (매도세 우위)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700 flex flex-col justify-between">
              <div>
                <Info className="text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">거래량의 중요성</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  거래량은 주가 변동의 신뢰도입니다. 거래량이 급증하며 상승한다면 이는 강한 상승 신호일 확률이 높습니다.
                </p>
              </div>
              <div className="mt-6 flex items-end gap-1 h-24">
                {[30, 60, 45, 90, 100, 70, 40].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className={`flex-1 ${i === 4 ? 'bg-yellow-400' : 'bg-slate-700'} rounded-t-sm transition-all hover:bg-slate-500`}></div>
                ))}
              </div>
            </div>

            {filteredGlossary.length > 0 ? (
              filteredGlossary.map((item) => (
                <div key={item.term} className="bg-slate-800/30 p-6 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors animate-in fade-in zoom-in-95 duration-300">
                  <h4 className="font-bold text-white mb-2">{item.term}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-20 px-6 bg-white text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg text-slate-900">
            <Globe size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-4">투자 공부는 선택이 아닌 필수입니다.</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            막막한 경제 공부, 매주 도착하는 머니레터와 함께 시작하세요.<br />
            당신의 자산이 자라나는 시간을 어피티가 응원합니다.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 hover:scale-105 transition-all">
              뉴스레터 무료 구독
            </button>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2025 UPPITY All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">이용약관</a>
              <a href="#" className="hover:text-slate-600">개인정보처리방침</a>
              <a href="#" className="hover:text-slate-600">저작권 안내</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI Button */}
      <button
        onClick={() => setIsAIModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40 group animate-in slide-in-from-bottom-10 duration-500"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          AI 튜터에게 질문하기
        </span>
      </button>

      {/* AI Modal */}
      {isAIModalOpen && <AITutorModal onClose={() => setIsAIModalOpen(false)} />}
    </div>
  );
};

export default App;