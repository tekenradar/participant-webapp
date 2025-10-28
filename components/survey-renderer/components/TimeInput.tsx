import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Input } from '@/components/ui/input';

export const preprocessTimeInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): number | undefined => {
    const value = event.target.value;
    if (!value) { return }

    const parts = value.split(':');
    if (parts.length < 2) {
        return;
    }
    const timeVal = {
        hours: parseInt(parts[0]),
        minutes: parseInt(parts[1]),
        seconds: parts.length > 2 ? parseInt(parts[2]) : 0,
    }
    return 3600 * timeVal.hours + 60 * timeVal.minutes + timeVal.seconds
}

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    label?: string;
    hasError?: boolean;
    errorMsg?: string;
    min?: string;
    max?: string;
    step?: number;
}

const TimeInput: React.FC<TimeInputProps> = (props) => {
    const { hasError, className, errorMsg, ...inputProps } = props;

    // const errorOpen = props.hasError && errorMsg && errorMsg.length > 0;

    return (
        <div className={className}>
            {inputProps.label ?
                <label
                    className={
                        "form-label"
                        //styles.inputLabel
                    }
                    htmlFor={inputProps.id}>
                    {inputProps.label}
                </label>
                : null}
            <Input
                {...inputProps}
                id={inputProps.id}
                className={clsx(
                    "form-control border-2 flex",
                    {
                        "border-danger": hasError && !props.disabled,
                        "border-0": !hasError,
                    })}
                type={'time'}
                name={inputProps.name}
                required={inputProps.required}
                placeholder={inputProps.placeholder ? inputProps.placeholder + (inputProps.required ? ' *' : '') : inputProps.placeholder}
                autoComplete={inputProps.autoComplete}
                autoFocus={inputProps.autoFocus}
                value={inputProps.value}
                onChange={inputProps.onChange}
                disabled={inputProps.disabled}
            />

            {errorMsg ?
                <p className='text-danger'>{errorMsg}</p>
                : null}
        </div>
    );
};

export default TimeInput;
