import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { isItemGroupComponent, ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { renderFormattedContent } from '../../renderUtils';
import { CommonResponseComponentProps, getClassName, getLocaleStringTextByCode, getStyleValueByKey } from '../../utils';
import { getBreakpointValue } from './responsiveUtils';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CircleXIcon, DotIcon } from 'lucide-react';
import { useSurveyItemCtx } from '../../survey-item-context';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

type ResponsiveMatrixProps = CommonResponseComponentProps

const ResponsiveMatrix: React.FC<ResponsiveMatrixProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);
    const { width = 0 } = useSurveyItemCtx();

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const className = getClassName(props.compDef.style);
    const breakpoint = getStyleValueByKey(props.compDef.style, 'breakpoint');
    const responseType = getStyleValueByKey(props.compDef.style, 'responseType');

    const getDropdownOptionsDef = () => (props.compDef as ItemGroupComponent).items?.find(item => item.role === 'dropdownOptions');
    const getInputOptionsDef = () => (props.compDef as ItemGroupComponent).items?.find(item => item.role === 'inputOptions');
    const getNumberInputOptionsDef = () => (props.compDef as ItemGroupComponent).items?.find(item => item.role === 'numberInputOptions');

    const getColumns = () => {
        if (!isItemGroupComponent(props.compDef)) {
            console.warn('responsive matrix: no components found.');
            return;
        }
        const colItems = props.compDef.items.find(item => item.role === 'columns') as ItemGroupComponent;
        return colItems.items;
    }

    const getRows = (): ItemGroupComponent | undefined => {
        if (!isItemGroupComponent(props.compDef)) {
            console.warn('responsive matrix: no components found.');
            return;
        }
        const rows = props.compDef.items.find(item => item.role === 'rows') as ItemGroupComponent;
        return rows;
    }

    const handleResponseChange = (responseSlotKey: string, value?: string) => {
        if (value === undefined) {
            // item is unselected - remove from response array
            setResponse(prev => {
                if (!prev || !prev.items) {
                    return undefined;
                }

                const rowIndex = prev.items.findIndex(item => item.key === responseSlotKey);
                const items = [...prev.items];
                if (rowIndex > -1) {
                    items.splice(rowIndex, 1);
                    // items[rowIndex].items = [{ key: value }];
                }
                if (items.length < 1) {
                    return undefined;
                }
                return {
                    ...prev,
                    items: items
                }
            });
            return;
        }
        setTouched(true);
        setResponse(prev => {
            if (!prev || !prev.items) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{
                        key: responseSlotKey, value: value
                    }]
                }
            }

            const rowIndex = prev.items.findIndex(item => item.key === responseSlotKey);
            const items = [...prev.items];
            if (rowIndex > -1) {
                items[rowIndex].value = value;
            } else {
                items.push({
                    key: responseSlotKey, value: value
                });
            }

            return {
                ...prev,
                items: items
            }
        });
    }

    const getSlotValue = (responseSlotKey: string): string => {
        if (!response || !response.items) {
            return '';
        }

        const resp = response.items.find(item => item.key === responseSlotKey);
        return resp?.value ? resp.value : '';
    }

    const renderDropdown = (rowKey: string, colKey: string, prefix: string) => {
        const dropdownOptions = getDropdownOptionsDef()
        if (!dropdownOptions || !isItemGroupComponent(dropdownOptions)) {
            return null;
        }

        const id = `${prefix}-${rowKey}-${colKey}`;
        const responseSlotKey = `${rowKey}-${colKey}`;
        const currentValue = getSlotValue(responseSlotKey);
        return <Select
            value={currentValue}
            onValueChange={(value: string) => {
                if (value === 'undefined') {
                    handleResponseChange(responseSlotKey, undefined);
                    return;
                }
                handleResponseChange(responseSlotKey, value);
            }}
        >
            <SelectTrigger
                id={id}
            >
                <SelectValue
                    placeholder={getLocaleStringTextByCode(dropdownOptions?.content, props.languageCode)}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <span className='flex justify-center bg-muted/50 rounded-sm'>
                        <DotIcon className='size-3 text-muted-foreground' />
                    </span>
                    {currentValue && <SelectItem
                        value='undefined'
                        className='text-muted-foreground'
                    >
                        <span className='flex items-center gap-2'>
                            <span className='flex-shrink-0'>
                                <CircleXIcon className='size-3' />
                            </span>
                            {getLocaleStringTextByCode(dropdownOptions?.description, props.languageCode)}
                        </span>

                    </SelectItem>}
                    <SelectSeparator />
                    {
                        dropdownOptions.items.map((option, index) => {
                            return <SelectItem key={option.key} value={option.key || index.toString()}>{getLocaleStringTextByCode(option.content, props.languageCode)}</SelectItem>
                        })
                    }
                    <span className='flex justify-center bg-muted/50 rounded-sm'>
                        <DotIcon className='size-3 text-muted-foreground' />
                    </span>
                </SelectGroup>
            </SelectContent>
        </Select >
    }

    const renderTextInput = (rowKey: string, colKey: string) => {
        const inputOptions = getInputOptionsDef();

        const responseSlotKey = `${rowKey}-${colKey}`;

        // Create a mock component definition for the TextInput
        const mockCompDef: ItemComponent = {
            key: responseSlotKey,
            role: 'input',
            content: inputOptions?.content,
            description: inputOptions?.description,
            style: inputOptions?.style,
            disabled: inputOptions?.disabled,
        };

        // Get current value for this cell
        const currentValue = getSlotValue(responseSlotKey);
        const prefill = currentValue !== '' ? { key: responseSlotKey, value: currentValue } : undefined;

        return <TextInput
            compDef={mockCompDef}
            prefill={prefill}
            responseChanged={(response) => {
                if (!response || !response.value) {
                    handleResponseChange(responseSlotKey, undefined);
                } else {
                    handleResponseChange(responseSlotKey, response.value);
                }
            }}
            languageCode={props.languageCode}
            dateLocales={props.dateLocales}
            embedded={true}
            hideLabel={true}
            nonFullWidth={true}
            parentKey={`${props.parentKey}`}
            updateDelay={200}
        />
    }

    const renderNumberInput = (rowKey: string, colKey: string) => {
        const numberInputOptions = getNumberInputOptionsDef();
        const responseSlotKey = `${rowKey}-${colKey}`;

        // Create a mock component definition for the NumberInput
        const mockCompDef: ItemComponent = {
            key: responseSlotKey,
            role: 'numberInput',
            content: numberInputOptions?.content,
            description: numberInputOptions?.description,
            style: numberInputOptions?.style,
            disabled: numberInputOptions?.disabled,
            properties: {
                min: getStyleValueByKey(numberInputOptions?.style, 'min') ? parseFloat(getStyleValueByKey(numberInputOptions?.style, 'min')!) : undefined,
                max: getStyleValueByKey(numberInputOptions?.style, 'max') ? parseFloat(getStyleValueByKey(numberInputOptions?.style, 'max')!) : undefined,
                stepSize: getStyleValueByKey(numberInputOptions?.style, 'step') ? parseFloat(getStyleValueByKey(numberInputOptions?.style, 'step')!) : undefined,
            }
        };

        // Get current value for this cell
        const currentValue = getSlotValue(responseSlotKey);
        const prefill = currentValue !== 'undefined' ? { key: responseSlotKey, value: currentValue, dtype: 'number' } : undefined;

        return <NumberInput
            compDef={mockCompDef}
            prefill={prefill}
            responseChanged={(response) => {
                if (!response || !response.value) {
                    handleResponseChange(responseSlotKey, undefined);
                } else {
                    handleResponseChange(responseSlotKey, response.value);
                }
            }}
            languageCode={props.languageCode}
            dateLocales={props.dateLocales}
            embedded={true}
            hideLabel={true}
            nonFullWidth={true}
            parentKey={`${props.parentKey}`}
        />
    }

    const renderMatrixResponseCell = (rowKey: string, colKey: string, prefix: string) => {
        switch (responseType) {
            case 'input':
                return renderTextInput(rowKey, colKey);
            case 'numberInput':
                return renderNumberInput(rowKey, colKey);
            case 'dropdown':
            default:
                return renderDropdown(rowKey, colKey, prefix);
        }
    }

    const renderLargeView = () => {
        const columns = getColumns();
        if (columns === undefined) {
            return <p>No columns found.</p>
        }
        return <table className={"table w-full m-0 "}>
            <thead>
                <tr className='bg-[--survey-table-heading1-bg] sticky top-0'>
                    <th scope="col"></th>
                    {columns.map(
                        (cat: ItemComponent) => {
                            return <th scope="col"
                                key={cat.key}
                                className='px-2 py-1.5 text-center'>
                                {renderFormattedContent(cat, props.languageCode, '', props.dateLocales)}
                            </th>
                        }
                    )}
                </tr>
            </thead>
            <tbody>
                {getRows()?.items.map((row: ItemComponent) => {
                    if (row.role === 'category') {

                        return <tr
                            key={row.key}>
                            <th
                                key={row.key}
                                colSpan={columns.length + 1}
                                className={cn(
                                    'bg-[--survey-table-heading2-bg] px-2 py-1.5 text-center',
                                    getClassName(row.style))}>
                                {renderFormattedContent(row, props.languageCode, '', props.dateLocales)}
                            </th>
                        </tr>
                    }
                    return <React.Fragment key={row.key}>
                        <tr
                            className={'border-b border-[--survey-card-table-border-color] last:border-b-0'}
                        >
                            <th scope="row"
                                // rowSpan={row.items.length}
                                className={clsx(
                                    "text-start align-middle px-2 py-1.5",
                                    getClassName(row.style)
                                )}
                            >
                                {getLocaleStringTextByCode(row.content, props.languageCode)}
                            </th>
                            {columns.map(
                                (col: ItemComponent) => {
                                    return <td scope="col"
                                        key={`${row.key}_${col.key}_lg-cell`}
                                        className="text-center align-middle px-2 py-1.5"
                                    >
                                        {renderMatrixResponseCell(row.key ? row.key : '?', col.key ? col.key : '?', 'lg')}
                                    </td>
                                }
                            )}
                        </tr>
                    </React.Fragment>
                })}
            </tbody>
        </table>
    }

    const renderSmallView = () => {
        return <table className={"table w-full m-0 "}>
            <tbody>
                {getRows()?.items.map((row: ItemComponent) => {
                    if (row.role === 'category') {
                        return <tr
                            key={row.key}>
                            <th
                                key={row.key}
                                colSpan={2}
                                className={clsx('bg-[--survey-table-heading1-bg] px-2 py-1.5 text-center', getClassName(row.style))}>
                                {renderFormattedContent(row, props.languageCode, '', props.dateLocales)}
                            </th>
                        </tr>
                    }
                    return <React.Fragment key={row.key}>
                        <tr>
                            <th scope="row"
                                colSpan={2}
                                className={clsx(
                                    "text-start align-middle bg-[--survey-table-heading2-bg] px-2 py-1.5",
                                    getClassName(row.style)
                                )}
                            >
                                {getLocaleStringTextByCode(row.content, props.languageCode)}
                            </th>
                        </tr>
                        {getColumns()?.map(
                            (col: ItemComponent) => {
                                return <tr
                                    key={col.key}
                                    className={'border-b border-[--survey-card-table-border-color] last:border-b-0'}
                                >
                                    <th scope="row"
                                        className={clsx(
                                            "text-start align-middle px-2 py-1.5",
                                            getClassName(col.style)
                                        )}
                                    >
                                        {getLocaleStringTextByCode(col.content, props.languageCode)}
                                    </th>
                                    <td
                                        key={`${row.key}_${col.key}_lg-cell`}
                                        className="text-center align-middle px-2 py-1.5"
                                    >
                                        {renderMatrixResponseCell(row.key ? row.key : '?', col.key ? col.key : '?', 'sm')}
                                    </td>
                                </tr>
                            })
                        }
                    </React.Fragment>
                })
                }

            </tbody>
        </table>
    }

    let content = <p>loading...</p>
    const breakpointThreshold = getBreakpointValue(breakpoint);
    if (width < breakpointThreshold) {
        content = renderSmallView();
    } else {
        content = renderLargeView();
    }
    return <div className={cn('px-[--survey-card-px-sm] @md:px-[--survey-card-px]', className)}>
        {content}
    </div>
};

export default ResponsiveMatrix;
