import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface NoTokenInfoProps {
    locale: string;
}

const NoTokenInfo: React.FC<NoTokenInfoProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'LinkResolvers.VerifyContactPage' });

    return (
        <div className='p-4 border border-primary rounded-md flex gap-4 flex-col sm:flex-row items-center'>
            <div>
                <Info className='size-12 text-primary' />
            </div>
            <div>
                <EmbeddedMarkdownRenderer>
                    {t('noTokenMessage')}
                </EmbeddedMarkdownRenderer>
            </div>
        </div>
    );
};

export default NoTokenInfo;
