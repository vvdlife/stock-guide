import React from 'react';
import { getStories } from '@/lib/story-parser';
import LearnFeature from '@/components/features/LearnFeature';

export default function LearnPage() {
    const elementaryStories = getStories('elementary');
    return <LearnFeature initialStories={elementaryStories} />;
}
