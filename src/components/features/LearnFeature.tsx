'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { StoryChapter } from '@/lib/story-parser';

export default function LearnFeature({ initialStories }: { initialStories: StoryChapter[] }) {
    const [stories, setStories] = useState<StoryChapter[]>(initialStories);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                        <GraduationCap className="text-green-600" size={40} />
                        경제 배움터
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        동화와 이야기로 배우는 쉽고 재미있는 경제
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stories.length > 0 ? (
                        stories.map((chapter) => (
                            <Link
                                href={`/learn/${chapter.id}`}
                                key={chapter.id}
                                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-green-400 hover:shadow-lg transition-all group block"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                        초등학생용
                                    </span>
                                    <ChevronRight className="text-slate-300 group-hover:text-green-500 transition-colors" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-green-700 transition-colors">
                                    {chapter.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-3">
                                    {chapter.content.substring(0, 150)}...
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            학습 자료를 불러올 수 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
