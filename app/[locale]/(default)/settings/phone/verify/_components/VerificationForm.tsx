'use client';

import { requestPhoneNumberVerification } from '@/actions/user/change-phone-number';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { loginWithOTP } from '@/actions/auth/login';
import { Separator } from '@/components/ui/separator';
import { RefreshCcw } from 'lucide-react';

interface VerificationFormProps {
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
        requestCode: {
            error: string;
            btnLabel: string;
            success: string;
        }
    }
}

const VerificationForm: React.FC<VerificationFormProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const buttonRef = useRef<HTMLButtonElement>(null)
    const searchParams = useSearchParams();
    const router = useRouter();
    const [success, setSuccess] = React.useState(false);

    const redirectTo = searchParams.get('redirectAfterVerification') || '/settings/phone';

    useEffect(() => {
        const reqCode = async () => {
            const resp = await requestPhoneNumberVerification();
            if (!resp || resp.error) {
                console.error(resp.error);
                toast.error(props.messages.requestCode.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return;
            }
            console.log(resp);
        }
        reqCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    description: resp.error
                });
                return;
            }
            setSuccess(true);
        });
    }

    function onResendCode() {
        startTransition(async () => {
            const resp = await requestPhoneNumberVerification();
            if (!resp || resp.error) {
                toast.error(props.messages.requestCode.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return;
            }
            toast.success(props.messages.requestCode.success);
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="otpCode"

                    render={({ field }) => (
                        <FormItem
                            className='w-full relative max-w-full px-1'
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
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <Button type='button'
                            variant={'secondary'}
                            disabled={isPending}
                            onClick={() => onResendCode()}
                        >
                            <span>
                                <RefreshCcw className='size-4 me-2' />
                            </span>
                            {props.messages.requestCode.btnLabel}
                        </Button>
                    </div>
                </div>

            </form>
        </Form>
    );
};

export default VerificationForm;
