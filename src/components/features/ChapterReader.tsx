'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { StoryChapter } from '@/lib/story-parser';
import QuizModal from '@/components/ui/QuizModal';
import { useRouter } from 'next/navigation';

export default function ChapterReader({ chapter }: { chapter: StoryChapter }) {
    const [showQuiz, setShowQuiz] = useState(false);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#faf9f6] pt-24 pb-24">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 flex items-center justify-between px-6">
                <Link href="/learn" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ArrowLeft size={24} />
                </Link>
                <span className="font-bold text-slate-800 text-sm md:text-base truncate max-w-[200px] md:max-w-md">
                    {chapter.title}
                </span>
                <div className="w-10"></div>
            </div>

            <article className="max-w-2xl mx-auto px-6">
                <header className="mb-10 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                        {chapter.title}
                    </h1>
                </header>

                <div className="prose prose-lg prose-slate max-w-none prose-p:leading-loose prose-p:text-slate-700">
                    <div className="whitespace-pre-line text-lg leading-loose font-serif">
                        {chapter.content}
                    </div>
                </div>

                <div className="mt-16 bg-blue-50 p-8 rounded-3xl text-center">
                    <h3 className="font-bold text-xl text-blue-900 mb-2">
                        방금 읽은 내용이 궁금한가요?
                    </h3>
                    <p className="text-blue-700/80 mb-6">
                        AI 튜터와 함께 퀴즈를 풀며 복습해보세요!
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setShowQuiz(true)}
                            className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-lg active:scale-95 duration-200 flex items-center"
                        >
                            <Sparkles size={20} className="mr-2" />
                            퀴즈 풀기
                        </button>
                    </div>
                </div>
            </article>

            {showQuiz && (
                <QuizModal
                    topic={chapter.title}
                    context={chapter.content}
                    onClose={() => setShowQuiz(false)}
                />
            )}
        </div>
    );
}
