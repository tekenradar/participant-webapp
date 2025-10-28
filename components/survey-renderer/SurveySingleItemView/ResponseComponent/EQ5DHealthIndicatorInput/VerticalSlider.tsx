import React, { useRef, useState } from 'react';
import clsx from 'clsx';

interface VerticalSliderProps {
    value?: number;
    onChange: (value: number | undefined) => void;
    maxValueText?: string;
    minValueText?: string;
}

const tickLength = {
    major: 32,
    minor: 16
};
const tickHeight = 2;
const tickDistance = 5;

const handlerRadius = 12;
const dragAreaHeight = 120;

const getSingleTick = (major: boolean) => {
    return <div
        className={
            clsx(
                {
                    'bg-gray-700': major,
                    'bg-gray-500': !major
                })
        } style={{
            width: major ? tickLength.major : tickLength.minor,
            height: tickHeight
        }}>
    </div>
}

const getTickLabel = (value: number, isMajor: boolean) => {
    if (!isMajor) {
        return null;
    }
    return (<div className="absolute"
        style={{
            left: '70%'
        }}
    >
        {value.toFixed()}
    </div>)
}

const getTickItem = (index: number) => {
    const value = (100 - index);
    const isDecimal = value % 10 === 0;
    return <div
        key={index.toFixed()}
        className="flex justify-center items-center relative"
        style={{
            height: tickDistance,
            // touchAction: 'none'
        }}
    >
        {getSingleTick(isDecimal)}
        {getTickLabel(value, isDecimal)}
    </div>
}

const VerticalSlider: React.FC<VerticalSliderProps> = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const renderTicks = () => {
        return (
            <React.Fragment>
                {Array(101).fill(0).map(
                    (_, index: number) =>
                        getTickItem(index)
                )}
            </React.Fragment>
        )
    }

    const renderHandle = () => {
        if (props.value === undefined) { return null; }

        return <React.Fragment>
            <div className="text-center flex justify-center w-full absolute"
                style={{
                    top: `calc(${100 - props.value}*${tickDistance}px + 15px + ${tickDistance - tickHeight}px - ${handlerRadius}px)`
                }}
            >
                <div className="bg-primary rounded-full"
                    style={{
                        height: handlerRadius * 2,
                        width: handlerRadius * 2,
                        touchAction: 'none'

                    }}
                ></div>
            </div>
            <div className="text-center flex justify-center w-full absolute"
                style={{
                    top: `calc(${100 - props.value}*${tickDistance}px + 15px + ${tickDistance - tickHeight}px - ${dragAreaHeight / 2}px)`,
                    touchAction: 'none',
                    height: dragAreaHeight,
                }}
            >
            </div>
        </React.Fragment>
    }

    const computeNewValue = (clientY: number): number | undefined => {
        const top = sliderRef.current?.getBoundingClientRect().top;
        const height = sliderRef.current?.getBoundingClientRect().height;
        if (!top || !height) { return; }
        const value = Math.min(Math.max(1 - (clientY - top - 17) / (height - 35), 0), 1);
        return Math.round(value * 100);
    }

    const mouseHandler = (event: React.MouseEvent) => {
        const value = computeNewValue(event.clientY);
        props.onChange(value);
    }

    const downEvent = (clientY: number) => {
        const value = computeNewValue(clientY);
        if (value === undefined) { return; }
        // props.onChange(value);
        if (Math.abs((props.value !== undefined ? props.value : 50) - value) < 20) {
            setIsDragging(true)
        }
    }

    return (
        <div className="focus-within:outline-none rounded focus-within:ring-2 focus-within:ring-primary/50">
            {props.maxValueText ?
                <p className="m-0 font-bold select-none">
                    {props.maxValueText}
                </p>
                : null
            }
            <input
                className="absolute top-0 left-0 w-0 h-0 opacity-0"
                type="number"
                value={props.value !== undefined ? props.value : 50}
                min={0}
                max={100}
                onChange={({ target: { value } }) => {
                    if (value === undefined || value === '') {
                        return;
                    }
                    props.onChange(parseInt(value));
                }}
            />

            <div
                className="py-4 relative select-none cursor-pointer"
                ref={sliderRef}
                onClick={mouseHandler}
                onMouseMove={(event) => {
                    if (isDragging && event.buttons > 0) {
                        mouseHandler(event);
                    }
                }}
                onMouseDown={(event) => {
                    downEvent(event.clientY);
                }}
                onTouchStart={(event) => {
                    downEvent(event.touches[0].clientY);
                }}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
                onTouchMove={(event) => {
                    if (!isDragging) { return }
                    const value = computeNewValue(event.touches[0].clientY);
                    if (value === undefined) { return; }
                    props.onChange(value);
                    if (Math.abs((props.value ? props.value : 50) / 100 - value) < 0.2) {
                        setIsDragging(true)
                    }
                }}
            >
                {renderTicks()}
                {renderHandle()}
            </div>

            {props.minValueText ?
                <p className="m-0 font-bold select-none">
                    {props.minValueText}
                </p>
                : null
            }

        </div>

    );
};

export default VerticalSlider;
