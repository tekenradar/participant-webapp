import React, { useEffect, useState } from 'react';
import { ItemComponent, ItemGroupComponent, ResponseItem } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getClassName, getLocaleStringTextByCode } from '../../utils';
import clsx from 'clsx';

type LikertScaleProps = CommonResponseComponentProps


const LikertScale: React.FC<LikertScaleProps> = (props) => {
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

    const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = (event.target as HTMLInputElement).value;
        setTouched(true);
        setResponse(prev => {
            if (!prev) {
                return {
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    items: [{ key: key }]
                }
            }

            return {
                ...prev,
                items: [{ key: key }]
            }
        });
    };

    const getSelectedKey = (): string | undefined => {
        if (!response || !response.items || response.items.length < 1) {
            return '';
        }
        return response.items[0].key;
    }

    const shouldStackOnSmallScreen = (): boolean => {
        const responseBehaviour = props.compDef.style?.find(s => s.key === 'responsive')
        return responseBehaviour?.value === 'stackOnSmallScreen';
    }

    const labelPlacementBefore = (): boolean => {
        const v = props.compDef.style?.find(s => s.key === 'labelPlacement')
        return v?.value === 'before';
    }

    const renderOption = (option: ItemComponent) => {
        const optionKey = props.parentKey + '.' + option.key;
        const isDisabled = option.disabled === true;
        const content = getLocaleStringTextByCode(option.content, props.languageCode);
        const className = getClassName(option.style);

        const radioBtn = (<div
            className={clsx(
                "text-center",
                {
                    "d-inline-block d-sm-block ": shouldStackOnSmallScreen(),
                })}
        >
            <input
                className="form-check-input cursor-pointer size-5"
                type="radio"
                name={props.parentKey}
                id={optionKey}
                value={option.key}
                checked={getSelectedKey() === option.key}
                disabled={isDisabled}
                onChange={handleSelectionChange}
            />
        </div>);

        const label = (<div

            className={clsx(
                {
                    "text-center": !className && !shouldStackOnSmallScreen(),
                    "inline-block @sm:block ms-2 ms-sm-0 text-start @sm:text-center": shouldStackOnSmallScreen()
                },
                "flex-grow-1",
                className
            )}>
            {content ? <div

                className="w-full"
            >{content}</div> : null}
        </div>);

        return <label
            key={option.key}
            htmlFor={optionKey}
            className={clsx(
                "grow",
                'hover:bg-black/5 cursor-pointer rounded-[--survey-card-border-radius-sm] py-2',
                {
                    "flex @sm:block mb-2 mb-sm-1 items-center": shouldStackOnSmallScreen(),
                })}
            style={{ flexBasis: 0 }}
        >
            {labelPlacementBefore() ? label : null}
            {radioBtn}
            {!labelPlacementBefore() ? label : null}
        </label>
    }

    return (
        <div
            id={props.parentKey}
            className={clsx(
                "flex",
                {
                    "flex-col @md:flex-row": shouldStackOnSmallScreen()
                }
            )}
            aria-label="likert scale"
        >
            {
                (props.compDef as ItemGroupComponent).items.map((option) =>
                    renderOption(option)
                    // renderResponseOption(option, (props.compDef as ItemGroupComponent).items.length - 1 === index)
                )
            }
        </div>
    );
};

export default LikertScale;
