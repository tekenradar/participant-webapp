import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GenericPageItemProps } from './utils';
import { RootState } from 'case-web-app-core/build/store/rootReducer';
import { studyAPI } from 'case-web-app-core';
import { LoadingPlaceholder, SurveyView } from 'case-web-ui';
import { Survey, SurveyResponse } from 'survey-engine/data_types';
import { useTranslation } from 'react-i18next';


interface TekenradarSurveyComponentProps extends GenericPageItemProps {
  studyKey: string;
  defaultSurveyKey: string;
}

interface TempParticipant {
  temporaryParticipantId: string;
  timestamp: number;
}

const TekenradarSurveyComponent: React.FC<TekenradarSurveyComponentProps> = (props) => {
  const instanceID = useSelector((state: RootState) => state.config.instanceId);
  const { t, i18n } = useTranslation(['surveyPage']);

  const [currentSurvey, setCurrentSurvey] = useState<{
    surveyDef: Survey;
    openedAt: number;
  } | undefined>();
  const [tempParticipant, setTempParticipant] = useState<TempParticipant | undefined>();

  useEffect(() => {
    fetchSurvey(props.defaultSurveyKey)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSurvey])

  const fetchSurvey = async (surveyKey: string) => {
    setCurrentSurvey(undefined);
    try {
      const survey = await studyAPI.getSurveyWithoutLoginReq({
        instance: instanceID,
        study: props.studyKey,
        survey: surveyKey,
      })
      console.log(survey.data.survey)
      const now = Math.round(new Date().getTime() / 1000);
      setCurrentSurvey({
        surveyDef: survey.data.survey,
        openedAt: now,
      })
    } catch (e) {
      console.error(e)
    }
  }

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


  const submitResponses = async (response: SurveyResponse) => {
    try {
      let currentTempParticipant = tempParticipant;
      if (!currentTempParticipant) {
        currentTempParticipant = await registerTempParticipant();
      }


      const resp = await studyAPI.submitSurveyResponseForTempParticipantRequest({
        studyKey: props.studyKey,
        response: response,
        instanceId: instanceID,
        temporaryParticipantId: currentTempParticipant?.temporaryParticipantId,
        temporaryParticipantTimestamp: currentTempParticipant?.timestamp,
      })
      console.log(resp)

      if (!resp.data.surveys || resp.data.surveys.length < 1) {
        console.error('no assigned surveys found')
        return
      }

      for (const survey of resp.data.surveys) {
        if (survey.category === 'immediate') {
          fetchSurvey(survey.surveyKey);
          break;
        }
      }


    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div >
      {currentSurvey === undefined ? <LoadingPlaceholder
        color='white'
        minHeight='60vh'
      /> : null}
      {currentSurvey ? <SurveyView
        survey={currentSurvey.surveyDef}
        languageCode={''}
        onSubmit={(responses, version: string) => {
          console.log(responses)
          const now = Math.round(new Date().getTime() / 1000);

          submitResponses({
            key: currentSurvey.surveyDef.current.surveyDefinition.key,
            responses: [...responses],
            versionId: version,
            submittedAt: now,
            openedAt: currentSurvey.openedAt,
            context: {
              engineVersion: process.env.REACT_APP_SURVEY_ENGINE_VERSION,
              language: i18n.language,
            }
          })
        }}
        nextBtnText={t('nextBtn')}
        backBtnText={t('backBtn')}
        submitBtnText={t('submitBtn')}
        invalidResponseText={t('notValidQuestion')}
      /> : null}
    </div>
  );
};

export default TekenradarSurveyComponent;
