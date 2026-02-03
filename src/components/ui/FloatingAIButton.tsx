import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAIButtonProps {
    onClick: () => void;
}

const FloatingAIButton = ({ onClick }: FloatingAIButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40 group animate-in slide-in-from-bottom-10 duration-500"
            aria-label="AI 튜터에게 질문하기"
        >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                AI 튜터에게 질문하기
            </span>
        </button>
    );
};

export default FloatingAIButton;
