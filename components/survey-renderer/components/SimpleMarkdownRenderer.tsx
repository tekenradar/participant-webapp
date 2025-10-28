import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import React from 'react';


interface MarkdownRendererProps {
    className?: string;
    children: string;
}

const SimpleMarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return (
        <EmbeddedMarkdownRenderer
            className={props.className}
        >
            {props.children}
        </EmbeddedMarkdownRenderer>
    );
};

export default SimpleMarkdownRenderer;
