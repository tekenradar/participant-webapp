import React from 'react';
import Image from 'next/image';
import Container from './container';
import clsx from 'clsx';

interface FullwidthImageWithContentProps {
    children?: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    sectionClassName?: string;
    imageClassName?: string;
}

const FullwidthImageWithContent: React.FC<FullwidthImageWithContentProps> = (props) => {
    return (
        <section className={clsx("relative w-full h-96 max-h-96", props.sectionClassName)}>
            <Image
                src={props.imageSrc}
                alt={props.imageAlt}
                className={clsx('object-cover z-0', props.imageClassName)}
                fill={true}
                priority={true}
            />
            {props.children && <Container
                className='relative h-full py-3 flex items-center'
            >
                <div className='z-10'>
                    <div
                        className='p-6 rounded-md bg-white/90 shadow max-w-[500px]'
                    >
                        {props.children}
                    </div>
                </div>
            </Container>}
        </section>
    );
};

export default FullwidthImageWithContent;
