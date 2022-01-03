import { defaultDialogPaddingXClass, Dialog } from 'case-web-ui';
import clsx from 'clsx';
import React from 'react';

interface ProfileSelectionDialogProps {
  open: boolean;
  texts: {
    title: string;
  }
}

const ProfileSelectionDialog: React.FC<ProfileSelectionDialogProps> = (props) => {
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
        TODO: select profile to continue
      </div>
    </Dialog>
  );
};

export default ProfileSelectionDialog;
