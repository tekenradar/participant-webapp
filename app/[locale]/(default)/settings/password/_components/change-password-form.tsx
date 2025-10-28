'use client';

import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { checkPasswordRules } from '@/lib/password-checker';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoadingButton from '@/components/loading-button';
import { changePassword } from '@/actions/user/change-password';
import { useRouter } from 'next/navigation';
import PasswordRulesInfoPopover from '@/components/password-rules-info-popover';


interface ChangePasswordFormProps {
    messages: {
        currentPassword: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        };
        newPassword: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
            rules: {
                label: string;
                content: string;
            }
        };
        confirmPassword: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        };
        submitBtn: string;
        cancelBtn: string;
        error: string;
        success: string;
    };
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    const formSchema = z.object({
        currentPassword: z.string().min(8, { message: props.messages.currentPassword.invalid }),
        newPassword: z.string(),
        confirmPassword: z.string(),
    }).refine(data => checkPasswordRules(data.newPassword), {
        message: props.messages.newPassword.invalid,
        path: ["newPassword"],
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: props.messages.confirmPassword.invalid,
        path: ["confirmPassword"],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const resp = await changePassword(values.currentPassword, values.newPassword);
            if (!resp || resp.error) {
                toast.error(props.messages.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return
            }
            toast.success(props.messages.success);
            router.push('/settings');
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative pt-6">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.currentPassword.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    autoComplete='current-password'
                                    placeholder={props.messages.currentPassword.placeholder}
                                    {...field} />
                            </FormControl>
                            <PasswordRulesInfoPopover
                                label={props.messages.newPassword.rules.label}
                                content={props.messages.newPassword.rules.content}
                            />
                            <FormDescription>
                                {props.messages.currentPassword.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.newPassword.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    autoComplete='new-password'
                                    placeholder={props.messages.newPassword.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.messages.newPassword.description}
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


                <div className='flex flex-col gap-4 sm:flex-row'>
                    <Button
                        variant={'outline'}
                        disabled={isPending}
                        type='button'
                        asChild
                    >
                        <Link
                            href='/settings'
                            prefetch={false}
                        >
                            {props.messages.cancelBtn}
                        </Link>
                    </Button>

                    <LoadingButton
                        isLoading={isPending}
                    >
                        {props.messages.submitBtn}
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
};

export default ChangePasswordForm;
