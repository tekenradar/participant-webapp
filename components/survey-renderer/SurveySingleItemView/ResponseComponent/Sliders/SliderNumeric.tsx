import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem } from 'survey-engine/data_types';
import { getLocaleStringTextByCode } from '../../utils';
import { Slider } from './SliderPrimitive';
import { cn } from '@/lib/utils';


interface SliderNumericProps {
    parentKey: string;
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
}

const SliderNumeric: React.FC<SliderNumericProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    const [inputValue, setInputValue] = useState<number>(
        props.prefill && props.prefill.value ? parseFloat(props.prefill.value) : 0
    );

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const handleSliderChange = (key: string | undefined) => (value?: number[]) => {
        if (!key) { return; }
        setTouched(true);

        if (!value || value.length < 1) {
            setInputValue(0);
            setResponse(undefined);
            return;
        }

        setInputValue(value[0] as number);

        setResponse(prev => {
            if (value === undefined) {
                return undefined;
            }
            if (!prev) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    dtype: 'number',
                    value: value.toString()
                }
            }
            return {
                ...prev,
                dtype: 'number',
                value: value.toString()
            }
        })
    };

    const fullKey = [props.parentKey, props.compDef.key].join('.');
    const noResponseText = getLocaleStringTextByCode(props.compDef.description, props.languageCode);

    const minValue = props.compDef.properties?.min as number || 0;
    const maxValue = props.compDef.properties?.max !== undefined ? props.compDef.properties?.max as number : 100;
    const stepSize = props.compDef.properties?.stepSize as number || 1;


    return (
        <div className={cn(
            'px-[--survey-card-px-sm] @md:px-[--survey-card-px]',
        )}>
            {props.compDef.content ?
                <div
                    className="me-2 text-sm"
                    role='tooltip'
                >
                    <span className='text-gray-600'>
                        {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
                    </span>
                    <span className="ms-2 font-bold text-primary">{response ? inputValue : noResponseText}</span>
                </div>
                : null}
            <div className="flex pt-4">
                <div className="grow">
                    <Slider
                        id={fullKey}
                        aria-labelledby={props.compDef.content ? "slider-numeric" : undefined}
                        value={[typeof inputValue === 'number' ? inputValue : 0]}
                        onValueChange={handleSliderChange(props.compDef.key)}
                        min={minValue}
                        max={maxValue}
                        step={stepSize}
                    />
                    <div className="flex px-1 font-bold text-lg mt-2">
                        <span className="text-center">
                            {minValue}
                        </span>
                        <span className='grow'></span>
                        <span className="text-center">
                            {maxValue}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SliderNumeric;
