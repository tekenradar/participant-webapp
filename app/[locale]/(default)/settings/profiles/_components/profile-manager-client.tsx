'use client';

import { Profile } from '@/lib/server/data-fetching/user';
import React from 'react';
import ProfileListItem from './profile-list-item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProfileEditor from './profile-editor';
import { SurveyWithContext } from '@/lib/server/data-fetching/survey';


interface ProfileManagerClientProps {
    profiles: Array<Profile>
    locale?: string;
    exitSurveyWithContext?: SurveyWithContext;
    messages: {
        mainProfileLabel: string;
        editProfileBtnLabel: string;
        deleteProfileBtnLabel: string;
        deleteProfileDialogTitle: string;
        deleteProfileDialogDescription: string;
        deleteProfileDialogConfirmBtn: string;
        deleteProfileDialogCancelBtn: string;
        backToSettingsBtn: string;
        createProfileBtn: string;
        exitProfileEditorBtn: string;
        saveProfileBtn: string;
        headingNewProfile: string;
        headingEditProfile: string;
        consent: {
            label: string;
            invalid: string;
            dialog: {
                title: string;
                content: string;
                acceptBtn: string;
                rejectBtn: string;
            }
        };
        aliasLabel: string;
        aliasPlaceholder: string;
        avatarSelectorLabel: string;
        errorSavingProfile: string;
        successSavingProfile: string;
        errorDeletingProfile: string;
        successDeletingProfile: string;
    }
}



const ProfileManagerClient: React.FC<ProfileManagerClientProps> = (props) => {
    const [editorMode, setEditorMode] = React.useState<{
        active: boolean;
        profileID?: string;
    }>({
        active: false,
    });

    if (editorMode.active) {
        return (
            <ProfileEditor
                profile={editorMode.profileID ? props.profiles.find((profile) => profile.id === editorMode.profileID) : undefined}
                onExit={() => {
                    setEditorMode({
                        active: false,
                        profileID: undefined,
                    });
                }}
                messages={{
                    headingNewProfile: props.messages.headingNewProfile,
                    consent: props.messages.consent,
                    aliasLabel: props.messages.aliasLabel,
                    aliasPlaceholder: props.messages.aliasPlaceholder,
                    headingEditProfile: props.messages.headingEditProfile,
                    avatarSelectorLabel: props.messages.avatarSelectorLabel,
                    exitProfileEditorBtn: props.messages.exitProfileEditorBtn,
                    saveProfileBtn: props.messages.saveProfileBtn,
                    errorSavingProfile: props.messages.errorSavingProfile,
                    successSavingProfile: props.messages.successSavingProfile,
                }}
            />
        );
    }


    return (
        <div>
            <ul
                className='divide-y'
            >
                {props.profiles.map((profile) => (
                    <ProfileListItem
                        key={profile.id}
                        profile={profile}
                        locale={props.locale}
                        exitSurveyWithContext={props.exitSurveyWithContext}
                        messages={{
                            mainProfileLabel: props.messages.mainProfileLabel,
                            editProfileBtnLabel: props.messages.editProfileBtnLabel,
                            deleteProfileBtnLabel: props.messages.deleteProfileBtnLabel,
                            deleteProfileDialogTitle: props.messages.deleteProfileDialogTitle,
                            deleteProfileDialogDescription: props.messages.deleteProfileDialogDescription,
                            deleteProfileDialogConfirmBtn: props.messages.deleteProfileDialogConfirmBtn,
                            deleteProfileDialogCancelBtn: props.messages.deleteProfileDialogCancelBtn,
                            errorDeletingProfile: props.messages.errorDeletingProfile,
                            successDeletingProfile: props.messages.successDeletingProfile,
                        }}
                        onEdit={() => {
                            setEditorMode({
                                active: true,
                                profileID: profile.id,
                            });
                        }}
                    />
                ))}
            </ul>
            <div className='flex flex-col gap-4 sm:flex-row mt-6'>
                <Button
                    variant={'outline'}
                    type='button'
                    asChild
                >
                    <Link
                        href='/settings'
                        prefetch={false}
                    >
                        {props.messages.backToSettingsBtn}
                    </Link>
                </Button>

                <Button
                    onClick={() => {
                        setEditorMode({
                            active: true,
                            profileID: undefined,
                        });
                    }}
                >
                    {props.messages.createProfileBtn}
                </Button>
            </div>
        </div>
    );
};

export default ProfileManagerClient;
