import React from 'react';
import { ItemComponent } from 'survey-engine/data_types';
import { getClassName, getLocaleStringTextByCode } from '../utils';
import clsx from 'clsx';

interface ErrorComponentProps {
    compDef: ItemComponent;
    languageCode: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
    return (
        <p
            className={
                clsx(
                    "m-0",
                    "font-bold text-[--survey-error-text-color]",
                    'px-[--survey-card-px-sm] @md:px-[--survey-card-px]',
                    getClassName(props.compDef.style),
                )
            }
            role="alert"
        >
            {getLocaleStringTextByCode(props.compDef.content, props.languageCode)}
        </p>
    );
};

export default ErrorComponent;
