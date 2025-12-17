import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { mergeTempParticipantWithProfile } from '@/actions/study/temp-participant';


export const dynamic = 'force-dynamic';

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || 'tekenradar';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pid: string }> }
) {
    const { pid } = await params;
    const url = new URL(request.url);
    const surveyKey = url.searchParams.get('surveyKey');
    const redirectTo = url.searchParams.get('redirectTo');

    if (!pid) {
        return NextResponse.redirect(new URL('/melden', url));
    }

    try {
        const resp = await mergeTempParticipantWithProfile(studyKey, pid);
        if (resp && typeof resp === 'object' && 'error' in resp) {
            logger.error(`Failed to merge temp participant with profile "${pid}": ${String((resp as any).error)}`);
            const back = new URL('/melden', url);
            back.searchParams.set('pid', pid);
            if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
            if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
            back.searchParams.set('mergeSkip', '1');
            back.searchParams.set('mergeError', String((resp as any).error));
            return NextResponse.redirect(back);
        }
    } catch (e) {
        logger.error(`Failed to merge temp participant with profile "${pid}": ${String(e)}`);
        const back = new URL('/melden', url);
        back.searchParams.set('pid', pid);
        if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
        if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
        back.searchParams.set('mergeSkip', '1');
        back.searchParams.set('mergeError', 'unexpected-error');
        return NextResponse.redirect(back);
    }

    const back = new URL('/melden', url);
    back.searchParams.set('pid', pid);
    if (surveyKey) back.searchParams.set('surveyKey', surveyKey);
    if (redirectTo) back.searchParams.set('redirectTo', redirectTo);
    back.searchParams.set('mergeSkip', '1');
    return NextResponse.redirect(back);
}

