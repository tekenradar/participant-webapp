import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { mergeTempParticipantWithProfile } from '@/actions/study/temp-participant';


export const dynamic = 'force-dynamic';

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || 'tekenradar';
const siteUrl = process.env.SITE_URL;

/**
 * Get the correct base URL for redirects, accounting for proxy headers
 */
function getBaseUrl(request: NextRequest): string {
    if (siteUrl) {
        return siteUrl;
    }
    // Check for forwarded protocol and host (set by proxies/load balancers)
    // These headers can contain comma-separated values when passing through multiple proxies
    // We take the first (leftmost) value which represents the original client request
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();

    if (forwardedProto && forwardedHost) {
        return `${forwardedProto}://${forwardedHost}`;
    }

    // Fall back to host header
    const host = request.headers.get('host');
    if (host) {
        // Determine protocol - default to https in production, http in dev
        const protocol = host.includes('localhost') ? 'http' : 'https';
        return `${protocol}://${host}`;
    }

    // Last resort: use request.url origin
    return new URL(request.url).origin;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pid: string }> }
) {
    const { pid } = await params;
    const baseUrl = getBaseUrl(request);
    const url = new URL(request.url);
    const surveyKey = url.searchParams.get('surveyKey');
    const redirectTo = url.searchParams.get('redirectTo');

    if (!pid) {
        return NextResponse.redirect(new URL('/melden', baseUrl));
    }

    try {
        const resp = await mergeTempParticipantWithProfile(studyKey, pid);
        if (resp && typeof resp === 'object' && 'error' in resp) {
            logger.error(`Failed to merge temp participant with profile "${pid}": ${String((resp as any).error)}`);
            const back = new URL('/melden', baseUrl);
            back.searchParams.set('pid', pid);
            if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
            if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
            back.searchParams.set('mergeSkip', '1');
            back.searchParams.set('mergeError', String((resp as any).error));
            return NextResponse.redirect(back);
        }
    } catch (e) {
        logger.error(`Failed to merge temp participant with profile "${pid}": ${String(e)}`);
        const back = new URL('/melden', baseUrl);
        back.searchParams.set('pid', pid);
        if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
        if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
        back.searchParams.set('mergeSkip', '1');
        back.searchParams.set('mergeError', 'unexpected-error');
        return NextResponse.redirect(back);
    }

    const back = new URL('/melden', baseUrl);
    back.searchParams.set('pid', pid);
    if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
    if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
    back.searchParams.set('mergeSkip', '1');
    return NextResponse.redirect(back);
}

