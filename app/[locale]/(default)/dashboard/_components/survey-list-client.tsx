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
    activeSurveys: Array<AssignedSurvey>;
    surveyInfos: Array<SurveyInfo>;
    messages: {
        requiredSurveys: {
            title: string;
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

const SurveyListClient: React.FC<SurveyListClientProps> = (props) => {
    const [showOptionalSurveys, setShowOptionalSurveys] = React.useState(false);


    const cardInfos: SurveyCardProps[] = [];
    if (props.activeSurveys) {
        for (const s of props.activeSurveys) {
            // const ind = cardInfos.findIndex(ci => ci.surveyKey === s.surveyKey && ci.studyKey === s.studyKey && ci.category === s.category);
            const ind = -1; // separate card for every profile

            const profile = props.profiles.find(p => p.id === s.profileID);
            if (!profile) {
                console.warn('Profile not found for survey', s)
                continue;
            }
            const currentSurveyInfo = props.surveyInfos.find(si => si.studyKey === s.studyKey && si.surveyKey === s.surveyKey);
            if (!currentSurveyInfo) {
                continue;
            }
            if (ind > -1) {
                cardInfos[ind].profiles.push({ ...profile });
            } else {
                cardInfos.push({
                    ...s,
                    profiles: [
                        profile
                    ],
                    surveyInfos: currentSurveyInfo,
                    language: props.locale,
                })
            }
        }
    }

    const sortedCardInfos = cardInfos.sort((a, b) => a.profiles[0].id.localeCompare(b.profiles[0].id));
    const optionalSurveys = sortedCardInfos.filter(s => s.category === 'optional');
    const requiredSurveys = sortedCardInfos.filter(s => s.category !== 'optional');

    return (
        <div className='space-y-6'>
            <div>
                <H2>
                    {props.messages.requiredSurveys.title}:
                    <span className='text-primary ms-1'>
                        {requiredSurveys.length}
                    </span>
                </H2>

                <ul className='flex flex-col gap-y-4 mt-4'>
                    {!requiredSurveys || requiredSurveys.length === 0 && <div className='flex flex-col items-start gap-2 justify-start h-full bg-secondary rounded-md p-6 my-6'>
                        <p className='text-lg font-semibold'>
                            {props.messages.requiredSurveys.noSurveys.title}
                        </p>
                        <p className='text-base'>{props.messages.requiredSurveys.noSurveys.description}</p>
                    </div>}
                    {requiredSurveys.map((survey) => (
                        <SurveyCard key={survey.surveyKey + survey.category + survey.profiles.map(p => p.id).join('-')} {...survey} />
                    ))}
                </ul>
            </div>


            {optionalSurveys.length > 0 && (

                <Collapsible open={showOptionalSurveys}>
                    <CollapsibleTrigger asChild>
                        <Button
                            onClick={() => setShowOptionalSurveys(prev => !prev)}
                        >
                            {showOptionalSurveys ? props.messages.optionalSurveys.hideBtn : props.messages.optionalSurveys.showBtn}
                            <span className='ms-2'>
                                {showOptionalSurveys ? <ChevronUp className='size-4' /> : <ChevronDown className='size-4' />}
                            </span>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-6'>
                        <H2>
                            {props.messages.optionalSurveys.title}:
                            <span className='text-primary ms-1'>{optionalSurveys.length}</span>
                        </H2>
                        <div className='space-y-4 py-4'>
                            <div>
                                <EmbeddedMarkdownRenderer>
                                    {props.messages.optionalSurveys.description}
                                </EmbeddedMarkdownRenderer>
                            </div>

                            <ul className='flex flex-col gap-y-4'>
                                {optionalSurveys.map((survey, index) => (
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
