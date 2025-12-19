import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/server/data-fetching/participant-files';

export const dynamic = 'force-dynamic';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        // Parse FormData from request
        const formData = await request.formData();

        const studyKey = formData.get('studyKey') as string;
        const profileID = formData.get('profileID') as string;
        const file = formData.get('file') as File;

        // Validate required fields
        if (!studyKey) {
            return NextResponse.json(
                { error: 'Missing studyKey' },
                { status: 400 }
            );
        }

        if (!profileID) {
            return NextResponse.json(
                { error: 'Missing profileID' },
                { status: 400 }
            );
        }

        if (!file) {
            return NextResponse.json(
                { error: 'Missing file' },
                { status: 400 }
            );
        }

        const result = await uploadFile(studyKey, profileID, file);

        if (result.error || result.status) {
            return NextResponse.json(
                { error: result.error || 'Upload failed' },
                { status: result.status || 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}

