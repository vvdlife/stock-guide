'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface QuizQuestion {
    question: string;
    options: string[];
    answer: number; // Index of correct answer (0-3)
    explanation: string;
}

interface QuizModalProps {
    topic: string;
    context?: string; // Additional context like the story content or definition
    onClose: () => void;
}

export default function QuizModal({ topic, context, onClose }: QuizModalProps) {
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            generateQuiz(storedKey);
        } else {
            setError('API 키가 없습니다. AI 튜터에서 키를 먼저 등록해주세요.');
            setIsLoading(false);
        }
    }, []);

    const generateQuiz = async (key: string) => {
        try {
            const prompt = `
                Create a 3-question multiple choice quiz about "${topic}".
                Context: "${context ? context.substring(0, 500) : ''}...".
                Target audience: Beginners/Students.
                Language: Korean.
                
                Return ONLY raw JSON array with this structure (no markdown formatting):
                [
                    {
                        "question": "Question text",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "answer": 0, // 0 for A, 1 for B, etc.
                        "explanation": "Why this is correct"
                    }
                ]
            `;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: prompt, apiKey: key }),
            });

            if (!response.ok) throw new Error('Failed to generate quiz');

            const data = await response.json();
            // Clean up potential markdown code blocks provided by LLM
            const cleanJson = data.text.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedQuestions = JSON.parse(cleanJson);

            if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                setQuestions(parsedQuestions);
            } else {
                throw new Error('Invalid quiz format');
            }
        } catch (err) {
            console.error(err);
            setError('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionClick = (index: number) => {
        if (showResult) return;
        setSelectedOption(index);
        setShowResult(true);
        if (index === questions[currentStep].answer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowResult(false);
        if (currentStep < questions.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            setCurrentStep(questions.length); // End state
        }
    };

    if (error) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
                    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                    <p className="font-bold text-slate-900 mb-4">{error}</p>
                    <button onClick={onClose} className="bg-slate-900 text-white px-6 py-2 rounded-xl">닫기</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-yellow-400" />
                        <h3 className="font-bold text-lg">AI 퀴즈: {topic}</h3>
                    </div>
                    <button onClick={onClose} className="hover:bg-slate-800 p-1 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={40} />
                            <p className="text-slate-600 animate-pulse">퀴즈를 만들고 있어요...</p>
                        </div>
                    ) : currentStep < questions.length ? (
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                <span>QUESTION {currentStep + 1}/{questions.length}</span>
                                <span>SCORE: {score}</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                                {questions[currentStep].question}
                            </h2>

                            <div className="space-y-3">
                                {questions[currentStep].options.map((option, idx) => {
                                    let btnClass = "w-full p-4 rounded-xl border text-left transition-all relative ";
                                    if (showResult) {
                                        if (idx === questions[currentStep].answer) {
                                            btnClass += "bg-green-100 border-green-500 text-green-900 font-bold";
                                        } else if (idx === selectedOption) {
                                            btnClass += "bg-red-50 border-red-200 text-red-700";
                                        } else {
                                            btnClass += "bg-slate-50 border-slate-200 text-slate-400";
                                        }
                                    } else {
                                        btnClass += "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(idx)}
                                            disabled={showResult}
                                            className={btnClass}
                                        >
                                            <span className="mr-2 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                                            {option}
                                            {showResult && idx === questions[currentStep].answer && (
                                                <CheckCircle2 size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {showResult && (
                                <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                                    <h4 className="font-bold text-blue-900 mb-1 text-sm">해설</h4>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        {questions[currentStep].explanation}
                                    </p>
                                    <button
                                        onClick={handleNext}
                                        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        다음 문제
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                🏆
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">퀴즈 완료!</h2>
                            <p className="text-slate-600 mb-8">
                                3문제 중 <span className="font-bold text-blue-600 text-xl">{score}</span>문제를 맞혔어요.
                            </p>
                            <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 w-full">
                                마치기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
