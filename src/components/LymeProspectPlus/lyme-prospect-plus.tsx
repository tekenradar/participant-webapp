import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GenericPageItemProps } from '../utils';
import { coreReduxActions, PreventAccidentalNavigationPrompt, studyAPI } from 'case-web-app-core';


interface LymeProspectPlusProps extends GenericPageItemProps {
}

const LymeProspectPlus: React.FC<LymeProspectPlusProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(coreReduxActions.appActions.openSurveyMode(undefined));
    return () => {
      dispatch(coreReduxActions.appActions.closeSurveyMode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <p>LymeProspectPlus</p>
  );
};

export default LymeProspectPlus;
