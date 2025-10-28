import React from 'react';
import { Button, ButtonProps } from './ui/button';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
    isLoading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(({
    isLoading = false,
    disabled = false,
    className,
    ...props
}, ref) => {
    return (
        <Button
            ref={ref}
            disabled={isLoading || disabled}
            className={cn('flex items-center justify-center gap-2', className)}
            {...props}
        >
            {isLoading && <Loader2 className='animate-spin size-4' />}
            {props.children}
        </Button>
    );
});

LoadingButton.displayName = 'LoadingButton';


export default LoadingButton;
