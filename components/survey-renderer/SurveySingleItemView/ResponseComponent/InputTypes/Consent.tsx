import React, { useState, useEffect } from 'react';
import { ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getClassName, getLocaleStringTextByCode } from '../../utils';
import { renderFormattedContent } from '../../renderUtils';
import ConsentDialog from '../../../components/ConsentDialog';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';


type ConsentProps = CommonResponseComponentProps

const Consent: React.FC<ConsentProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const checked = response?.items?.length === 1;

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const accept = () => {
        console.log('accept');
        setDialogOpen(false);
        if (!props.compDef.key) { return; }
        setTouched(true);
        setResponse({ key: props.compDef.key, items: [{ key: 'consent' }] })
    }

    const reject = () => {
        console.log('reject');
        setDialogOpen(false);
        setTouched(true);
        setResponse(undefined);
    }


    const optionKey = props.parentKey + '.' + props.compDef.key;

    const items = (props.compDef as ItemGroupComponent).items;
    if (!items) {
        return <span>Items not found</span>
    }
    const labelComp = items.find(item => item.role === 'label');
    const contentComp = items.find(item => item.role === 'content')
    const dialogTitle = getLocaleStringTextByCode(items.find(item => item.role === 'title')?.content, props.languageCode)
    const dialogDescription = getLocaleStringTextByCode(items.find(item => item.role === 'description')?.content, props.languageCode)
    const dialogAcceptBtn = getLocaleStringTextByCode(items.find(item => item.role === 'acceptBtn')?.content, props.languageCode)
    const dialogRejectBtn = getLocaleStringTextByCode(items.find(item => item.role === 'rejectBtn')?.content, props.languageCode)

    if (labelComp === undefined || contentComp === undefined) {
        return <span>Items not found</span>
    }

    return (
        <>

            <label
                htmlFor={props.parentKey + optionKey}
                className={cn(
                    "flex items-center gap-2",
                    'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-1.5',
                    'hover:bg-black/5',
                    'font-normal text-base cursor-pointer',
                    getClassName(props.compDef.style),
                )}
            >
                <Checkbox
                    id={props.parentKey + optionKey}
                    name={optionKey}
                    className='size-5 bg-white'
                    checked={checked}
                    onCheckedChange={() => {
                        setDialogOpen(true);
                    }}

                />
                {renderFormattedContent(labelComp, props.languageCode, 'cursor-pointer', props.dateLocales)}
            </label>


            <ConsentDialog
                open={dialogOpen}
                acceptBtn={dialogAcceptBtn ? dialogAcceptBtn : 'Accept'}
                cancelBtn={dialogRejectBtn ? dialogRejectBtn : 'Reject'}
                title={dialogTitle ? dialogTitle : 'Consent'}
                description={dialogDescription ? dialogDescription : ''}
                content={getLocaleStringTextByCode(contentComp.content, props.languageCode)}
                onConfirmed={() => accept()}
                onCancelled={() => reject()}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
};

export default Consent;
