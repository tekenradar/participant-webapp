'use client'

import React from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { removeLocaleFromPath } from '@/lib/remove-locale-from-path';
import { NavItem } from './types';
import { shouldHideNavItem } from './navbar-utils';


interface NavDesktopProps {
    isLoggedIn: boolean;
    navItems: NavItem[];
}

const NavDesktop: React.FC<NavDesktopProps> = (props) => {
    let pathname = usePathname();
    pathname = removeLocaleFromPath(pathname);

    const renderDesktopNavItems = (items: NavItem[]) => {
        return items.map((item) => {
            if (shouldHideNavItem(item, props.isLoggedIn)) {
                return null;
            }

            if (item.items) {
                return (
                    <NavigationMenuItem key={item.key}>
                        <NavigationMenuTrigger
                            className={cn({
                                "bg-secondary hover:bg-secondary/80 text-secondary-foreground": item.items.some((subItem: NavItem) => pathname.endsWith(subItem.href || '/'))
                            })}
                        >{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="divide-y ">
                                {item.items.map((subItem: NavItem) => {
                                    return (
                                        <NavigationMenuLink
                                            key={subItem.key}
                                            href={subItem.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                'w-full justify-start py-2 h-auto text-nowrap'
                                            )}
                                            active={pathname.endsWith(subItem.href || '/')}
                                        >
                                            {subItem.label}
                                        </NavigationMenuLink>
                                    );
                                })}
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                );
            } else {
                return (
                    <NavigationMenuItem key={item.key}>
                        <NavigationMenuLink
                            href={item.href}
                            active={pathname.endsWith(item.href || '/')}
                            className={navigationMenuTriggerStyle()}
                        >{item.label}</NavigationMenuLink>
                    </NavigationMenuItem>
                );
            }
        });
    }


    return (
        <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
                {renderDesktopNavItems(props.navItems)}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavDesktop;
