import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div
            className={clsx('px-4 lg:container lg:mx-auto', className)}
        >
            {children}
        </div>
    );
};

export default Container;
