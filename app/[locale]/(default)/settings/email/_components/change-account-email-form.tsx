'use client';

import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { changeAccountEmail } from '@/actions/user/change-account-email';
import { logout } from '@/actions/auth/logout';


interface ChangeAccountEmailFormProps {
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
        cancelBtn: string;
        error: string;
        success: string;
    }
}

const ChangeAccountEmailForm: React.FC<ChangeAccountEmailFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();

    const formSchema = z.object({
        newEmail: z.string().email({ message: props.messages.email.invalid }),
        password: z.string().min(8, { message: props.messages.password.invalid }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newEmail: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const resp = await changeAccountEmail(values.newEmail, values.password);
            if (!resp || resp.error) {
                toast.error(props.messages.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return
            }
            toast.success(props.messages.success);
            setTimeout(() => {
                logout('/settings');
            }, 2000);
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative pt-6">
                <FormField
                    control={form.control}
                    name="newEmail"
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

export default ChangeAccountEmailForm;
