import { AlertBox, defaultDialogPaddingXClass, Dialog, DialogBtn } from 'case-web-ui';
import clsx from 'clsx';
import React from 'react';
import { LoginOptions } from './SubmitSuccessWithLoginOptionsDialog';

interface LoginRequiredDialogProps {
  open: boolean;
  texts: {
    title: string;
    info: string;
    loginBtn: string;
    registerBtn: string;
  };
  onSelect: (option: LoginOptions) => void;
}

const LoginRequiredDialog: React.FC<LoginRequiredDialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      title={props.texts.title}
      ariaLabelledBy="dialogTitle"
      color="primary"
    >
      <div className={clsx(
        defaultDialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <AlertBox
          className="mb-2"
          type={"info"}
          useIcon={false}
          content={props.texts.info}
        />
        <div className='d-flex align-items-center'>
          <DialogBtn
            className='me-2 mb-2'
            type="button"
            label={props.texts.loginBtn}
            onClick={() => props.onSelect('login')}
          />
          <span className='me-2 mb-2'>of</span>
          <DialogBtn
            type="button"
            className='mb-2'
            outlined={false}
            label={props.texts.registerBtn}
            onClick={() => props.onSelect('register')}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default LoginRequiredDialog;
