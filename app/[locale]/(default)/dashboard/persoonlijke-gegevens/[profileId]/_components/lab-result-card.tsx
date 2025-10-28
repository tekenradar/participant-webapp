import { CalendarIcon } from 'lucide-react';
import React from 'react';

interface LabResultCardProps {
    locale: string;
    date: Date;
    conclusion: string;
}

const LabResultCard: React.FC<LabResultCardProps> = (props) => {


    const dateStr = props.date.toLocaleDateString(
        props.locale,
        {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

    return (
        <div className='border border-border overflow-hidden rounded px-4 py-2 relative bg-gradient-to-tr from-gray-50 to-white drop-shadow-md shadow-sm'>

            {/* deco */}
            <div
                className="absolute rounded-full size-80 right-12 -bottom-40 bg-gradient-to-tr from-secondary/25 to-secondary/50"
                aria-hidden="true"
            />
            <div
                className="absolute rounded-full size-80 -right-12 -bottom-40 bg-gradient-to-tr from-secondary/25 to-secondary/50"
                aria-hidden="true"
            />
            <div
                className="absolute rounded-full size-80 -right-32 -bottom-40 bg-gradient-to-tr from-secondary/25 to-secondary/50"
                aria-hidden="true"
            />
            <div className="absolute inset-0 backdrop-blur-md bg-white/40" />


            <div className='relative'>
                <time dateTime={dateStr}
                    className='text-sm font-bold flex items-center gap-2 mb-2'
                >
                    <span><CalendarIcon className='text-muted-foreground size-4' /></span>
                    {dateStr}</time>
                <p className="text-lg font-mono leading-relaxed">{props.conclusion}</p>
            </div>

        </div>
    );
};

export default LabResultCard;
