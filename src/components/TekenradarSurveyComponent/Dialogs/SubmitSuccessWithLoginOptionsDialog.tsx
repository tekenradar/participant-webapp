import { AlertBox, defaultDialogPaddingXClass, Dialog, DialogBtn } from 'case-web-ui';
import clsx from 'clsx';
import React from 'react';

interface SubmitSuccessWithLoginOptionsDialogProps {
  open: boolean;
  texts: {
    title: string;
    submitConfirm: string;
    info: string;
    loginBtn: string;
    registerBtn: string;
    withoutAccountBtn: string;
  };
  onSelect: (option: LoginOptions) => void;
}

export type LoginOptions = 'login' | 'register' | 'withoutAccount';

const SubmitSuccessWithLoginOptionsDialog: React.FC<SubmitSuccessWithLoginOptionsDialogProps> = (props) => {
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
          type={"success"}
          useIcon={true}
          content={props.texts.submitConfirm}
        />
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
        <hr className='mb-2 mt-0'></hr>
        <DialogBtn
          type="button"
          className=''
          outlined={true}
          label={props.texts.withoutAccountBtn}
          onClick={() => props.onSelect('withoutAccount')}
        />
      </div>
    </Dialog>
  );
};

export default SubmitSuccessWithLoginOptionsDialog;
