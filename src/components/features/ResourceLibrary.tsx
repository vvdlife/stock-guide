"use client";

import React from 'react';
import { Book, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const RESOURCES = [
    {
        title: '2023 경제금융용어 700선',
        desc: '한국은행이 엄선한 필수 경제/금융 용어 해설집. 투자의 기초 체력을 기르는 데 필수적입니다.',
        target: '전체',
        link: 'https://www.bok.or.kr/portal/bbs/B0000249/view.do?nttId=10077001&menuNo=200765'
    },
    {
        title: '알기 쉬운 경제 이야기 (일반인용)',
        desc: '어려운 경제 원리를 실생활 사례와 함께 쉽게 풀어쓴 입문서입니다.',
        target: '일반인',
        link: 'https://www.bok.or.kr/portal/bbs/B0000249/view.do?nttId=10061811&menuNo=200765'
    },
    {
        title: '알기 쉬운 경제 이야기 (고등학생용)',
        desc: '체계적인 경제 학습이 필요한 분들을 위한 심화 입문서입니다.',
        target: '청소년/입문',
        link: 'https://www.bok.or.kr/portal/bbs/B0000249/view.do?nttId=10061810&menuNo=200765'
    }
];

const ResourceLibrary = () => {
    return (
        <section id="resources" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-20">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Book className="text-blue-600" /> 투자 지식 자료실
                    </h2>
                    <p className="text-slate-500">
                        한국은행과 금융감독원이 검증한 공신력 있는 무료 자료를 소개합니다.<br />
                        PDF를 다운로드하여 틈틈이 읽어보세요.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {RESOURCES.map((resource, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold",
                                    resource.target === '전체' ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-600"
                                )}>
                                    {resource.target}
                                </span>
                                <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-8 leading-relaxed min-h-[40px]">
                                {resource.desc}
                            </p>
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold py-3 rounded-xl transition-colors border border-slate-200"
                            >
                                <Download size={18} /> 무료 다운로드
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400">
                        * 위 자료의 저작권은 한국은행에 있으며, 누구나 무료로 활용할 수 있습니다.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ResourceLibrary;
