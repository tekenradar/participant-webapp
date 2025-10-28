import React, { useState, useEffect } from 'react';
import { isItemGroupComponent, ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { renderFormattedContent } from '../../renderUtils';
import MarkdownComponent from '../../SurveyComponents/MarkdownComponent';
import TextViewComponent from '../../SurveyComponents/TextViewComponent';
import { CommonResponseComponentProps, getClassName, getStyleValueByKey } from '../../utils';
import DateInput from '../DateInput/DateInput';
import DropDownGroup from './DropDownGroup';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import Time from './Time';
import { cn } from '@/lib/utils';


interface ClozeQuestionProps extends CommonResponseComponentProps {
    embedded?: boolean;
}

export enum ClozeItemType {
    SimpleText = 'text',
    Markdown = 'markdown',
    TextInput = 'input',
    LineBreak = 'lineBreak',
    NumberInput = 'numberInput',
    DateInput = 'dateInput',
    TimeInput = 'timeInput',
    Dropdown = 'dropDownGroup',
}

export enum ClozeItemGroupType {
    Text = 'text',
    Dropdown = 'dropDownGroup'
}

const ClozeQuestion: React.FC<ClozeQuestionProps> = (props) => {
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

    const getItemPrefillForSubResponse = (key?: string): ResponseItem | undefined => {
        if (!response || !response.items || response.items.length < 1 || key === undefined) {
            return undefined;
        }
        return response.items.find(ri => ri.key === key);
    }

    const handleItemResponse = (key: string) => (response: ResponseItem | undefined) => {
        setTouched(true);
        setResponse(
            prev => {
                if (!prev || !prev.items) {
                    return {
                        key: props.compDef.key ? props.compDef.key : 'no key defined',
                        items: response ? [response] : [],
                    }
                }

                if (!response) {
                    const newItems = prev.items?.filter(i => i.key !== key)
                    if (!newItems || newItems.length < 1) {
                        return undefined;
                    }
                    return {
                        ...prev,
                        items: newItems,
                    }
                }

                const ind = prev.items.findIndex(item => item.key === response.key);
                if (ind > -1) {
                    prev.items[ind] = { ...response };
                } else {
                    prev.items.push({ ...response });
                }
                return {
                    ...prev,
                    items: [...prev.items],
                }
            });
    };

    const renderItems = (item: ItemComponent): React.ReactNode => {
        if (item.displayCondition === false) {
            return null;
        }
        const prefill = getItemPrefillForSubResponse(item.key);

        const optionKey = props.parentKey + '.' + item.key;

        const isDisabled = item.disabled === true;

        const optionClassName = getClassName(item.style);
        const alignInputText = getStyleValueByKey(item.style, 'alignInputText')

        if (isItemGroupComponent(item)) {
            switch (item.role) {
                case ClozeItemGroupType.Text:
                    return <div key={optionKey}>
                        {renderFormattedContent(item, props.languageCode, undefined, props.dateLocales)}
                    </div>
                case ClozeItemGroupType.Dropdown:
                    return <DropDownGroup
                        key={optionKey}
                        compDef={item}
                        embedded={true}
                        languageCode={props.languageCode}
                        responseChanged={handleItemResponse(item.key ? item.key : 'undefined')}
                        prefill={(prefill && prefill.key === item.key) ? prefill : undefined}
                        fullWidth={true}
                        parentKey={optionKey}
                        dateLocales={props.dateLocales}
                        hideLabel={true}
                    />
            }
        } else {
            // Simplified option type (no styled text, single input)
            switch (item.role) {
                case ClozeItemType.SimpleText:
                    return <TextViewComponent
                        key={item.key}
                        compDef={item}
                        className={optionClassName}
                        languageCode={props.languageCode}
                        embedded={true}
                    />
                case ClozeItemType.Markdown:
                    return <MarkdownComponent
                        key={item.key}
                        className={optionClassName}
                        compDef={item}
                        languageCode={props.languageCode}
                        embedded={true}
                    />;
                case ClozeItemType.TextInput:
                    return <TextInput
                        parentKey={props.parentKey}
                        key={item.key}
                        compDef={item}
                        prefill={(prefill && prefill.key === item.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={handleItemResponse(item.key ? item.key : 'undefined')}
                        updateDelay={50}
                        disabled={isDisabled}
                        nonFullWidth={true}
                        inputClassName={`text-${alignInputText ? alignInputText : 'center'}`}
                        dateLocales={props.dateLocales}
                        embedded={true}
                        hideLabel={true}
                    />;

                case ClozeItemType.LineBreak:
                    return <div key={item.key} className="w-full" />
                case ClozeItemType.NumberInput:
                    return <NumberInput
                        parentKey={props.parentKey}
                        key={item.key}
                        compDef={item}
                        embedded={true}
                        prefill={(prefill && prefill.key === item.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={handleItemResponse(item.key ? item.key : 'undefined')}
                        ignoreClassName={optionClassName !== undefined}
                        nonFullWidth={true}
                        inputClassName={`text-${alignInputText ? alignInputText : 'center'}`}
                        dateLocales={props.dateLocales}
                        hideLabel={true}
                    />;
                case ClozeItemType.DateInput:
                    return <DateInput
                        parentKey={optionKey}
                        key={item.key}
                        compDef={item}
                        prefill={(prefill && prefill.key === item.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={handleItemResponse(item.key ? item.key : 'undefined')}
                        openCalendar={undefined}
                        disabled={isDisabled}
                        dateLocales={props.dateLocales}
                        hideLabel={true}
                    />;
                case ClozeItemType.TimeInput:
                    return <Time
                        parentKey={optionKey}
                        key={item.key}
                        compDef={item}
                        prefill={(prefill && prefill.key === item.key) ? prefill : undefined}
                        languageCode={props.languageCode}
                        responseChanged={handleItemResponse(item.key ? item.key : 'undefined')}
                        disabled={isDisabled}
                        ignoreClassName={optionClassName !== undefined}
                        nonFullWidth={true}
                        dateLocales={props.dateLocales}
                        hideLabel={true}
                    />;
                default:
                    return <p key={item.key}>role inside cloze question group not implemented yet: {item.role}</p>;
            }
        }
    }

    if (!(props.compDef as ItemGroupComponent).items) {
        return <p className="text-destructive-foreground">ERROR: cloze question items array missing</p>
    }

    return (
        <div className={cn(
            "flex items-center flex-wrap gap-2",
            { 'px-[--survey-card-px-sm] @md:px-[--survey-card-px]': !props.embedded }
        )}>
            {
                (props.compDef as ItemGroupComponent).items.map(
                    (option) => renderItems(option)
                )
            }
        </div>
    );
};

export default ClozeQuestion;
