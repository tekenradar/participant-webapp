import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

interface SimpleLoaderProps {
    ariaLabel?: string;
    className?: string;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ ariaLabel = 'Loading...', className }) => {
    return (
        <div className={cn("flex items-center justify-center h-96", className)}>
            <Loader
                className='size-8 animate-spin'
                aria-label={ariaLabel}
            />
        </div>
    );
};

export default SimpleLoader;
