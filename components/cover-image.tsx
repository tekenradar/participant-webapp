import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

export type CoverImagePosition = '0%' | '10%' | '20%' | '25%' | '30%' | '33%' | '40%' | '50%' | '60%' | '70%' | '75%' | '80%' | '90%' | '100%';

interface CoverImageProps {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    credits?: string;
    coverImageYPosition?: CoverImagePosition;
}

const CoverImage: React.FC<CoverImageProps> = (props) => {
    return (
        <div className="relative">
            <Image
                src={props.src}
                width={props.width}
                height={props.height}
                alt={props.alt}
                className={cn('w-full h-72 md:h-96 object-cover object-top', {
                    'object-[center_90%]': props.coverImageYPosition === '90%',
                    'object-[center_80%]': props.coverImageYPosition === '80%',
                    'object-[center_75%]': props.coverImageYPosition === '75%',
                    'object-[center_70%]': props.coverImageYPosition === '70%',
                    'object-[center_60%]': props.coverImageYPosition === '60%',
                    'object-[center_50%]': props.coverImageYPosition === '50%',
                    'object-[center_40%]': props.coverImageYPosition === '40%',
                    'object-[center_30%]': props.coverImageYPosition === '30%',
                    'object-[center_25%]': props.coverImageYPosition === '25%',
                    'object-[center_20%]': props.coverImageYPosition === '20%',
                    'object-[center_10%]': props.coverImageYPosition === '10%',
                    'object-[center_0%]': props.coverImageYPosition === '0%',
                })}
            />
            {props.credits && (<p className='absolute right-2 -bottom-5 text-xs mt-1 text-end pe-2 text-muted-foreground'>
                {props.credits}
            </p>)}
        </div>
    );
};

export default CoverImage;
