import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getFileContent } from '@/lib/server/data-fetching/participant-files';

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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const fileId = searchParams.get('fileID');
        const profileID = searchParams.get('profileID');
        const studyKey = searchParams.get('studyKey');

        // Validate required fields
        if (!fileId) {
            return NextResponse.json(
                { error: 'Missing fileID' },
                { status: 400 }
            );
        }

        if (!profileID) {
            return NextResponse.json(
                { error: 'Missing profileID' },
                { status: 400 }
            );
        }

        if (!studyKey) {
            return NextResponse.json(
                { error: 'Missing studyKey' },
                { status: 400 }
            );
        }

        const result = await getFileContent(studyKey, profileID, fileId);

        if (result.error || result.status) {
            return NextResponse.json(
                { error: result.error || 'Failed to fetch file' },
                { status: result.status || 500 }
            );
        }

        if (!result.content) {
            return NextResponse.json(
                { error: 'File content not found' },
                { status: 404 }
            );
        }

        // Return the file content with appropriate headers
        return new NextResponse(result.content, {
            headers: {
                'Content-Type': result.contentType || 'application/octet-stream',
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}
