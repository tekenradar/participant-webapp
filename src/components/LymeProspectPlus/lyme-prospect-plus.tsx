import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { coreReduxActions } from 'case-web-app-core';
import { LoadingPlaceholder, getExternalOrLocalContentURL } from 'case-web-ui';
import MissingPidError from './missing-pid-error';
import LppSurveyComponent from './lpp-survey-component';
import { LppParticipantInfo, firstSubmissionTooOld, getCurrentSurveyKey, lppSurveyKeys } from './utils';
import { Alert } from 'react-bootstrap';


type PageMode = 'loading' | 'survey' | 'missingOrWrongPid' | 'finished' | 'expired';

interface LymeProspectPlusProps extends GenericPageItemProps {
}


const lppAPIRootURL = process.env.REACT_APP_LPP_ROOT_URL ? process.env.REACT_APP_LPP_ROOT_URL : '';
const apiKey = process.env.REACT_APP_CONTENT_SERVICE_API_KEY ? process.env.REACT_APP_CONTENT_SERVICE_API_KEY : '';


const LymeProspectPlus: React.FC<LymeProspectPlusProps> = (props) => {
  const dispatch = useDispatch();

  const [pageMode, setPageMode] = useState<PageMode>('loading');
  const [studyState, setStudyState] = useState<{
    currentSurveyKey: string;
    participantInfo?: LppParticipantInfo;
  } | undefined>();


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pid = searchParams.get('pid');

    if (!pid) {
      setPageMode('missingOrWrongPid');
      return;
    }

    const abortController = new AbortController();

    fetch(getExternalOrLocalContentURL(`${lppAPIRootURL}/tekenradar/lpp/${pid}`), {
      headers: {
        'Api-Key': apiKey,
      },
      signal: abortController.signal
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Error fetching LPP data');
        }
        return res.json()
      })
      .then(json => {
        // console.log(json);
        const participantInfo = json;
        // console.log(participantInfo);

        if (firstSubmissionTooOld(participantInfo)) {
          setPageMode('expired');
          return;
        }

        const currentSurveyKey = getCurrentSurveyKey(participantInfo);

        setStudyState({
          currentSurveyKey: currentSurveyKey ?? lppSurveyKeys.LPplus_part1,
          participantInfo: participantInfo
        })
        if (!currentSurveyKey) {
          setPageMode('finished');
          return;
        }
        setPageMode('survey')
      })
      .catch(error => {
        console.error(error)
        setPageMode('missingOrWrongPid')
      });


    dispatch(coreReduxActions.appActions.openSurveyMode(undefined));
    return () => {
      abortController.abort();
      dispatch(coreReduxActions.appActions.closeSurveyMode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  switch (pageMode) {
    case 'survey':
      if (!studyState) {
        return <LoadingPlaceholder color='white' minHeight={'50vh'} />;
      }
      return <LppSurveyComponent
        surveyKey={studyState.currentSurveyKey}
        participantInfo={studyState.participantInfo}
        onSubmitted={() => {
          window.location.reload();
        }}
      />;
    case 'missingOrWrongPid':
      return <MissingPidError />;
    case 'finished':
      return <div>
        <Alert variant="success">
          <h2>
            U hebt alle antwoorden ingediend. Hartelijk dank voor uw deelname.
          </h2>
          <p>
            Als u nog vragen heeft, neem dan contact op met het tekenradar-team via <a href="mailto:info@tekenradar.nl">info@tekenradar.nl</a>.
          </p>
        </Alert>
      </div>
    case 'expired':
      return <div>
        <Alert variant="danger">
          <h2>
            U hebt de uitnodiging verlopen.
          </h2>
          <p>
            Als u nog vragen heeft, neem dan contact op met het tekenradar-team via <a href="mailto:info@tekenradar.nl">info@tekenradar.nl</a>.
          </p>
        </Alert>
      </div>
    case 'loading':
    default:
      return <LoadingPlaceholder color='white' minHeight={'50vh'} />;
  }
};

export default LymeProspectPlus;
