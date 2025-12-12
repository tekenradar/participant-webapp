'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import React from 'react';

interface ConfirmExitProps {
    open: boolean;
    onClose: (accept: boolean) => void;
    messages: {
        title: string;
        description: string;
        confirmBtn: string;
        cancelBtn: string;
    }
}

const ConfirmExit: React.FC<ConfirmExitProps> = (props) => {
    return (
        <AlertDialog
            open={props.open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {props.messages.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.messages.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            props.onClose(false);
                        }}
                    >
                        {props.messages.cancelBtn}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            props.onClose(true);
                        }}
                    >
                        {props.messages.confirmBtn}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmExit;
