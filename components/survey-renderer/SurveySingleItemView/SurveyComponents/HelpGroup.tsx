import React from 'react';
import { ItemGroupComponent } from 'survey-engine/data_types';
import MarkdownComponent from './MarkdownComponent';
import { CircleHelp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';


interface HelpGroupProps {
    componentGroup: ItemGroupComponent;
    languageCode: string;
    itemKey: string;
}

const HelpGroup: React.FC<HelpGroupProps> = (props) => {
    const renderContent = () => {
        if (props.componentGroup.items === undefined) {
            return <p className='text-[--survey-error-text-color]'> items is missing in the helpGroup component </p>
        }
        return <React.Fragment>
            {
                props.componentGroup.items.map((item, index) => {
                    return <MarkdownComponent key={index.toFixed()}
                        className='prose prose-sm'
                        compDef={item}
                        languageCode={props.languageCode}
                        embedded={true}
                    />
                })
            }
        </React.Fragment>
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size='icon' >
                    <CircleHelp className="h-6 w-6 text-primary" aria-hidden="true" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-60 @md:w-96'
                align='end'

            >
                {renderContent()}
            </PopoverContent>

        </Popover>
    );
};

export default HelpGroup;
