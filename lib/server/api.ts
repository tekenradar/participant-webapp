
export const getCASEParticipantAPIURL = (path: string): URL => {
    return new URL(path, process.env.PARTICIPANT_API_URL ? process.env.PARTICIPANT_API_URL : '');
}


export const getTokenHeader = (accessToken?: string): object | { Autorization: string } => {
    if (!accessToken) {
        return {};
    }
    return {
        'Authorization': `Bearer ${accessToken}`
    }
}
