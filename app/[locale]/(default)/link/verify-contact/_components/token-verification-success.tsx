'use client';

import { loginWithTempToken } from '@/actions/auth/login';
import LoadingButton from '@/components/loading-button';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';


const redirectTo = '/dashboard';

interface TokenVerificationSuccessProps {
    isLoggedIn: boolean;
    token: string;
    messages: {
        password: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        },
        tokenVerificationSuccess: string;
        loginBtn: string;
        goToDashboard: string;
        loginFailed: string;
    }
}

const LoginForm: React.FC<{
    token: string,
    messages: {
        password: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        },
        loginFailed: string;
        submitBtn: string;
    }
}> = (props) => {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        if (success) {
            setTimeout(
                () => router.replace(redirectTo),
                3000
            )
        }
    }, [success, router]);

    const formSchema = z.object({
        password: z.string().min(4, { message: props.messages.password.invalid }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const resp = await loginWithTempToken(props.token, values.password);

            if (!resp || resp.error) {
                console.error(resp.error)
                toast.error(props.messages.loginFailed, {
                    description: resp.error ? resp.error : 'Unknown error'
                })
                return;
            }
            router.refresh();
            setSuccess(true);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative mt-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.password.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    autoComplete='current-password'
                                    placeholder={props.messages.password.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.messages.password.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    isLoading={isPending || success} type="submit"
                >
                    {props.messages.submitBtn}
                </LoadingButton>
            </form>
        </Form>
    );
}

const AutoLogin: React.FC<{ token: string, messages: { loginBtn: string, goToDashboard: string } }> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        startTransition(async () => {
            const resp = await loginWithTempToken(props.token, '')

            if (!resp || resp.error) {
                console.error(resp.error)
                router.replace('/auth/login');
                return;
            }
            router.refresh();
            setSuccess(true);
        });
    }, [props.token, router]);

    return (
        <div className='mt-6'>
            {!success && <LoadingButton
                isLoading={isPending}
            >
                {props.messages.loginBtn}
            </LoadingButton>}
            {success && <Button
                onClick={() => {
                    router.replace(redirectTo);
                }}>
                {props.messages.goToDashboard}
            </Button>}
        </div>
    );
}

const TokenVerificationSuccess: React.FC<TokenVerificationSuccessProps> = (props) => {
    return (
        <div>
            <p className="text-primary text-xl font-semibold flex flex-col sm:flex-row items-center gap-2">
                <span>
                    <CheckCircle className='size-8' />
                </span>
                {props.messages.tokenVerificationSuccess}
            </p>
            {props.isLoggedIn && <AutoLogin token={props.token} messages={{ loginBtn: props.messages.loginBtn, goToDashboard: props.messages.goToDashboard }} />}
            {!props.isLoggedIn && <LoginForm token={props.token}
                messages={{
                    password: {
                        label: props.messages.password.label,
                        placeholder: props.messages.password.placeholder,
                        description: props.messages.password.description,
                        invalid: props.messages.password.invalid
                    },
                    loginFailed: props.messages.loginFailed,
                    submitBtn: props.messages.loginBtn,
                }}
            />}
        </div>
    );
};

export default TokenVerificationSuccess;
