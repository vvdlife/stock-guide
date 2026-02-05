"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/features/HeroSection';
import MarketComparison from '@/components/features/MarketComparison';
import MarketDetail from '@/components/features/MarketDetail';
import Footer from '@/components/layout/Footer';
import FloatingAIButton from '@/components/ui/FloatingAIButton';
import AITutorModal from '@/components/ui/AITutorModal';
import TermOfTheDayWidget from '@/components/features/TermOfTheDay';
import { GlossaryTerm } from '@/lib/glossary-parser';

interface MarketGuideProps {
    initialTerm: GlossaryTerm | null;
}

const MarketGuide = ({ initialTerm }: MarketGuideProps) => {
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

            <div className="container mx-auto px-6 -mt-10 relative z-10 mb-20">
                <TermOfTheDayWidget term={initialTerm} />
            </div>

            <MarketComparison />

            <MarketDetail />

            <Footer />

            <FloatingAIButton onClick={() => setIsAIModalOpen(true)} />

            {isAIModalOpen && <AITutorModal onClose={() => setIsAIModalOpen(false)} />}
        </div>
    );
};

export default MarketGuide;
