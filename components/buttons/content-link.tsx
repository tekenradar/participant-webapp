import { Mail, MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ContentLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefetch?: boolean;
    target?: string;
}

const ContentLink: React.FC<ContentLinkProps> = (props) => {
    const isMail = props.href?.includes('mailto:');
    const isExternal = props.href?.startsWith('http') || props.target === '_blank';

    return (
        <Link
            className='inline-flex items-center font-medium underline underline-offset-4 text-primary hover:text-accent focus:ring-primary focus:ring rounded-sm focus:ring-offset-1 focus:outline-none'
            target={isExternal ? '_blank' : undefined}
            rel='noopener noreferrer'
            {...props}>
            {isMail && <span>
                <Mail className='size-4 mx-1' />
            </span>}
            <span>
                {props.children}
            </span>
            {isExternal && <span>
                <MoveUpRight className='size-4 mx-1' />
            </span>}

        </Link>
    );
};

export default ContentLink;