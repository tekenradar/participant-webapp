import React from 'react';
import PageTitlebar from '../page-titlebar';
import Container from '../container';

interface CenteredPageLayoutProps {
    children: React.ReactNode;
    title: string;
}

const CenteredPageLayout: React.FC<CenteredPageLayoutProps> = (props) => {
    return (
        <div className="flex flex-col h-full">
            <PageTitlebar>
                {props.title}
            </PageTitlebar>

            <Container className="grow justify-center flex-col flex items-center py-12">
                {props.children}
            </Container>
        </div>
    );
};

export default CenteredPageLayout;
