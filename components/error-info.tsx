import { AlertCircle } from 'lucide-react';
import React from 'react';
import EmbeddedMarkdownRenderer from './embedded-markdown-renderer';
import { cn } from '@/lib/utils';


interface ErrorInfoProps {
    title: string;
    description: string;
    className?: string;
}

const ErrorInfo: React.FC<ErrorInfoProps> = (props) => {
    return (
        <div className={cn('my-12', props.className)}>
            <p className="text-destructive text-xl font-semibold flex flex-col sm:flex-row items-center gap-2">
                <span>
                    <AlertCircle className='size-8' />
                </span>
                {props.title}
            </p>
            <EmbeddedMarkdownRenderer>
                {props.description}
            </EmbeddedMarkdownRenderer>
        </div >
    );
};

export default ErrorInfo;
