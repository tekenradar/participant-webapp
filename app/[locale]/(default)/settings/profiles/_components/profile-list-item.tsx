'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getAvatarURL } from '@/lib/avatars';
import { Profile } from '@/lib/server/data-fetching/user';
import { Pencil, UserRound } from 'lucide-react';
import React from 'react';
import DeleteProfileDialog from './delete-profile-dialog';
import { SurveyWithContext } from '@/lib/server/data-fetching/survey';

interface ProfileListItemProps {
    isPending?: boolean;
    profile: Profile;
    exitSurveyWithContext?: SurveyWithContext;
    locale?: string;
    messages: {
        mainProfileLabel: string;
        editProfileBtnLabel: string;
        deleteProfileBtnLabel: string;
        deleteProfileDialogTitle: string;
        deleteProfileDialogDescription: string;
        deleteProfileDialogConfirmBtn: string;
        deleteProfileDialogCancelBtn: string;
        errorDeletingProfile: string;
        successDeletingProfile: string;
    }
    onEdit: () => void;
}

const ProfileListItem: React.FC<ProfileListItemProps> = (props) => {
    return <li className='flex items-center gap-4 py-2'>
        <div>
            <Avatar className='size-10 rounded-sm border border-border'>
                <AvatarImage
                    className='bg-secondary p-0.5'
                    src={getAvatarURL(props.profile.avatarID)}
                />
                <AvatarFallback className="bg-secondary rounded-sm">
                    <UserRound className='text-secondary-foreground size-8' />
                </AvatarFallback>
            </Avatar>
        </div>
        <div className='flex flex-wrap gap-2 items-center grow'>
            <span className='text-lg font-medium truncate max-w-[250px] inline-block'>
                {props.profile.alias}
            </span>
            {props.profile.mainProfile && <span className='text-sm text-muted-foreground'>
                ({props.messages.mainProfileLabel})
            </span>}
        </div>
        <div className='flex gap-2 items-center'>
            <Button
                variant={'ghost'}
                size={'icon'}
                disabled={props.isPending}
                onClick={props.onEdit}
            >
                <span>
                    <Pencil className='size-4' />
                </span>
                <span className='sr-only'>
                    {props.messages.editProfileBtnLabel}
                </span>
            </Button>
            {!props.profile.mainProfile && <DeleteProfileDialog
                profileID={props.profile.id}
                survey={props.exitSurveyWithContext}
                locale={props.locale}
                messages={{
                    deleteBtn: props.messages.deleteProfileBtnLabel,
                    dialog: {
                        title: props.messages.deleteProfileDialogTitle,
                        description: props.messages.deleteProfileDialogDescription,
                        confirmBtn: props.messages.deleteProfileDialogConfirmBtn,
                        cancelBtn: props.messages.deleteProfileDialogCancelBtn,
                    },
                    success: props.messages.successDeletingProfile,
                    error: props.messages.errorDeletingProfile,
                }}
            />}
        </div>
    </li>
};

export default ProfileListItem;
