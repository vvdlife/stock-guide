'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, ChevronRight } from 'lucide-react';
import { getRandomTerm, GlossaryTerm } from '@/lib/glossary-parser';
import Link from 'next/link';

// Since this is a client component, we need to be careful about getGlossaryTerms being server-side capable.
// We should pass the term as a prop from a server component wrapper or use a simple static list for client demo if needed.
// However, to make it work properly with file system, we will rely on the page wrapper pattern again.

export default function TermOfTheDayWidget({ term }: { term: GlossaryTerm | null }) {
    if (!term) return null;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <BookOpen size={12} /> 오늘의 금융 용어
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {term.term}
                </h3>

                <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {term.definition}
                </p>

                <Link
                    href="/glossary"
                    className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                    더 알아보기 <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
}
