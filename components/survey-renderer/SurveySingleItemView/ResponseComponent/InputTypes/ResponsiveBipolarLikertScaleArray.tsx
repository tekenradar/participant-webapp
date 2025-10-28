import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { isItemGroupComponent, ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { renderFormattedContent } from '../../renderUtils';
import { CommonResponseComponentProps } from '../../utils';
import { getResponsiveModes, Variant } from './responsiveUtils';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSurveyItemCtx } from '../../survey-item-context';

type ResponsiveBipolarLikertScaleArrayProps = CommonResponseComponentProps

const ResponsiveBipolarLikertScaleArray: React.FC<ResponsiveBipolarLikertScaleArrayProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const { width } = useSurveyItemCtx();

    const [options, setOptions] = useState<ItemGroupComponent | undefined>();


    useEffect(() => {
        if (!isItemGroupComponent(props.compDef)) {
            console.warn('ResponsiveBipolarLikertScaleArray: no components found.');
            return;
        }
        const options = props.compDef.items.find(item => item.role === 'options');

        if (options === undefined || !isItemGroupComponent(options)) {
            console.warn('ResponsiveBipolarLikertScaleArray: no options found.');
            return;
        }
        setOptions(options);
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

    const setResponseForRow = (rowKey: string | undefined, value: string) => {
        if (!rowKey) { return; }

        setTouched(true);
        setResponse(prev => {
            if (!prev || !prev.items) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{
                        key: rowKey, items: [{ key: value }]
                    }]
                }
            }

            const rowIndex = prev.items.findIndex(item => item.key === rowKey);
            const items = [...prev.items];
            if (rowIndex > -1) {
                items[rowIndex].items = [{ key: value }];
            } else {
                items.push({
                    key: rowKey, items: [{ key: value }]
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

    const getRowResponseValue = (rowKey: string | undefined): string | undefined => {
        if (!rowKey) { return undefined; }

        if (!response || !response.items || response.items.length < 1) {
            return undefined;
        }
        const rowResponse = response.items.find(item => item.key === rowKey);
        if (!rowResponse || !rowResponse.items || rowResponse.items.length < 1) { return undefined; }
        const resp = rowResponse.items[0]
        return resp?.key;
    }

    const rowHasResponse = (rowKey: string | undefined): boolean => {
        if (!rowKey) { return false; }

        if (!response || !response.items || response.items.length < 1) {
            return false;
        }
        const rowResponse = response.items.find(item => item.key === rowKey);
        return rowResponse !== undefined;
    }


    const getSingleVerticalItem = (rowDef: ItemComponent, options: ItemGroupComponent, isfirst: boolean, isLast: boolean, namePrefix: string) => {
        const rowKey = rowDef.key;

        if (!isItemGroupComponent(rowDef)) {
            return <div key={rowKey}>Row labels are missing</div>;
        }

        const startLabelComp = rowDef.items.find(l => l.role === "start");
        const endLabelComp = rowDef.items.find(l => l.role === "end");
        if (!startLabelComp || !endLabelComp) {
            return <div key={rowKey}>Row labels are missing</div>;
        }

        const rowClassName = rowDef.style?.find(st => st.key === 'verticalModeClassName')?.value;
        const htmlKey = `${namePrefix}_${props.parentKey}.${rowKey}-vertical`;
        return <div
            key={rowKey}
            className={clsx(
                "py-2",
                {
                    "pb-0": isLast,
                    "pt-0": isfirst,
                },
                rowClassName,
            )}
        >
            <div className="text-center">
                {renderFormattedContent(startLabelComp, props.languageCode, undefined, props.dateLocales)}
            </div>
            <fieldset
                id={htmlKey}
                name={htmlKey}
                className="text-center"
            >
                {
                    options.items.map(
                        option => {
                            const optionKey = option.key;
                            return <label key={optionKey}
                                className='flex cursor-pointer justify-center items-center hover:bg-black/5 rounded-[--survey-card-border-radius-sm] py-1 '
                            >
                                <input
                                    className="form-check-input cursor-pointer size-5"
                                    type="radio"
                                    name={htmlKey}
                                    id={optionKey}
                                    onChange={radioSelectionChanged(rowKey)}
                                    value={option.key}
                                    checked={isResponseSet(rowKey, option.key)}
                                />
                            </label>
                        }
                    )
                }
            </fieldset>
            <div className="text-center">
                {renderFormattedContent(endLabelComp, props.languageCode, undefined, props.dateLocales)}
            </div>
        </div>
    }

    const renderVerticalMode = (namePrefix: string) => {
        if (!isItemGroupComponent(props.compDef)) {
            return <p>Empty</p>;
        }

        if (!options) {
            return <p>No options found.</p>;
        }

        const rows = props.compDef.items.filter(item => item.role === "row");
        return <ul className='divide-y divide-[--survey-card-table-border-color]'>
            {rows.map((item, index) => {
                if (item.displayCondition === false) {
                    return null;
                }
                return getSingleVerticalItem(item, options, index === 0, index === rows.length - 1, namePrefix);
            })}
        </ul>
    }

    const getSingleItemWithLabelRow = (rowDef: ItemComponent, options: ItemGroupComponent, isfirst: boolean, isLast: boolean, labelOnTop: boolean, namePrefix: string, labelRowMaxLabelWidth?: string) => {
        const rowKey = rowDef.key;

        if (!isItemGroupComponent(rowDef)) {
            return <div key={rowKey}>Row labels are missing</div>;
        }

        const startLabelComp = rowDef.items.find(l => l.role === "start");
        const endLabelComp = rowDef.items.find(l => l.role === "end");
        if (!startLabelComp || !endLabelComp) {
            return <div key={rowKey}>Row labels are missing</div>;
        }

        const labelRow = <div
            className={cn("flex gap-6 justify-between",
                {
                    "items-end": labelOnTop,
                    "items-start": !labelOnTop,
                }
            )}
            id={rowKey + 'label'}
        >
            <div className="grow text-balance">
                <div style={{
                    maxWidth: labelRowMaxLabelWidth
                }}>
                    {renderFormattedContent(startLabelComp, props.languageCode, undefined, props.dateLocales)}
                </div>
            </div>
            <div className="text-end flex justify-end text-balance">
                <div style={{
                    maxWidth: labelRowMaxLabelWidth
                }}>
                    {renderFormattedContent(endLabelComp, props.languageCode, undefined, props.dateLocales)}
                </div>
            </div>
        </div>;

        const rowClassName = rowDef.style?.find(st => st.key === 'withLabelRowModeClassName')?.value;

        return <li
            key={rowKey}
            className={clsx(
                "py-2 w-full",
                {
                    "pb-0": isLast,
                    "pt-0": isfirst,
                },
                rowClassName,
            )}
        >
            {labelOnTop ? labelRow : null}
            <RadioGroup
                className='flex'
                aria-describedby={rowKey + 'label'}
                value={getRowResponseValue(rowKey)}
                onValueChange={(value) => setResponseForRow(rowKey, value)}
            >
                {options.items.map((option) => {
                    const optionKey = option.key;

                    return <Label
                        key={optionKey}
                        className={cn("grow w-full flex flex-col p-2 justify-center items-center space-y-2 cursor-pointer hover:bg-black/5 rounded-[--survey-card-border-radius-sm]",
                            {
                                'bg-black/5': isResponseSet(rowKey, option.key)
                            }
                        )}
                    >
                        {labelOnTop ? null : <span className=''>{option.key}</span>}
                        <RadioGroupItem
                            className='bg-white size-5'
                            value={option.key || ''}
                        />
                        {labelOnTop ? <span className=''>{option.key}</span> : null}
                    </Label>
                })}

            </RadioGroup>
            {!labelOnTop ? labelRow : null}
        </li>
    }

    const renderWithLabelRowMode = (namePrefix: string) => {
        if (!isItemGroupComponent(props.compDef)) {
            return <p>Empty</p>;
        }

        if (!options) {
            return <p>No options found.</p>;
        }

        const rows = props.compDef.items.filter(item => item.role === "row");
        return <ul className='divide-y divide-[--survey-card-table-border-color]'>
            {rows.map((item, index) => {
                if (item.displayCondition === false) {
                    return null;
                }
                const labelOnTop = props.compDef.style?.find(s => s.key === 'labelRowPosition')?.value === 'top';
                const labelRowMaxLabelWidth = props.compDef.style?.find(s => s.key === 'labelRowMaxLabelWidth')?.value;
                return getSingleItemWithLabelRow(item, options, index === 0, index === rows.length - 1, labelOnTop, namePrefix, labelRowMaxLabelWidth);
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

        const useFixedLayout = props.compDef.style?.find(st => st.key === 'tableModeLayout')?.value === 'fixed';
        const labelColWidth = props.compDef.style?.find(st => st.key === 'tableModeLabelColWidth')?.value;
        const tableClassName = props.compDef.style?.find(st => st.key === 'tableModeClassName')?.value;


        return <table className={cn(
            "table m-0 ",
            tableClassName,
            {
                'table-fixed': useFixedLayout
            }
        )}
        >
            <thead>
                <tr>
                    <th scope="col"></th>

                    {options.items.map(item => <th
                        key={props.compDef + '.' + item.key}
                        scope="col"
                        className="text-center p-1"
                    >
                        {item.key}
                    </th>)}
                    <th scope="col"></th>

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
                            if (!isItemGroupComponent(item)) {
                                rowContent = <span key={item.key}>Row labels are missing</span>
                                break;
                            }

                            const startLabelComp = item.items.find(l => l.role === "start");
                            const endLabelComp = item.items.find(l => l.role === "end");
                            if (!startLabelComp || !endLabelComp) {
                                rowContent = <span key={item.key}>Row labels are missing</span>
                                break;
                            }
                            const htmlKey = `${namePrefix}.${props.parentKey}.${item.key}-table`;
                            rowContent = <React.Fragment>
                                <td scope="row"
                                    className="text-start text-balance"
                                    style={labelColWidth ? {
                                        width: labelColWidth
                                    } : undefined}
                                >
                                    {renderFormattedContent(startLabelComp, props.languageCode, undefined, props.dateLocales)}
                                </td>
                                {options.items.map(oi => {
                                    const optionKey = `${props.compDef.key}.${item.key}.${oi.key}`;
                                    return <td
                                        key={optionKey + 'cell'}
                                        className="text-center align-middle"
                                    >
                                        <label
                                            className='h-full w-full p-2 cursor-pointer hover:bg-black/5 flex items-center justify-center rounded-[--survey-card-border-radius-sm]'
                                            htmlFor={optionKey}
                                        >
                                            <input
                                                className="form-check-input cursor-pointer size-5"
                                                type="radio"
                                                id={optionKey}
                                                name={htmlKey}
                                                onChange={radioSelectionChanged(item.key)}
                                                value={oi.key}
                                                checked={isResponseSet(item.key, oi.key)}
                                            />
                                            <span className='sr-only'>
                                                {oi.key}
                                            </span>
                                        </label>
                                    </td>
                                })}
                                <td scope="row"
                                    className="text-end text-balance"
                                    style={labelColWidth ? {
                                        width: labelColWidth
                                    } : undefined}
                                >
                                    {renderFormattedContent(endLabelComp, props.languageCode, undefined, props.dateLocales)}
                                </td>
                            </React.Fragment>
                            break;
                        case 'options':
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
    }

    const renderMode = (mode: Variant, namePrefix: string) => {
        switch (mode) {
            case 'vertical':
                return renderVerticalMode(namePrefix);
            case 'withLabelRow':
                return renderWithLabelRowMode(namePrefix);
            case 'table':
                return renderTableMode(namePrefix);
            default:
                return <p>unknown mode: {mode}</p>
        }
    }

    return (
        <div className='px-[--survey-card-px-sm] @md:px-[--survey-card-px]'>
            {getResponsiveModes(width, renderMode, props.compDef.style)}
        </div>
    );
};

export default ResponsiveBipolarLikertScaleArray;
