import React, { useState, useEffect, useRef } from 'react';
import { Survey, SurveySingleItemResponse, SurveyContext } from 'survey-engine/data_types';
import { SurveyEngineCore } from 'survey-engine/engine';
import { CustomSurveyResponseComponent } from '../SurveySingleItemView/ResponseComponent/ResponseComponent';
import SurveyPageView from './SurveyPageView/SurveyPageView';
import SurveyProgress from './SurveyProgress/SurveyProgress';
import { isFirefox } from 'react-device-detect';
import { Locale } from 'date-fns';
import { useWindowSize } from 'usehooks-ts';
import { HandlerFunction, SurveyContextProvider } from '../survey-context';

interface SurveyViewProps {
    instanceKey?: string;
    loading?: boolean;
    survey: Survey;
    languageCode: string;
    onSubmit: (responses: SurveySingleItemResponse[], version: string) => void;
    onResponsesChanged?: (responses: SurveySingleItemResponse[], version: string, surveyEngine?: SurveyEngineCore) => void;
    prefills?: SurveySingleItemResponse[];
    context?: SurveyContext;
    backBtnText: string;
    nextBtnText: string;
    submitBtnText: string;
    invalidResponseText: string;
    hideBackButton?: boolean;
    hideButtons?: boolean;
    showKeys?: boolean;
    customResponseComponents?: Array<CustomSurveyResponseComponent>;
    dateLocales?: Array<{ code: string, locale: Locale, format: string }>;
    showEngineDebugMsg?: boolean;
    onRunExternalHandler?: HandlerFunction;
    // init with temporary loaded results
    // save temporary result
}


const SurveyView: React.FC<SurveyViewProps> = (props) => {
    const [surveyEngine, setSurveyEngine] = useState<SurveyEngineCore>(new SurveyEngineCore(props.survey, props.context, props.prefills, props.showEngineDebugMsg));
    const { width = 0 } = useWindowSize()
    const surveyPages = surveyEngine.getSurveyPages(width < 649 ? 'small' : 'large');

    const [responseCount, setResponseCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const surveyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSurveyEngine(new SurveyEngineCore(props.survey, props.context, props.prefills));
    }, [props.instanceKey, props.survey, props.context, props.prefills]);

    const onResponsesChanged = () => {
        if (props.onResponsesChanged) {
            const resp = surveyEngine.getResponses();
            props.onResponsesChanged(resp, props.survey.versionId, surveyEngine);
        }
    }

    const onSubmit = () => {
        const resp = surveyEngine.getResponses();
        props.onSubmit(resp, props.survey.versionId);
    }

    const resetScrollPosition = () => {
        if (isFirefox) {
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 10)
        } else {
            window.scrollTo(0, 0)
        }
    }

    // console.log(surveyEngine.getSurveyEndItem());

    const renderCurrentPage = () => {
        if (!surveyPages || surveyPages.length === 0) {
            return <p className='text-center text-destructive'>Error during computing survey pages</p>
        }

        if (currentPage < 0 || currentPage > surveyPages.length - 1) {
            setCurrentPage(0);
            return;
        }

        const isLastPage = currentPage >= surveyPages.length - 1;
        return <SurveyPageView
            loading={props.loading}
            surveyEngine={surveyEngine}
            surveyItems={surveyPages[currentPage]}
            localisedTexts={{
                backBtn: props.backBtnText,
                nextBtn: props.nextBtnText,
                submitBtn: props.submitBtnText,
                invalidResponse: props.invalidResponseText ? props.invalidResponseText : '',
            }}
            showBackButton={currentPage > 0 && !props.hideBackButton}
            onPreviousPage={() => {
                setCurrentPage(prev => Math.max(0, prev - 1));
            }}
            onNextPage={() => {
                setCurrentPage(prev => prev + 1);
                resetScrollPosition();
                surveyRef.current?.focus();
            }}
            surveyEndItem={surveyEngine.getSurveyEndItem()}
            onSubmit={onSubmit}
            isLastPage={isLastPage}
            selectedLanguage={props.languageCode}
            responseCount={responseCount}
            setResponseCount={(count) => {
                setResponseCount(count);
                onResponsesChanged();
            }}
            showKeys={props.showKeys}
            customResponseComponents={props.customResponseComponents}
            dateLocales={props.dateLocales}
            hideButtons={props.hideButtons}
        />;
    }

    return (
        <SurveyContextProvider
            onRunExternalHandler={props.onRunExternalHandler}
        >
            <div
                ref={surveyRef}
                className='focus:outline-none survey'
                tabIndex={-1}>
                {surveyPages.length > 1 ?
                    <div className="p-6">
                        <SurveyProgress
                            currentIndex={currentPage}
                            totalCount={surveyPages.length}
                        />
                    </div> : null}
                {renderCurrentPage()}
            </div>
        </SurveyContextProvider>
    );
};

export default SurveyView;
