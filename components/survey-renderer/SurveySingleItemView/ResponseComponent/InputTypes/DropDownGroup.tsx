import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { ResponseItem, ItemGroupComponent } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getLocaleStringTextByCode } from '../../utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dot } from 'lucide-react';
import { cn } from '@/lib/utils';


interface DropDownGroupProps extends CommonResponseComponentProps {
    fullWidth?: boolean;
    embedded?: boolean;
    defaultClassName?: string;
    hideLabel?: boolean;
}


const DropDownGroup: React.FC<DropDownGroupProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const getSelectedKey = (): string | undefined => {
        if (!response || !response.items || response.items.length < 1) {
            return '';
        }
        return response.items[0].key;
    }

    const handleSelectionChange = (value: string) => {
        setTouched(true);
        const key = value;
        setResponse(prev => {
            if (!key || key === '') {
                return undefined;
            }
            if (!prev) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{ key: key }]
                }
            }
            return {
                ...prev,
                items: [
                    { key }
                ]
            }
        });
    };

    const renderedInput = <Select
        value={getSelectedKey()}
        onValueChange={handleSelectionChange}
        disabled={props.compDef.disabled === true || props.disabled === true}
    >
        <SelectTrigger
            id={props.parentKey}
        >
            <SelectValue
                placeholder={getLocaleStringTextByCode(props.compDef.description, props.languageCode)} />
        </SelectTrigger>
        <SelectContent
            className='max-w-[95vw]'
        >
            <SelectGroup
                className='overflow-y-auto max-h-[210px]'
            >
                <span className='flex justify-center bg-muted/50 rounded-sm'>
                    <Dot className='size-3 text-muted-foreground' />
                </span>
                {
                    (props.compDef as ItemGroupComponent).items?.map(
                        item => {
                            if (item.displayCondition) {
                                return null;
                            }
                            return <SelectItem
                                className='flex w-full flex-wrap'
                                key={item.key}
                                value={item.key || ''}>
                                {getLocaleStringTextByCode(item.content, props.languageCode)}
                            </SelectItem>
                        }
                    )
                }
                <span className='flex justify-center bg-muted/50 rounded-sm'>
                    <Dot className='size-3 text-muted-foreground' />
                </span>
            </SelectGroup>
        </SelectContent>
    </Select>;

    const labelText = getLocaleStringTextByCode(props.compDef.content, props.languageCode);

    return (
        <div className={clsx(
            props.defaultClassName,
            "flex items-center my-2",
            {
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px]': !props.embedded,

            },
        )}>
            {labelText ?
                <Label
                    htmlFor={props.parentKey}
                    className={cn(
                        "m-0 me-2 shrink",
                        {
                            "sr-only": props.hideLabel
                        })}
                    style={{ minWidth: 80 }}>
                    {labelText}
                </Label>
                : null}
            {renderedInput}
        </div>
    );
};

export default DropDownGroup;
