'use client';

import React, { useEffect } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkPasswordRules } from '@/lib/password-checker';
import LoadingButton from '@/components/loading-button';
import LinkButton from '@/components/buttons/link-button';
import ConsentForm from '@/components/consent-form-check-dialog';
import { signUpAction } from '@/actions/auth/signup';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import PasswordRulesInfoPopover from '@/components/password-rules-info-popover';
import { usePiwikPro } from '@piwikpro/next-piwik-pro'

interface SignupFormProps {
    currentLocale: string;
    messages: {
        info: string;
        email: {
            label: string;
            description: string;
            placeholder: string;
            invalid: string;
        },
        password: {
            label: string;
            description: string;
            placeholder: string;
            invalid: string;
            rules: {
                label: string;
                content: string;
            }
        },
        confirmPassword: {
            label: string;
            description: string;
            placeholder: string;
            invalid: string;
        },
        consent: {
            label: string;
            invalid: string;
            dialog: {
                title: string;
                content: string;
                acceptBtn: string;
                rejectBtn: string;
            }
        }
        submitBtn: string;
        goToLogin: string;
        signupFailed: string;
    }
}



const SignupForm: React.FC<SignupFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { PageViews, CustomDimensions, CustomEvent } = usePiwikPro();


    useEffect(() => {
        const utm_campaign = searchParams.get('utm_campaign');
        const utm_source = searchParams.get('utm_source');
        const utm_medium = searchParams.get('utm_medium');
        const utm_content = searchParams.get('utm_content');
        const utm_term = searchParams.get('utm_term');

        CustomDimensions.setCustomDimensionValue(1, utm_campaign || '');
        CustomDimensions.setCustomDimensionValue(2, utm_source || '');
        CustomDimensions.setCustomDimensionValue(3, utm_medium || '');
        CustomDimensions.setCustomDimensionValue(4, utm_content || '');
        CustomDimensions.setCustomDimensionValue(5, utm_term || '');

        PageViews.trackPageView('doemee');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchParams,
    ]);

    const formSchema = z.object({
        email: z.string().email({ message: props.messages.email.invalid }),
        password: z.string(),
        confirmPassword: z.string(),
        infoCheck: z.string(),
        consent: z.boolean(),
    }).refine(data => checkPasswordRules(data.password), {
        message: props.messages.password.invalid,
        path: ["password"],
    }).refine(data => data.password === data.confirmPassword, {
        message: props.messages.confirmPassword.invalid,
        path: ["confirmPassword"],
    }).refine(data => data.consent, {
        message: props.messages.consent.invalid,
        path: ["consent"],
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            infoCheck: "",
            consent: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!values.consent) {
            // add sonner toast for error messages
            return;
        }
        startTransition(async () => {
            const redirectTo = searchParams.get('redirectTo');
            let newURL = redirectTo ? decodeURIComponent(redirectTo) : '/';

            CustomEvent.trackEvent(
                'doemee',
                'signup',
            );

            const resp = await signUpAction(
                values.email,
                values.password,
                values.infoCheck,
                props.currentLocale,
            )
            if (!resp || resp.error) {
                console.error(resp.error)
                toast.error(props.messages.signupFailed, {
                    description: resp.error ? resp.error : 'Unknown error',
                })
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
                {props.messages.info && <EmbeddedMarkdownRenderer
                    className='bg-neutral-100 text-secondary-foreground p-4 rounded-md'
                >
                    {props.messages.info}
                </EmbeddedMarkdownRenderer>}

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
                                    autoComplete='new-password'
                                    placeholder={props.messages.password.placeholder}
                                    {...field} />
                            </FormControl>
                            <PasswordRulesInfoPopover
                                label={props.messages.password.rules.label}
                                content={props.messages.password.rules.content}
                            />
                            <FormDescription>
                                {props.messages.password.description}
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.confirmPassword.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    autoComplete='new-password'
                                    placeholder={props.messages.confirmPassword.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.messages.confirmPassword.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* additional input to check signup validity --> */}
                <FormField
                    control={form.control}
                    name="infoCheck"

                    render={({ field }) => (
                        <FormItem
                            className='absolute max-w-0 max-h-0 z-[-50] p-0 top-0 overflow-hidden'
                            aria-hidden="true"
                            aria-label='If you are a human, do not fill in this field.'
                            tabIndex={-1}
                        >
                            <FormLabel>
                                Info check
                            </FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete='off'
                                    tabIndex={-1}
                                    placeholder={props.messages.confirmPassword.placeholder}
                                    {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/*  <-- additional input to check signup validity */}

                <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ConsentForm
                                    label={props.messages.consent.label}
                                    field={field}
                                    dialog={{
                                        title: props.messages.consent.dialog.title,
                                        content: props.messages.consent.dialog.content,
                                        acceptBtn: props.messages.consent.dialog.acceptBtn,
                                        rejectBtn: props.messages.consent.dialog.rejectBtn,
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    isLoading={isPending}
                    type="submit"
                >
                    {props.messages.submitBtn}
                </LoadingButton>

                <LinkButton
                    href={`/auth/login${searchParams ? `?${searchParams}` : ''}`}
                >
                    {props.messages.goToLogin}
                </LinkButton>
            </form>
        </Form>
    );
};

export default SignupForm;