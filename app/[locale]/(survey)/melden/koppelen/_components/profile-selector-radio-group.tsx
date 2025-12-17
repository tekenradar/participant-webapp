'use client';

import { RadioGroup } from "@/components/ui/radio-group";
import CreateProfileDialog, { CreateProfileDialogMessages } from "../../_components/create-profile-dialog";
import { Profile } from "@/lib/server/data-fetching/user";
import { getAvatarURL } from "@/lib/avatars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { mergeTempParticipantWithProfile } from "@/actions/study/temp-participant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DEFAULT_DASHBOARD_URL } from "@/constants";


const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || 'tekenradar';

interface ProfileSelectorRadioGroupProps {
    messages: {
        title: string;
        mainProfileLabel: string;
        createProfileDialog: CreateProfileDialogMessages;
        connectProfileBtn: string;
        connectProfileError: string;
        connectProfileSuccess: string;
    }
    profiles: Array<Profile>;
}

const ProfileSelectorRadioGroup = (props: ProfileSelectorRadioGroupProps) => {
    const router = useRouter();
    const [selectedProfileId, setSelectedProfileId] = useState<string | undefined>(props.profiles?.[0]?.id);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (props.profiles?.length > 0) {
            setSelectedProfileId(props.profiles?.[0]?.id);
        }
    }, [props.profiles]);

    const handleConnectProfile = () => {
        if (!selectedProfileId) {
            return;
        }
        startTransition(async () => {
            const resp = await mergeTempParticipantWithProfile(studyKey, selectedProfileId);
            if (resp.error) {
                toast.error(props.messages.connectProfileError, {
                    description: resp.error,
                });
                console.error(resp.error);
                return;
            }
            toast.success(props.messages.connectProfileSuccess);
            router.replace(DEFAULT_DASHBOARD_URL);
        });
    }

    return (
        <div>
            <fieldset>
                <legend
                    className='text-lg font-medium'
                >
                    {props.messages.title}
                </legend>
                <RadioGroup
                    id='profile-selector'
                    name='profile-selector'
                    aria-required="true"
                    value={selectedProfileId}
                    onValueChange={(value) => {
                        setSelectedProfileId(value);
                    }}
                >



                    <div className='mt-4 space-y-2'>
                        {props.profiles?.map((profile) => {
                            return (
                                <Label
                                    key={profile.id}
                                    className={cn(
                                        "flex w-max-full items-center space-x-4 leading-relaxed px-4 py-2 border rounded border-border gap-4 hover:bg-secondary/60 cursor-pointer",
                                        {
                                            'border-primary': selectedProfileId === profile.id
                                        }
                                    )}
                                    htmlFor={`profile-option-${profile.id}`}
                                >
                                    <RadioGroupItem value={profile.id} id={`profile-option-${profile.id}`} />

                                    <div className='grow flex items-center gap-2'>
                                        <div className='grow'>
                                            <span className='truncate max-w-[250px]'>
                                                {profile.alias}
                                            </span>
                                            {profile.mainProfile && <span className='text-xs ms-1 text-muted-foreground'>
                                                ({props.messages.mainProfileLabel})
                                            </span>}
                                        </div>

                                        <div>
                                            <Avatar className='size-10 rounded-sm border border-border'>
                                                <AvatarImage
                                                    className='bg-secondary p-0.5'
                                                    src={getAvatarURL(profile.avatarID)}
                                                />
                                                <AvatarFallback className="bg-secondary rounded-sm">
                                                    <UserRound className='text-secondary-foreground size-8' />
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </Label>
                            )
                        })}
                    </div>

                </RadioGroup >

                <CreateProfileDialog
                    messages={props.messages.createProfileDialog}
                />
            </fieldset >
            <div className='mt-4'>
                <LoadingButton
                    className="w-full text-lg h-auto text-wrap"
                    disabled={!selectedProfileId}
                    isLoading={isPending}
                    onClick={handleConnectProfile}
                >
                    <LinkIcon className='size-4' />
                    {props.messages.connectProfileBtn}
                </LoadingButton>
            </div>
        </div>
    )
}

export default ProfileSelectorRadioGroup;