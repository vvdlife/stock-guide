'use client';

import React, { useState } from 'react';
import { Search, BookOpen, X, Sparkles } from 'lucide-react';
import { GlossaryTerm } from '@/lib/glossary-parser';
import QuizModal from '@/components/ui/QuizModal';

export default function GlossaryFeature({ terms }: { terms: GlossaryTerm[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
    const [showQuiz, setShowQuiz] = useState(false);

    const filteredTerms = terms.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        경제금융용어 800선
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        한국은행이 선정한 필수 금융 용어를 쉽게 찾아보세요.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 sticky top-20 z-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="용어나 설명을 검색해보세요 (예: 금리, GDP)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTerms.length > 0 ? (
                        filteredTerms.map((term, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedTerm(term)}
                                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col h-full group"
                            >
                                <div className="flex items-start justify-between w-full mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {term.term}
                                    </h3>
                                    <BookOpen size={16} className="text-slate-300 group-hover:text-blue-400" />
                                </div>
                                <p className="text-slate-500 text-sm line-clamp-2">
                                    {term.definition}
                                </p>
                            </button>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>

            {/* Term Detail Modal */}
            {selectedTerm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedTerm(null)}
                            className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={24} className="text-slate-500" />
                        </button>

                        <div className="mb-6">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                                금융용어
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                                {selectedTerm.term}
                            </h2>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                                {selectedTerm.definition}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowQuiz(true)}
                                className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-100 transition-colors"
                            >
                                <Sparkles size={16} />
                                관련 퀴즈 풀기
                            </button>
                            <button
                                onClick={() => setSelectedTerm(null)}
                                className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showQuiz && selectedTerm && (
                <QuizModal
                    topic={selectedTerm.term}
                    context={selectedTerm.definition}
                    onClose={() => setShowQuiz(false)}
                />
            )}
        </div>
    );
}
