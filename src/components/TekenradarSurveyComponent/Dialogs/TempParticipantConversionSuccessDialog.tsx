import { AlertBox, defaultDialogPaddingXClass, Dialog, DialogBtn } from 'case-web-ui';
import clsx from 'clsx';
import React from 'react';

interface TempParticipantConversionSuccessDialogProps {
  open: boolean;
  texts: {
    title: string;
    info: string;
    okBtn: string;
  };
  onClose: () => void;
}

const TempParticipantConversionSuccessDialog: React.FC<TempParticipantConversionSuccessDialogProps> = (props) => {
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
          content={props.texts.info}
        />
        <DialogBtn
          label={props.texts.okBtn}
          onClick={() => props.onClose()}
        />
      </div>
    </Dialog>
  );
};

export default TempParticipantConversionSuccessDialog;
