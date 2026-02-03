import React from 'react';
import { MARKET_COMPARISON } from '@/data/constants';

const MarketComparison = () => {
    return (
        <section id="comparison" className="py-20 bg-white border-y border-slate-100 scroll-mt-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">한눈에 비교하는 국장 vs 미장</h2>
                    <p className="text-slate-500">투자 전략의 시작은 시장의 규칙을 이해하는 것입니다.</p>
                </div>
                <div className="overflow-x-auto rounded-3xl shadow-sm border border-slate-100">
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-4 px-6 text-left text-sm font-bold text-slate-500">구분</th>
                                <th className="py-4 px-6 text-left text-lg font-bold text-blue-600">한국 증시 (국장)</th>
                                <th className="py-4 px-6 text-left text-lg font-bold text-red-500">미국 증시 (미장)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MARKET_COMPARISON.map((row) => (
                                <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                                    <td className="py-6 px-6 text-sm font-semibold text-slate-500">{row.label}</td>
                                    <td className="py-6 px-6 font-medium text-slate-800">{row.kr}</td>
                                    <td className="py-6 px-6 font-medium text-slate-800">{row.us}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default MarketComparison;
