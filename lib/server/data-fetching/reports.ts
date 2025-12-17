import { auth } from "@/auth";
import { Pagination } from "./utils";
import { fetchCASEParticipantAPI } from "../case-backend";

export interface CaseReport {
    id: string;
    key: string;
    participantID: string;
    responseID?: string;
    timestamp: number;
    modifiedAt?: string;
    data?: Array<ReportData>;
}

export interface ReportData {
    key: string;
    value: string;
    dtype?: string;
}

export const getReports = async (
    studyKey: string,
    profileId: string,
    filter: string = '{}',
    page: number = 1,
    limit: number = 100
): Promise<{
    status?: number;
    error?: string;
    pagination?: Pagination,
    reports?: CaseReport[] | null,
}> => {
    const filterQuery = filter || '{}';
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pid', profileId);
    searchParams.set('limit', limit.toString());
    searchParams.set('page', page.toString());
    searchParams.set('filter', filterQuery);
    const url = `/v1/study-service/participant-data/${studyKey}/reports?${searchParams.toString()}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch reports: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

const dateToTimestamp = (date: string): number => {
    return Math.floor(new Date(date).getTime() / 1000);
}

const getReportsFilter = (reportKey: string, fromDate?: string, toDate?: string): string => {
    const filter: { $and: Array<{ [key: string]: object | string }> } = { $and: [{ key: reportKey }] };
    if (fromDate && toDate) {
        filter.$and.push({ timestamp: { $gte: dateToTimestamp(fromDate), $lte: dateToTimestamp(toDate) } });
    } else if (fromDate) {
        filter.$and.push({ timestamp: { $gte: dateToTimestamp(fromDate) } });
    } else if (toDate) {
        filter.$and.push({ timestamp: { $lte: dateToTimestamp(toDate) } });
    }
    return JSON.stringify(filter);
}

export const getReportsByKey = async (
    studyKey: string,
    profileId: string,
    reportKey: string,
    fromDate?: string,
    toDate?: string,
    page: number = 1,
    limit: number = 100
) => {
    const filter = getReportsFilter(reportKey, fromDate, toDate);
    return getReports(studyKey, profileId, filter, page, limit);
}

/**
 * Creates a MongoDB filter that excludes reports with keys in the provided list
 * @param excludedKeys Array of report keys to exclude
 * @returns JSON string of MongoDB filter
 */
export const getReportsFilterExcludingKeys = (excludedKeys: string[]): string => {
    const filter: { key: { $nin: string[] } } = {
        key: { $nin: excludedKeys }
    };
    return JSON.stringify(filter);
}