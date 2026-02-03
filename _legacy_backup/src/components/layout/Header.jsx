import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, Menu, X, Sparkles } from 'lucide-react';

const Header = ({ onOpenAI, isScrolled }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 z-50">
                    <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">UPPITY Stock Guide</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <a href="#comparison" className="hover:text-yellow-600 transition-colors">시장 비교</a>
                    <a href="#market-detail" className="hover:text-yellow-600 transition-colors">국장/미장 상세</a>
                    <a href="#glossary" className="hover:text-yellow-600 transition-colors">용어 사전</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden md:block bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
                        구독하기
                    </button>
                    <button
                        className="md:hidden z-50 p-2 text-slate-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
                    <a href="#comparison" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">시장 비교</a>
                    <a href="#market-detail" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">국장/미장 상세</a>
                    <a href="#glossary" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold hover:text-yellow-600">용어 사전</a>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            onOpenAI();
                        }}
                        className="text-xl font-bold text-blue-600 flex items-center gap-2"
                    >
                        <Sparkles size={20} /> AI 튜터에게 질문
                    </button>
                </div>
            )}
        </nav>
    );
};

Header.propTypes = {
    onOpenAI: PropTypes.func.isRequired,
    isScrolled: PropTypes.bool
};

export default Header;
