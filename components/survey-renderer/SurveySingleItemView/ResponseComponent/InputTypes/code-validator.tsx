import { useSurveyCtx } from "@/components/survey-renderer/survey-context";
import { CommonResponseComponentProps, getItemComponentByRole, getLocaleStringTextByCode } from "../../utils";
import { useEffect, useState, useTransition } from "react";
import { ItemGroupComponent, ResponseItem } from "survey-engine/data_types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../../../components/ui/dialog';
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, CheckCircle2Icon, Pen } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";


type CodeValidatorProps = CommonResponseComponentProps



interface FormFieldConfig {
    label: string;
    placeholder: string;
    pattern?: string;
    error: string;
    description?: string;
}

type CodeValidatorDialogProps = {
    codeType: 'linkingCode' | 'studyCode';
    codeKey: string;
    dialog: {
        triggerBtnLabel: string | React.ReactNode;
        title?: string;
        description?: string;
        resetBtnLabel?: string;
        submitBtnLabel?: string;
        cancelBtnLabel?: string;
        codeInvalidMsg?: string;
    },
    codeFieldConfig: FormFieldConfig;
    value?: string;
    onChange: (validCode: string | undefined) => void;
}



const CodeValidatorDialog: React.FC<CodeValidatorDialogProps> = (props) => {
    const surveyCtx = useSurveyCtx();
    const [isPending, startTransition] = useTransition();

    const [isOpen, setIsOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setErrorMsg('');
        setShowError(false);
    }, [isOpen])

    const formSchema = z.object({
        code: z.string().refine((value) => {
            return new RegExp(props.codeFieldConfig?.pattern || '').test(value)
        }, {
            message: props.codeFieldConfig?.error
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: props.value || ''
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: read type (if linking code or study code)
        // TODO: key
        if (surveyCtx.runExternalHandler === undefined) {
            alert('no handler defined');
            setShowError(true);
            return;
        }
        const runExternalHandler = surveyCtx.runExternalHandler;

        startTransition(async () => {
            const handlerId = props.codeType === 'linkingCode' ? 'hasLinkingCode' : 'isStudyCodePresent';
            const resp = await runExternalHandler(handlerId, [
                props.codeKey,
                values.code
            ]);

            if (resp.error) {
                setErrorMsg(resp.error);
                return;
            }

            if (!resp.result) {
                setShowError(true);
                return;
            }
            props.onChange(values.code);
            setIsOpen(false);
        })
    }

    // todo: validate code when submit is clicked and only accept if valid
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {

                setIsOpen(open)
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
                className='overflow-y-scroll max-h-svh lg:max-w-2xl'
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
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {props.codeFieldConfig.label}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={props.codeFieldConfig.placeholder}
                                            autoComplete='name'
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {props.codeFieldConfig.description}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {showError && <p className='text-destructive p-4 border border-border rounded-md flex gap-2 items-center'>
                            <span><AlertTriangleIcon /> </span>{props.dialog.codeInvalidMsg}
                        </p>}
                        {errorMsg && <p className='text-destructive p-4 border border-border rounded-md flex gap-2 items-center'>
                            <span><AlertTriangleIcon /> </span>{errorMsg}
                        </p>}

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
                                        setErrorMsg('');
                                        setShowError(false);
                                        setIsOpen(false);
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
                                <LoadingButton
                                    isLoading={isPending}
                                    type='submit'
                                >
                                    {props.dialog.submitBtnLabel}
                                </LoadingButton>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>


        </Dialog>
    );
};

const CodeValidator: React.FC<CodeValidatorProps> = (props) => {
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
    const codeInvalidMsg = getItemComponentByRole(compDef.items, 'codeInvalidMsg');

    // Field components:
    const codeInputComp = getItemComponentByRole(compDef.items, 'codeInput');

    // should it use study code list or linking codes?
    // key for the code check (either list key or linking code key)
    const linkingCodeComp = getItemComponentByRole(compDef.items, 'linkingCode');
    const studyCodeComp = getItemComponentByRole(compDef.items, 'studyCode');

    if (linkingCodeComp === undefined && studyCodeComp === undefined) {
        return <p>unknown code type</p>
    }

    const codeType = linkingCodeComp !== undefined ? 'linkingCode' : 'studyCode';
    const codeKey = linkingCodeComp !== undefined ? linkingCodeComp.key : studyCodeComp!.key;

    if (codeKey === undefined) {
        return <p>unknown code key</p>
    }

    const previewLabelContent = getLocaleStringTextByCode(previewLabel?.content, props.languageCode) || ''

    return (
        <div
            className='px-[--survey-card-px-sm] @md:px-[--survey-card-px]'
        >
            {previewLabelContent && <p className='text-sm mb-1.5'>
                {previewLabelContent}
            </p>}
            <CodeValidatorDialog
                codeType={codeType}
                codeKey={codeKey}
                dialog={{
                    triggerBtnLabel: response?.value ? <><CheckCircle2Icon className='size-4 text-primary' />{response?.value}</> : (getLocaleStringTextByCode(btnLabel?.content, props.languageCode) || ''),
                    title: getLocaleStringTextByCode(dialog?.content, props.languageCode) || '',
                    description: getLocaleStringTextByCode(dialog?.description, props.languageCode) || '',
                    resetBtnLabel: getLocaleStringTextByCode(resetBtn?.content, props.languageCode) || '',
                    submitBtnLabel: getLocaleStringTextByCode(saveBtn?.content, props.languageCode) || '',
                    cancelBtnLabel: getLocaleStringTextByCode(cancelBtn?.content, props.languageCode) || '',
                    codeInvalidMsg: getLocaleStringTextByCode(codeInvalidMsg?.content, props.languageCode) || 'Error validating code',
                }}
                codeFieldConfig={{
                    label: getLocaleStringTextByCode(codeInputComp?.content, props.languageCode) || '',
                    placeholder: getLocaleStringTextByCode(codeInputComp?.description, props.languageCode) || '',
                    pattern: codeInputComp?.properties?.pattern,
                    error: getLocaleStringTextByCode((codeInputComp as ItemGroupComponent)?.items?.find(item => item.role === 'error')?.content, props.languageCode) || '',
                    description: getLocaleStringTextByCode((codeInputComp as ItemGroupComponent)?.items?.find(item => item.role === 'hint')?.content, props.languageCode) || '',
                }}
                value={response?.value}
                onChange={(validCode?: string) => {
                    setTouched(true);
                    if (validCode === undefined) {
                        setResponse(undefined);
                        return;
                    }

                    setResponse(prev => {
                        if (!prev) {
                            return {
                                key: props.compDef.key ? props.compDef.key : 'no key found',
                                value: validCode,
                            }
                        }
                        return {
                            ...prev,
                            value: validCode,
                        }
                    });
                }}
            />
        </div>
    );
};

export default CodeValidator;
