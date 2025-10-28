import React, { useState, useEffect } from 'react';
import { ResponseItem } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getClassName, getLocaleStringTextByCode } from '../../utils';
import { format } from 'date-fns';
import { addYears, getUnixTime } from 'date-fns';
import YearMonthSelector from './YearMonthSelector';
import clsx from 'clsx';
import { CalendarDaysIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import 'react-day-picker/dist/style.css';


interface DateInputProps extends CommonResponseComponentProps {
    openCalendar: boolean | undefined;
    defaultClassName?: string;
    embedded?: boolean;
    hideLabel?: boolean;
}

const DateInput: React.FC<DateInputProps> = (props) => {
    const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
    const [touched, setTouched] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        props.prefill && props.prefill.value ? new Date(parseInt(props.prefill.value) * 1000) : undefined,
    );

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged(response);
            }, 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const handleDateChange = (date: Date | undefined) => {
        setTouched(true);

        setSelectedDate(date);
        if (!date) {
            setResponse(undefined);
            return;
        }

        setResponse(prev => {
            if (!date) { return undefined; }
            if (!prev) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    dtype: 'date',
                    value: getUnixTime(date).toString(),
                }
            }
            return {
                ...prev,
                dtype: 'date',
                value: getUnixTime(date).toString(),
            }
        });
    }

    const minDate = props.compDef.properties?.min ? new Date((props.compDef.properties?.min as number) * 1000) : new Date(1900, 1);
    const maxDate = props.compDef.properties?.max ? new Date((props.compDef.properties?.max as number) * 1000) : addYears(new Date(), 100);

    let datepicker = <p>{'...'}</p>;
    switch (props.compDef.properties?.dateInputMode) {
        case 'YM':
            datepicker = <YearMonthSelector
                currentDate={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleDateChange}
                languageCode={props.languageCode}
                dateLocales={props.dateLocales}
            />
            break;
        case 'Y':
            datepicker = <YearMonthSelector
                currentDate={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                onlyYear={true}
                onChange={handleDateChange}
                languageCode={props.languageCode}
                dateLocales={props.dateLocales}
            />
            break;
        default:
            datepicker = <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarDaysIcon className="m-1 hidden @md:inline-block size-4" />
                        {selectedDate ? format(selectedDate, "PPP", {
                            locale: props.dateLocales?.find(dl => dl.code === props.languageCode)?.locale
                        }) : <span className='truncate'>
                            {getLocaleStringTextByCode(props.compDef.description, props.languageCode)}
                        </span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        locale={props.dateLocales?.find(dl => dl.code === props.languageCode)?.locale}
                        captionLayout="dropdown-buttons"
                        selected={selectedDate}
                        fromDate={minDate}
                        toDate={maxDate}
                        onSelect={handleDateChange}
                        initialFocus
                        className='p-0'
                        classNames={{
                            caption_label: 'flex items-center text-sm font-medium',
                            dropdown: 'rdp-dropdown bg-card',
                            dropdown_icon: 'ml-2',
                            dropdown_year: 'rdp-dropdown_year ml-3',
                            button: '',
                            button_reset: '',
                        }}
                    />
                </PopoverContent>
            </Popover>
            break;
    }

    const labelText = getLocaleStringTextByCode(props.compDef.content, props.languageCode);

    return (
        <div className={clsx(
            props.defaultClassName,
            "flex items-center gap-2 grow flex-wrap md:flex-nowrap",
            {
                'px-[--survey-card-px-sm] @md:px-[--survey-card-px]': !props.embedded,
            },
            getClassName(props.compDef.style),
        )}>
            {labelText ? <label className={cn(
                {
                    "sr-only": props.hideLabel
                }
            )}
                htmlFor={props.parentKey}
            >
                {labelText}
            </label>
                : null}
            {datepicker}
        </div >
    );
};

export default DateInput;
