import Container from '@/components/container';
import ErrorInfo from '@/components/error-info';
import PageTitlebar from '@/components/page-titlebar';
import { useTranslations } from 'next-intl';


export default function NotFound() {
    const t = useTranslations('NotFoundPage');
    return <div className="flex flex-col h-full">
        <PageTitlebar>
            {t('title')}
        </PageTitlebar>

        <Container className="py-6 flex flex-col gap-6 md:flex-row">
            <ErrorInfo
                title={t('error.title')}
                description={t('error.description')}
            />
        </Container>
    </div>
}