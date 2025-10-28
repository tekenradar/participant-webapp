import React, { useState, useEffect } from 'react';
import { ResponseItem, ItemGroupComponent } from 'survey-engine/data_types';
import { getLocaleStringTextByCode, getItemComponentByRole, CommonResponseComponentProps } from '../../utils';
import DropDownGroup from './DropDownGroup';
import TextViewComponent from '../../SurveyComponents/TextViewComponent';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Time from './Time';
import DateInput from '../DateInput/DateInput';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '@/components/ui/label';


type MatrixProps = CommonResponseComponentProps

export enum MatrixCellType {
    Text = 'text',
    TextInput = 'input',
    NumberInput = 'numberInput',
    DateInput = 'dateInput',
    TimeInput = 'timeInput',
    Dropdown = 'dropDownGroup',
    Checkbox = 'checkbox',
}

export enum MatrixRowType {
    HeaderRow = 'headerRow',
    ResponseRow = 'responseRow',
}


const Matrix: React.FC<MatrixProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);


    const handleCellResponseChange = (rowKey: string | undefined, itemKey: string | undefined) => (response: ResponseItem | undefined) => {
        if (!rowKey || !itemKey) { return; }
        setTouched(true);

        setResponse(prev => {
            if (!prev || !prev.items) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{
                        key: rowKey, items: response ? [response] : []
                    }]
                }
            }

            const rowIndex = prev.items.findIndex(item => item.key === rowKey);
            const items = [...prev.items];
            if (rowIndex > -1) {
                const currentItems = items[rowIndex].items;
                if (!currentItems) {
                    console.warn('row doesnt have items');
                    return prev;
                }
                const itemIndex = currentItems.findIndex(it => it.key === itemKey);
                if (itemIndex > -1) {
                    if (!response) {
                        currentItems.splice(itemIndex, 1);
                    } else {
                        currentItems[itemIndex] = response;
                    }
                } else if (response) {
                    currentItems.push(response);
                }
                items[rowIndex].items = [...currentItems];
            } else {
                items.push({
                    key: rowKey, items: response ? [response] : []
                });
            }

            return {
                ...prev,
                items: items
            }
        });
    }

    const getCellResponse = (rowKey: string | undefined, itemKey: string | undefined): ResponseItem | undefined => {
        if (!rowKey || !itemKey) { return undefined; }

        if (!response || !response.items || response.items.length < 1) {
            return undefined;
        }
        const rowResponse = response.items.find(item => item.key === rowKey);
        if (!rowResponse || !rowResponse.items || rowResponse.items.length < 1) { return undefined; }
        const resp = rowResponse.items.find(item => item.key === itemKey);
        return resp;
    }

    const isResponseSet = (rowKey: string | undefined, itemKey: string | undefined): boolean => {
        if (!getCellResponse(rowKey, itemKey)) {
            return false;
        }
        return true;
    }

    const checkboxSelectionChanged = (rowKey: string | undefined, columnKey: string | undefined) => (checked: boolean) => {
        if (!rowKey || !columnKey) { return; }
        setTouched(true);

        if (checked) {
            handleCellResponseChange(rowKey, columnKey)({
                key: columnKey,
            });
            return;
        } else {
            handleCellResponseChange(rowKey, columnKey)(undefined);
            return;
        }
    }

    const matrixDef = (props.compDef as ItemGroupComponent);

    const headerRow = getItemComponentByRole(matrixDef.items, MatrixRowType.HeaderRow);
    const renderResponseRow = (compDef: ItemGroupComponent): React.ReactNode => {
        const rowLabel = getLocaleStringTextByCode(compDef.content, props.languageCode) || '';
        const rowKey = [props.parentKey, compDef.key].join('.');

        return <div
            key={rowKey}
            role="row"
            className="flex flex-col md:flex-row  border-b border-[--survey-card-table-border-color] last:border-b-0">
            <div role='rowheader'
                className="font-bold flex-1 px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-1.5 md:hidden">
                {rowLabel}
            </div>


            <div className='flex flex-col @md:flex-row grow px-[--survey-card-px-sm] @md:px-[--survey-card-px] -mx-2 md:items-center'>
                <div role="rowheader" className="hidden md:flex font-bold flex-1 min-w-0 px-2 py-1.5">
                    {rowLabel}
                </div>
                {compDef.items.map((cell, cindex) => {
                    const cellKey = [rowKey, cell.key].join('.');
                    const headerLabel = (headerRow) && getLocaleStringTextByCode((headerRow as ItemGroupComponent).items.at(cindex)?.content, props.languageCode) || '';

                    let inputSlot = <p>No input slot found</p>;
                    switch (cell.role) {
                        case MatrixCellType.Dropdown:
                            inputSlot = <DropDownGroup
                                compDef={cell}
                                embedded={true}
                                languageCode={props.languageCode}
                                responseChanged={handleCellResponseChange(compDef.key, cell.key)}
                                prefill={getCellResponse(compDef.key, cell.key)}
                                fullWidth={true}
                                parentKey={cellKey}
                                dateLocales={props.dateLocales}
                            />
                            break;
                        case MatrixCellType.Text:
                            inputSlot = <TextViewComponent
                                key={cell.key}
                                compDef={cell}
                                languageCode={props.languageCode}
                                embedded={true}
                                className='text-center'
                            />;
                            break;
                        case MatrixCellType.TextInput:
                            inputSlot = <TextInput
                                parentKey={props.parentKey}
                                key={cell.key}
                                compDef={cell}
                                embedded={true}
                                languageCode={props.languageCode}
                                responseChanged={handleCellResponseChange(compDef.key, cell.key)}
                                prefill={getCellResponse(compDef.key, cell.key)}
                                updateDelay={5}
                                dateLocales={props.dateLocales}
                            />;
                            break;
                        case MatrixCellType.NumberInput:
                            inputSlot = <NumberInput
                                parentKey={props.parentKey}
                                key={cell.key}
                                compDef={cell}
                                embedded={true}
                                languageCode={props.languageCode}
                                responseChanged={handleCellResponseChange(compDef.key, cell.key)}
                                prefill={getCellResponse(compDef.key, cell.key)}
                                dateLocales={props.dateLocales}
                            />;
                            break;
                        case MatrixCellType.TimeInput:
                            inputSlot = <Time
                                parentKey={props.parentKey}
                                defaultClassName='justify-center'
                                key={cell.key}
                                compDef={cell}
                                embedded={true}
                                languageCode={props.languageCode}
                                responseChanged={handleCellResponseChange(compDef.key, cell.key)}
                                prefill={getCellResponse(compDef.key, cell.key)}
                                dateLocales={props.dateLocales}
                            />
                            break;
                        case MatrixCellType.DateInput:
                            inputSlot = <DateInput
                                parentKey={props.parentKey}
                                key={cell.key}
                                compDef={cell}
                                embedded={true}
                                languageCode={props.languageCode}
                                responseChanged={handleCellResponseChange(compDef.key, cell.key)}
                                prefill={getCellResponse(compDef.key, cell.key)}
                                openCalendar={false}
                                dateLocales={props.dateLocales}
                            />;
                            break;
                        case MatrixCellType.Checkbox:
                            inputSlot = <Label className='-my-2 py-2 px-1 flex items-center gap-2 justify-center cursor-pointer hover:bg-black/5 rounded-[--survey-card-border-radius-sm]'>
                                <Checkbox
                                    className='bg-background size-5'
                                    checked={isResponseSet(compDef.key, cell.key)}
                                    value={cell.key}
                                    onCheckedChange={checkboxSelectionChanged(compDef.key, cell.key)}
                                />
                                <span className='text-balance'>
                                    <span className='sr-only'>{cell.key}</span>
                                    {getLocaleStringTextByCode(cell.content, props.languageCode)}
                                </span>
                            </Label>
                            break;
                        default:
                            inputSlot = <p>Unknown role: {cell.role}</p>;
                            break;
                    }



                    return <div key={cellKey}
                        role="cell" className="flex-1 px-2 py-0.5">
                        <div className='block md:hidden text-sm font-semibold mb-1' role="columnheader">
                            {headerLabel}
                        </div>
                        <div className='my-2'>
                            {inputSlot}
                        </div>
                    </div>
                })}
            </div>
        </div>
    }

    const renderTableRow = (compDef: ItemGroupComponent): React.ReactNode => {
        if (compDef.displayCondition === false) {
            return null;
        }
        switch (compDef.role) {
            /*case 'radioRow':
                return renderRadioRow(compDef, index);
                */
            case MatrixRowType.ResponseRow:
                return renderResponseRow(compDef);
            case MatrixRowType.HeaderRow:
                // header is already rendered separately
                return null;
            default:
                console.warn('row role for matrix question unknown: ', compDef.role);
                return null;
        }
    }

    const renderHeaderRow = (header: ItemGroupComponent | undefined): React.ReactNode => {
        if (!header) {
            return null;
        }

        const cells = header.items.map((cell, index) => {
            let currentCellContent: React.ReactNode | null;
            switch (cell.role) {
                case MatrixCellType.Text:
                    currentCellContent = getLocaleStringTextByCode(cell.content, props.languageCode);
                    break;
                default:
                    console.warn('cell role for matrix header unknown: ', cell.role);
                    break;
            }
            return <div
                key={cell.key ? cell.key : index.toString()}
                role="columnheader" className="font-bold flex-1 truncate px-2 py-1.5 text-center"
            >
                {currentCellContent}
            </div>
        });

        return <div role="rowgroup" className="hidden md:flex border-b border-[--survey-card-table-border-color] w-full">
            <div role="row" className='flex flex-col @md:flex-row w-full px-[--survey-card-px-sm] @md:px-[--survey-card-px] grow -mx-2'>
                <div role="columnheader" className="font-bold flex-1 px-2 py-1.5"></div>
                {cells}
            </div>

        </div>
    }


    return (
        <div role="table" className="flex flex-col">
            {/* Table Header for large screens */}
            {renderHeaderRow(headerRow as ItemGroupComponent)}
            {/* Rows */}
            {matrixDef.items.map((row) => renderTableRow(row as ItemGroupComponent))}
        </div >)
};

export default Matrix;
