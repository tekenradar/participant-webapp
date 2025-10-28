import clsx from 'clsx';
import React from 'react';
import { ItemComponent } from 'survey-engine/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import SimpleMarkdownRenderer from '../../components/SimpleMarkdownRenderer';


interface MarkdownComponentProps {
    compDef: ItemComponent;
    languageCode: string;
    className?: string;
    embedded: boolean;
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = (props) => {
    const className = clsx(
        props.className,
        getClassName(props.compDef.style)
    );

    const content = getLocaleStringTextByCode(props.compDef.content, props.languageCode);

    return (
        <SimpleMarkdownRenderer
            className={clsx(
                {
                    'px-[--survey-card-px-sm] @md:px-[--survey-card-px]': !props.embedded,
                },
                'prose prose-p:my-1 prose-headings:mb-2 prose-ul:mt-0 prose-ul:ml-0 prose-ul:pl-4 prose-li:text-justify prose-p:break-words',
                className
            )}
        >
            {content ? content : ''}
        </SimpleMarkdownRenderer>
    );
};

export default MarkdownComponent;
