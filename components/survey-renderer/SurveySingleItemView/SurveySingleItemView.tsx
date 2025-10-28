import React, { useState, useEffect } from 'react';
import { SurveySingleItem, ItemGroupComponent, ResponseItem, ItemComponent } from 'survey-engine/data_types';
import { filterForBodyComponents, findBottomComponents, findResponseComponents, findTopComponents, getClassName, getItemComponentByRole, getItemComponentsByRole } from './utils';
import HelpGroup from './SurveyComponents/HelpGroup';
import TextViewComponent from './SurveyComponents/TextViewComponent';
import ErrorComponent from './SurveyComponents/ErrorComponent';
import WarningComponent from './SurveyComponents/WarningComponent';
import ResponseComponent, { CustomSurveyResponseComponent } from './ResponseComponent/ResponseComponent';
import clsx from 'clsx';
import BulletList from './SurveyComponents/BulletList';
import MarkdownComponent from './SurveyComponents/MarkdownComponent';
import { renderFormattedContent } from './renderUtils';
import { cn } from '@/lib/utils';
import { Locale } from 'date-fns';
import { SurveyItemContextProvider } from './survey-item-context';

interface SurveySingleItemViewProps {
    renderItem: SurveySingleItem;
    languageCode: string;
    responsePrefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    showInvalid?: boolean;
    invalidWarning: string;
    showKeys?: boolean;
    customResponseComponents?: Array<CustomSurveyResponseComponent>;
    dateLocales?: Array<{ code: string, locale: Locale, format: string }>;
}

const ItemBodyComponent: React.FC<{
    itemKey: string;
    component: ItemComponent,
    index: number,
    showKeys?: boolean;
    showErrors?: boolean;
    languageCode: string;
    responsePrefill?: ResponseItem;
    requiredItem?: boolean;
    customResponseComponents?: Array<CustomSurveyResponseComponent>;
    dateLocales?: Array<{ code: string, locale: Locale, format: string }>;
    setTouched: (touched: boolean) => void;
    setResponse: (response: ResponseItem | undefined) => void;
}> = (props) => {
    const { component, index, requiredItem } = props;

    if (component.displayCondition === false) {
        return null;
    }
    switch (component.role) {
        case 'title':
            return null;
        case 'subtitle':
            return null;
        case 'helpGroup':
            return null;
        case 'footnote':
            return null;
        case 'responseGroup':
            return <ResponseComponent key={index.toFixed()}
                itemKey={props.itemKey}
                languageCode={props.languageCode}
                compDef={component}
                prefill={props.responsePrefill}
                isRequired={requiredItem ? true : false}
                dateLocales={props.dateLocales ? props.dateLocales : []}
                responseChanged={(response) => {
                    console.log('new response set', response)
                    props.setTouched(true);
                    props.setResponse(response);
                }}
                showOptionKey={props.showKeys}
                customResponseComponents={props.customResponseComponents}
                showErrors={props.showErrors}
            />
        case 'text':
            return <TextViewComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
                embedded={false}
            />;
        case 'bullets':
            return <BulletList key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
            />
        case 'markdown':
            return <MarkdownComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
                embedded={false}
            />;
        case 'error':
            if (!props.showErrors) {
                return null;
            }
            return <ErrorComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
            />
        case 'warning':
            return <WarningComponent key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
            />
        default:
            console.warn('component role not implemented: ' + component.role);
            return <p key={index.toFixed()}>{component.role} not implemented</p>
    }
}

