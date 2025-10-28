'use client';

import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { changePhoneNumber } from '@/actions/user/change-phone-number';
import { useRouter } from 'next/navigation';
import { phoneRegex } from '@/lib/phone-number-regex';

//const phoneRegex = /^(?:(?:\+316[1-9]\d{7})|(?:\+324[1-9]\d{7})|(?:\+33[67][1-9]\d{7,9})|(?:\+49(?:15|16|17)\d{7,9})|(?:\+44\d{7,11}))$/;


interface ChangePhoneNumberFormProps {
    messages: {
        phone: {
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

const ChangePhoneNumberForm: React.FC<ChangePhoneNumberFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();

    const formSchema = z.object({
        newPhone: z.string().regex(phoneRegex, { message: props.messages.phone.invalid }),
        password: z.string().min(8, { message: props.messages.password.invalid }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPhone: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            const resp = await changePhoneNumber(values.newPhone, values.password);
            if (!resp || resp.error) {
                toast.error(props.messages.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return
            }
            toast.success(props.messages.success);
            setTimeout(() => {
                router.push('/settings/phone/verify');
            }, 1000);
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                <FormField
                    control={form.control}
                    name="newPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {props.messages.phone.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    autoComplete='tel'
                                    placeholder={props.messages.phone.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.messages.phone.description}
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

export default ChangePhoneNumberForm;
