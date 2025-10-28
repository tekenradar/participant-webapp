import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem, isItemGroupComponent, ItemGroupComponent } from 'survey-engine/data_types';
import MultipleChoiceGroup from './InputTypes/MultipleChoiceGroup';
import DropDownGroup from './InputTypes/DropDownGroup';
import DateInput from './DateInput/DateInput';
import TextInput from './InputTypes/TextInput';
import MultilineTextInput from './InputTypes/MultilineTextInput';
import NumberInput from './InputTypes/NumberInput';


import SliderNumeric from './Sliders/SliderNumeric';
import SliderNumericRange from './Sliders/SliderNumericRange/SliderNumericRange';
import SliderCategorical from './Sliders/SliderCategorical/SliderCategorical';
import Matrix from './InputTypes/Matrix';
import TextViewComponent from '../SurveyComponents/TextViewComponent';
import EQ5DHealthIndicatorInput from './EQ5DHealthIndicatorInput/EQ5DHealthIndicatorInput';
import LikertScale from './InputTypes/LikertScale';
import LikertGroup from './InputTypes/LikertGroup';
import MarkdownComponent from '../SurveyComponents/MarkdownComponent';
import ResponsiveSingleChoiceArray from './InputTypes/ResponsiveSingleChoiceArray';
import ResponsiveBipolarLikertScaleArray from './InputTypes/ResponsiveBipolarLikertScaleArray';
import ClozeQuestion from './InputTypes/ClozeQuestion';
import { CommonResponseComponentProps } from '../utils';
import Time from './InputTypes/Time';
import Consent from './InputTypes/Consent';
import ValidatedRandomQuestion from './InputTypes/validated-random-question';
import ContactForm from './InputTypes/contact-form';
import { Locale } from 'date-fns';
import ResponsiveMatrix from './InputTypes/ResponsiveMatrix';
import CodeValidator from './InputTypes/code-validator';


interface ResponseComponentProps {
    itemKey: string;
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
    isRequired: boolean;
    showOptionKey?: boolean;
    showErrors?: boolean;
    customResponseComponents?: Array<CustomSurveyResponseComponent>;
    dateLocales: Array<{ code: string, locale: Locale, format: string }>;
}

export interface CustomSurveyResponseComponent {
    name: string;
    component: React.FunctionComponent<CommonResponseComponentProps>;
}

const ResponseComponent: React.FC<ResponseComponentProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            props.responseChanged(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const isGroup = isItemGroupComponent(props.compDef);
    if (!isGroup) {
        return <p>question root should be a group component</p>
    }


    const getPrefillForItem = (item: ItemComponent): ResponseItem | undefined => {
        if (!props.prefill || !props.prefill.items) { return undefined; }
        const itemPrefill = props.prefill.items.find(ri => ri.key === item.key);
        return itemPrefill;
    }

    const handleItemResponse = (key: string) => (response: ResponseItem | undefined) => {
        setTouched(true);
        setResponse(
            prev => {
                if (!prev || !prev.items) {
                    if (!response) {
                        return undefined;
                    }
                    return {
                        key: props.compDef.key ? props.compDef.key : 'no key defined',
                        items: [response],
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

    return <div
    // className="px-3 py-2a"
    // color="#f2f2f2"
    // style={{ padding: "8px 16px" }}
    >
        {(props.compDef as ItemGroupComponent).items.map((respComp, index) => {

            if (respComp.displayCondition === false) {
                return <div key={respComp.key ? respComp.key : 'p' + index.toString()} hidden></div>;
            }
            const currentKeyPath = [props.itemKey, props.compDef.key, respComp.key].join('.');

            const customCompDef = props.customResponseComponents?.find(customRespComp => customRespComp.name === respComp.role);
            if (customCompDef !== undefined) {
                const Component = customCompDef.component;
                return <Component
                    key={respComp.key}
                    parentKey={currentKeyPath}
                    languageCode={props.languageCode}
                    compDef={respComp}
                    prefill={getPrefillForItem(respComp)}
                    responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                    dateLocales={props.dateLocales}
                />
            }

            switch (respComp.role) {
                case 'text':
                    return <TextViewComponent
                        key={respComp.key ? respComp.key : 'p' + index.toString()}
                        compDef={respComp}
                        languageCode={props.languageCode}
                        embedded={false}
                    />
                case 'markdown':
                    return <MarkdownComponent key={index.toFixed()}
                        compDef={respComp}
                        languageCode={props.languageCode}
                        embedded={false}
                    />;
                case 'singleChoiceGroup':
                    return <MultipleChoiceGroup
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        showOptionKey={props.showOptionKey}
                        dateLocales={props.dateLocales}
                        isSingleChoice={true}
                    />
                case 'multipleChoiceGroup':
                    return <MultipleChoiceGroup
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        showOptionKey={props.showOptionKey}
                        dateLocales={props.dateLocales}
                    />
                case 'dropDownGroup':
                    return <DropDownGroup
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'input':
                    return <TextInput
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'multilineTextInput':
                    return <MultilineTextInput
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'numberInput':
                    return <NumberInput
                        parentKey={currentKeyPath}
                        embedded={false}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'dateInput':
                    return <DateInput
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        openCalendar={undefined}
                        dateLocales={props.dateLocales}
                    />
                case 'timeInput':
                    return <Time
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'sliderNumeric':
                    return <SliderNumeric
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                    />
                case 'consent':
                    return <Consent
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'sliderNumericRange':
                    return <SliderNumericRange
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                    />
                case 'sliderCategorical':
                    return <SliderCategorical
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                    />
                case 'matrix':
                    return <Matrix
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'responsiveMatrix':
                    return <ResponsiveMatrix
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'eq5d-health-indicator':
                    return <EQ5DHealthIndicatorInput
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        isRequired={props.isRequired}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'likert':
                    return <LikertScale
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'likertGroup':
                    return <LikertGroup
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'responsiveSingleChoiceArray':
                    return <ResponsiveSingleChoiceArray
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                        showErrors={props.showErrors}
                    />
                case 'responsiveBipolarLikertScaleArray':
                    return <ResponsiveBipolarLikertScaleArray
                        key={respComp.key}
                        parentKey={currentKeyPath}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'cloze':
                    return <ClozeQuestion
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'validatedRandomQuestion':
                    return <ValidatedRandomQuestion
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'contact':
                    return <ContactForm
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                        dateLocales={props.dateLocales}
                    />
                case 'codeValidator':
                    return <CodeValidator
                        parentKey={currentKeyPath}
                        key={respComp.key}
                        languageCode={props.languageCode}
                        compDef={respComp}
                        prefill={getPrefillForItem(respComp)}
                        responseChanged={handleItemResponse(respComp.key ? respComp.key : 'no key found')}
                    />
                default:
                    return <p key={respComp.key ? respComp.key : index.toString()}>{respComp.role}</p>
            }
        })
        }
    </div>
};

export default ResponseComponent;
