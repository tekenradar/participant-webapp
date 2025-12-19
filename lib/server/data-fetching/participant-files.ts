'use server'

import { auth } from "@/auth";
import { Pagination } from "./utils";
import { fetchCASEParticipantAPI } from "../case-backend";
import { getCASEParticipantAPIURL, getTokenHeader } from "../api";

export interface ParticipantFile {
    id: string;
    status: string;
    path: string;
    createdAt: string;
    updatedAt: string;
    fileType: string;
    size: number;
}

export interface FilesListResponse {
    status?: number;
    error?: string;
    pagination?: Pagination;
    fileInfos?: ParticipantFile[] | null;
}

/**
 * Upload a file for a participant profile
 */
export const uploadFile = async (
    studyKey: string,
    profileID: string,
    file: File
): Promise<{
    status?: number;
    error?: string;
    fileInfo?: ParticipantFile;
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    // Validate required fields
    if (!studyKey) {
        return { status: 400, error: 'Missing studyKey' };
    }

    if (!profileID) {
        return { status: 400, error: 'Missing profileID' };
    }

    if (!file) {
        return { status: 400, error: 'Missing file' };
    }

    // Create FormData for CASE backend
    const backendFormData = new FormData();
    backendFormData.append('profileID', profileID);
    backendFormData.append('file', file);

    const url = `/v1/study-service/participant-data/${studyKey}/files`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: backendFormData,
            revalidate: 0,
        }
    );

    if (resp.status !== 200) {
        return { status: resp.status, error: `Failed to upload file: ${resp.status} - ${resp.body.error}` };
    }

    return {
        fileInfo: resp.body.fileInfo as unknown as ParticipantFile,
    };
};

/**
 * Get paginated list of files for a participant profile
 */
export const getFiles = async (
    studyKey: string,
    profileID: string,
    page: number = 1,
    limit: number = 100
): Promise<FilesListResponse> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pid', profileID);
    searchParams.set('limit', limit.toString());
    searchParams.set('page', page.toString());
    const url = `/v1/study-service/participant-data/${studyKey}/files?${searchParams.toString()}`;

    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );

    if (resp.status !== 200) {
        return { status: resp.status, error: `Failed to fetch files: ${resp.status} - ${resp.body.error}` };
    }

    return resp.body;
};

/**
 * Get a single file's content by file ID
 */
export const getFileContent = async (
    studyKey: string,
    profileID: string,
    fileId: string
): Promise<{
    status?: number;
    error?: string;
    content?: Blob;
    contentType?: string;
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pid', profileID);
    const url = `/v1/study-service/participant-data/${studyKey}/files/${fileId}?${searchParams.toString()}`;

    const urlObj = getCASEParticipantAPIURL(url);
    const accessTokenHeader = getTokenHeader(session.CASE_API_accessToken);

    const response = await fetch(urlObj.toString(), {
        method: 'GET',
        headers: {
            ...accessTokenHeader,
        },
    });

    if (response.status !== 200) {
        let errorMessage = response.statusText;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || response.statusText;
        } catch {
            // If response is not JSON, use statusText
        }
        return { status: response.status, error: `Failed to fetch file content: ${response.status} - ${errorMessage}` };
    }

    const contentType = response.headers.get('content-type') || undefined;
    const blob = await response.blob();

    return {
        content: blob,
        contentType,
    };
};

/**
 * Delete a file by file ID
 */
export const deleteFile = async (
    studyKey: string,
    profileID: string,
    fileId: string
): Promise<{
    status?: number;
    error?: string;
    success?: boolean;
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pid', profileID);
    const url = `/v1/study-service/participant-data/${studyKey}/files/${fileId}?${searchParams.toString()}`;

    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'DELETE',
            revalidate: 0,
        }
    );

    if (resp.status !== 200) {
        return { status: resp.status, error: `Failed to delete file: ${resp.status} - ${resp.body.error}` };
    }

    return {
        success: true,
    };
};

