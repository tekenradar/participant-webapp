"use server";

import { signOut } from '@/auth';
import { revalidatePath } from 'next/cache';

export const logout = async (redirectTo?: string) => {
    await signOut({
        redirectTo: redirectTo,
        redirect: true
    });
    revalidatePath('/');
};

