'use client';

import { enterStudy } from '@/actions/study/enter-study';
import { addNewProfile, updateProfile } from '@/actions/user/profiles';
import AvatarSelector from '@/components/avatar-selector';
import ConsentForm from '@/components/consent-form-check-dialog';
import { H3 } from '@/components/headings';
import LoadingButton from '@/components/loading-button';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile } from '@/lib/server/data-fetching/user';
import React from 'react';
import { toast } from 'sonner';

interface ProfileEditorProps {
    profile?: Profile;
    onExit: () => void;
    messages: {
        headingNewProfile: string;
        headingEditProfile: string;
        avatarSelectorLabel: string;
        exitProfileEditorBtn: string;
        saveProfileBtn: string;
        aliasLabel: string;
        aliasPlaceholder: string;
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
        errorSavingProfile: string;
        successSavingProfile: string;
    }
}

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || 'tekenradar';


const ProfileEditor: React.FC<ProfileEditorProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const [profile, setProfile] = React.useState<Profile>(props.profile || {
        id: '',
        avatarID: 'default',
        alias: '',
    });

    const onSave = () => {
        if (profile.id === '') {
            startTransition(async () => {
                const resp = await addNewProfile(profile);
                if (!resp || resp.error) {
                    toast.error(props.messages.errorSavingProfile, {
                        description: resp.error ? resp.error : 'Unknown error',
                    });
                    return;
                }
                const enterStudyResp = await enterStudy(studyKey, resp.profile.id);
                if (enterStudyResp.error) {
                    console.error(enterStudyResp.error);
                }
                toast.success(props.messages.successSavingProfile);
                props.onExit();
            });
        } else {
            startTransition(async () => {
                const resp = await updateProfile(profile);
                if (!resp || resp.error) {
                    toast.error(props.messages.errorSavingProfile, {
                        description: resp.error ? resp.error : 'Unknown error',
                    });
                    return;
                }
                toast.success(props.messages.successSavingProfile);
                props.onExit();
            });
        }
    }

    const hasConsent = profile.consentConfirmedAt !== undefined && profile.consentConfirmedAt > 0;

    return (
        <div>
            <H3>
                {profile.id ? props.messages.headingEditProfile : props.messages.headingNewProfile}
            </H3>

            <div className='space-y-6'>
                <div>
                    <Label
                        htmlFor='alias'
                        className='flex items-center gap-2 py-2'
                    >
                        {props.messages.aliasLabel}
                    </Label>
                    <Input
                        id='alias'
                        name='alias'
                        value={profile.alias}
                        maxLength={20}
                        placeholder={props.messages.aliasPlaceholder}
                        onChange={(e) => {
                            setProfile({ ...profile, alias: e.target.value });
                        }}
                    />
                </div>

                <AvatarSelector
                    avatarID={profile.avatarID}
                    onAvatarChange={(avatarID) => {
                        setProfile({ ...profile, avatarID });
                    }}
                    messages={{
                        avatarSelectorLabel: props.messages.avatarSelectorLabel
                    }}
                />

                <div>
                    <ConsentForm
                        label={props.messages.consent.label}
                        field={{
                            name: 'consentConfirmedAt',
                            value: profile.consentConfirmedAt !== undefined && profile.consentConfirmedAt > 0,
                            onChange: (accepted) => {
                                setProfile({ ...profile, consentConfirmedAt: accepted ? Date.now() : undefined });
                            }
                        }}
                        dialog={{
                            title: props.messages.consent.dialog.title,
                            content: props.messages.consent.dialog.content,
                            acceptBtn: props.messages.consent.dialog.acceptBtn,
                            rejectBtn: props.messages.consent.dialog.rejectBtn,
                        }}
                    />
                </div>
            </div>


            <div>
                <div className='flex flex-col gap-4 sm:flex-row mt-6'>
                    <Button
                        variant={'outline'}
                        type='button'
                        onClick={() => {
                            props.onExit();
                        }}
                    >
                        {props.messages.exitProfileEditorBtn}
                    </Button>

                    <LoadingButton
                        onClick={onSave}
                        disabled={!hasConsent || profile.alias === ''}
                        isLoading={isPending}
                    >
                        {props.messages.saveProfileBtn}
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;
