import React, { ReactNode, Suspense } from 'react';
import Container from '../container';
import PageTitlebar from '../page-titlebar';
import { cn } from '@/lib/utils';
import SimpleLoader from '../simple-loader';


interface ArticlePageLayoutProps {
    title: ReactNode;
    topContent?: ReactNode;
    children: ReactNode;
    sideBarContent?: ReactNode;
    bottomContent?: ReactNode;
}

const ArticlePageLayout: React.FC<ArticlePageLayoutProps> = (props) => {
    return (
        <div className='mb-12'>
            <article>
                <PageTitlebar>
                    {props.title}
                </PageTitlebar>
                {props.topContent && props.topContent}
                <Container>
                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div
                            className={cn('mt-6 grow lg:max-w-[728px] w-full',
                            )}
                        >
                            {props.children}
                        </div>
                        <Suspense fallback={<SimpleLoader />}>
                            <div
                                className='mt-6 grow'
                            >
                                {props.sideBarContent && (props.sideBarContent)}
                            </div>
                        </Suspense>
                    </div>
                </Container>
            </article>
            {props.bottomContent && (
                <Container className="mt-6">
                    {props.bottomContent}
                </Container>
            )}
        </div>
    );
};

export default ArticlePageLayout;
