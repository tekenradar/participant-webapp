'use client'
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";


import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { NavItem } from './types';
import { shouldHideNavItem } from './navbar-utils';


interface NavMobileProps {
    isLoggedIn: boolean;
    navItems: NavItem[];
}

const NavMobile: React.FC<NavMobileProps> = (props) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const renderMobileNavItems = (items: NavItem[]) => {
        return <ul>
            {items.map((item) => {
                if (shouldHideNavItem(item, props.isLoggedIn)) {
                    return null;
                }

                if (item.items) {
                    return (
                        <li key={item.key}>
                            <h3 className="px-4 text-lg font-medium h-10 py-2 flex items-center">
                                {item.label}
                                <span>
                                    <ChevronDown className="size-5 text-muted-foreground ms-2" />
                                </span>
                            </h3>
                            <div className="ps-4">
                                {renderMobileNavItems(item.items)}
                            </div>
                        </li>
                    )
                }
                return (<li
                    key={item.key}
                >
                    <Button
                        variant={'link'}
                        className={cn(
                            'text-lg text-foreground w-full justify-start ',
                            {
                                'bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold': pathname.endsWith(item.href || '/')
                            }
                        )}
                        asChild>
                        <Link
                            prefetch={false}
                            href={item.href || '/'}
                        >
                            {item.label}
                        </Link>
                    </Button>
                </li>)
            })}
        </ul>

    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <SheetTrigger asChild className="flex lg:hidden"

            >
                <Button
                    className="bg-transparent hover:bg-secondary/80 hover:text-secondary-foreground rounded-none focus-visible:bg-secondary/80 focus-visible:text-secondary-foreground focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                    size='icon'
                >
                    <Menu className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="max-h-screen overflow-y-scroll"
                side={'left'}>
                <ScrollArea

                >
                    <SheetHeader className='flex items-center justify-center'>
                        <div className='w-[44px]'>
                            <AspectRatio
                                ratio={44 / 77}
                            >
                                <Image
                                    src="/static/logo.svg"
                                    alt="Logo "
                                    fill
                                    className='object-cover'
                                    priority
                                />
                            </AspectRatio>
                        </div>
                    </SheetHeader>
                    <nav className="mt-8 pb-12">
                        {renderMobileNavItems(props.navItems)}
                    </nav>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default NavMobile;
