import React, { useEffect, useState } from 'react';
import { CommonResponseComponentProps, getItemComponentByRole, getLocaleStringTextByCode } from '@/components/survey-renderer/SurveySingleItemView/utils';
import { AtSign, Building, Mailbox, Pen, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/survey-renderer/components/ui/dialog';

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchAddress as fetchAddressFromAPI } from '@/actions/fetch-address';
import LoadingButton from '@/components/loading-button';


type ContactFormProps = CommonResponseComponentProps

interface FormFieldConfig {
    label: string;
    placeholder: string;
    pattern?: string;
    error: string;
    description?: string;
    optionItems?: Array<{ key: string, label: string }>;
}

interface ContactValues {
    givenName?: string;
    familyName?: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: {
        street: string;
        street2: string;
        houseNumber?: string;
        city: string;
        postalCode: string;
        country?: string;
    };
}


interface ContactFormDialogProps {
    dialog: {
        triggerBtnLabel: string;
        title?: string;
        description?: string;
        addressSearchBtnLabel: string;
        addressError: string;
        resetBtnLabel?: string;
        submitBtnLabel?: string;
        cancelBtnLabel?: string;
    },
    fieldConfig: {
        name?: {
            label?: string;
            givenName?: FormFieldConfig;
            familyName?: FormFieldConfig;
        },
        company?: FormFieldConfig,
        email?: FormFieldConfig,
        phone?: FormFieldConfig,
        address?: {
            label?: string;
            street: FormFieldConfig;
            street2: FormFieldConfig;
            houseNumber?: FormFieldConfig;
            city: FormFieldConfig;
            postalCode: FormFieldConfig;
            country?: FormFieldConfig;
        };
    }
    values?: ContactValues;
    onChange: (newValues: ContactValues | undefined) => void;
}

