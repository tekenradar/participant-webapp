import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getReports } from '@/lib/server/data-fetching/reports';
import { STUDY_KEY } from '@/constants';
import logger from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pid: string }> }
) {
    try {
        const { pid } = await params;

        if (!pid) {
            return NextResponse.json(
                { error: 'Profile ID is required' },
                { status: 400 }
            );
        }

        // Check authentication
        const session = await auth();
        if (!session || !session.CASE_API_accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Extract query parameters
        const url = new URL(request.url);
        const filter = url.searchParams.get('filter') || '{}';
        const pageParam = url.searchParams.get('page');
        const limitParam = url.searchParams.get('limit');

        const page = pageParam ? parseInt(pageParam, 10) : 1;
        const limit = limitParam ? parseInt(limitParam, 10) : 100;

        // Validate pagination parameters
        if (isNaN(page) || page < 1) {
            return NextResponse.json(
                { error: 'Invalid page parameter' },
                { status: 400 }
            );
        }

        if (isNaN(limit) || limit < 1 || limit > 1000) {
            return NextResponse.json(
                { error: 'Invalid limit parameter. Must be between 1 and 1000' },
                { status: 400 }
            );
        }

        // Fetch reports
        const result = await getReports(STUDY_KEY, pid, filter, page, limit);

        if (result.error) {
            logger.error(`Failed to fetch reports for profile "${pid}": ${result.error}`);
            return NextResponse.json(
                { error: result.error },
                { status: result.status || 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        logger.error(`Unexpected error fetching reports: ${String(error)}`);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
