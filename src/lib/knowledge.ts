import fs from 'fs';
import path from 'path';

// 1. Manual Text Entries (Copy/Paste from NotebookLM)
export const MANUAL_ENTRIES = [
    // Example: "Apple's vision for 2025 emphasizes privacy and AI integration..."
];

// 2. External Links (Public NotebookLM links or references)
export const EXTERNAL_LINKS = [
    // Example: "https://notebooklm.google.com/..."
];

// 3. File Reader (Server-side only)
export async function getKnowledgeContext(): Promise<string> {
    let context = "";

    // Add Manual Entries
    if (MANUAL_ENTRIES.length > 0) {
        context += "[Manual Notes]\n" + MANUAL_ENTRIES.join("\n\n") + "\n\n";
    }

    // Add Links
    if (EXTERNAL_LINKS.length > 0) {
        context += "[Reference Links]\n" + EXTERNAL_LINKS.join("\n") + "\n\n";
    }

    // Add Files from src/data/notebooklm
    try {
        const dataDir = path.join(process.cwd(), 'src', 'data', 'notebooklm');

        // Check if directory exists
        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.txt') || file.endsWith('.md'));

            for (const file of files) {
                const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
                context += `[File: ${file}]\n${content}\n\n`;
            }
        }
    } catch (error) {
        console.error("Error reading knowledge base files:", error);
    }

    return context;
}
