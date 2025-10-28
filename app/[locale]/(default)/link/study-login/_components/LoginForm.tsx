'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';
import { loginWithTempToken } from '@/actions/auth/login';
import LinkButton from '@/components/buttons/link-button';


interface LoginFormProps {
    email: string;
    token: string;
    callback: string;
    messages: {
        infos: string;
        email: {
            label: string;
            description: string;
            placeholder: string;
            invalid: string;
        };
        password: {
            label: string;
            description: string;
            placeholder: string;
            invalid: string;
        };
        submitBtn: string;
        goToPasswordForgotten: string;
        error: string;
    }
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition()
    const formSchema = z.object({
        email: z.string().email({ message: props.messages.email.invalid }),
        password: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: props.email,
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                const resp = await loginWithTempToken(props.token, values.password);
                if (!resp || resp.error) {
                    toast.error(props.messages.error, {
                        description: resp.error ? resp.error : 'Unknown error'
                    });
                } else {
                    router.replace(props.callback);
                }
            } catch {
                toast.error(props.messages.error);
            }
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                <p className='p-4 rounded bg-secondary text-secondary-foreground'>{props.messages.infos}</p>
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
                                    readOnly
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
