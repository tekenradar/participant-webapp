import { AlertBox } from 'case-web-ui';
import React from 'react';

interface SurveyLoadingErrorProps {
  texts: {
    title: string;
    content: string;
    btn: string;
  };
  onRetry: () => void;
}

const SurveyLoadingError: React.FC<SurveyLoadingErrorProps> = (props) => {
  return (
    <div className='min-vh-60'>
      <h2>{props.texts.title}</h2>
      <AlertBox
        className='mb-2'
        content={props.texts.content}
        type='danger'
      />
      <button
        className='btn btn-secondary'
        onClick={props.onRetry}>{props.texts.btn}</button>
    </div>
  );
};

export default SurveyLoadingError;
