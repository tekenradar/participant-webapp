'use server';

import { cookies } from 'next/headers';

const TEMP_PARTICIPANT_ID_COOKIE_NAME = 'temp-participant-id';
const TEMP_PARTICIPANT_ID_COOKIE_MAX_AGE = 24 * 60 * 60; // 5 hours in seconds

/**
 * Reads the temporary participant ID from the session cookie
 * @returns The temporary participant ID if it exists, undefined otherwise
 */
export async function getTempParticipantId(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(TEMP_PARTICIPANT_ID_COOKIE_NAME)?.value;
}

/**
 * Sets the temporary participant ID in an httpOnly session cookie with 5 hours expiration
 * @param participantId The temporary participant ID to store
 */
export async function setTempParticipantId(participantId: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(TEMP_PARTICIPANT_ID_COOKIE_NAME, participantId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: TEMP_PARTICIPANT_ID_COOKIE_MAX_AGE,
        path: '/',
    });
}

/**
 * Deletes the temporary participant ID cookie
 */
export async function deleteTempParticipantId(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(TEMP_PARTICIPANT_ID_COOKIE_NAME);
}

