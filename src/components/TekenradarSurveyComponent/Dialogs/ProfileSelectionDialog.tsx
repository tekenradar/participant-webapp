import { AlertBox, Avatar, defaultDialogPaddingXClass, Dialog } from 'case-web-ui';
import { AvatarConfig } from 'case-web-ui/build/types/avatars';
import { Profile } from 'case-web-ui/build/types/profile';
import clsx from 'clsx';
import React from 'react';

interface ProfileSelectionDialogProps {
  open: boolean;
  texts: {
    title: string;
    info: string;
  };
  profiles: Profile[];
  avatars: AvatarConfig[];
  onSelectProfile: (p: Profile) => void;
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
        <AlertBox
          type='info'
          content={props.texts.info}
        />
        <div>
          {props.profiles.map(
            p => <button
              className='btn btn-primary d-flex mt-2 align-items-center'
              key={p.id}
              onClick={() => {
                props.onSelectProfile(p)
              }}
            >
              <Avatar
                avatars={props.avatars}
                avatarId={p.avatarId}
                size="28px"
                className="me-2"
              />
              <span className='fs-btn d-inline-block'>{p.alias}</span>
            </button>
          )}
        </div>

      </div>
    </Dialog>
  );
};

export default ProfileSelectionDialog;
