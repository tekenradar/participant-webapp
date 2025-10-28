import { Loader } from 'lucide-react';
import React from 'react';


const SimpleLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-96">
            <Loader
                className='size-8 animate-spin'
                aria-label='Loading...'
            />
        </div>
    );
};

export default SimpleLoader;
