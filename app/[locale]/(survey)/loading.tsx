import SimpleLoader from '@/components/simple-loader';
import { SurveyPageNavbarSkeleton } from '@/components/survey-components/survey-navbar';
import SurveySkeleton from '@/components/survey-components/survey-skeleton';
import React from 'react';


const Loading: React.FC = () => {
    return (
        <div className='flex-1'>
            <SurveyPageNavbarSkeleton />
            <SurveySkeleton />
        </div>
    );
};

export default Loading;
