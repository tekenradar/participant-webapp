'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Cog, Home, LogOutIcon, UserRound } from 'lucide-react';
import { logout } from '@/actions/auth/logout';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { getAvatarURL } from '@/lib/avatars';
import Link from 'next/link';
import NavbarButton from './navbar-button';
import { User } from 'next-auth';
import { DEFAULT_DASHBOARD_URL } from '@/constants';


interface UserMenuProps {
    user: User;
    currentUserLabel: string;
    studyOverviewLink: string;
    settingsLink: string;
    logoutLabel: string;
}

interface AuthLinksProps {
    buttons: Array<{
        key: string;
        href: string;
        label: string;
    }>
}

export const AuthLinks = (props: AuthLinksProps) => {

    return <NavigationMenu>
        <NavigationMenuList>
            {
                props.buttons.map((button) => {
                    return (
                        <NavigationMenuItem key={button.key}>
                            <NavigationMenuLink
                                href={button.href}
                                className={navigationMenuTriggerStyle()}
                            >
                                {button.label}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                })
            }
        </NavigationMenuList>
    </NavigationMenu>
}

const UserMenu: React.FC<UserMenuProps> = (props) => {
    const [isPending, startTransition] = React.useTransition();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavbarButton>
                    <Avatar className='size-7 rounded-sm'>
                        <AvatarImage
                            className='bg-secondary p-0.5'
                            src={getAvatarURL(props.user?.image || "")}
                        />
                        <AvatarFallback className="bg-secondary rounded-sm">
                            <UserRound className='text-secondary-foreground size-5' />
                        </AvatarFallback>
                    </Avatar>

                    <span className="hidden md:block">{props.user?.email || ''}</span>
                    <span>
                        <ChevronDown className='size-4' />
                    </span>
                </NavbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    <p className='text-xs text-end'>
                        {props.currentUserLabel}
                    </p>
                    <p className='text-muted-foreground text-sm text-end'>
                        {props.user?.email || ''}
                    </p>

                </DropdownMenuLabel>

                <DropdownMenuItem
                    asChild
                >
                    <Link
                        href={DEFAULT_DASHBOARD_URL}
                        prefetch={false}
                    >
                        <span>
                            <Home className='size-4 mr-2' />
                        </span>
                        {props.studyOverviewLink}
                    </Link>
                </DropdownMenuItem>



                <DropdownMenuItem
                    asChild
                >
                    <Link
                        href="/settings"
                        prefetch={false}
                    >
                        <span>
                            <Cog className='size-4 mr-2' />
                        </span>
                        {props.settingsLink}
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='text-red-800'
                    disabled={isPending}
                    onClick={() => {
                        startTransition(async () => {
                            await logout('/');
                        })
                    }}
                >
                    {props.logoutLabel}
                    <LogOutIcon className='size-4 ml-2' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
