import React, { useState } from 'react';
import { BookOpen, Search, X, CheckCircle2, Info } from 'lucide-react';
import { GLOSSARY } from '../../data/constants';

const Glossary = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGlossary = GLOSSARY.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
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
    );
};

export default Glossary;
