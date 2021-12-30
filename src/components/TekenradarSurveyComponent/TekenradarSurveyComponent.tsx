import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { RootState } from 'case-web-app-core/build/store/rootReducer';
import { studyAPI } from 'case-web-app-core';
import { LoadingPlaceholder, SurveyView } from 'case-web-ui';
import { Survey, SurveyResponse } from 'survey-engine/data_types';
import { useTranslation } from 'react-i18next';
import TickMapResponse from '../survey/TickMapResponse';
import DummyScg from '../survey/DummyScg';
import SubmitOptionsDialog, { SubmitOptions } from './SubmitOptionsDialog';
import ErrorWithRetry from './PageComponents/ErrorWithRetry';


interface TekenradarSurveyComponentProps extends GenericPageItemProps {
  studyKey: string;
  defaultSurveyKey: string;
}

interface TempParticipant {
  temporaryParticipantId: string;
  timestamp: number;
}

type ContentState = 'loading' | 'getSurveyError' | 'submitError' | 'survey';


const TekenradarSurveyComponent: React.FC<TekenradarSurveyComponentProps> = (props) => {
  const instanceID = useSelector((state: RootState) => state.config.instanceId);
  const { t, i18n } = useTranslation(['surveyPage', 'meldenPage']);

  const [currentSurvey, setCurrentSurvey] = useState<{
    surveyDef: Survey;
    openedAt: number;
  } | undefined>();
  const [currentSurveyKey, setCurrentSurveyKey] = useState(props.defaultSurveyKey);
  const [currentSurveyResponse, setCurrentSurveyResponse] = useState<SurveyResponse | undefined>(undefined);
  const [tempParticipant, setTempParticipant] = useState<TempParticipant | undefined>();

  const [contentState, setContentState] = useState<ContentState>('loading');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchSurvey(currentSurveyKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyKey])

  useEffect(() => {
    if (currentSurveyResponse !== undefined) {
      submitResponses(currentSurveyResponse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyResponse])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentSurvey !== undefined) {
      setContentState('survey');
    } else {
      setContentState('loading');
    }
  }, [currentSurvey])

  const fetchSurvey = async (surveyKey: string) => {
    setCurrentSurvey(undefined);
    setContentState('loading');
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
      setContentState('getSurveyError');
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
    setContentState('loading');
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
          setCurrentSurveyKey(survey.surveyKey);
          break;
        }
      }
    } catch (e) {
      console.error(e)
      setContentState('submitError');
    }
  }


  let pageContent = <p>...</p>;

  switch (contentState) {
    case 'loading':
      pageContent = <LoadingPlaceholder
        color='white'
        minHeight='60vh'
      />;
      break;
    case 'getSurveyError':
      pageContent = <ErrorWithRetry
        texts={{
          content: t('meldenPage:surveyLoadingError.content'),
          btn: t('meldenPage:surveyLoadingError.btn')
        }}
        onRetry={() => fetchSurvey(currentSurveyKey)}
      />
      break;
    case 'submitError':
      pageContent = <ErrorWithRetry
        texts={{
          content: t('meldenPage:surveySubmissionError.content'),
          btn: t('meldenPage:surveySubmissionError.btn')
        }}
        onRetry={() => {
          if (currentSurveyResponse !== undefined) {
            submitResponses(currentSurveyResponse)
          }
        }}
      />
      break;
    case 'survey':
      if (!currentSurvey) {
        break;
      }
      pageContent = <SurveyView
        survey={currentSurvey.surveyDef}
        languageCode={i18n.language}
        onSubmit={(responses, version: string) => {
          console.log(responses)
          const now = Math.round(new Date().getTime() / 1000);

          setCurrentSurveyResponse({
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
        customResponseComponents={[
          {
            name: ':map',
            component: TickMapResponse,
          },
          {
            name: 'singleChoiceGroup:customScg',
            component: DummyScg,
          }
        ]}
      />
      break;
  }


  return (
    <React.Fragment>
      {pageContent}
    </React.Fragment>
  )

  /*
    return (
      <div >
        {currentSurvey === undefined && !error ?  : null}
        {error ?  : null}
        {currentSurvey ? : null}

        <SubmitOptionsDialog
          open={false}
          texts={{
            title: 'Submit options',
            submitConfirm: 'Responses successfully submitted.',
            info: 'To access features like "mytekenradar", login in so that the system can connect your reports to your report history. \n\n If you don\'t have an account yet, you can start registration here as well.',
            loginBtn: 'Login',
            registerBtn: 'Register',
            withoutAccountBtn: "Continue without account"
          }}
          onSelect={(option: SubmitOptions) => {
            switch (option) {
              case 'login':
                break;
              case 'register':
                break;
              case 'withoutAccount':
                break;
            }
            console.log(option)
          }}

        />
      </div>

    );*/
};

export default TekenradarSurveyComponent;
