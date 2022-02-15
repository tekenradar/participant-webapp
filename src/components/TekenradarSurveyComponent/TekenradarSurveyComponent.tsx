import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { RootState } from 'case-web-app-core/build/store/rootReducer';
import { coreReduxActions, PreventAccidentalNavigationPrompt, studyAPI } from 'case-web-app-core';
import { AlertBox, ConfirmDialog, LoadingPlaceholder, SurveyView } from 'case-web-ui';
import { Survey, SurveyContext, SurveyResponse } from 'survey-engine/data_types';
import { useTranslation } from 'react-i18next';
import SubmitSuccessWithLoginOptionsDialog, { LoginOptions } from './Dialogs/SubmitSuccessWithLoginOptionsDialog';
import ErrorWithRetry from './PageComponents/ErrorWithRetry';
import ProfileSelectionDialog from './Dialogs/ProfileSelectionDialog';
import SuccessDialog from './Dialogs/SuccessDialog';
import { Profile } from 'case-web-ui/build/types/profile';
import { SurveyAndContextMsg } from 'case-web-app-core/build/api/types/studyAPI';
import LoginRequiredDialog from './Dialogs/LoginRequiredDialog';
import { customSurveyResponseComponents, dateLocales } from '../../App';


interface TekenradarSurveyComponentProps extends GenericPageItemProps {
  studyKey: string;
  defaultSurveyKey: string;
  urls: {
    finishedFlowWithoutLogin: string;
    finishedFlowWithLogin: string;
  }
}

interface TempParticipant {
  temporaryParticipantId: string;
  timestamp: number;
}

type ContentState = 'loading' | 'submitting' | 'getSurveyError' | 'submitError' | 'survey';

type DialogNames = 'SubmitSuccessWithLoginOptionsDialog' | 'SubmitSuccessDialog' | 'ProfileSelectionDialog' | 'LoginRequiredDialog' | 'TempParticipantConversionSuccessDialog' | 'NavigationWarning';

