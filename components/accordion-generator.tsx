import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import EmbeddedMarkdownRenderer from './embedded-markdown-renderer';

interface AccordionWithMdProps {
    items: Array<{
        title: string;
        content: string;
    }>;

}

const AccordionWithMd: React.FC<AccordionWithMdProps> = (props) => {
    return (
        <Accordion
            type='multiple'
        >
            {props.items.map((item, index) => (
                <AccordionItem key={index} value={index.toFixed()}>
                    <AccordionTrigger className='text-start font-bold'>
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                        <EmbeddedMarkdownRenderer className='text-base'>
                            {item.content}
                        </EmbeddedMarkdownRenderer>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default AccordionWithMd;
