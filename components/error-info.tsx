import { AlertCircle } from 'lucide-react';
import React from 'react';
import EmbeddedMarkdownRenderer from './embedded-markdown-renderer';

interface ErrorInfoProps {
    title: string;
    description: string;
}

const ErrorInfo: React.FC<ErrorInfoProps> = (props) => {
    return (
        <div className='my-12'>
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
