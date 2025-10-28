import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { H2 } from './headings';

interface LinkGroupProps {
    title: string;
    links: Array<{
        href: string;
        text: string;
        target?: string;
    }>;
    className?: string;
}

const LinkGroup: React.FC<LinkGroupProps> = (props) => {
    return (
        <div className={cn(
            'flex flex-col gap-2',
            props.className
        )}>
            <H2>
                {props.title}
            </H2>
            <ul className='flex flex-col gap-2'>
                {
                    props.links.map((link, index) => {
                        return (
                            <li
                                key={index}
                            >
                                <Link
                                    href={link.href}
                                    target={link.target}
                                    className='flex items-center gap-2 text-primary font-bold hover:text-primary/90 hover:underline underline-offset-4'
                                >
                                    <span className='flex items-center gap-2'>
                                        <ArrowRight className='inline-block size-4' />
                                    </span>
                                    {link.text}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default LinkGroup;
