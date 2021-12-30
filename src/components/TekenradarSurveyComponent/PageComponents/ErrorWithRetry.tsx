import { AlertBox } from 'case-web-ui';
import React from 'react';

interface ErrorWithRetryProps {
  texts: {
    content: string;
    btn: string;
  };
  onRetry: () => void;
}

const ErrorWithRetry: React.FC<ErrorWithRetryProps> = (props) => {
  return (
    <div className='min-vh-60'>
      <AlertBox
        className='mb-2'
        content={props.texts.content}
        type='danger'
        useIcon={true}
      />
      <button
        className='btn btn-secondary'
        onClick={props.onRetry}>{props.texts.btn}</button>
    </div>
  );
};

export default ErrorWithRetry;
