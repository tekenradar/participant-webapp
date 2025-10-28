import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { isItemGroupComponent, ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { renderFormattedContent } from '../../renderUtils';
import { CommonResponseComponentProps, getClassName } from '../../utils';
import { getResponsiveModes, Variant } from './responsiveUtils';
import { cn } from '@/lib/utils';
import { useSurveyItemCtx } from '../../survey-item-context';


type ResponsiveSingleChoiceArrayProps = CommonResponseComponentProps

interface VerticalModeOptionProps {
    slotFullKey: string;
    optionKey?: string;
    className?: string;
    optionDef: ItemComponent;
    isLast: boolean;
    isChecked: boolean;
    languageCode: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerticalModeOption: React.FC<VerticalModeOptionProps> = (props) => {
    const optionFullKey = props.slotFullKey + '.' + props.optionKey;
    // console.log(optionFullKey)
    return <label className={clsx(
        "form-check flex items-center gap-2 hover:bg-black/5 py-1 px-[--survey-card-px-sm] @md:px-[--survey-card-px] ",
        props.className,
    )}
        htmlFor={optionFullKey}
        key={optionFullKey} >

        <input
            className="form-check-input cursor-pointer size-5"
            type="radio"
            name={props.slotFullKey}
            id={optionFullKey}
            value={props.optionKey}
            onChange={props.onChange}
            checked={props.isChecked}
        />

        <span className="form-check-label cursor-pointer grow">
            {renderFormattedContent(props.optionDef, props.languageCode, 'cursor-pointer')}
        </span>
    </label >
}


const ResponsiveSingleChoiceArray: React.FC<ResponsiveSingleChoiceArrayProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const { width } = useSurveyItemCtx();
    const [options, setOptions] = useState<ItemGroupComponent | undefined>();
    const [errorHint, setErrorHint] = useState<ItemComponent | undefined>(undefined);

    useEffect(() => {
        if (!isItemGroupComponent(props.compDef)) {
            console.warn('ResponsiveSingleChoiceArray: no components found.');
            return;
        }
        const options = props.compDef.items.find(item => item.role === 'options');

        if (options === undefined || !isItemGroupComponent(options)) {
            console.warn('ResponsiveSingleChoiceArray: no options found.');
            return;
        }
        setOptions(options);

        const errorComp = props.compDef.items.find(item => item.role === 'rowErrorHint');
        if (errorComp) {
            setErrorHint(errorComp);
        }
    }, [props.compDef]);

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);


    const radioSelectionChanged = (rowKey: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!rowKey) { return; }
        const selectedValue = event.target.value;

        setTouched(true);
        setResponse(prev => {
            if (!prev || !prev.items) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{
                        key: rowKey, items: [{ key: selectedValue }]
                    }]
                }
            }

            const rowIndex = prev.items.findIndex(item => item.key === rowKey);
            const items = [...prev.items];
            if (rowIndex > -1) {
                items[rowIndex].items = [{ key: selectedValue }];
            } else {
                items.push({
                    key: rowKey, items: [{ key: selectedValue }]
                });
            }

            return {
                ...prev,
                items: items
            }
        });
    }


    const isResponseSet = (rowKey: string | undefined, itemKey: string | undefined): boolean => {
        if (!rowKey || !itemKey) { return false; }

        if (!response || !response.items || response.items.length < 1) {
            return false;
        }
        const rowResponse = response.items.find(item => item.key === rowKey);
        if (!rowResponse || !rowResponse.items || rowResponse.items.length < 1) { return false; }
        const resp = rowResponse.items.find(item => item.key === itemKey);
        return resp !== undefined;
    }

    const rowHasResponse = (rowKey: string | undefined): boolean => {
        if (!rowKey) { return false; }

        if (!response || !response.items || response.items.length < 1) {
            return false;
        }
        const rowResponse = response.items.find(item => item.key === rowKey);
        return rowResponse !== undefined;
    }

    const renderVerticalMode = (namePrefix: string) => {
        if (!isItemGroupComponent(props.compDef)) {
            return <p>Empty</p>;
        }

        if (!options) {
            return <p>No options found.</p>;
        }

        const reverseOrder = props.compDef.style?.find(s => s.key === 'verticalModeReverseOrder')?.value === 'true';

        const rows = props.compDef.items;

        return <ul
            className='flex flex-col divide-y divide-[--survey-card-table-border-color]'
        >
            {rows.map((item) => {
                if (item.displayCondition === false) {
                    return null;
                }
                switch (item.role) {
                    case 'row':
                        const rowKey = namePrefix + '_' + props.compDef.key + '.' + item.key;
                        const htmlKey = `${props.parentKey}.${item.key}-vertical`;
                        const sortedOptions = reverseOrder ? options.items.slice().reverse() : options.items;
                        const rowClassName = item.style?.find(s => s.key === 'verticalModeClassName')?.value;
                        return <div key={item.key}
                            className={clsx(
                                'py-2',
                                rowClassName,
                                {
                                    'bg-[--survey-card-invalid-bg]': props.showErrors && !rowHasResponse(item.key)
                                },
                            )}
                        >
                            <p
                                id={rowKey + 'label'}
                                className={clsx(
                                    'font-bold mb-2 px-[--survey-card-px-sm] @md:px-[--survey-card-px] '
                                )}
                            >
                                {renderFormattedContent(item, props.languageCode, undefined, props.dateLocales)}
                            </p>
                            <fieldset
                                id={props.compDef.key + '.' + item.key}
                                name={htmlKey}
                                aria-describedby={rowKey + 'label'}
                            >
                                {sortedOptions.map((option, index) => {
                                    const optionClassName = getClassName(option.style);

                                    return <VerticalModeOption
                                        key={option.key}
                                        slotFullKey={htmlKey}
                                        optionKey={option.key}
                                        optionDef={option}
                                        className={optionClassName}
                                        isLast={index === options.items.length - 1}
                                        isChecked={isResponseSet(item.key, option.key)}
                                        languageCode={props.languageCode}
                                        onChange={radioSelectionChanged(item.key)}
                                    />
                                })}
                            </fieldset>
                            {(errorHint && props.showErrors && !rowHasResponse(item.key)) && <div
                                className='text-[--survey-error-text-color] text-sm font-bold mt-1 px-[--survey-card-px-sm] @md:px-[--survey-card-px]'
                                role='alert'
                            >
                                {renderFormattedContent(errorHint, props.languageCode, undefined, props.dateLocales)}
                            </div>}
                        </div>;
                    case 'options':
                    case 'rowErrorHint':
                        return undefined;
                    default:
                        return <p>Unknown item role: {item.role}</p>
                }
            })}
        </ul>
    }

    const renderHorizontalRow = (rowDef: ItemComponent, options: ItemGroupComponent, isLast: boolean, namePrefix: string) => {
        const rowKey = rowDef.key;

        const labelOnTop = rowDef.style?.find(s => s.key === 'horizontalModeLabelPlacement')?.value === 'top';
        const hideLabel = rowDef.style?.find(s => s.key === 'horizontalModeLabelPlacement')?.value === 'none';
        const rowClassName = rowDef.style?.find(s => s.key === 'horizontalModeClassName')?.value;
        const htmlKey = `${namePrefix}_${props.parentKey}.${rowKey}-horizontal`;
        const htmlLabelKey = `${htmlKey}-label`;

        return <div
            key={rowKey}
            className={clsx(
                'pt-2 pb-2 last:pb-0',

                rowClassName,
            )}
        >
            <h6 id={htmlLabelKey}

                className={clsx(
                    'font-bold'
                )}
            >
                {renderFormattedContent(rowDef, props.languageCode, undefined, props.dateLocales)}
            </h6>
            <fieldset
                id={htmlKey}
                name={htmlKey}
                className={clsx(
                    "flex text-xs @md:text-base font-medium @md:font-normal",
                    {
                        'bg-[--survey-card-invalid-bg] rounded-sm': props.showErrors && !rowHasResponse(rowKey)
                    },
                )}
                aria-describedby={htmlLabelKey}
            >
                {
                    options.items.map(
                        option => {
                            const optionKey = option.key;
                            const htmlKeyForOption = htmlKey + optionKey;
                            const radioBtn = (<div
                                className={clsx(
                                    "text-center",
                                )}
                            >
                                <input
                                    className="form-check-input cursor-pointer size-5"
                                    type="radio"
                                    name={htmlKey}
                                    id={htmlKeyForOption}
                                    onChange={radioSelectionChanged(rowKey)}
                                    value={option.key}
                                    checked={isResponseSet(rowKey, option.key)}
                                />
                            </div>);

                            const optionLabelClassName = getClassName(option.style)

                            const label = hideLabel ? null : (<div className={clsx(
                                {
                                    "text-center": !optionLabelClassName,
                                },
                                optionLabelClassName
                            )}>
                                <span>
                                    {renderFormattedContent(option, props.languageCode, 'cursor-pointer', props.dateLocales)}
                                </span>
                            </div>);

                            return <label
                                key={option.key}
                                htmlFor={htmlKeyForOption}
                                className={clsx(
                                    'rounded-sm cursor-pointer p-1 -m-1 mt-0 pt-3',
                                    'hover:bg-black/5',
                                    "grow",
                                )}
                                style={{ flexBasis: 0 }}
                            >
                                {labelOnTop ? label : null}
                                {radioBtn}
                                {!labelOnTop ? label : null}
                            </label>
                        }
                    )
                }
            </fieldset>
            {(errorHint && props.showErrors && !rowHasResponse(rowKey)) && <div
                className='text-[--survey-error-text-color] text-sm font-bold mt-1'
                role='alert'
            >
                {renderFormattedContent(errorHint, props.languageCode, undefined, props.dateLocales)}
            </div>}
        </div>
    }

    const renderHorizontalMode = (namePrefix: string) => {
        if (!isItemGroupComponent(props.compDef)) {
            return <p>Empty</p>;
        }

        if (!options) {
            return <p>No options found.</p>;
        }

        const rows = props.compDef.items;

        return <ul className='px-[--survey-card-px-sm] @md:px-[--survey-card-px] divide-y divide-[--survey-card-table-border-color]'>
            {rows.map((item, index) => {
                if (item.displayCondition === false) {
                    return null;
                }
                switch (item.role) {
                    case 'row':
                        return renderHorizontalRow(item, options, index === rows.length - 1, namePrefix);
                    case 'options':
                    case 'rowErrorHint':
                        return undefined;
                    default:
                        return <p>Unknown item role: {item.role}</p>
                }
            })}
        </ul>
    }

    const renderTableMode = (namePrefix: string) => {
        if (!isItemGroupComponent(props.compDef)) {
            return <p>Empty</p>;
        }

        if (!options) {
            return <p>No options found.</p>;
        }

        return <div className='px-[--survey-card-px-sm] @md:px-[--survey-card-px]'>
            <table className={"table m-0 "}>
                <thead>
                    <tr>
                        <th scope="col"></th>

                        {options.items.map(item => <th
                            key={props.compDef + '.' + item.key}
                            scope="col"
                            className="text-center"
                        >
                            {renderFormattedContent(item, props.languageCode, 'cursor-pointer', props.dateLocales)}
                        </th>)}

                    </tr>
                </thead>
                <tbody>
                    {props.compDef.items.map(item => {
                        let rowContent = <td colSpan={options.items.length + 1}>Unknown row type: {item.role}</td>;
                        if (item.displayCondition === false) {
                            return null;
                        }
                        switch (item.role) {
                            case 'row':
                                const htmlKey = `${namePrefix}.${props.parentKey}.${item.key}-table`;
                                rowContent = <React.Fragment>
                                    <th scope="row"
                                        className='text-start'
                                    >
                                        {renderFormattedContent(item, props.languageCode, undefined, props.dateLocales)}

                                        {(errorHint && props.showErrors && !rowHasResponse(item.key)) && <div
                                            className='text-[--survey-error-text-color] text-sm'
                                            role='alert'
                                        >
                                            {renderFormattedContent(errorHint, props.languageCode, undefined, props.dateLocales)}
                                        </div>}
                                    </th>
                                    {options.items.map(oi => <td
                                        key={props.compDef + '.' + oi.key}
                                        className="text-center py-1"
                                    >
                                        <div className='align-middle flex items-center justify-center px-1'>
                                            <input
                                                className="form-check-input cursor-pointer size-5"
                                                type="radio"
                                                name={htmlKey}
                                                onChange={radioSelectionChanged(item.key)}
                                                value={oi.key}
                                                checked={isResponseSet(item.key, oi.key)}
                                            />
                                        </div>
                                    </td>)}
                                </React.Fragment>
                                break;
                            case 'options':
                            case 'rowErrorHint':
                                return undefined;
                            default:
                                break;
                        }
                        const rowClassName = item.style?.find(st => st.key === 'tableModeClassName')?.value;



                        return <tr key={props.compDef + '.' + item.key}
                            className={cn(
                                'border-b border-[--survey-card-table-border-color] last:border-b-0',
                                rowClassName,
                                {
                                    'bg-[--survey-card-invalid-bg]': props.showErrors && !rowHasResponse(item.key)
                                },
                            )}

                        >
                            {rowContent}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }

    const renderMode = (mode: Variant, namePrefix: string) => {
        switch (mode) {
            case 'vertical':
                return renderVerticalMode(namePrefix);
            case 'horizontal':
                return renderHorizontalMode(namePrefix);
            case 'table':
                return renderTableMode(namePrefix);
            default:
                return <p>unknown mode: {mode}</p>
        }
    }


    return (
        <React.Fragment>
            {getResponsiveModes(width, renderMode, props.compDef.style)}
        </React.Fragment>
    );
};

export default ResponsiveSingleChoiceArray;
