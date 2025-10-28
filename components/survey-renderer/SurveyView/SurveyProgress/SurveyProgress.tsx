import React from 'react';
import clsx from 'clsx';

interface SurveyProgressProps {
    currentIndex: number;
    totalCount: number;
}
const maxPageBarWidth = 45;

const SurveyProgress: React.FC<SurveyProgressProps> = (props) => {
    return (

        <div
            className="flex w-full items-center justify-center"
            style={{ height: 5 }}
        >
            <div className="flex justify-evenly h-full max-w-full"
                style={{ width: (maxPageBarWidth + 10) * props.totalCount }}
            >
                {
                    Array.from(Array(props.totalCount).keys()).map(
                        index => (
                            <div
                                key={index.toString()}
                                className={
                                    clsx(
                                        'h-full rounded-[--survey-card-border-radius-sm]',
                                        'grow',
                                        {
                                            'bg-[--survey-card-header-bg]': index > props.currentIndex,
                                            'bg-primary': index <= props.currentIndex,
                                        })}
                                style={{ maxWidth: maxPageBarWidth }}
                            >
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SurveyProgress;