const TekenradarSurveyComponent: React.FC<TekenradarSurveyComponentProps> = (props) => {
  const instanceID = useSelector((state: RootState) => state.config.instanceId);
  const persistState = useSelector((state: RootState) => state.app.persistState);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const authState = useSelector((state: RootState) => state.app.auth);
  const isLoggedIn = authState && authState.accessToken && authState.accessToken.length > 0 ? true : false;
  const avatars = useSelector((state: RootState) => state.config.avatars);

  const { t, i18n } = useTranslation(['surveyPage', 'meldenPage']);

  const dispatch = useDispatch();

  const [currentSurvey, setCurrentSurvey] = useState<{
    surveyDef: Survey;
    context?: SurveyContext;
    openedAt: number;
  } | undefined>();
  const [currentSurveyKey, setCurrentSurveyKey] = useState(props.defaultSurveyKey);
  const [currentSurveyResponse, setCurrentSurveyResponse] = useState<SurveyResponse | undefined>(undefined);
  const [tempParticipant, setTempParticipant] = useState<TempParticipant | undefined>();

  const [contentState, setContentState] = useState<ContentState>('loading');
  const [dialogOpen, setDialogOpen] = useState<DialogNames | undefined>();

  const [selectedProfileID, setSelectedProfileID] = useState<string | undefined>();

  const [navigateTo, setNavigateTo] = useState('');
  const [protectRoute, setProtectRoute] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(coreReduxActions.appActions.openSurveyMode(undefined));
    return () => {
      dispatch(coreReduxActions.appActions.closeSurveyMode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchSurvey(currentSurveyKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyKey])

  useEffect(() => {
    if (currentSurveyResponse !== undefined) {
      startSubmitFlow(currentSurveyResponse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurveyResponse])

  useEffect(() => {
    if (isLoggedIn) {
      if (shouldSelectProfile()) {
        setDialogOpen('ProfileSelectionDialog');
        return;
      }
      if (dialogOpen === 'SubmitSuccessWithLoginOptionsDialog') {
        convertTempParticipant();
      } else if (dialogOpen === 'LoginRequiredDialog') {
        convertTempParticipant();
        setDialogOpen(undefined);
        fetchSurvey(currentSurveyKey);
        // alert('TODO: handle login after login required')
      } else {
        if (currentUser.profiles.length === 1) {
          setSelectedProfileID(currentUser.profiles[0].id)
        } else {
          console.error("unexpected user object: ", currentUser);
        }
      }
    } else {
      setSelectedProfileID(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    const profile = currentUser.profiles.find(p => p.id === selectedProfileID);
    dispatch(coreReduxActions.appActions.openSurveyMode(profile));
    if (selectedProfileID !== undefined) {
      if (contentState === 'loading') {
        fetchSurvey(currentSurveyKey);
      } else if (contentState === 'survey') {
        // case: login required:
        convertTempParticipant(true);
        fetchSurvey(currentSurveyKey);
      } else if (contentState === 'submitting') {
        convertTempParticipant();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfileID])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [contentState])

  useEffect(() => {
    if (currentSurvey !== undefined) {
      setContentState('survey');
      if (currentSurvey.surveyDef.requireLoginBeforeSubmission && !isLoggedIn) {
        setDialogOpen('LoginRequiredDialog');
      } else {
        setDialogOpen(undefined);
      }
    } else {
      setContentState('loading');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSurvey])

  useEffect(() => {
    if (!protectRoute && navigateTo.length > 0) {
      props.onNavigate(navigateTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protectRoute]);

  const shouldSelectProfile = (): boolean => {
    if (!currentUser.profiles || currentUser.profiles.length < 1) {
      console.error("no profiles found", currentUser);
      return false;
    }

    if (currentUser.profiles.length === 1) {
      setSelectedProfileID(currentUser.profiles[0].id)
      return false;
    }

    if (selectedProfileID === undefined) {
      return true;
    }
    return false;
  }

  const fetchSurvey = async (surveyKey: string) => {
    setCurrentSurvey(undefined);
    setContentState('loading');
    try {
      let survey: SurveyAndContextMsg;
      if (isLoggedIn) {
        if (!selectedProfileID) {
          console.log('should select profile first');
          setDialogOpen('ProfileSelectionDialog');
          return;
        }
        survey = (await studyAPI.getAssignedSurveyRequest({
          studyKey: props.studyKey,
          surveyKey: surveyKey,
          profileId: selectedProfileID,
        })).data;
      } else {
        survey = (await studyAPI.getSurveyWithoutLoginReq({
          instance: instanceID,
          study: props.studyKey,
          survey: surveyKey,
          pid: tempParticipant?.temporaryParticipantId,
        })).data;
      };

      console.log(survey)
      const now = Math.round(new Date().getTime() / 1000);

      if (!survey.context) {
        survey.context = {}
      }
      survey.context.isLoggedIn = isLoggedIn;

      setCurrentSurvey({
        surveyDef: survey.survey,
        context: survey.context,
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

  const convertTempParticipant = async (ignoreNextStep?: boolean) => {
    let profileId = selectedProfileID;
    if (!profileId) {
      profileId = currentUser.profiles[0].id;
      setSelectedProfileID(profileId);
    }
    if (!tempParticipant) {
      console.error("no temp participant found.")
      return;
    }
    try {
      await studyAPI.assumeTempParticipantReq({
        studyKey: props.studyKey,
        profileId: profileId,
        temporaryParticipantId: tempParticipant.temporaryParticipantId,
        timestamp: tempParticipant.timestamp,
      });
      if (!ignoreNextStep) {
        setDialogOpen('TempParticipantConversionSuccessDialog')
      }
    } catch (e) {
      console.error(e)
      if (!ignoreNextStep) {
        props.onNavigate(props.urls.finishedFlowWithoutLogin);
      }
    }
  }

  const startSubmitFlow = (currentSurveyResponse: SurveyResponse) => {
    setProtectRoute(false);
    if (isLoggedIn) {
      submitResponsesWithLogin(currentSurveyResponse);
    } else {
      if (currentSurvey?.surveyDef.requireLoginBeforeSubmission === true) {
        setDialogOpen('LoginRequiredDialog')
      } else {
        // nothing special to handle here:
        submitResponsesWithoutLogin(currentSurveyResponse)
      }
    }
  }

  const submitResponsesWithoutLogin = async (response: SurveyResponse) => {
    setContentState('submitting');
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
      getNextAction(resp);
    } catch (e) {
      console.error(e)
      setContentState('submitError');
    }
  }

  const submitResponsesWithLogin = async (response: SurveyResponse) => {
    setContentState('submitting');
    try {
      const resp = await studyAPI.submitSurveyResponseRequest({
        studyKey: props.studyKey,
        profileId: selectedProfileID,
        response: response
      });
      // setProtectRoute(false);
      getNextAction(resp);
    } catch (e) {
      console.error(e)
      setContentState('submitError');
    }
  }

  const getNextAction = (resp: any) => {
    console.log(resp)

    let shouldOpenSurvey = false;

    if (!resp.data.surveys || resp.data.surveys.length < 1) {
      console.error('no assigned surveys found')
    } else {
      for (const survey of resp.data.surveys) {
        if (survey.category === 'immediate') {
          setCurrentSurveyKey(survey.surveyKey);
          shouldOpenSurvey = true;
          break;
        }
      }
    }

    if (!shouldOpenSurvey) {
      if (isLoggedIn) {
        setDialogOpen('SubmitSuccessDialog');
      } else {
        setDialogOpen('SubmitSuccessWithLoginOptionsDialog');
      }
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
    case 'submitting':
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
            startSubmitFlow(currentSurveyResponse)
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
        context={currentSurvey.context}
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
        onResponsesChanged={() => {
          if (!protectRoute) {
            setProtectRoute(true)
          }
        }}
        nextBtnText={t('nextBtn')}
        backBtnText={t('backBtn')}
        submitBtnText={t('submitBtn')}
        invalidResponseText={t('notValidQuestion')}
        customResponseComponents={customSurveyResponseComponents}
        dateLocales={dateLocales}
      />
      break;
  }

  const dialogs = <React.Fragment>
    <LoginRequiredDialog
      open={dialogOpen === 'LoginRequiredDialog'}
      texts={{
        title: t('meldenPage:loginRequiredDialog.title'),
        info: t('meldenPage:loginRequiredDialog.info'), // '',
        loginBtn: t('meldenPage:loginRequiredDialog.loginBtn'), // 'Login',
        registerBtn: t('meldenPage:loginRequiredDialog.registerBtn'), // 'Register',
      }}
      onSelect={(option: LoginOptions) => {
        switch (option) {
          case 'login':
            dispatch(coreReduxActions.dialogActions.openLoginDialog({
              type: 'login',
              payload: {
                email: '',
                password: '',
                rememberMe: persistState,
                preventNavigateOnSuccess: true
              }
            }));
            break;
          case 'register':
            dispatch(coreReduxActions.dialogActions.openDialogWithoutPayload('signup'))
            break;
        }
      }}
    />

    <SubmitSuccessWithLoginOptionsDialog
      open={dialogOpen === 'SubmitSuccessWithLoginOptionsDialog'}
      texts={{
        title: t('meldenPage:submitSuccessWithLoginOptionsDialog.title'),
        submitConfirm: t('meldenPage:submitSuccessWithLoginOptionsDialog.successMsg'),
        info: t('meldenPage:submitSuccessWithLoginOptionsDialog.info'), // '',
        loginBtn: t('meldenPage:submitSuccessWithLoginOptionsDialog.loginBtn'), // 'Login',
        registerBtn: t('meldenPage:submitSuccessWithLoginOptionsDialog.registerBtn'), // 'Register',
        withoutAccountBtn: t('meldenPage:submitSuccessWithLoginOptionsDialog.withoutAccountBtn'),// "Continue without account"
      }}
      onSelect={(option: LoginOptions) => {
        switch (option) {
          case 'login':
            dispatch(coreReduxActions.dialogActions.openLoginDialog({
              type: 'login',
              payload: {
                email: '',
                password: '',
                rememberMe: persistState,
                preventNavigateOnSuccess: true
              }
            }));
            break;
          case 'register':
            dispatch(coreReduxActions.dialogActions.openDialogWithoutPayload('signup'))
            break;
          case 'withoutAccount':
            props.onNavigate(props.urls.finishedFlowWithoutLogin)
            break;
        }
      }}
    />
    <ProfileSelectionDialog
      open={dialogOpen === 'ProfileSelectionDialog'}
      texts={{
        title: t('meldenPage:profileSelectionDialog.title'),
        info: t('meldenPage:profileSelectionDialog.info'),
      }}
      avatars={avatars}
      profiles={currentUser.profiles}
      onSelectProfile={(p: Profile) => {
        setSelectedProfileID(p.id);
      }}
    />
    <SuccessDialog
      open={dialogOpen === 'SubmitSuccessDialog'}
      texts={{
        title: t('meldenPage:submitSuccessDialog.title'),
        info: t('meldenPage:submitSuccessDialog.content'),
        okBtn: t('meldenPage:submitSuccessDialog.btn')
      }}
      onClose={() => {
        setDialogOpen(undefined);
        props.onNavigate(props.urls.finishedFlowWithLogin)
      }}
    />

    <SuccessDialog
      open={dialogOpen === 'TempParticipantConversionSuccessDialog'}
      texts={{
        title: t('meldenPage:tempParticipantConversionSuccessDialog.title'),
        info: t('meldenPage:tempParticipantConversionSuccessDialog.content'),
        okBtn: t('meldenPage:tempParticipantConversionSuccessDialog.btn')
      }}
      onClose={() => {
        setDialogOpen(undefined);
        props.onNavigate(props.urls.finishedFlowWithLogin)
      }}
    />

    <ConfirmDialog
      color="warning"
      open={dialogOpen === 'NavigationWarning'}
      title={t('exitSurveyWarningDialog.title')}
      confirmText={t('exitSurveyWarningDialog.confirmBtn')}
      cancelText={t('exitSurveyWarningDialog.cancelBtn')}
      onConfirm={() => {
        setProtectRoute(false);
        setDialogOpen(undefined);
      }}
      onClose={() => { setDialogOpen(undefined); }}
    >
      <AlertBox
        type="warning"
        content={t('exitSurveyWarningDialog.warning')}
      />
    </ConfirmDialog>
  </React.Fragment>

  const protectRoutePrompt = <PreventAccidentalNavigationPrompt
    protectionActive={protectRoute}
    onTriggered={(path: string) => {
      setDialogOpen('NavigationWarning');
      setNavigateTo(path);
    }}
  />

  return (
    <React.Fragment>
      {protectRoutePrompt}
      {pageContent}
      {dialogs}
    </React.Fragment>
  )
};

export default TekenradarSurveyComponent;
