import React from 'react';
import { ItemComponent } from 'survey-engine/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import clsx from 'clsx';

interface WarningComponentProps {
    compDef: ItemComponent;
    languageCode: string;
}

const WarningComponent: React.FC<WarningComponentProps> = (props) => {
    return (
        <p
            className={
                clsx(
                    "m-0",
                    "font-bold text-[--survey-warning-text-color]",
                    'px-[--survey-card-px-sm] @md:px-[--survey-card-px]',
                    getClassName(props.compDef.style),
                )
            }>
            {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </p>
    );
};

export default WarningComponent;
