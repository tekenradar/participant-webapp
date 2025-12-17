'use client'

import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { H2 } from '@/components/headings';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AssignedSurvey, SurveyInfo } from '@/lib/server/data-fetching/survey';
import { Profile } from '@/lib/server/data-fetching/user';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
import SurveyCard, { SurveyCardProps } from './survey-card';

interface SurveyListClientProps {
    locale: string;
    profiles: Array<Profile>;
    requiredSurveys: Array<AssignedSurvey>;
    optionalSurveys: Array<AssignedSurvey>;
    surveyInfos: Array<SurveyInfo>;
    messages: {
        requiredSurveys: {
            noSurveys: {
                title: string;
                description: string;
            }
        },
        optionalSurveys: {
            title: string;
            description: string;
            showBtn: string;
            hideBtn: string;
        }
    }
}

const getSurveyCardList = (assingedSurveys: Array<AssignedSurvey>, surveyInfos: Array<SurveyInfo>, profiles: Array<Profile>, locale: string): Array<SurveyCardProps> => {
    const cardInfos: SurveyCardProps[] = [];
    if (!assingedSurveys || assingedSurveys.length === 0) {
        return cardInfos;
    }
    for (const s of assingedSurveys) {
        const profile = profiles.find(p => p.id === s.profileID);
        if (!profile) {
            console.warn('Profile not found for survey', s)
            continue;
        }
        const currentSurveyInfo = surveyInfos.find(si => si.studyKey === s.studyKey && si.surveyKey === s.surveyKey);
        if (!currentSurveyInfo) {
            continue;
        }
        cardInfos.push({
            ...s,
            profiles: [profile],
            surveyInfos: currentSurveyInfo,
            language: locale,
        });
    }
    return cardInfos;
}

const SurveyListClient: React.FC<SurveyListClientProps> = (props) => {
    const [showOptionalSurveys, setShowOptionalSurveys] = React.useState(false);

    const requiredSurveysCardInfos = getSurveyCardList(props.requiredSurveys, props.surveyInfos, props.profiles, props.locale).sort((a, b) => a.profiles[0].id.localeCompare(b.profiles[0].id));
    const optionalSurveysCardInfos = getSurveyCardList(props.optionalSurveys, props.surveyInfos, props.profiles, props.locale).sort((a, b) => a.profiles[0].id.localeCompare(b.profiles[0].id));

    return (
        <div className='space-y-6'>
            <div>

                <ul className='flex flex-col gap-y-4 mt-4'>
                    {!requiredSurveysCardInfos || requiredSurveysCardInfos.length === 0 && <div className='flex flex-col items-start gap-2 justify-start h-full bg-secondary rounded-md p-6 my-6'>
                        <p className='text-lg font-semibold'>
                            {props.messages.requiredSurveys.noSurveys.title}
                        </p>
                        <p className='text-base'>{props.messages.requiredSurveys.noSurveys.description}</p>
                    </div>}
                    {requiredSurveysCardInfos.map((survey) => (
                        <SurveyCard key={survey.surveyKey + survey.category + survey.profiles.map(p => p.id).join('-')} {...survey} />
                    ))}
                </ul>
            </div>


            {optionalSurveysCardInfos.length > 0 && (
                <Collapsible open={showOptionalSurveys}>
                    <div className='flex justify-center'>
                        <CollapsibleTrigger asChild>
                            <Button
                                className='mx-auto bg-secondary text-secondary-foreground'
                                variant='outline'
                                onClick={() => setShowOptionalSurveys(prev => !prev)}
                            >
                                {showOptionalSurveys ? props.messages.optionalSurveys.hideBtn : props.messages.optionalSurveys.showBtn}
                                <span className='ms-2'>
                                    {showOptionalSurveys ? <ChevronUp className='size-4' /> : <ChevronDown className='size-4' />}
                                </span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent className='mt-6'>
                        <H2>
                            {props.messages.optionalSurveys.title}:
                            <span className='text-primary ms-1'>{optionalSurveysCardInfos.length}</span>
                        </H2>
                        <div className='space-y-4 py-4'>
                            <div>
                                <EmbeddedMarkdownRenderer className='text-sm'>
                                    {props.messages.optionalSurveys.description}
                                </EmbeddedMarkdownRenderer>
                            </div>

                            <ul className='flex flex-col gap-y-4'>
                                {optionalSurveysCardInfos.map((survey, index) => (
                                    <SurveyCard key={survey.surveyKey + survey.category + survey.profiles.map(p => p.id).join('-') + index.toString()} {...survey} />
                                ))}
                            </ul>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}
        </div>
    );
};

export default SurveyListClient;