const SurveySingleItemView: React.FC<SurveySingleItemViewProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.responsePrefill);
    const [touched, setTouched] = useState(false);


    useEffect(() => {
        if (touched) {
            props.responseChanged(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const renderHelpGroup = (): React.ReactNode => {
        if (!props.renderItem.components) { return null; }
        const helpGroup = getItemComponentByRole(props.renderItem.components.items, 'helpGroup') as ItemGroupComponent;
        if (!helpGroup) {
            return null;
        }
        return (
            <HelpGroup
                itemKey={props.renderItem.key.replace('.', '-')}
                componentGroup={helpGroup}
                languageCode={props.languageCode}
            />
        )
    }

    const requiredItem = props.renderItem.validations?.find(val => val.type === 'hard');



    const renderBodyComponents = (): React.ReactNode => {
        if (!props.renderItem.components) { return null; }

        const relevantBodyComponents = filterForBodyComponents(props.renderItem.components.items);
        const topComponents = findTopComponents(relevantBodyComponents);
        const responseComponents = findResponseComponents(relevantBodyComponents);
        const bottomComponents = findBottomComponents(relevantBodyComponents);

        return <>
            {/* Top components: */}
            {topComponents.length > 0 && <div className={cn(
                'py-2 @md:py-4',
                {
                    'pb-0 @md:pb-0': responseComponents.length > 0
                }
            )}>
                {topComponents.map((comp, index) => <ItemBodyComponent
                    key={index.toFixed()}
                    itemKey={props.renderItem.key}
                    component={comp}
                    index={index}
                    showKeys={props.showKeys}
                    showErrors={props.showInvalid}
                    languageCode={props.languageCode}
                    responsePrefill={props.responsePrefill}
                    requiredItem={requiredItem ? true : false}
                    customResponseComponents={props.customResponseComponents}
                    dateLocales={props.dateLocales ? props.dateLocales : []}
                    setTouched={setTouched}
                    setResponse={setResponse}
                />)}
            </div>}

            {/* Response components: */}
            {responseComponents.length > 0 && <div
                className={cn(
                    'py-2 @md:py-4',
                    {
                        'pt-0 @md:pt-0': topComponents.length > 0
                    }
                )}
            >
                {responseComponents.map((comp, index) => <ItemBodyComponent
                    key={index.toFixed()}
                    itemKey={props.renderItem.key}
                    component={comp}
                    index={index}
                    showKeys={props.showKeys}
                    showErrors={props.showInvalid}
                    languageCode={props.languageCode}
                    responsePrefill={props.responsePrefill}
                    requiredItem={requiredItem ? true : false}
                    customResponseComponents={props.customResponseComponents}
                    dateLocales={props.dateLocales ? props.dateLocales : []}
                    setTouched={setTouched}
                    setResponse={setResponse}
                />)}
            </div>}

            {/* Bottom components: */}
            {bottomComponents.length > 0 && <div
                className={cn(
                    'pb-2 @md:pb-4',
                )}
            >
                {bottomComponents.map((comp, index) => <ItemBodyComponent
                    key={index.toFixed()}
                    itemKey={props.renderItem.key}
                    component={comp}
                    index={index}
                    showKeys={props.showKeys}
                    showErrors={props.showInvalid}
                    languageCode={props.languageCode}
                    responsePrefill={props.responsePrefill}
                    requiredItem={requiredItem ? true : false}
                    customResponseComponents={props.customResponseComponents}
                    dateLocales={props.dateLocales ? props.dateLocales : []}
                    setTouched={setTouched}
                    setResponse={setResponse}
                />)}
            </div>}
        </>
    }

    const titleComp = getItemComponentByRole(props.renderItem.components?.items, 'title')
    let subTitleComp = getItemComponentByRole(props.renderItem.components?.items, 'subtitle')
    // fallback to legacy survey subtitle
    if (!subTitleComp && titleComp && titleComp.description) {
        subTitleComp = {
            key: 'legacy-subtitle',
            role: 'text',
            content: titleComp.description,
        }
    }

    const renderItemHeader = (): React.ReactNode => {
        if (!titleComp) {
            return null;
        }

        const titleContent = renderFormattedContent(titleComp, props.languageCode, undefined, props.dateLocales ? props.dateLocales : []);
        const subTitleContent = subTitleComp ? renderFormattedContent(subTitleComp, props.languageCode, 'italic', props.dateLocales ? props.dateLocales : []) : null;

        return (
            <legend
                id={`${props.renderItem.key}-header`}
                className={
                    clsx(
                        'flex items-center w-full',
                        'rounded-t-[--survey-card-border-radius-sm] @md:rounded-t-[--survey-card-border-radius]',
                        'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-2 @md:py-4',
                        'bg-[--survey-card-header-bg]',
                        getClassName(titleComp.style),
                        {
                            'bg-[--survey-card-invalid-bg]': props.showInvalid
                        }
                    )}
            >
                <div className="grow">
                    <span className="m-0 font-bold text-lg @md:text-xl">
                        {titleContent}
                        {requiredItem ?
                            <span
                                aria-required="true"
                                className={clsx(
                                    'ms-1',
                                    {
                                        'text-primary': !props.showInvalid,
                                        'text-[--survey-error-text-color]': props.showInvalid
                                    }
                                )}
                            >
                                {'*'}
                            </span> : null}
                    </span>

                    {subTitleContent && <div>{subTitleContent}</div>}
                </div>

                {renderHelpGroup()}
            </legend >
        )
    }

    const renderFootnote = (): React.ReactNode => {
        if (!props.renderItem.components) { return null; }
        const currentComponents = getItemComponentsByRole(props.renderItem.components.items, 'footnote');
        if (currentComponents.length < 1) {
            return null;
        }

        return currentComponents.map((component: ItemComponent, index: number) => {
            if (component.displayCondition === false) {
                return null;
            }
            return <TextViewComponent
                className={clsx('mt-2 text-sm italic text-center text-balance')}
                key={index.toFixed()}
                compDef={component}
                languageCode={props.languageCode}
                embedded={false}
            />
        })
    }

    return (
        <SurveyItemContextProvider itemKey={props.renderItem.key}>
            <div
                role='group'
                className={cn(

                    'bg-[--survey-card-bg] rounded-[--survey-card-border-radius-sm] @md:rounded-[--survey-card-border-radius] relative',
                    {
                        'mt-2': props.showKeys,
                    }
                )}>
                {props.showKeys ?
                    <span className="text-primary me-2 absolute -top-4 text-xs">{props.renderItem.key}</span>
                    : null}
                <fieldset
                    className='min-w-64'
                >
                    {renderItemHeader()}

                    <div>
                        {renderBodyComponents()}
                    </div>

                    {props.showInvalid ?
                        <p className={clsx(
                            'font-bold text-base @md:text-lg',
                            'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-2 @md:py-4',
                            'rounded-b-[--survey-card-border-radius-sm] @md:rounded-b-[--survey-card-border-radius]',
                            'bg-[--survey-card-invalid-bg]  m-0 text-[--survey-error-text-color]'
                        )}
                            role="alert"
                        >
                            {props.invalidWarning}
                        </p>
                        : null}
                </fieldset>
            </div>

            {renderFootnote()}

        </SurveyItemContextProvider>
    );
};

export default SurveySingleItemView;
