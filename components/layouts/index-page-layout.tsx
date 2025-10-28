import React, { ReactNode } from 'react';
import PageTitlebar from '../page-titlebar';



interface IndexPageLayoutProps {
    title: ReactNode;
    topContent?: ReactNode;
    children: ReactNode;
    sideBarContent?: ReactNode;
    bottomContent?: ReactNode;
}

const IndexPageLayout: React.FC<IndexPageLayoutProps> = (props) => {
    return (
        <div className='mb-12 w-full'>
            <PageTitlebar>
                {props.title}
            </PageTitlebar>
            {props.topContent && props.topContent}
            {props.children}
        </div>
    );
};

export default IndexPageLayout;
