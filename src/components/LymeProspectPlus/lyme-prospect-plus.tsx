import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { coreReduxActions, PreventAccidentalNavigationPrompt, studyAPI } from 'case-web-app-core';
import { LoadingPlaceholder } from 'case-web-ui';
import MissingPidError from './missing-pid-error';


type PageMode = 'loading' | 'ready' | 'missingOrWrongPid';

interface LymeProspectPlusProps extends GenericPageItemProps {
}

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



    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(coreReduxActions.appActions.openSurveyMode(undefined));
    return () => {
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
