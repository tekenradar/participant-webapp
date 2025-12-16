'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SurveySkeleton from '@/components/survey-components/survey-skeleton';

interface MergeRedirectProps {
    profileId: string;
    queryString: string;
}

export default function MergeRedirect({ profileId, queryString }: MergeRedirectProps) {
    const router = useRouter();

    useEffect(() => {
        // Redirect to API route on the client side
        router.replace(`/api/koppelen/${profileId}?${queryString}`);
    }, [profileId, queryString, router]);

    // Show loading state while redirecting
    return <SurveySkeleton />;
}