const ContactFormDialog: React.FC<ContactFormDialogProps> = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const useName = props.fieldConfig.name !== undefined;
    const useCompany = props.fieldConfig.company !== undefined;
    const useEmail = props.fieldConfig.email !== undefined;
    const usePhone = props.fieldConfig.phone !== undefined;
    const useAddress = props.fieldConfig.address !== undefined;
    const useCountry = props.fieldConfig.address?.country !== undefined;
    const useHouseNumber = props.fieldConfig.address?.houseNumber !== undefined;

    const formSchema = z.object({
        givenName: useName ? z.string().refine((value) => {
            return new RegExp(props.fieldConfig.name?.givenName?.pattern || '').test(value)
        }, {
            message: props.fieldConfig.name?.givenName?.error
        }) : z.string().optional(),
        familyName: useName ? z.string().refine((value) => {
            return new RegExp(props.fieldConfig.name?.familyName?.pattern || '').test(value)
        }, {
            message: props.fieldConfig.name?.familyName?.error
        }) : z.string().optional(),
        company: useCompany ? z.string().refine((value) => {
            return new RegExp(props.fieldConfig.company?.pattern || '').test(value)
        }, {
            message: props.fieldConfig.company?.error
        }) : z.string().optional(),
        email: useEmail ? z.string().email(props.fieldConfig.email?.error).refine((email => {
            return new RegExp(props.fieldConfig.email?.pattern || '').test(email);
        }), {
            message: props.fieldConfig.email?.error
        }) : z.string().optional(),
        phone: usePhone ? z.string().refine((phone) => {
            return new RegExp(props.fieldConfig.phone?.pattern || '').test(phone);
        }, {
            message: props.fieldConfig.phone?.error
        }) : z.string().optional(),
        address: useAddress ? z.object({
            street: z.string().refine((value) => {
                return new RegExp(props.fieldConfig.address?.street.pattern || '').test(value)
            }, {
                message: props.fieldConfig.address?.street.error
            }),
            street2: z.string().refine((value) => {
                return new RegExp(props.fieldConfig.address?.street2.pattern || '').test(value)
            }, {
                message: props.fieldConfig.address?.street2.error
            }),
            houseNumber: useHouseNumber ? z.string().refine((value) => {
                return new RegExp(props.fieldConfig.address?.houseNumber?.pattern || '').test(value)
            }, {
                message: props.fieldConfig.address?.houseNumber?.error
            }) : z.any().optional(),
            city: z.string().refine((value) => {
                return new RegExp(props.fieldConfig.address?.city.pattern || '').test(value)
            }, {
                message: props.fieldConfig.address?.city.error
            }),
            postalCode: z.string().refine(postalCode => {
                return new RegExp(props.fieldConfig.address?.postalCode.pattern || '').test(postalCode);
            }, {
                message: props.fieldConfig.address?.postalCode.error
            }),
            country: useCountry ? z.string().refine((value) => {
                return new RegExp(props.fieldConfig.address?.country?.pattern || '').test(value)
            }, {
                message: props.fieldConfig.address?.country?.error
            }) : z.any().optional(),
        }) : z.any().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            givenName: props.values?.givenName || '',
            familyName: props.values?.familyName || '',
            company: props.values?.company || '',
            email: props.values?.email || '',
            phone: props.values?.phone || '',
            address: props.values?.address || {
                street: '',
                street2: '',
                houseNumber: '',
                city: '',
                postalCode: '',
                country: '',
            }
        },
    })

    const fetchAddress = async () => {
        form.trigger('address.postalCode')
        form.trigger('address.houseNumber')

        const postalCode = form.getValues('address.postalCode')
        const houseNumber = form.getValues('address.houseNumber')

        // Check if both fields are valid
        const postalCodeValid = new RegExp(props.fieldConfig.address?.postalCode.pattern || '').test(postalCode)
        const houseNumberValid = new RegExp(props.fieldConfig.address?.houseNumber?.pattern || '').test(houseNumber)

        if (!postalCodeValid || !houseNumberValid) {
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // Replace with your actual API endpoint
            const response = await fetchAddressFromAPI(postalCode, houseNumber);
            if (response.error) {
                setError(props.dialog.addressError)
                console.error(response.error)
                return
            }

            const data = response;

            // Update form values with fetched data
            form.setValue("address.street", data.street, {
                shouldValidate: true
            })
            form.setValue("address.city", data.city, {
                shouldValidate: true
            })

        } catch (err) {
            console.error(err)
            setError(props.dialog.addressError)
        } finally {
            setIsLoading(false)
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        props.onChange({
            givenName: values.givenName,
            familyName: values.familyName,
            company: values.company,
            email: values.email,
            phone: values.phone,
            address: {
                street: values.address?.street || '',
                street2: values.address?.street2 || '',
                houseNumber: values.address?.houseNumber || '',
                city: values.address?.city || '',
                postalCode: values.address?.postalCode || '',
                country: values.address?.country || '',
            }
        });
        setIsOpen(false);
        setError(null)
    }


    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {

                setIsOpen(open)
                setError(null)
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant={'outline'}
                    className='gap-2'
                >
                    {props.dialog.triggerBtnLabel}
                    <span>
                        <Pen className='size-4' />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className='overflow-y-scroll max-h-svh md:max-w-3xl @container'
                closeBtnAriaLabel={props.dialog.cancelBtnLabel || ''}
            >
                <DialogHeader>
                    {props.dialog.title && <DialogTitle>
                        {props.dialog.title}
                    </DialogTitle>}
                    {props.dialog.description && <DialogDescription>
                        {props.dialog.description}
                    </DialogDescription>}

                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {props.fieldConfig.name !== undefined &&

                            <div>
                                {props.fieldConfig.name?.label && <p className='text-sm font-semibold'>
                                    {props.fieldConfig.name?.label}
                                </p>}


                                <div className='flex flex-col @lg:flex-row gap-4'>
                                    <FormField
                                        control={form.control}
                                        name="givenName"
                                        render={({ field }) => (
                                            <FormItem className='grow flex-1'>
                                                <FormLabel>
                                                    {props.fieldConfig.name?.givenName?.label}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={props.fieldConfig.name?.givenName?.placeholder}
                                                        autoComplete='given-name'
                                                        {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    {props.fieldConfig.name?.givenName?.description}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="familyName"
                                        render={({ field }) => (
                                            <FormItem className='grow flex-1'>
                                                <FormLabel>
                                                    {props.fieldConfig.name?.familyName?.label}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={props.fieldConfig.name?.familyName?.placeholder}
                                                        autoComplete='family-name'
                                                        {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    {props.fieldConfig.name?.familyName?.description}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>}

                        {props.fieldConfig.company !== undefined && <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>
                                        {props.fieldConfig.company?.label}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={props.fieldConfig.company?.placeholder}
                                            autoComplete='organization'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {props.fieldConfig.company?.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                        {props.fieldConfig.email !== undefined && <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {props.fieldConfig.email?.label}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={props.fieldConfig.email?.placeholder}
                                            autoComplete='email'
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {props.fieldConfig.email?.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                        {props.fieldConfig.phone !== undefined && <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {props.fieldConfig.phone?.label}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder={props.fieldConfig.phone?.placeholder}
                                            autoComplete='tel'
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {props.fieldConfig.phone?.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                        <Separator />
                        {props.fieldConfig.address !== undefined && <div className='space-y-4'>
                            {props.fieldConfig.address?.label && <p className='text-sm font-semibold'>
                                {props.fieldConfig.address?.label}
                            </p>}


                            <div className='flex flex-col @lg:flex-row gap-4 w-full'>
                                <FormField
                                    control={form.control}
                                    name="address.postalCode"
                                    render={({ field }) => (
                                        <FormItem className='w-auto grow flex flex-col @lg:grid grid-rows-[0.6fr_1fr_1fr]'>
                                            <FormLabel className='flex items-end text-balance'>
                                                {props.fieldConfig.address?.postalCode.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={props.fieldConfig.address?.postalCode.placeholder}
                                                    autoComplete='postal-code'
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = (e.target.value).replaceAll(' ', '');

                                                        field.onChange(value)
                                                        form.setValue('address.city', '')
                                                        form.setValue('address.street', '')
                                                        form.trigger('address.postalCode')
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {props.fieldConfig.address?.postalCode.description}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {useHouseNumber && <FormField
                                    control={form.control}
                                    name="address.houseNumber"
                                    render={({ field }) => (
                                        <FormItem className='w-auto grow flex flex-col @lg:grid grid-rows-[0.6fr_1fr_1fr]'>
                                            <FormLabel
                                                className='flex items-end text-balance'
                                            >
                                                {props.fieldConfig.address?.houseNumber?.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={props.fieldConfig.address?.houseNumber?.placeholder}
                                                    autoComplete='address-line1'
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.setValue('address.city', '')
                                                        form.setValue('address.street', '')
                                                        form.trigger('address.houseNumber')
                                                    }}
                                                />
                                            </FormControl>
                                            <div className='min-h-[1rem]'>
                                                <FormDescription className='text-xs'>
                                                    {props.fieldConfig.address?.houseNumber?.description}
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />}

                                <FormField
                                    control={form.control}
                                    name="address.street2"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col @lg:grid grid-rows-[0.6fr_1fr_1fr]'>
                                            <FormLabel className='flex items-end'>
                                                {props.fieldConfig.address?.street2?.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={props.fieldConfig.address?.street2?.placeholder}
                                                    autoComplete='address-line2'
                                                    {...field} />
                                            </FormControl>
                                            <div className='min-h-[1rem]'>
                                                <FormDescription>
                                                    {props.fieldConfig.address?.street2?.description}
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />


                            </div>

                            <LoadingButton
                                type={'button'}
                                variant={'default'}
                                isLoading={isLoading}
                                className='w-full'
                                onClick={() => {
                                    fetchAddress()
                                }}
                            >
                                {props.dialog.addressSearchBtnLabel}
                            </LoadingButton>


                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}




                            <FormField
                                control={form.control}
                                name="address.street"
                                render={({ field }) => (
                                    <FormItem className='grow'>
                                        <FormLabel>
                                            {props.fieldConfig.address?.street?.label}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                readOnly={true}
                                                className='bg-muted'
                                                placeholder={props.fieldConfig.address?.street?.placeholder}
                                                autoComplete='address-line1'
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {props.fieldConfig.address?.street?.description}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address.city"
                                render={({ field }) => (
                                    <FormItem className='grow'>
                                        <FormLabel>
                                            {props.fieldConfig.address?.city.label}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={props.fieldConfig.address?.city.placeholder}
                                                readOnly={true}
                                                className='bg-muted'
                                                autoComplete='address-level2'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {props.fieldConfig.address?.city.description}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {useCountry && <div className='space-y-1'>
                                <FormField
                                    control={form.control}
                                    name="address.country"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>
                                                {props.fieldConfig.address?.country?.label}
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    <Input
                                                        placeholder={props.fieldConfig.address?.country?.placeholder}
                                                        autoComplete='country-name'
                                                        list='country-list'
                                                        {...field} />
                                                    <datalist id="country-list">
                                                        {props.fieldConfig.address?.country?.optionItems?.map(item => (
                                                            <option key={item.key} value={item.label}>{item.label}</option>
                                                        ))}
                                                    </datalist>
                                                </>
                                            </FormControl>
                                            <FormDescription>
                                                {props.fieldConfig.address?.country?.description}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>}
                        </div>}

                        <DialogFooter
                            className='gap-4'
                        >
                            <div className='flex w-full gap-4'>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    className='text-destructive'
                                    onClick={() => {
                                        props.onChange(undefined);
                                        form.reset();
                                        setIsOpen(false);
                                        setError(null)
                                    }}
                                >
                                    {props.dialog.resetBtnLabel}
                                </Button>
                                <div className='grow' />
                                <DialogClose asChild>
                                    <Button
                                        type='button'
                                        variant={'secondary'}
                                    >
                                        {props.dialog.cancelBtnLabel}
                                    </Button>
                                </DialogClose>
                                <Button
                                    type='submit'
                                >
                                    {props.dialog.submitBtnLabel}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>


        </Dialog>
    );
};


const getResponseValue = (response: ResponseItem | undefined, slotKey: string): string | undefined => {
    if (!response || !response.items || response.items.length < 1) {
        return undefined;
    }
    const resp = response.items.find(item => item.key === slotKey);
    return resp?.value;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            props.responseChanged(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    const compDef = (props.compDef as ItemGroupComponent);
    const previewLabel = getItemComponentByRole(compDef.items, 'previewLabel');
    const btnLabel = getItemComponentByRole(compDef.items, 'btnLabel');
    const dialog = getItemComponentByRole(compDef.items, 'dialog');
    const saveBtn = getItemComponentByRole(compDef.items, 'saveBtn');
    const resetBtn = getItemComponentByRole(compDef.items, 'resetBtn');
    const cancelBtn = getItemComponentByRole(compDef.items, 'cancelBtn');

    // Field components:
    const nameComp = getItemComponentByRole(compDef.items, 'name');
    const givenNameComp = getItemComponentByRole((nameComp as ItemGroupComponent)?.items, 'givenName');
    const familyNameComp = getItemComponentByRole((nameComp as ItemGroupComponent)?.items, 'familyName');
    const companyComp = getItemComponentByRole(compDef.items, 'company');
    const emailComp = getItemComponentByRole(compDef.items, 'email');
    const phoneComp = getItemComponentByRole(compDef.items, 'phone');
    const addressComp = getItemComponentByRole(compDef.items, 'address');

    const streetComp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'street');
    const street2Comp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'street2');
    const houseNumberComp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'houseNumber');
    const cityComp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'city');
    const postalCodeComp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'postalCode');
    const countryComp = getItemComponentByRole((addressComp as ItemGroupComponent)?.items, 'country');

    const addressSearchBtnComp = getItemComponentByRole(compDef.items, 'addressSearchBtn');
    const addressErrorComp = getItemComponentByRole(compDef.items, 'addressError');

    const useCountry = countryComp !== undefined;
    const useHouseNumber = houseNumberComp !== undefined;

    const contactValues = {
        givenName: getResponseValue(response, 'givenName') || '',
        familyName: getResponseValue(response, 'familyName') || '',
        company: getResponseValue(response, 'company') || '',
        email: getResponseValue(response, 'email') || '',
        phone: getResponseValue(response, 'phone') || '',
        address: {
            street: getResponseValue(response, 'street') || '',
            street2: getResponseValue(response, 'street2') || '',
            houseNumber: getResponseValue(response, 'houseNumber') || '',
            city: getResponseValue(response, 'city') || '',
            postalCode: getResponseValue(response, 'postalCode') || '',
            country: getResponseValue(response, 'country') || '',
        },
    }

    return (
        <div
            className='px-[--survey-card-px-sm] @md:px-[--survey-card-px]'
        >
            <div className='mb-4 space-y-2'>
                <p className='text-sm mb-1.5'>
                    {getLocaleStringTextByCode(previewLabel?.content, props.languageCode) || ''}
                </p>

                {(response === undefined) && <p className='text-primary'>
                    {getLocaleStringTextByCode(previewLabel?.description, props.languageCode) || ''}
                </p>}

                {contactValues.givenName && contactValues.familyName &&
                    <div className='flex gap-2 items-center'>
                        <span className='pt-0'>
                            <User className='size-5 text-muted-foreground' />
                        </span>
                        <p className='font-bold'>
                            {contactValues.givenName} {contactValues.familyName}
                        </p>
                    </div>}
                {contactValues.company && <div className='flex gap-2 items-center'>
                    <span className='pt-0'>
                        <Building className='size-5 text-muted-foreground' />
                    </span>
                    <p className='flex flex-col'>
                        <span>{contactValues.company}</span>
                    </p>
                </div>}
                {contactValues.email && <div className='flex gap-2 items-center'>
                    <span className='pt-0'>
                        <AtSign className='size-5 text-muted-foreground' />
                    </span>
                    <p>
                        {contactValues.email}
                    </p>
                </div>}


                {contactValues.phone && <div className='flex gap-2 items-center'>
                    <span className='pt-0'>
                        <Phone className='size-5 text-muted-foreground' />
                    </span>
                    <p>
                        {contactValues.phone}
                    </p>
                </div>}


                {contactValues.address.city && <div className='flex gap-2'>
                    <span className='pt-0.5'>
                        <Mailbox className='size-5 text-muted-foreground' />
                    </span>
                    <p className='flex flex-col'>
                        <span>{contactValues.address?.street}

                            {useHouseNumber && <span className='ml-1'>{contactValues.address?.houseNumber}</span>}
                        </span>
                        <span>{contactValues.address?.street2}</span>
                        <span className='flex items-center gap-1'>
                            <span>{contactValues.address?.postalCode}</span>
                            <span>{contactValues.address?.city}</span>
                        </span>
                        <span>{contactValues.address?.country}</span>

                    </p>
                </div>}
            </div>

            <ContactFormDialog
                onChange={(newValues) => {
                    setTouched(true);
                    if (newValues === undefined) {
                        setResponse(undefined);
                        return;
                    }
                    setResponse(prev => {
                        const items = [
                            {
                                key: 'givenName',
                                value: newValues.givenName
                            },
                            {
                                key: 'familyName',
                                value: newValues.familyName
                            },
                            {
                                key: 'company',
                                value: newValues.company
                            },
                            {
                                key: 'email',
                                value: newValues.email
                            },
                            {
                                key: 'phone',
                                value: newValues.phone
                            },
                            {
                                key: 'street',
                                value: newValues.address?.street || ''
                            },
                            {
                                key: 'street2',
                                value: newValues.address?.street2 || ''
                            },
                            {
                                key: 'city',
                                value: newValues.address?.city || ''
                            },
                            {
                                key: 'postalCode',
                                value: newValues.address?.postalCode || ''
                            },
                            {
                                key: 'country',
                                value: useCountry ? newValues.address?.country || '' : ''
                            }
                        ];

                        if (useHouseNumber) {
                            items.push({
                                key: 'houseNumber',
                                value: newValues.address?.houseNumber || ''
                            })
                        }

                        if (!prev) {
                            return {
                                key: props.compDef.key ? props.compDef.key : 'no key found',
                                items: items
                            }
                        }

                        return {
                            ...prev,
                            items: items
                        }
                    });
                }}
                values={contactValues}
                dialog={{
                    triggerBtnLabel: getLocaleStringTextByCode(btnLabel?.content, props.languageCode) || '',
                    title: getLocaleStringTextByCode(dialog?.content, props.languageCode) || '',
                    description: getLocaleStringTextByCode(dialog?.description, props.languageCode) || '',
                    resetBtnLabel: getLocaleStringTextByCode(resetBtn?.content, props.languageCode) || '',
                    submitBtnLabel: getLocaleStringTextByCode(saveBtn?.content, props.languageCode) || '',
                    cancelBtnLabel: getLocaleStringTextByCode(cancelBtn?.content, props.languageCode) || '',
                    addressSearchBtnLabel: getLocaleStringTextByCode(addressSearchBtnComp?.content, props.languageCode) || 'Find',
                    addressError: getLocaleStringTextByCode(addressErrorComp?.content, props.languageCode) || 'Error looking up address',
                }}
                fieldConfig={{
                    name: nameComp ? {
                        label: getLocaleStringTextByCode(nameComp?.content, props.languageCode) || '',
                        givenName: {
                            label: getLocaleStringTextByCode(givenNameComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(givenNameComp?.description, props.languageCode) || '',
                            pattern: givenNameComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((givenNameComp as ItemGroupComponent)?.items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((givenNameComp as ItemGroupComponent)?.items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        },
                        familyName: {
                            label: getLocaleStringTextByCode(familyNameComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(familyNameComp?.description, props.languageCode) || '',
                            pattern: familyNameComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((familyNameComp as ItemGroupComponent)?.items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((familyNameComp as ItemGroupComponent)?.items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        }
                    } : undefined,
                    company: companyComp ? {
                        label: getLocaleStringTextByCode(companyComp?.content, props.languageCode) || '',
                        placeholder: getLocaleStringTextByCode(companyComp?.description, props.languageCode) || '',
                        pattern: companyComp?.properties?.pattern,
                        error: getLocaleStringTextByCode((companyComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                        description: getLocaleStringTextByCode((companyComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                    } : undefined,
                    email: emailComp ? {
                        label: getLocaleStringTextByCode(emailComp?.content, props.languageCode) || '',
                        placeholder: getLocaleStringTextByCode(emailComp?.description, props.languageCode) || '',
                        pattern: emailComp?.properties?.pattern,
                        error: getLocaleStringTextByCode((emailComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                        description: getLocaleStringTextByCode((emailComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                    } : undefined,
                    phone: phoneComp ? {
                        label: getLocaleStringTextByCode(phoneComp?.content, props.languageCode) || '',
                        placeholder: getLocaleStringTextByCode(phoneComp?.description, props.languageCode) || '',
                        pattern: phoneComp?.properties?.pattern,
                        error: getLocaleStringTextByCode((phoneComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                        description: getLocaleStringTextByCode((phoneComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                    } : undefined,
                    address: addressComp ? {
                        label: getLocaleStringTextByCode(addressComp?.content, props.languageCode) || '',
                        street: {
                            label: getLocaleStringTextByCode(streetComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(streetComp?.description, props.languageCode) || '',
                            pattern: streetComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((streetComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((streetComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        },
                        street2: {
                            label: getLocaleStringTextByCode(street2Comp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(street2Comp?.description, props.languageCode) || '',
                            pattern: street2Comp?.properties?.pattern,
                            error: getLocaleStringTextByCode((street2Comp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((street2Comp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        },
                        houseNumber: useHouseNumber ? {
                            label: getLocaleStringTextByCode(houseNumberComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(houseNumberComp?.description, props.languageCode) || '',
                            pattern: houseNumberComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((houseNumberComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((houseNumberComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        } : undefined,
                        city: {
                            label: getLocaleStringTextByCode(cityComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(cityComp?.description, props.languageCode) || '',
                            pattern: cityComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((cityComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((cityComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        },
                        postalCode: {
                            label: getLocaleStringTextByCode(postalCodeComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(postalCodeComp?.description, props.languageCode) || '',
                            pattern: postalCodeComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((postalCodeComp as ItemGroupComponent).items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((postalCodeComp as ItemGroupComponent).items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                        },
                        country: useCountry ? {
                            label: getLocaleStringTextByCode(countryComp?.content, props.languageCode) || '',
                            placeholder: getLocaleStringTextByCode(countryComp?.description, props.languageCode) || '',
                            pattern: countryComp?.properties?.pattern,
                            error: getLocaleStringTextByCode((countryComp as ItemGroupComponent)?.items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                            description: getLocaleStringTextByCode((countryComp as ItemGroupComponent)?.items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                            optionItems: ((countryComp as ItemGroupComponent)?.items?.find(item => item.role === 'optionItems') as ItemGroupComponent)?.items?.map((item, index) => ({
                                key: item.key || index.toString(),
                                label: getLocaleStringTextByCode(item.content, props.languageCode) || ''
                            }))
                        } : undefined,
                    } : undefined,
                }}
            />
        </div>
    );
};

export default ContactForm;
