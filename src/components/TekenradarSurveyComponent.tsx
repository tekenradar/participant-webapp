import React from 'react';
import { useSelector } from 'react-redux';
import { GenericPageItemProps } from './utils';
import { RootState } from 'case-web-app-core/build/store/rootReducer';

interface TekenradarSurveyComponentProps extends GenericPageItemProps {
  studyKey: string;
}

const TekenradarSurveyComponent: React.FC<TekenradarSurveyComponentProps> = (props) => {
  const instanceID = useSelector((state: RootState) => state.config.instanceId);
  console.log(instanceID)
  console.log(props.studyKey)
  return (
    <p>TekenradarSurveyComponent</p>
  );
};

export default TekenradarSurveyComponent;
