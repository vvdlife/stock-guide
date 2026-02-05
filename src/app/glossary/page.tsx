import React from 'react';
import { getGlossaryTerms } from '@/lib/glossary-parser';
import GlossaryFeature from '@/components/features/GlossaryFeature';

export default function GlossaryPage() {
    const terms = getGlossaryTerms();
    return <GlossaryFeature terms={terms} />;
}
