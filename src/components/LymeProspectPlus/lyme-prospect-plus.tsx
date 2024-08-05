import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { coreReduxActions, PreventAccidentalNavigationPrompt, studyAPI } from 'case-web-app-core';
import { LoadingPlaceholder, getExternalOrLocalContentURL } from 'case-web-ui';
import MissingPidError from './missing-pid-error';


type PageMode = 'loading' | 'ready' | 'missingOrWrongPid';

interface LymeProspectPlusProps extends GenericPageItemProps {
}

const lppAPIRootURL = process.env.REACT_APP_LPP_ROOT_URL ? process.env.REACT_APP_LPP_ROOT_URL : '';
const apiKey = process.env.REACT_APP_CONTENT_SERVICE_API_KEY ? process.env.REACT_APP_CONTENT_SERVICE_API_KEY : '';

const LymeProspectPlus: React.FC<LymeProspectPlusProps> = (props) => {
  const dispatch = useDispatch();

  const [pageMode, setPageMode] = useState<PageMode>('loading');


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pid = searchParams.get('pid');

    if (!pid) {
      setPageMode('missingOrWrongPid');
      return;
    }

    const abortController = new AbortController();

    fetch(getExternalOrLocalContentURL(`${lppAPIRootURL}/lpp/${pid}`), {
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
        console.log(json);
        setPageMode('ready')
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

    case 'ready':
      return <p>LymeProspectPlus</p>;
    case 'missingOrWrongPid':
      return <MissingPidError />;
    case 'loading':
    default:
      return <LoadingPlaceholder color='white' minHeight={'50vh'} />;
  }
};

export default LymeProspectPlus;
