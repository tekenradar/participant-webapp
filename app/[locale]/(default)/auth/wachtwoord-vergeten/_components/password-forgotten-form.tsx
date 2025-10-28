'use client'

import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { initiatePasswordReset } from '@/actions/auth/password-forgotten';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';


interface PasswordForgottenFormProps {
    messages: {
        email: {
            label: string;
            placeholder: string;
            description: string;
            invalid: string;
        },
        submitBtn: string;
        error: string;
        success: string;
    }
}

const PasswordForgottenForm: React.FC<PasswordForgottenFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();

    const formSchema = z.object({
        email: z.string().email({ message: props.messages.email.invalid }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                const resp = await initiatePasswordReset(values.email);
                if (!resp || resp.error) {
                    toast.error(props.messages.error, {
                        description: resp.error ? resp.error : 'Unknown error'
                    });
                } else {
                    toast.success(props.messages.success);
                }
            } catch {
                toast.error(props.messages.error);
            }
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

                <LoadingButton
                    isLoading={isPending} type="submit"
                >
                    {props.messages.submitBtn}
                </LoadingButton>



            </form>
        </Form>
    );
};

export default PasswordForgottenForm;
