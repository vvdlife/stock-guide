"use client";

import React, { useState } from 'react';
import { ArrowRightLeft, Clock, BarChart3 } from 'lucide-react';
import { ORDER_TYPES } from '@/data/constants';
import { cn } from '@/lib/utils';

const MarketDetail = () => {
    const [activeTab, setActiveTab] = useState<'KR' | 'US'>('KR');

    return (
        <section id="market-detail" className="py-24 px-6 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-200 p-1.5 rounded-2xl inline-flex">
                        <button
                            onClick={() => setActiveTab('KR')}
                            className={cn(
                                "px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all",
                                activeTab === 'KR' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                            )}
                        >
                            국장 사용법
                        </button>
                        <button
                            onClick={() => setActiveTab('US')}
                            className={cn(
                                "px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all",
                                activeTab === 'US' ? 'bg-white shadow-sm text-red-500' : 'text-slate-500 hover:text-slate-700'
                            )}
                        >
                            미장 사용법
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'KR' ? (
                        <>
                            <div className="space-y-8">
                                <div className="bg-blue-50 p-8 rounded-3xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-900">
                                        <ArrowRightLeft className="text-blue-600" /> 주문 방식 선택하기
                                    </h3>
                                    <div className="space-y-4">
                                        {ORDER_TYPES.map((type) => (
                                            <div key={type.title} className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                                                <h4 className="font-bold text-blue-700 mb-1 text-lg">{type.title}</h4>
                                                <p className="text-sm text-slate-600">{type.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Clock className="text-slate-400" /> 넥스트레이드 (ATS)
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        2025년 3월부터는 퇴근 후에도 거래가 가능해집니다. <br />
                                        <span className="font-bold text-slate-800">프리마켓(08:00)</span>부터 <span className="font-bold text-slate-800">애프터마켓(20:00)</span>까지 더 길어진 거래 시간을 전략적으로 활용해보세요.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">국장의 안전장치</h3>
                                <div className="grid gap-4">
                                    <div className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 hover:shadow-md transition-all group">
                                        <span className="text-blue-600 font-bold mb-2 block text-lg group-hover:translate-x-1 transition-transform">서킷브레이커</span>
                                        <p className="text-sm text-slate-600">지수가 10% 이상 급락 시 모든 매매를 20분간 정지하여 패닉을 방지합니다.</p>
                                    </div>
                                    <div className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 hover:shadow-md transition-all group">
                                        <span className="text-blue-600 font-bold mb-2 block text-lg group-hover:translate-x-1 transition-transform">상·하한가 제도</span>
                                        <p className="text-sm text-slate-600">하루 주가 변동폭을 ±30%로 제한하여 개인 투자자를 보호합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-8">
                                <div className="bg-red-50 p-8 rounded-3xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-700">
                                        <BarChart3 /> 실적 발표 읽는 법
                                    </h3>
                                    <ul className="space-y-6">
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">1</div>
                                            <div>
                                                <h4 className="font-bold mb-1 text-red-900">EPS & 매출 확인</h4>
                                                <p className="text-sm text-slate-700">지난 분기 기업이 실제로 얼마나 남겼는지 확인합니다.</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">2</div>
                                            <div>
                                                <h4 className="font-bold mb-1 text-red-900">컨센서스 대비 실제치</h4>
                                                <p className="text-sm text-slate-700">어닝 서프라이즈인지 쇼크인지에 따라 주가의 단기 방향이 결정됩니다.</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-red-600">3</div>
                                            <div>
                                                <h4 className="font-bold mb-1 text-red-900">가이던스 경청</h4>
                                                <p className="text-sm text-slate-700">과거보다 중요한 것은 기업이 바라보는 '미래'입니다.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">미국 증시 3대 지수</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-lg">S&P500</span>
                                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Standard</span>
                                        </div>
                                        <p className="text-sm text-slate-500">미국 500개 대형 상장기업을 포함하는 가장 대중적인 지수</p>
                                    </div>
                                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-lg">나스닥 종합지수</span>
                                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Tech</span>
                                        </div>
                                        <p className="text-sm text-slate-500">엔비디아, 애플 등 혁신·성장 기업의 흐름을 파악하기 용이</p>
                                    </div>
                                    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-300 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-lg">다우 존스</span>
                                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">Tradition</span>
                                        </div>
                                        <p className="text-sm text-slate-500">전통적인 대기업 중심의 안정적인 산업 지수</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MarketDetail;
