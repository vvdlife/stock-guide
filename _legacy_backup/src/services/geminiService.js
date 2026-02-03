/**
 * Fetches a response from Gemini API.
 * 
 * @param {string} query - The user's question.
 * @returns {Promise<string>} - The generated answer.
 * @throws {Error} - If the API call fails or returns no content.
 */
export async function fetchGeminiResponse(query) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('API Key is missing');
    }

    const prompt = `당신은 친절한 주식 투자 튜터입니다. 주식 초보자가 이해하기 쉽게 다음 질문에 대해 한국어로 답변해주세요. 전문 용어는 쉽게 풀어서 설명하고, 격려하는 말투를 사용하세요. 질문: "${query}"`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        }
    );

    if (!response.ok) {
        throw new Error('API 호출 실패');
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('답변을 생성하지 못했습니다.');
    }

    return text;
}
