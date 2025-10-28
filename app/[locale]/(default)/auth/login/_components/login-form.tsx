'use client'

import { loginWithEmailAndPassword } from '@/actions/auth/login';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import React from 'react';
import LoadingButton from '@/components/loading-button';
import LinkButton from '@/components/buttons/link-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface LoginFormProps {
    messages: {
        email: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        },
        password: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        },
        submitBtn: string;
        loginFailed: string;
        goToRegister: string;
        goToPasswordForgotten: string;
    }
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();


    const hasSearchParams = searchParams && searchParams.size > 0

    const formSchema = z.object({
        email: z.string().email({ message: props.messages.email.invalid }),
        password: z.string().min(4, { message: props.messages.password.invalid }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const redirectTo = searchParams.get('redirectTo');
            let newURL = redirectTo ? decodeURIComponent(redirectTo) : '/';
            const resp = await loginWithEmailAndPassword(values.email, values.password);
            if (!resp || resp.error) {
                toast.error(props.messages.loginFailed, {
                    description: resp?.error ? resp.error : 'Unknown error'
                });
                return;
            }
            if (newURL.startsWith('http')) {
                newURL = '/';
            }
            router.replace(newURL);
            router.refresh();
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.email.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    autoComplete='email'
                                    placeholder={props.messages.email.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.messages.email.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


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
                    isLoading={isPending} type="submit"
                >
                    {props.messages.submitBtn}
                </LoadingButton>

                <div className='space-y-0'>
                    <LinkButton
                        href={`/doemee${hasSearchParams ? `?${searchParams}` : ''}`}
                    >
                        {props.messages.goToRegister}
                    </LinkButton>

                    <LinkButton
                        href='/auth/wachtwoord-vergeten'
                    >
                        {props.messages.goToPasswordForgotten}
                    </LinkButton>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
