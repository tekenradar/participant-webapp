import { SurveyAndContextMsg } from 'case-web-ui/build/types/studyAPI';
import React, { useEffect, useState } from 'react';
import { Survey, SurveyContext, SurveyResponse } from 'survey-engine/data_types';
import { LppParticipantInfo } from './utils';

interface LppSurveyComponentProps {
  surveyKey: string;
  participantInfo?: LppParticipantInfo;
}

interface TempParticipant {
  temporaryParticipantId: string;
  timestamp: number;
}

const LppSurveyComponent: React.FC<LppSurveyComponentProps> = (props) => {
  const [currentSurvey, setCurrentSurvey] = useState<{
    surveyDef: Survey;
    context?: SurveyContext;
    prefill?: SurveyResponse;
    openedAt: number;
  } | undefined>();

  const [currentSurveyResponse, setCurrentSurveyResponse] = useState<SurveyResponse | undefined>(undefined);
  const [tempParticipant, setTempParticipant] = useState<TempParticipant | undefined>();

  console.log(props.participantInfo);

  /*
  useEffect(() => {
    if (!currentSurveyKey) {
      return;
    }
    const fetchSurvey = async (surveyKey: string) => {
      setCurrentSurvey(undefined);
      setContentState('loading');
      try {
        let survey: SurveyAndContextMsg;
        survey = (await studyAPI.getSurveyWithoutLoginReq({
          instance: instanceID,
          study: props.studyKey,
          survey: surveyKey,
          pid: tempParticipant?.temporaryParticipantId,
        })).data;


        console.log(survey)
        const now = Math.round(new Date().getTime() / 1000);

        if (!survey.context) {
          survey.context = {}
        }
        survey.context.isLoggedIn = false;

        setCurrentSurvey({
          surveyDef: survey.survey,
          context: survey.context,
          prefill: survey.prefill,
          openedAt: now,
        })
      } catch (e) {
        console.error(e)
        setContentState('getSurveyError');
      }
    }
    fetchSurvey(currentSurveyKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyKey])

  const registerTempParticipant = async () => {
    try {
      const resp = await studyAPI.registerTempParticipantReq({
        instance: instanceID,
        study: props.studyKey,
      });
      const data = {
        temporaryParticipantId: resp.data.temporaryParticipantId,
        timestamp: parseInt(resp.data.timestamp)
      };
      setTempParticipant(data);
      return data;
    } catch (e) {
      console.error(e)
    }
  }
  */


  return (
    <p>LppSurveyComponent</p>
  );
};

export default LppSurveyComponent;
