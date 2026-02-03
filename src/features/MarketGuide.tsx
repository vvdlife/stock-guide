"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/features/HeroSection';
import MarketComparison from '@/components/features/MarketComparison';
import MarketDetail from '@/components/features/MarketDetail';
import Glossary from '@/components/features/Glossary';
import Footer from '@/components/layout/Footer';
import FloatingAIButton from '@/components/ui/FloatingAIButton';
import AITutorModal from '@/components/ui/AITutorModal';

const MarketGuide = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-100" style={{ scrollBehavior: 'smooth' }}>
            <Header
                onOpenAI={() => setIsAIModalOpen(true)}
                isScrolled={isScrolled}
            />

            <HeroSection onOpenAI={() => setIsAIModalOpen(true)} />

            <MarketComparison />

            <MarketDetail />

            <Glossary />

            <Footer />

            <FloatingAIButton onClick={() => setIsAIModalOpen(true)} />

            {isAIModalOpen && <AITutorModal onClose={() => setIsAIModalOpen(false)} />}
        </div>
    );
};

export default MarketGuide;
