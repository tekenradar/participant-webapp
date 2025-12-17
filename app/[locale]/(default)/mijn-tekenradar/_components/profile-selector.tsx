'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAvatarURL } from "@/lib/avatars";
import { Profile } from "@/lib/server/data-fetching/user";
import { UserRound } from "lucide-react";

interface ProfileSelectorProps {
    profiles: Profile[];
    messages: {
        profileSelectorLabel: string;
        noProfileSelected: string;
        mainProfileLabel: string;
    }
    selectedProfileId: string | null;
    onSelectedProfileIdChange: (profileId: string) => void;
}

const ProfileSelector = (props: ProfileSelectorProps) => {
    const { profiles, messages, selectedProfileId, onSelectedProfileIdChange } = props;

    const selectedProfile = profiles.find(p => p.id === selectedProfileId);

    const getProfileDisplayName = (profile: Profile) => {
        return profile.mainProfile
            ? `${profile.alias} (${props.messages.mainProfileLabel})`
            : profile.alias;
    };

    return <div className="space-y-2">
        <Label htmlFor="profile-selector">{props.messages.profileSelectorLabel}</Label>
        <Select
            value={selectedProfileId || undefined}
            onValueChange={onSelectedProfileIdChange}>
            <SelectTrigger id="profile-selector" className="w-full">
                <SelectValue placeholder={props.messages.noProfileSelected}>
                    <div className="flex items-center gap-2">
                        <Avatar className="size-6 rounded-sm border border-border">
                            <AvatarImage
                                className="bg-secondary p-0.5"
                                src={getAvatarURL(selectedProfile?.avatarID || '')}
                            />
                            <AvatarFallback className="bg-secondary rounded-sm">
                                <UserRound className="text-secondary-foreground size-4" />
                            </AvatarFallback>
                        </Avatar>
                        {selectedProfile ? getProfileDisplayName(selectedProfile) : undefined}
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                        <div className="flex items-center gap-2">
                            <Avatar className="size-6 rounded-sm border border-border">
                                <AvatarImage
                                    className="bg-secondary p-0.5"
                                    src={getAvatarURL(profile.avatarID)}
                                />
                                <AvatarFallback className="bg-secondary rounded-sm">
                                    <UserRound className="text-secondary-foreground size-4" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="truncate">
                                {profile.alias}
                                {profile.mainProfile && (
                                    <span className="text-xs ms-1 text-muted-foreground">
                                        ({props.messages.mainProfileLabel})
                                    </span>
                                )}
                            </span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
}

export default ProfileSelector;