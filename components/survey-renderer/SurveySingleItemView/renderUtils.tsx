import clsx from 'clsx';
import React from 'react';
import { isItemGroupComponent, ItemComponent } from 'survey-engine/data_types';
import { getClassName, getLocaleStringDateByCode, getLocaleStringTextByCode, getStyleValueByKey } from './utils';
import { Locale } from 'date-fns';


export const renderFormattedContent = (component: ItemComponent, languageCode: string, defaultClassNamePerPart: string | undefined, dateLocales?: Array<{ code: string, locale: Locale, format: string }>) => {
    if (isItemGroupComponent(component)) {
        return <React.Fragment>
            {
                component.items.map((item, index) => {
                    let itemContent: string | undefined;
                    switch (item.role) {
                        case 'dateDisplay':
                            let dateFormat = getStyleValueByKey(item.style, 'dateFormat');
                            if (!dateFormat) {
                                dateFormat = 'dd.MM.yyyy';
                            }
                            itemContent = getLocaleStringDateByCode(item.content, languageCode, dateFormat, dateLocales);
                            break;
                        default:
                            itemContent = getLocaleStringTextByCode(item.content, languageCode)
                            break;
                    }
                    return <span
                        key={item.key + index.toFixed()}
                        className={
                            clsx(
                                defaultClassNamePerPart,
                                getClassName(item.style)
                            )
                        }
                    >
                        {itemContent}
                    </span>
                })
            }
        </React.Fragment>
    } else {
        return <span
            key={component.key}
            className={defaultClassNamePerPart}>
            {getLocaleStringTextByCode(component.content, languageCode)}
        </span>
    }
}
