import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

type NavbarButtonProps = ButtonProps

const NavbarButton = forwardRef<HTMLButtonElement, NavbarButtonProps>((props, ref) => {
    return (
        <Button
            ref={ref}
            className={cn(
                'flex gap-4 items-center group',
                'text-lg font-medium rounded-none',
                'hover:bg-secondary/80 hover:text-secondary-foreground',
                'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-secondary/80 focus-visible:text-secondary-foreground',
            )}
            {...props}
        />
    );
});

NavbarButton.displayName = 'NavbarButton';

export default NavbarButton;