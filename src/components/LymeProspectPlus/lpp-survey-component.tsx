import { SurveyAndContextMsg } from 'case-web-ui/build/types/studyAPI';
import React, { useEffect, useState } from 'react';
import { Survey, SurveyContext, SurveyResponse } from 'survey-engine/data_types';
import { LppParticipantInfo } from './utils';
import { LoadingPlaceholder, SurveyView } from 'case-web-ui';
import { studyAPI } from 'case-web-app-core';
import { useTranslation } from 'react-i18next';
import { dateLocales } from '../../App';
import { Alert, Button } from 'react-bootstrap';

interface LppSurveyComponentProps {
  surveyKey: string;
  participantInfo?: LppParticipantInfo;
  onSubmitted?: () => void;
}

interface TempParticipant {
  temporaryParticipantId: string;
  timestamp: number;
}

const registerTempParticipant = async () => {
  try {
    const resp = await studyAPI.registerTempParticipantReq({
      instance: 'tekenradar',
      study: 'tekenradar',
    });
    const data = {
      temporaryParticipantId: resp.data.temporaryParticipantId,
      timestamp: parseInt(resp.data.timestamp)
    };
    return {
      error: undefined,
      tempParticipant: data
    };
  } catch (e) {
    console.error(e)
    return {
      error: 'could not register temp participant',
      tempParticipant: undefined
    };
  }
}

const fetchSurvey = async (surveyKey: string, tempParticipantId?: string) => {
  try {
    let survey: SurveyAndContextMsg;
    survey = (await studyAPI.getSurveyWithoutLoginReq({
      instance: 'tekenradar',
      study: 'tekenradar',
      survey: surveyKey,
      pid: tempParticipantId,
    })).data;

    if (!survey.context) {
      survey.context = {}
    }
    survey.context.isLoggedIn = false;
    return {
      error: undefined,
      surveyWithCtx: survey
    }

  } catch (e) {
    console.error(e)
    return {
      error: 'could not load survey',
      surveyWithCtx: undefined
    }
  }
}

const LppSurveyComponent: React.FC<LppSurveyComponentProps> = (props) => {
  const { t, i18n } = useTranslation(['surveyPage', 'meldenPage']);
  const [currentSurvey, setCurrentSurvey] = useState<{
    surveyDef: Survey;
    context?: SurveyContext;
    prefill?: SurveyResponse;
    openedAt: number;
  } | undefined>();

  const [currentSurveyResponse, setCurrentSurveyResponse] = useState<SurveyResponse | undefined>();
  const [tempParticipant, setTempParticipant] = useState<TempParticipant | undefined>();
  const [protectRoute, setProtectRoute] = useState(false);
  const [contentState, setContentState] = useState<'loading' | 'submitting' | 'getSurveyError' | 'submitError' | 'survey'>('loading');

  // console.log(props.participantInfo);

  useEffect(() => {
    if (currentSurvey !== undefined && props.surveyKey === currentSurvey.surveyDef.surveyDefinition.key) {
      return;
    }
    if (props.participantInfo === undefined) {
      return;
    }

    const initAndLoadSurvey = async () => {
      let newTempParticipant: TempParticipant;
      if (!props.participantInfo?.tempParticipantInfo) {
        const tempParticipantResp = await registerTempParticipant();

        if (tempParticipantResp.error !== undefined) {
          console.error(tempParticipantResp.error);
          return;
        }
        newTempParticipant = tempParticipantResp.tempParticipant;
      } else {
        newTempParticipant = {
          temporaryParticipantId: props.participantInfo.tempParticipantInfo.id,
          timestamp: props.participantInfo.tempParticipantInfo.enteredAt
        }
      }
      setTempParticipant(newTempParticipant);

      // load survey with temp participant id
      const resp = await fetchSurvey(props.surveyKey, newTempParticipant.temporaryParticipantId);
      if (resp.error !== undefined) {
        console.error(resp.error);
        return;
      }
      const now = Math.round(new Date().getTime() / 1000);
      setContentState('survey');
      setCurrentSurvey({
        surveyDef: resp.surveyWithCtx.survey,
        context: {
          ...resp.surveyWithCtx.context,
          participantFlags: {
            ...resp.surveyWithCtx.context?.participantFlags,
            name: props.participantInfo?.contactInfos.name,
            LPplus: "likely",
          }
        },
        prefill: resp.surveyWithCtx.prefill,
        openedAt: now,
      })
    }
    console.log('loading survey for key', props.surveyKey);
    initAndLoadSurvey();
  }, [props.surveyKey, props.participantInfo, currentSurvey])

  useEffect(() => {
    if (currentSurveyResponse !== undefined) {
      const submitResponsesWithoutLogin = async (response: SurveyResponse) => {
        setContentState('submitting');
        try {
          let currentTempParticipant = tempParticipant;

          const resp = await studyAPI.submitSurveyResponseForTempParticipantRequest({
            studyKey: 'tekenradar',
            response: response,
            instanceId: 'tekenradar',
            temporaryParticipantId: currentTempParticipant?.temporaryParticipantId,
            temporaryParticipantTimestamp: currentTempParticipant?.timestamp,
          })
          console.log(resp);
          // getNextAction(resp);
          props.onSubmitted?.();
        } catch (e) {
          console.error(e)
          setContentState('submitError');
        }
      }

      submitResponsesWithoutLogin(currentSurveyResponse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyResponse])

  if (contentState === 'loading' || contentState === 'submitting') {
    return <LoadingPlaceholder color='white' minHeight={'50vh'} />;
  }

  if (contentState === 'getSurveyError' || !currentSurvey) {
    return <div>
      <Alert variant="danger">
        <h2>
          Er is iets fout gegaan bij het laden van de vragenlijst.
        </h2>
        <Button variant="primary" onClick={() => {
          window.location.reload();
        }}>Opnieuw proberen</Button>
      </Alert>
    </div>;
  }

  if (contentState === 'submitError') {
    return <div>
      <Alert variant="danger">
        <h2>
          Er is iets fout gegaan bij het verzenden van de antwoorden.
        </h2>
        <Button variant="primary" onClick={() => {
          if (currentSurveyResponse !== undefined) {
            setCurrentSurveyResponse({
              ...currentSurveyResponse,
            })
          }
        }}>Opnieuw proberen</Button>
      </Alert>
    </div>
  }

  return (
    <SurveyView
      survey={currentSurvey.surveyDef}
      context={currentSurvey.context}
      prefills={currentSurvey.prefill?.responses}
      languageCode={i18n.language}
      onSubmit={(responses, version: string) => {
        console.log(responses)
        const now = Math.round(new Date().getTime() / 1000);

        setCurrentSurveyResponse({
          key: currentSurvey.surveyDef.surveyDefinition.key,
          responses: [...responses],
          versionId: version,
          submittedAt: now,
          openedAt: currentSurvey.openedAt,
          context: {
            engineVersion: process.env.REACT_APP_SURVEY_ENGINE_VERSION,
            language: i18n.language,
            lppID: props.participantInfo?.pid,
            ...props.participantInfo?.studyData,
          }
        })
      }}
      onResponsesChanged={() => {
        if (!protectRoute) {
          setProtectRoute(true)
        }
      }}
      nextBtnText={t('nextBtn')}
      backBtnText={t('backBtn')}
      submitBtnText={t('submitBtn')}
      invalidResponseText={t('notValidQuestion')}
      //customResponseComponents={customSurveyResponseComponents}
      dateLocales={dateLocales}
    />
  );
};

export default LppSurveyComponent;
