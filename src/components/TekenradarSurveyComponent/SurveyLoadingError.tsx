import { AlertBox } from 'case-web-ui';
import React from 'react';

interface SurveyLoadingErrorProps {
  onRetry: () => void;
}

const SurveyLoadingError: React.FC<SurveyLoadingErrorProps> = (props) => {
  return (
    <div className='min-vh-60'>
      <h2>Error</h2>
      <AlertBox
        className='mb-2'
        content={'TODO: add error message: something went wrong while loading the survey. Try again later or if the issue persist reach out to the admin.'}
        type='danger'
      />
      <button
        className='btn btn-secondary'
        onClick={props.onRetry}>Retry</button>
    </div>
  );
};

export default SurveyLoadingError;
