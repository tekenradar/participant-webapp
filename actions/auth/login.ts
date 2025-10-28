'use server';

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";


export const loginWithEmailAndPassword = async (
    email: string,
    password: string,
) => {
    try {
        await signIn('credentials', {
            type: 'credentials',
            email,
            password,
            redirect: false
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            const { type, cause } = error as AuthError;
            switch (type) {
                case "CallbackRouteError":
                    console.error(JSON.stringify({
                        time: new Date().toISOString(),
                        message: cause?.err?.toString()
                    }));
                    return {
                        success: false,
                        error: cause?.err?.toString()
                    }
                default:
                    return {
                        success: false,
                        error: error.message
                    }
            }
        }
        return {
            error: JSON.stringify(error)
        }
    }
    revalidatePath('/');
    return {
        success: true,
    }
    // redirect(redirectTo);
}

export const loginWithTempToken = async (
    tempToken: string,
    password: string,
) => {
    const session = await auth();
    const accessToken = session?.CASE_API_accessToken || '';

    try {
        await signIn('credentials', {
            type: 'tempToken',
            accessToken,
            tempToken,
            password,
            redirect: false
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            const { type, cause } = error as AuthError;
            console.log(error);
            switch (type) {
                case "CallbackRouteError":
                    return {
                        success: false,
                        error: cause?.err?.toString()
                    }
                default:
                    return {
                        success: false,
                        error: error.message
                    }
            }
        }
    }
    revalidatePath('/');
    return {
        success: true,
    }
}

export const loginWithOTP = async (otp: string) => {
    const session = await auth();
    const accessToken = session?.CASE_API_accessToken || '';

    try {
        await signIn('credentials', {
            type: 'otp',
            accessToken,
            otp,
            redirect: false
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            const { type, cause } = error as AuthError;
            console.log(error);
            switch (type) {
                case "CallbackRouteError":
                    return {
                        success: false,
                        error: cause?.err?.toString()
                    }
                default:
                    return {
                        success: false,
                        error: error.message
                    }
            }
        }
    }
    revalidatePath('/');
    return {
        success: true,
    }
}

export const forceRefreshToken = async () => {
    const session = await auth();
    const accessToken = session?.CASE_API_accessToken || '';
    const refreshToken = session?.CASE_API_refreshToken || '';

    try {
        await signIn('credentials', {
            type: 'refreshToken',
            accessToken,
            refreshToken,
            redirect: false
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            const { type, cause } = error as AuthError;
            console.log(error);
            switch (type) {
                case "CallbackRouteError":
                    return {
                        success: false,
                        error: cause?.err?.toString()
                    }
                default:
                    return {
                        success: false,
                        error: error.message
                    }
            }
        }
    }
    revalidatePath('/');
    return {
        success: true,
    }
}
