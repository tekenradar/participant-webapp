'use client'

import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { avatars, getAvatarURL } from '@/lib/avatars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

interface AvatarSelectorProps {
    avatarID: string;
    onAvatarChange: (avatarID: string) => void;
    messages: {
        avatarSelectorLabel: string;
    }
}

const AvatarSelector: React.FC<AvatarSelectorProps> = (props) => {
    return (
        <div className=''>
            <p
                className='text-sm font-medium leading-none'
            >
                {props.messages.avatarSelectorLabel}
            </p>
            <RadioGroup.Root
                id='avatar-selector'
                name='avatar-selector'
                className="flex gap-4 flex-wrap mt-1.5"
                value={props.avatarID}
                onValueChange={(value) => {
                    props.onAvatarChange(value);
                }}
            >
                {avatars.map((avatar) => {
                    return (
                        <div
                            className="flex items-center"
                            key={avatar.avatarId}
                        >
                            <RadioGroup.Item
                                className="relative group border border-border hover:ring-2 hover:ring-accent rounded-md ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={avatar.avatarId}
                                id={avatar.avatarId}
                            >
                                <Avatar className='size-10 rounded-sm'>
                                    <AvatarImage
                                        className='bg-secondary p-0.5'
                                        src={getAvatarURL(avatar.avatarId)}
                                        alt={avatar.avatarId}
                                    />
                                    <AvatarFallback className="bg-secondary rounded-sm">
                                        <UserRound className='text-secondary-foreground size-8' />
                                    </AvatarFallback>
                                </Avatar>
                                <RadioGroup.Indicator className="absolute top-0 left-0 bottom-0 right-0 ring-primary ring-2 rounded-md" />
                            </RadioGroup.Item>
                        </div>
                    )
                })}
            </RadioGroup.Root>
        </div>
    );
};

export default AvatarSelector;
