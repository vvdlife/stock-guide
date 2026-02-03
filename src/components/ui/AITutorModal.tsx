"use client";

import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Loader2, Send } from 'lucide-react';

interface AITutorModalProps {
    onClose: () => void;
}

const AITutorModal = ({ onClose }: AITutorModalProps) => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAsk = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setAnswer('');
        setError('');

        try {
            // Call Next.js API Route
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch response');
            }

            const data = await response.json();
            setAnswer(data.text);
        } catch (err) {
            setError("죄송합니다. 답변을 가져오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
                            <p>궁금한 주식 용어나 개념을 입력해주세요.<br />Gemini가 친절하게 설명해드립니다!</p>
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

export default AITutorModal;
