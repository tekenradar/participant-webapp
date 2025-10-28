import React, { useEffect, useState } from 'react';
import { isItemGroupComponent } from 'survey-engine/data_types';
import { CommonResponseComponentProps, getItemComponentByRole, getLocaleStringTextByCode } from '../../utils';
import VerticalSlider from './VerticalSlider';

interface EQ5DHealthIndicatorInputProps extends CommonResponseComponentProps {
    isRequired: boolean;
    updateDelay?: number;
}

const EQ5DHealthIndicatorInput: React.FC<EQ5DHealthIndicatorInputProps> = (props) => {
    const [touched, setTouched] = useState(false);
    const [value, setValue] = useState<number | undefined>(props.prefill && props.prefill.value ? parseInt(props.prefill.value) : undefined);

    useEffect(() => {
        if (touched) {
            const timer = setTimeout(() => {
                props.responseChanged({
                    key: props.compDef.key ? props.compDef.key : 'no key found',
                    dtype: 'int',
                    value: value?.toFixed()
                });
            }, props.updateDelay !== undefined ? props.updateDelay : 200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!isItemGroupComponent(props.compDef)) {
        return null;
    };

    const instructionComp = getItemComponentByRole(props.compDef.items, 'instruction');
    const minValueComp = getItemComponentByRole(props.compDef.items, 'mintext');
    const maxValueComp = getItemComponentByRole(props.compDef.items, 'maxtext');
    const valueBoxComp = getItemComponentByRole(props.compDef.items, 'valuebox');

    const renderInstruction = () => {
        if (!instructionComp) {
            return null;
        }
        return (<h6>
            {getLocaleStringTextByCode(instructionComp.content, props.languageCode)}
            {props.isRequired ?
                <span className="ms-2 text-primary">
                    {'*'}
                </span> : null}
        </h6>
        );
    }

    const renderValueBox = () => {
        return <div className="inline-flex flex-wrap bg-primary text-primary-foreground p-2 rounded-[--survey-card-border-radius]">
            {valueBoxComp ? getLocaleStringTextByCode(valueBoxComp.content, props.languageCode) : null}
            <span className="ms-2">{value}</span>
        </div>
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col relative">
                <div className="absolute">
                    {renderInstruction()}
                </div>

                <div className="grow flex items-center justify-end">
                    {renderValueBox()}
                </div>
            </div>
            <div className="grow">
                <div className="text-center" style={{ maxWidth: 180 }}>
                    <VerticalSlider
                        value={value}
                        onChange={(value) => {
                            setTouched(true);
                            setValue(value);
                        }}
                        maxValueText={getLocaleStringTextByCode(maxValueComp?.content, props.languageCode)}
                        minValueText={getLocaleStringTextByCode(minValueComp?.content, props.languageCode)}
                    />
                </div>
            </div>
        </div >
    );
};

export default EQ5DHealthIndicatorInput;
