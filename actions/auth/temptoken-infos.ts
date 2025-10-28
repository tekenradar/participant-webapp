import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const getTemptokenInfos = async (token: string) => {
    const url = '/v1/auth/temptoken-info';
    const instanceID = process.env.INSTANCE_ID;

    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                tempToken: token,
                instanceID,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}