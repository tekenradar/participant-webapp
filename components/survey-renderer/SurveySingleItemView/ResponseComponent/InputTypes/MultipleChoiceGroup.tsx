import React, { useState, useEffect, useCallback } from 'react';
import { ItemComponent, ResponseItem, ItemGroupComponent, isItemGroupComponent } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getClassName, getLocaleStringTextByCode } from '../../utils';
import TextInput from './TextInput';
import clsx from 'clsx';
import TextViewComponent from '../../SurveyComponents/TextViewComponent';
import NumberInput from './NumberInput';
import { renderFormattedContent } from '../../renderUtils';
import ClozeQuestion from './ClozeQuestion';
import Time from './Time';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import DateInput from '../DateInput/DateInput';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSurveyItemCtx } from '../../survey-item-context';


interface MultipleChoiceGroupProps extends CommonResponseComponentProps {
    showOptionKey?: boolean;
    isSingleChoice?: boolean;
}

export enum ChoiceResponseOptionType {
    SimpleText = 'option',
    FormattedText = 'formattedOption',
    TextInput = 'input',
    NumberInput = 'numberInput',
    TimeInput = 'timeInput',
    DateInput = 'dateInput',
    Cloze = 'cloze',
    DisplayText = 'text'
}

const MultipleChoiceGroup: React.FC<MultipleChoiceGroupProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const isSingleChoice = props.isSingleChoice ?? false;
    const [subResponseCache, setSubResponseCache] = useState<Array<ResponseItem>>(
        (props.prefill && props.prefill.items) ? [...props.prefill.items] : []
    );
    const surveyItemContext = useSurveyItemCtx();

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);


    const setResponseForKey = useCallback((key: string, checked: boolean, value?: string, dtype?: string, items?: ResponseItem[]) => {
        setTouched(true);
        if (isSingleChoice) {
            const newRI: ResponseItem = {
                key: key,
                value: value,
                dtype: dtype,
                items: items,
            }
            setResponse({
                key: props.compDef.key ? props.compDef.key : 'no key found',
                items: [newRI]
            });
        } else {
            if (checked) {
                const newRI: ResponseItem = {
                    key: key,
                    value: value,
                    dtype: dtype,
                    items: items,
                }
                setResponse(prev => {
                    if (prev && prev.items) {
                        const newItems = prev.items.map((item) => item.key === key ? newRI : item);
                        if (!newItems.some(i => i.key === key)) {
                            newItems.push(newRI);
                        }
                        return {
                            ...prev,
                            items: [...newItems]
                        }
                    } else {
                        return {
                            key: props.compDef.key ? props.compDef.key : 'no key found',
                            items: [newRI]
                        }
                    }
                });
            } else {
                setResponse(prev => {
                    if (prev && prev.items) {
                        const newItems = prev.items.filter(i => i.key !== key);
                        return newItems.length > 0 ? { ...prev, items: newItems } : undefined;
                    } else {
                        return undefined;
                    }
                });
            }
        }
    }, [isSingleChoice, props.compDef.key])

    const handleSelectionChange = useCallback((key: string, checked: boolean) => {
        const subResp = subResponseCache.find(sr => sr.key === key);
        if (subResp) {
            setResponseForKey(key, checked, subResp.value, subResp.dtype, subResp.items);
        } else {
            setResponseForKey(key, checked);
        }
    }, [
        subResponseCache,
        setResponseForKey,
    ]);

    const updateSubResponseCache = (key: string | undefined, response: ResponseItem | undefined) => {
        // console.log('updateSubResponseCache', key, response)
        if (!response) {
            setSubResponseCache(prev => {
                const ind = prev.findIndex(pr => pr.key === key);
                if (ind < 0) {
                    return prev;
                }
                prev.splice(ind, 1);
                return [...prev];
            })
        } else {
            setSubResponseCache(prev => {
                const ind = prev.findIndex(pr => pr.key === key);
                if (ind < 0) {
                    prev.push(response);
                }
                else {
                    prev[ind] = { ...response };
                }
                return [...prev];
            })
        }
    }

    const isChecked = (key: string): boolean => {
        if (!response || !response.items || response.items.length < 1) {
            return false;
        }
        return response.items.findIndex(ri => ri.key === key) > -1;
    }

    const isDisabled = (item: ItemComponent): boolean => {
        if (item.disabled === true) {
            const key = item.key ? item.key : 'no key found';
            if (isChecked(key)) {
                setResponse(prev => {
                    if (!prev) { return { key: 'no key found', items: [] } }
                    return {
                        ...prev,
                        items: prev.items?.filter(i => i.key !== key),
                    }
                });
            }
            return true;
        }
        return false;
    }

    const getSelectedKey = (): string | undefined => {
        if (!response || !response.items || response.items.length < 1) {
            return '';
        }
        return response.items[0].key;
    }

    const renderResponseOption = (option: ItemComponent): React.ReactNode => {
        if (option.displayCondition === false) {
            return null;
        }
        const optionKey = props.parentKey + '.' + option.key;
        let labelComponent = <p>{'loading...'}</p>;
        const prefill = subResponseCache.find(r => r.key === option.key);
        const optionClassName = getClassName(option.style);
        const arialLabel = getLocaleStringTextByCode(option.content, props.languageCode) || option.key;

        // Fix 'legacy' case of ItemGroupComponent & role='option' meaning 'formattedOption'
        if (isItemGroupComponent(option) && option.role === ChoiceResponseOptionType.SimpleText) {
            option.role = ChoiceResponseOptionType.FormattedText;
        }


        switch (option.role) {
            case ChoiceResponseOptionType.DisplayText:
                return <TextViewComponent
                    key={option.key}
                    compDef={option}
                    languageCode={props.languageCode}
                    embedded={true}
                    className='px-[--survey-card-px-sm] @md:px-[--survey-card-px] mt-2'
                />;
            case ChoiceResponseOptionType.SimpleText:
                labelComponent = <span className={clsx("w-full")}>
                    {getLocaleStringTextByCode(option.content, props.languageCode)}
                </span>;
                break;
            case ChoiceResponseOptionType.FormattedText:
                labelComponent = <div className={clsx("w-full")}>
                    {renderFormattedContent(option, props.languageCode, undefined, props.dateLocales)}
                </div>
                break;
            case ChoiceResponseOptionType.Cloze:
                labelComponent = <ClozeQuestion
                    parentKey={optionKey}
                    key={option.key}
                    compDef={option}
                    prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
                    languageCode={props.languageCode}
                    responseChanged={(response) => {
                        const checkStatus = (response !== undefined && response.items !== undefined);
                        setResponseForKey(option.key ? option.key : 'unknown', checkStatus, response?.value, undefined, response?.items);
                        updateSubResponseCache(option.key, response);
                    }}
                    disabled={isDisabled(option)}
                    dateLocales={props.dateLocales}
                    embedded={true}
                />;
                break;
            case ChoiceResponseOptionType.TextInput:
                labelComponent =
                    <TextInput
                        parentKey={props.parentKey}
                        key={option.key}
                        compDef={option}
                        embedded={true}
                        prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={(response) => {
                            const value = response?.value;
                            const checkStatus = (value !== undefined && value.length > 0);
                            setResponseForKey(option.key ? option.key : 'unknown', checkStatus, value);
                            updateSubResponseCache(option.key, response);
                        }}
                        updateDelay={5}
                        disabled={isDisabled(option)}
                        dateLocales={props.dateLocales}
                    />;
                break;
            case ChoiceResponseOptionType.TimeInput:
                labelComponent =
                    <Time
                        parentKey={props.parentKey}
                        key={option.key}
                        compDef={option}
                        prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={(response) => {
                            const value = response?.value;
                            const checkStatus = (value !== undefined && value.length > 0);
                            setResponseForKey(option.key ? option.key : 'unknown', checkStatus, value, response?.dtype);
                            updateSubResponseCache(option.key, response);
                        }}
                        disabled={isDisabled(option)}
                        dateLocales={props.dateLocales}
                        embedded={true}
                    />;
                break;
            case ChoiceResponseOptionType.DateInput:
                labelComponent = <DateInput
                    parentKey={optionKey}
                    key={option.key}
                    compDef={option}
                    embedded={true}
                    prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
                    languageCode={props.languageCode}
                    responseChanged={(response) => {
                        const value = response?.value;
                        const checkStatus = (value !== undefined && value.length > 0);
                        setResponseForKey(option.key ? option.key : 'unknown', checkStatus, value, response?.dtype)
                    }}
                    openCalendar={touched && getSelectedKey() === option.key}
                    disabled={isDisabled(option)}
                    dateLocales={props.dateLocales}
                />;
                break;
            case ChoiceResponseOptionType.NumberInput:
                labelComponent =
                    <NumberInput
                        parentKey={props.parentKey}
                        key={option.key}
                        compDef={option}
                        embedded={true}
                        prefill={(prefill && prefill.key === option.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={(response) => {
                            const value = response?.value;
                            const checkStatus = (value !== undefined && value.length > 0);
                            setResponseForKey(option.key ? option.key : 'unknown', checkStatus, value, response?.dtype);
                            updateSubResponseCache(option.key, response);
                        }}
                        disabled={isDisabled(option)}
                        dateLocales={props.dateLocales}
                    />;
                break;
            default:
                labelComponent = <p key={option.key}>role inside multiple choice group not implemented yet: {option.role}</p>
                break;

        }

        if (!option.key) {
            return <p>ERROR: choice option key missing</p>
        }

        const keySuffix = 'option';

        return (<Label
            htmlFor={optionKey + keySuffix}
            className={clsx(
                "flex items-center font-normal gap-2 @md:gap-3 text-base",
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-1.5',
                'hover:bg-black/5',
                {
                    'cursor-not-allowed opacity-50': isDisabled(option),
                    'cursor-pointer': !isDisabled(option),
                },
                optionClassName
            )}
            key={option.key} >

            {props.showOptionKey ?
                <span className="text-primary me-2 text-xs">{option.key}</span>
                : null}
            {isSingleChoice ? <span className='flex items-center justify-center'>
                <RadioGroupItem
                    value={option.key}
                    id={optionKey + keySuffix}
                    //aria-label={ariaLabel}
                    className='bg-background size-5'
                    disabled={isDisabled(option)}
                />
            </span> : <Checkbox
                className='bg-background size-5'
                aria-label={arialLabel}
                name={props.parentKey}
                id={optionKey + keySuffix}
                value={option.key}
                checked={isChecked(option.key ? option.key : 'no key found')}
                disabled={isDisabled(option)}
                onCheckedChange={(checked) => {
                    handleSelectionChange(option.key ? option.key : 'no key found', checked === true)
                }}
            />}
            {labelComponent}
        </Label>)

    }

    if (!(props.compDef as ItemGroupComponent).items) {
        return <p>ERROR: multiple choice options missing</p>
    }

    if (isSingleChoice) {
        return (
            <RadioGroup
                id={props.parentKey}
                aria-labelledby={surveyItemContext.headerId}
                className=' flex flex-col gap-0'
                value={getSelectedKey()}
                onValueChange={(value) => { handleSelectionChange(value, true) }}
            >
                {
                    (props.compDef as ItemGroupComponent).items.map(
                        (option) => renderResponseOption(option)
                    )
                }
            </RadioGroup>
        );
    } else {
        return (
            <div
                id={props.parentKey}
                aria-labelledby={surveyItemContext.headerId}
                aria-label="multiple choice options"
                className='flex flex-col'
            >
                {
                    (props.compDef as ItemGroupComponent).items.map((option) =>
                        renderResponseOption(option)
                    )
                }
            </div>
        );
    }
};

export default MultipleChoiceGroup;
