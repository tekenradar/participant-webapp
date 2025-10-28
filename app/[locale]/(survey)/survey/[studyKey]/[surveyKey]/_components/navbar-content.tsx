'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarURL } from '@/lib/avatars';
import { Profile } from '@/lib/server/data-fetching/user';
import { ArrowLeft, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ConfirmExit from './confirm-exit';
import NavbarButton from '@/components/navbar/navbar-button';

interface NavbarContentProps {
    profile: Profile;
    messages: {
        exitSurveyBtn: string;
        exitSurveyConfirmationTitle: string;
        exitSurveyConfirmationDescription: string;
        exitSurveyConfirmationConfirmBtn: string;
        exitSurveyConfirmationCancelBtn: string;
    }
    redirectUrl?: string;
}

const NavbarContent: React.FC<NavbarContentProps> = (props) => {
    const router = useRouter();
    const [confirmExitOpen, setConfirmExitOpen] = React.useState(false);

    return (
        <div className="flex items-center justify-between">
            <ConfirmExit
                open={confirmExitOpen}
                onClose={(accept) => {
                    setConfirmExitOpen(false);
                    if (accept) {
                        router.push(props.redirectUrl || '/dashboard');
                    }
                }}
                messages={{
                    title: props.messages.exitSurveyConfirmationTitle,
                    description: props.messages.exitSurveyConfirmationDescription,
                    confirmBtn: props.messages.exitSurveyConfirmationConfirmBtn,
                    cancelBtn: props.messages.exitSurveyConfirmationCancelBtn,
                }}
            />

            <NavbarButton
                onClick={() => {
                    setConfirmExitOpen(true);
                }}
            >
                <span>
                    <ArrowLeft className='size-5' />
                </span>
                <span>
                    {props.messages.exitSurveyBtn}
                </span>
            </NavbarButton>

            <div className='flex gap-2 items-center'>
                <Avatar className='size-7 rounded-sm'>
                    <AvatarImage
                        className='bg-secondary p-0.5'
                        src={getAvatarURL(props.profile.avatarID)}
                    />
                    <AvatarFallback className="bg-secondary rounded-sm">
                        <UserRound className='text-secondary-foreground size-5' />
                    </AvatarFallback>
                </Avatar>
                <span className='hidden sm:inline-block'>
                    {props.profile.alias}
                </span>
            </div>
        </div>
    );
};

export default NavbarContent;
