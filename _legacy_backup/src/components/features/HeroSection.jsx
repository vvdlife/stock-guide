import React from 'react';
import PropTypes from 'prop-types';
import { Briefcase, ChevronRight, Sparkles } from 'lucide-react';

const HeroSection = ({ onOpenAI }) => {
    return (
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
                        onClick={onOpenAI}
                        className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 text-blue-600 hover:shadow-md transition-all"
                    >
                        <Sparkles size={18} /> AI 튜터에게 질문하기
                    </button>
                </div>
            </div>
        </header>
    );
};

HeroSection.propTypes = {
    onOpenAI: PropTypes.func.isRequired
};

export default HeroSection;
