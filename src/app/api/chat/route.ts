import { NextResponse } from 'next/server';
import { getKnowledgeContext } from '@/lib/knowledge';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
        }

        // 1. Load Knowledge Base
        const knowledgeContext = await getKnowledgeContext();

        // 2. Construct System Prompt
        const systemInstruction = `
    당신은 친절한 주식 투자 튜터입니다. 
    주식 초보자가 이해하기 쉽게 한국어로 답변해주세요.
    
    [지식 베이스 (NotebookLM)]
    다음은 사용자가 제공한 학습 노트 및 참고 자료입니다. 답변 시 이 내용을 우선적으로 참고하세요:
    ---
    ${knowledgeContext}
    ---

    전문 용어는 쉽게 풀어서 설명하고, 격려하는 말투를 사용하세요.
    질문: "${query}"
    `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemInstruction }] }],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            return NextResponse.json({ error: 'Gemini API call failed' }, { status: response.status });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return NextResponse.json({ error: 'No response generated' }, { status: 500 });
        }

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
