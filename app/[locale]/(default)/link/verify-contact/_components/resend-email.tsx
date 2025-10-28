'use client';

import { forceRefreshToken } from '@/actions/auth/login';
import { resendEmailVerificationMessage } from '@/actions/auth/resend-email-verification';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

interface ResendEmailProps {
    isLoggedIn: boolean;
    messages: {
        goToLogin: string;
        resendEmailVerificationBtn: string;
        refreshTokenBtn: string;
        error: string;
        successTokenRefreshed: string;
        errorRefreshToken: string;
        success: string;
    }
}

const ResendEmail: React.FC<ResendEmailProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();
    const [tokenRefreshed, setTokenRefreshed] = React.useState(false);

    useEffect(() => {
        if (tokenRefreshed) {
            setTimeout(() => {
                router.replace('/');
            }, 1000);
        }
    }, [router, tokenRefreshed]);

    if (!props.isLoggedIn) {
        return (
            <div>
                <Button asChild>
                    <Link
                        href='/auth/login?redirectTo=/link/verify-contact'
                        prefetch={false}
                    >
                        {props.messages.goToLogin}
                    </Link>
                </Button>
            </div>
        );
    }

    const onResendEmailVerification = () => {
        startTransition(async () => {
            try {
                const resp = await resendEmailVerificationMessage();
                if (!resp || resp.error) {
                    toast.error(props.messages.error, {
                        description: resp.error ? resp.error : 'Unknown error'
                    });
                } else {
                    toast.success(props.messages.success)
                }
            } catch {
                toast.error(props.messages.error);
            }
        });
    };

    const onRefreshToken = () => {
        startTransition(async () => {
            try {
                const resp = await forceRefreshToken();
                if (!resp || resp.error) {
                    toast.error(props.messages.errorRefreshToken, {
                        description: resp.error ? resp.error : 'Unknown error'
                    });
                } else {
                    toast.success(props.messages.successTokenRefreshed)
                    router.refresh();
                    setTokenRefreshed(true);
                }
            } catch {
                toast.error(props.messages.errorRefreshToken);
            }
        });
    };


    return (
        <div className='flex flex-col items-center gap-4'>
            <div>
                <LoadingButton
                    onClick={onResendEmailVerification}
                    isLoading={isPending}
                    type='button'
                >
                    {props.messages.resendEmailVerificationBtn}
                </LoadingButton>
            </div>

            {!tokenRefreshed &&
                <LoadingButton
                    type='button'
                    variant={'outline'}
                    className='flex-wrap text-wrap h-auto'
                    onClick={onRefreshToken}
                    isLoading={isPending}
                >
                    {props.messages.refreshTokenBtn}
                </LoadingButton>}
            {tokenRefreshed &&
                <p className='text-sm text-muted-foreground'>
                    {props.messages.successTokenRefreshed}
                </p>}
        </div>
    );
};

export default ResendEmail;
