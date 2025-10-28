import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface ConsentFormProps {
    label: string;
    dialog: {
        title: string;
        content: string;
        acceptBtn: string;
        rejectBtn: string;
    }
    field: {
        name: string;
        value: boolean | undefined;
        onChange: (accepted?: boolean) => void;
    };
}

const ConsentForm: React.FC<ConsentFormProps> = ({
    label,
    dialog,
    field
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Label
                htmlFor={field.name}
                className='flex items-center gap-2 cursor-pointer'
            >
                <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            setOpen(true);
                        } else {
                            field.onChange(false);
                        }
                    }}
                    className='size-5'
                />
                <span>
                    {label}
                </span>
                <span>
                    <ArrowUpRight className='size-4' />
                </span>
            </Label>
            <AlertDialog
                open={open}
                onOpenChange={setOpen}
            >
                <AlertDialogContent
                    className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
                >
                    <AlertDialogTitle className='text-xl'>
                        {dialog.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className='sr-only'>
                        {dialog.title}
                    </AlertDialogDescription>
                    <Separator className='bg-primary' />
                    <div>
                        <EmbeddedMarkdownRenderer>
                            {dialog.content}
                        </EmbeddedMarkdownRenderer>
                    </div>

                    <Separator />

                    <AlertDialogFooter className='gap-2 space-x-0 pb-6 sm:pb-0'>
                        <AlertDialogAction
                            onClick={() => {
                                field.onChange(true);
                                setOpen(false);
                            }}
                        >
                            {dialog.acceptBtn}
                        </AlertDialogAction>

                        <AlertDialogCancel
                            onClick={() => {
                                field.onChange(false);
                                setOpen(false);
                            }}
                        >
                            {dialog.rejectBtn}
                        </AlertDialogCancel>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ConsentForm;
