'use client';

import { H3 } from "@/components/headings";
import CreateProfileDialog, { CreateProfileDialogMessages } from "./create-profile-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Profile } from "@/lib/server/data-fetching/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarURL } from "@/lib/avatars";
import { ChevronRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";


interface ProfileSelectorProps {
    profiles: Array<Profile>;
    messages: {
        title: string;
        description: string;
        mainProfileLabel: string;
        createProfileDialog: CreateProfileDialogMessages;
    }
}

export default function ProfileSelector(props: ProfileSelectorProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleProfileSelect = (profileId: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('pid', profileId);
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <div>
            <AlertDialog open={true} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold">
                            {props.messages.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="bg-secondary text-secondary-foreground p-3 rounded-md">
                            {props.messages.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <ul>
                            {props.profiles?.map((profile) => {
                                return (
                                    <li
                                        key={profile.id}
                                    >
                                        <Button
                                            onClick={() => handleProfileSelect(profile.id)}
                                            className="w-full h-auto leading-relaxed px-4 py-2"
                                            variant="outline"
                                        >
                                            <div className='grow flex items-center gap-2'>
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
                                                <div className='grow text-start'>
                                                    <span className='truncate max-w-[250px] '>
                                                        {profile.alias}
                                                    </span>
                                                    {profile.mainProfile && <span className='text-xs ms-1 text-muted-foreground'>
                                                        ({props.messages.mainProfileLabel})
                                                    </span>}
                                                </div>


                                                <span>
                                                    <ChevronRight className='size-4' />
                                                </span>
                                            </div>

                                        </Button>
                                    </li>
                                )
                            })}
                        </ul>

                        <Separator />
                        <CreateProfileDialog messages={props.messages.createProfileDialog} />
                    </div>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}