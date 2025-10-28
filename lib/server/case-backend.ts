'use server'

import { getCASEParticipantAPIURL, getTokenHeader } from "./api";

export const fetchCASEParticipantAPI = async (
    pathname: string,
    accessToken?: string,
    requestOptions?: {
        headers?: { [key: string]: string },
        method?: string,
        body?: BodyInit,
        revalidate: number,
    }
) => {
    const { headers, method = 'GET', body, revalidate = 0 } = requestOptions || {};
    const url = getCASEParticipantAPIURL(pathname);
    const accessTokenHeader = accessToken ? getTokenHeader(accessToken) : {};

    let status: number = 503;
    let statusText = 'Service unavailable';
    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...accessTokenHeader,
                ...headers,
            },
            body: body,
            next: {
                revalidate: revalidate,
            }
        });
        status = response.status;
        statusText = response.statusText;

        const responseBody = await response.json();
        return {
            status: status,
            statusText: statusText,
            body: responseBody,
        };
    } catch {
        return {
            status: status,
            body: { error: statusText },
        };
    }
}
