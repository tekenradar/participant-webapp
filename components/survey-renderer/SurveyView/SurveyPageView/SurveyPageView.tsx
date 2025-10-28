import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import { SurveySingleItem } from 'survey-engine/data_types';
import { SurveyEngineCore } from 'survey-engine/engine';
import SurveySingleItemView from '../../SurveySingleItemView/SurveySingleItemView';

import { checkSurveyItemsValidity, checkSurveyItemValidity } from 'survey-engine/validation-checkers';
import { getItemComponentByRole, getLocaleStringTextByCode } from '../../SurveySingleItemView/utils';
import { CustomSurveyResponseComponent } from '../../SurveySingleItemView/ResponseComponent/ResponseComponent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { Locale } from 'date-fns';



interface SurveyPageLocalisedTexts {
    backBtn: string;
    nextBtn: string;
    submitBtn: string;
    invalidResponse: string;
}

interface SurveyPageViewProps {
    loading?: boolean;
    surveyEngine: SurveyEngineCore;
    surveyItems: SurveySingleItem[];
    selectedLanguage: string;
    responseCount: number;
    setResponseCount: Dispatch<SetStateAction<number>>;
    onNextPage: () => void;
    onPreviousPage: () => void;
    showBackButton: boolean;
    onSubmit: () => void;
    isLastPage: boolean;
    localisedTexts: SurveyPageLocalisedTexts;
    surveyEndItem?: SurveySingleItem;
    ignoreValidation?: boolean;
    showKeys?: boolean;
    customResponseComponents?: Array<CustomSurveyResponseComponent>;
    dateLocales?: Array<{ code: string, locale: Locale, format: string }>;
    hideButtons?: boolean;
}

const SurveyPageView: React.FC<SurveyPageViewProps> = (props) => {
    const [displayedKeys, setDisplayedKeys] = useState<Array<string>>([]);
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    const responses = props.surveyEngine.getResponses();

    const currentDisplayedKeys = props.surveyItems.map(item => item.key);
    if (displayedKeys.length > 0 && !displayedKeys.every(key => currentDisplayedKeys.includes(key))) {
        setDisplayedKeys(prev => {
            return prev.filter(key => currentDisplayedKeys.includes(key));
        })
    }

    const elRefs = useRef<HTMLDivElement>(null);
    const firstInvalidIndex = props.surveyItems.findIndex(it => !checkSurveyItemValidity(it).hard);

    const mapSurveyItemToComp = (surveyItem: SurveySingleItem, index: number): React.ReactNode => {
        if (surveyItem.type === 'surveyEnd') {
            return <></>
        }
        if (!displayedKeys.includes(surveyItem.key)) {
            props.surveyEngine.questionDisplayed(surveyItem.key);
            setDisplayedKeys(prev => {
                return [...prev, surveyItem.key];
            })
        }

        const itemResponse = responses.find((value) => value.key === surveyItem.key);
        const response = (itemResponse) ? itemResponse.response : undefined;

        const valid = checkSurveyItemValidity(surveyItem);

        return <div
            ref={index === firstInvalidIndex ? elRefs : null}
        >
            <SurveySingleItemView
                renderItem={surveyItem}
                languageCode={props.selectedLanguage}
                responseChanged={(response) => {
                    props.surveyEngine.setResponse(surveyItem.key, response);
                    // Rerender page by updating state
                    props.setResponseCount(props.responseCount + 1);
                }}
                responsePrefill={response}
                showInvalid={!valid.hard && showValidationErrors}
                invalidWarning={props.localisedTexts.invalidResponse}
                showKeys={props.showKeys}
                customResponseComponents={props.customResponseComponents}
                dateLocales={props.dateLocales}
            />
        </div>
    }

    const valid = checkSurveyItemsValidity(props.surveyItems);

    const handleClickWithValidation = (handler: () => void) => {
        if (props.ignoreValidation) {
            handler();
            return;
        }
        if (!valid.hard) {
            setShowValidationErrors(true);
            // console.log(elRefs)

            // Scroll to first invalid item
            if (elRefs.current) {
                elRefs.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
            return;
        }
        setShowValidationErrors(false);
        handler();
    };

    const surveyEnd = () => {
        const titleComp = getItemComponentByRole(props.surveyEndItem?.components?.items, 'title');
        return <div
            className={cn(
                "bg-[--survey-card-bg]",
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-2 @md:py-4',
                "rounded-[--survey-card-border-radius-sm] @md:rounded-[--survey-card-border-radius]"
            )}
        >
            {titleComp ? <h5 className="text-primary text-xl font-bold mb-4">{getLocaleStringTextByCode(titleComp.content, props.selectedLanguage)}</h5> : null}
            <div className='flex gap-2 @md:gap-4'>
                {props.showBackButton ?
                    <Button
                        color='primary'
                        variant='outline'
                        type="button"
                        id="back"
                        className='text-lg font-semibold'
                        onClick={props.onPreviousPage}
                        disabled={props.loading}
                        autoFocus={false}
                    >
                        {props.localisedTexts.backBtn}
                    </Button>
                    : null}
                <Button
                    type="button"
                    id="submit"
                    color='primary'
                    className='text-lg font-semibold'
                    onClick={() => {
                        handleClickWithValidation(props.onSubmit)
                    }
                    }
                    disabled={props.loading}
                    autoFocus={false}
                >
                    {props.loading && <Loader className='size-5 me-2 animate-spin' />}
                    {props.localisedTexts.submitBtn}
                </Button>
            </div>
        </div>
    };

    const surveyNavigation = () => (
        <div
            className="flex gap-4 justify-center my-3"
        >
            {props.showBackButton ?
                <Button
                    type="button"
                    id="back"
                    color='primary'
                    variant={'outline'}
                    className='text-lg font-semibold'
                    onClick={() => {
                        props.onPreviousPage()
                    }}
                    disabled={props.loading}
                    autoFocus={false}
                >
                    {props.localisedTexts.backBtn}
                </Button>
                : null}
            <Button
                type="button"
                id="next"
                name="next"
                color='primary'
                className='text-lg font-semibold'
                onClick={() => {
                    handleClickWithValidation(props.onNextPage)
                }}
                disabled={props.loading}
                autoFocus={false}
            >
                {props.localisedTexts.nextBtn}
            </Button>
        </div>
    );

    const buttonGroup = () => {
        if (props.hideButtons) {
            return null;
        }
        return props.isLastPage ? surveyEnd() : surveyNavigation()
    }

    return (
        <div className='flex flex-col gap-4 '>
            {
                props.surveyItems.map((surveyItem, index) =>
                    <div
                        key={surveyItem.key}>
                        {mapSurveyItemToComp(surveyItem, index)}
                    </div>
                )
            }
            <div className='@container'>
                {buttonGroup()}
            </div>
        </div>
    );
};

export default SurveyPageView;
