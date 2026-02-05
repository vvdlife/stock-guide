import MarketGuide from "@/features/MarketGuide";
import { getRandomTerm } from "@/lib/glossary-parser";

export default function Home() {
    const term = getRandomTerm();

    return (
        <main>
            <MarketGuide initialTerm={term} />
        </main>
    );
}
