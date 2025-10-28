'use client'

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { InfoIcon } from 'lucide-react';
import EmbeddedMarkdownRenderer from './embedded-markdown-renderer';

interface PasswordRulesInfoPopoverProps {
    label: string;
    content: string;
}

const PasswordRulesInfoPopover: React.FC<PasswordRulesInfoPopoverProps> = (props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className='cursor-pointer flex items-center gap-2 py-1 text-xs focus-visible:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                    {props.label}
                    <span>
                        <InfoIcon className='size-4 text-muted-foreground' />
                    </span>
                </button>
            </PopoverTrigger>
            <PopoverContent className='w-60 sm:w-96'
                align='start'
            >
                <EmbeddedMarkdownRenderer>
                    {props.content}
                </EmbeddedMarkdownRenderer>
            </PopoverContent>
        </Popover>
    );
};

export default PasswordRulesInfoPopover;
