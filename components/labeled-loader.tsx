import React from 'react';
import { Loader } from 'lucide-react';

interface LabeledLoaderProps {
    label: string;
}

const LabeledLoader: React.FC<LabeledLoaderProps> = ({ label }) => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="flex items-center gap-3">
                <Loader className="size-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                    {label}
                </span>
            </div>
        </div>
    );
};

export default LabeledLoader;