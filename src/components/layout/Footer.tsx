import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-20 px-6 bg-white text-center">
            <div className="container mx-auto max-w-2xl">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg text-slate-900">
                    <Globe size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">투자 공부는 선택이 아닌 필수입니다.</h2>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    막막한 경제 공부, 매주 도착하는 머니레터와 함께 시작하세요.<br />
                    당신의 자산이 자라나는 시간을 어피티가 응원합니다.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 hover:scale-105 transition-all">
                        뉴스레터 무료 구독
                    </button>
                </div>
                <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2025 UPPITY All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-600">이용약관</a>
                        <a href="#" className="hover:text-slate-600">개인정보처리방침</a>
                        <a href="#" className="hover:text-slate-600">저작권 안내</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
