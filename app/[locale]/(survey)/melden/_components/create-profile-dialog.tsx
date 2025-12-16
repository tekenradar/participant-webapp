'use client';

import { addNewProfile } from '@/actions/user/profiles';
import AvatarSelector from '@/components/avatar-selector';
import ConsentForm from '@/components/consent-form-check-dialog';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile } from '@/lib/server/data-fetching/user';
import { UserPlus } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export interface CreateProfileDialogMessages {
    triggerBtn: string;
    title: string;
    description: string;
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
    saveProfileBtn: string;
    cancelBtn: string;
    errorSavingProfile: string;
    successSavingProfile: string;
}

interface CreateProfileDialogProps {
    messages: CreateProfileDialogMessages;
}

const newProfile = {
    id: '',
    avatarID: 'default',
    alias: '',
}

const CreateProfileDialog: React.FC<CreateProfileDialogProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();
    const [profile, setProfile] = React.useState<Profile>({
        ...newProfile,
    });

    const [isOpen, setIsOpen] = React.useState(false);
    const hasConsent = profile.consentConfirmedAt !== undefined && profile.consentConfirmedAt > 0;


    useEffect(() => {
        if (!isOpen) {
            setProfile({
                ...newProfile,
            });
        }
    }, [isOpen]);

    const onSave = () => {
        startTransition(async () => {
            const resp = await addNewProfile(profile);
            if (!resp || resp.error) {
                console.error(resp.error)
                toast.error(props.messages.errorSavingProfile, {
                    description: resp.error ? resp.error : 'Unknown error',
                });
                return;
            }
            toast.success(props.messages.successSavingProfile);
            setIsOpen(false);
        });
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <Button className='mt-4 w-full'
                    variant={'outline'}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    <span>
                        <UserPlus className='size-4' />
                    </span>
                    {props.messages.triggerBtn}
                </Button>
            </DialogTrigger>
            <DialogContent
                closeBtnAriaLabel={props.messages.cancelBtn}
            >
                <DialogHeader>
                    <DialogTitle>
                        {props.messages.title}
                    </DialogTitle>
                    <DialogDescription>
                        {props.messages.description}
                    </DialogDescription>
                </DialogHeader>

                <div>
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

                </div>

                <DialogFooter className='gap-2'>
                    <DialogClose asChild>
                        <Button variant='outline'>
                            {props.messages.cancelBtn}
                        </Button>
                    </DialogClose>

                    <LoadingButton
                        isLoading={isPending}
                        onClick={onSave}
                        disabled={!hasConsent || profile.alias === ''}
                    >
                        {props.messages.saveProfileBtn}
                    </LoadingButton>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default CreateProfileDialog;
