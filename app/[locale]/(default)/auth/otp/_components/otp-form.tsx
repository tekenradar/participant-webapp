'use client';


import React, { useEffect, useRef } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { AtSign, Smartphone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { requestOTP } from '@/actions/auth/otp';
import { loginWithOTP } from '@/actions/auth/login';


interface OtpFormProps {
    messages: {
        form: {
            otp: {
                label: string;
                description: string;
                invalid: string;
            },
            submitBtn: string;
            verificationFailed: string;
        },
        resend: {
            text: string;
            emailBtn: string;
            smsBtn: string;
            error: string;
            success: string;
        }
    }
    phoneNumberAvailable?: boolean;
}

const OtpForm: React.FC<OtpFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const buttonRef = useRef<HTMLButtonElement>(null)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [success, setSuccess] = React.useState(false);

    const redirectTo = searchParams.get('otpRedirect') || '/';

    useEffect(() => {
        const status = searchParams.get('status');
        if (status !== 'ready') {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('status', 'ready');
            router.replace(`${pathname}?${newSearchParams.toString()}`);
        }
    }, [searchParams, pathname, router]);

    useEffect(() => {
        if (success) {
            setTimeout(
                () => router.replace(redirectTo),
                1500
            )
        }
    }, [success, router, redirectTo]);


    const FormSchema = z.object({
        otpCode: z.string().min(6, {
            message: props.messages.form.otp.invalid,
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otpCode: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const resp = await loginWithOTP(data.otpCode);
            if (!resp.success) {
                toast.error(props.messages.form.verificationFailed, {
                    description: resp.error,
                    duration: 5000,
                });
                return;
            }
            setSuccess(true);
        });
    }

    function onResendCode(type: 'email' | 'sms') {
        startTransition(async () => {
            const resp = await requestOTP(type);
            if (!resp || resp.error) {
                toast.error(props.messages.resend.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return;
            }
            toast.success(props.messages.resend.success)
        });
    }

    const showSMSBtn = searchParams.get('types')?.includes('sms') && props.phoneNumberAvailable;
    const showEmailBtn = searchParams.get('types')?.includes('email');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="otpCode"

                    render={({ field }) => (
                        <FormItem
                            className='w-full relative max-w-full overflow-hidden px-1'
                        >
                            <FormLabel>{props.messages.form.otp.label}</FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    autoFocus
                                    {...field}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const clipboardData = e.clipboardData.getData('text/plain');
                                        const sanitizedData = clipboardData.replace(/-/g, '');
                                        field.onChange(sanitizedData);
                                    }}
                                    onComplete={() => buttonRef.current?.click()}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                {props.messages.form.otp.description}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    ref={buttonRef}
                    isLoading={isPending || success}
                    type="submit"
                    className=''
                >
                    {props.messages.form.submitBtn}
                </LoadingButton>

                <Separator />

                <div className='pt-8'>
                    <p className='mb-2'>
                        {props.messages.resend.text}
                    </p>
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        {showEmailBtn && <Button type='button'
                            variant={'secondary'}
                            disabled={isPending}
                            onClick={() => onResendCode('email')}
                        >
                            <span>
                                <AtSign className='size-4 me-2' />
                            </span>
                            {props.messages.resend.emailBtn}
                        </Button>}



                        {showSMSBtn && <Button type='button'
                            variant={'secondary'}
                            disabled={isPending}
                            onClick={() => onResendCode('sms')}
                        >
                            <span>
                                <Smartphone className='size-4 me-2' />
                            </span>
                            {props.messages.resend.smsBtn}
                        </Button>}
                    </div>
                </div>

            </form>
        </Form>
    );
};

export default OtpForm;
