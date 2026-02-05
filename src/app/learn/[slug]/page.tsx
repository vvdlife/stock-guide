import React from 'react';
import { getStoryById } from '@/lib/story-parser';
import ChapterReader from '@/components/features/ChapterReader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ChapterPage({ params }: { params: { slug: string } }) {
    const chapter = getStoryById(params.slug, 'elementary');

    if (!chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">이야기를 찾을 수 없어요</h1>
                    <Link href="/learn" className="text-blue-600 hover:underline">돌아가기</Link>
                </div>
            </div>
        );
    }

    return <ChapterReader chapter={chapter} />;
}
