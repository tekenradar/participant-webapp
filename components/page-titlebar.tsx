import React from 'react';
import Container from './container';

interface PageTitlebarProps {
    children: React.ReactNode;
}

const PageTitlebar: React.FC<PageTitlebarProps> = (props) => {
    return (
        <div className='bg-secondary min-h-12'>
            <Container>
                <h1 className='text-2xl font-semibold tracking-wide py-2'>
                    {props.children}
                </h1>
            </Container>
        </div>
    );
};

export default PageTitlebar;
