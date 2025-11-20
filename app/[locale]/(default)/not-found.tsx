import Container from '@/components/container';
import CoverImage, { CoverImagePosition } from '@/components/cover-image';
import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import PageTitlebar from '@/components/page-titlebar';
import { useTranslations } from 'next-intl';
import ErrorInfo from '@/components/error-info';

export default function NotFound() {
    const t = useTranslations('NotFoundPage');
    return <div className="flex flex-col h-full">
        <PageTitlebar>
            {t('title')}
        </PageTitlebar>
        <CoverImage
            src="/static/images/waar-leven-teken.jpg"
            alt="404"
            width={1000}
            height={300}
            coverImageYPosition="30%"
        />

        <Container className="py-6 space-y-6 max-w-[600px] mx-auto mb-16">
            <div className='p-4 border border-destructive rounded-md'>
                <ErrorInfo
                    title={t('error.title')}
                    description={t('error.description')}
                    className='m-0'
                />
            </div>

            <EmbeddedMarkdownRenderer>
                {t('infos')}
            </EmbeddedMarkdownRenderer>
        </Container>
    </div>
}