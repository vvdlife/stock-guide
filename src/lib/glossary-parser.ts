import fs from 'fs';
import path from 'path';

export interface GlossaryTerm {
    term: string;
    definition: string;
    relatedTerms?: string[];
}

const GLOSSARY_PATH = path.join(process.cwd(), 'src/data/notebooklm/2026_경제금융용어 800선.md');

export function getGlossaryTerms(): GlossaryTerm[] {
    try {
        const fileContent = fs.readFileSync(GLOSSARY_PATH, 'utf-8');
        const lines = fileContent.split('\n');

        const terms: GlossaryTerm[] = [];
        let currentTerm: Partial<GlossaryTerm> | null = null;
        let captureDefinition = false;

        // Skip header/intro lines (roughly first 350 lines or scan for start)
        // Based on analysis, terms start appearing after "## ᄀ" section around line 34, 
        // but the actual content format is "## TermName·······Page".
        // However, the MD content we saw had "## 가계부실위험지수(HDRI)···························1" in TOC.
        // We probably need to look for the actual definition section. 
        // Let's assume the file has a TOC first, then the body. 
        // The body structure often repeats the term as a header or bold text.
        // Given the file size (1MB+), parsing might need to be robust.

        // Strategy: Look for lines starting with "## " followed by a term name that DOES NOT end with a page number like "····1".
        // Or process the whole file and heuristics.

        // Revised Strategy based on TOC observation:
        // The TOC items are "## Term····Num". The actual definitions likely follow later.
        // Since I cannot see the middle of the file, I will use a regex to capture text blocks.
        // A common pattern in these bank docs is:
        // ## TermName
        // Definition text...

        // Let's try to extract based on "## " headers that don't have dots+numbers at the end.

        for (const line of lines) {
            const trimmed = line.trim();

            // Check for potential term header
            // Exclude TOC lines (ending in digits)
            // Exclude structural headers like "## I", "## 머리말"
            if (trimmed.startsWith('## ') && !/\d+$/.test(trimmed) && trimmed.length > 5 && !trimmed.includes('····')) {
                // Save previous term
                if (currentTerm && currentTerm.term && currentTerm.definition) {
                    terms.push(currentTerm as GlossaryTerm);
                }

                currentTerm = {
                    term: trimmed.replace(/^##\s+/, '').trim(),
                    definition: ''
                };
                captureDefinition = true;
                continue;
            }

            if (captureDefinition && currentTerm) {
                // If we hit another header or specific stop markers, stop capturing
                if (trimmed.startsWith('## ')) {
                    // logic handled by next loop iteration's start check, 
                    // but we might want to catch non-term headers to stop definition
                    if (trimmed.includes('····') || trimmed === '## ଺아보기' || trimmed.length < 5) {
                        captureDefinition = false;
                        continue;
                    }
                }

                // Append line to definition
                if (trimmed.length > 0) {
                    currentTerm.definition += trimmed + ' ';
                }
            }
        }

        // Push last term
        if (currentTerm && currentTerm.term && currentTerm.definition) {
            terms.push(currentTerm as GlossaryTerm);
        }

        return terms;

    } catch (error) {
        console.error("Error parsing glossary:", error);
        return [];
    }
}

export function getRandomTerm(): GlossaryTerm | null {
    const terms = getGlossaryTerms();
    if (terms.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * terms.length);
    return terms[randomIndex];
}
