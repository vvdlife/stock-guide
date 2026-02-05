import fs from 'fs';
import path from 'path';

export interface StoryChapter {
    id: string;
    title: string;
    content: string; // Markdown content
    level: 'elementary' | 'middle' | 'high' | 'general';
}

const DATA_DIR = path.join(process.cwd(), 'src/data/notebooklm');

export function getStories(level: 'elementary' | 'general' = 'elementary'): StoryChapter[] {
    try {
        const filename = level === 'elementary'
            ? '알기쉬운경제이야기_1.초등학생용.md'
            : '알기쉬운경제이야기_4.일반인용.md';

        const filePath = path.join(DATA_DIR, filename);
        if (!fs.existsSync(filePath)) return [];

        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Parse chapters based on "##" or specific patterns like "첫째 마당"
        // In the elementary file, we saw "첫째 마당", "둘째 마당" etc.
        // We will regex split by these patterns.

        const chapters: StoryChapter[] = [];
        const madangRegex = /(첫째|둘째|셋째|넷째|다섯째|여섯째|일곱째|여덟째|아홉째|열째)\s+마당\s+([^\n]+)/g;

        // Find all matches to get indices
        let match;
        const matches = [];
        while ((match = madangRegex.exec(fileContent)) !== null) {
            matches.push({
                index: match.index,
                title: `${match[1]} 마당: ${match[2].trim()}`,
                rawMatch: match[0]
            });
        }

        for (let i = 0; i < matches.length; i++) {
            const start = matches[i].index;
            const end = i < matches.length - 1 ? matches[i + 1].index : fileContent.length;

            const fullContent = fileContent.substring(start, end);
            // Remove the title line from content to avoid duplication if needed, or keep it.
            // Let's clean it up a bit.
            const content = fullContent.replace(matches[i].rawMatch, '').trim();

            chapters.push({
                id: `chapter-${i + 1}`,
                title: matches[i].title,
                content: content,
                level: level
            });
        }

        return chapters;

    } catch (error) {
        console.error(`Error parsing stories for ${level}:`, error);
        return [];
    }
}

export function getStoryById(id: string, level: 'elementary' | 'general'): StoryChapter | undefined {
    const stories = getStories(level);
    return stories.find(s => s.id === id);
}
