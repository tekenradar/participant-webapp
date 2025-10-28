'use client';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CloseResultsBtnProps {
    closeAriaLabel?: string;
}

const CloseResultsBtn: React.FC<CloseResultsBtnProps> = (props) => {
    const router = useRouter();

    return (
        <Button
            className="absolute right-1 top-1"
            variant="ghost"
            size='icon'
            onClick={() => {
                router.back();
            }}
        >
            <span className="sr-only">
                {props.closeAriaLabel ?? 'Close'}
            </span>

            <XIcon />
        </Button>
    );
};

export default CloseResultsBtn;
