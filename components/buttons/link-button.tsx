import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface LinkButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
    return (
        <Button
            variant='link'
            className={clsx(
                'px-0 uppercase flex text-start justify-start gap-1 cursor-pointer w-fit flex-wrap h-auto',
                props.className
            )}
            asChild
        >
            <Link
                href={props.href}
                prefetch={false}
            >
                {props.children}
                <span>
                    <ArrowUpRight className='size-4' />
                </span>
            </Link>
        </Button>
    );
};

export default LinkButton;
