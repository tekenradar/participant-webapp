import React, { useState, useEffect } from 'react';
import { ResponseItem } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getClassName, getLabelPlacementStyle, getLocaleStringTextByCode, getStyleValueByKey } from '../../utils';
import clsx from 'clsx';
import TimeInput, { preprocessTimeInputValue } from '../../../components/TimeInput';


interface TimeProps extends CommonResponseComponentProps {
    ignoreClassName?: boolean;
    nonFullWidth?: boolean;
    embedded?: boolean;
    hideLabel?: boolean;
    defaultClassName?: string;
}

const secondsToTimeString = (value: number | undefined, defaultValue?: string): string | undefined => {
    if (value === undefined) { return defaultValue ? defaultValue : '--:--' }
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - 3600 * hours) / 60);
    const seconds = Math.floor((value - 3600 * hours - 60 * minutes) / 60);
    return `${convertWithPad(hours)}:${convertWithPad(minutes)}:${convertWithPad(seconds)}`;
}

const convertWithPad = (v: number) => {
    let s = v.toFixed(0);
    while (s.length < 2) { s = "0" + s; }
    return s;
}


const Time: React.FC<TimeProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    const [inputValue, setInputValue] = useState<undefined | number>(
        props.prefill && props.prefill.value ? parseFloat(props.prefill.value) : undefined
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

    const handleInputValueChange = (key: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!key) { return; }
        setTouched(true);

        const value = preprocessTimeInputValue(event);

        setInputValue(value);
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


    const minValue = getStyleValueByKey(props.compDef.style, 'minTime');
    const maxValue = getStyleValueByKey(props.compDef.style, 'maxTime');
    const defaultValue = getStyleValueByKey(props.compDef.style, 'defaultValue');
    const stepSize = props.compDef.properties?.stepSize;

    const content = props.compDef.content;
    const placeAfter = getLabelPlacementStyle(props.compDef.style) === 'after';
    const fullKey = [props.parentKey, props.compDef.key].join('.');

    const labelText = getLocaleStringTextByCode(content, props.languageCode);

    return (<div
        className={clsx(
            props.defaultClassName,
            "flex items-center",
            {
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px]': !props.embedded,
                'w-full': !props.nonFullWidth,
            },
            props.ignoreClassName !== true ? getClassName(props.compDef.style) : undefined
        )}
    >
        {!placeAfter ? <label htmlFor={fullKey} className={clsx(
            "grow",
            {
                "me-1": labelText !== undefined && labelText.length > 0 && !props.hideLabel,
                "sr-only": props.hideLabel
            }
        )}
            style={{ maxWidth: 'fit-content' }}
        >
            {getLocaleStringTextByCode(content, props.languageCode)}
        </label> : null}
        <TimeInput
            id={props.parentKey}
            disabled={props.compDef.disabled !== undefined || props.disabled === true}
            min={minValue}
            max={maxValue}
            step={stepSize ? stepSize as number : undefined}
            //value={}
            defaultValue={secondsToTimeString(inputValue, defaultValue)}
            onChange={handleInputValueChange(props.compDef.key)}
        />
        {placeAfter ? <label htmlFor={props.parentKey} className="ms-1">
            {getLocaleStringTextByCode(content, props.languageCode)}
        </label> : null}
    </div>
    );
};

export default Time;
