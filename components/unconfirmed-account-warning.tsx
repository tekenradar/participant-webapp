import React from 'react';
import Container from './container';
import LinkButton from './buttons/link-button';
import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';
import { AlertTriangle } from 'lucide-react';


const UnconfirmedAccountWarning: React.FC = async () => {
    const session = await auth();
    if (!session || session.accountConfirmed) {
        return null;
    }

    const t = await getTranslations('Index.unconfirmedAccountWarning');

    return (
        <div className='bg-accent text-accent-foreground py-4'>
            <Container>
                <div className='flex gap-4 items-center'>
                    <span>
                        <AlertTriangle
                            className='size-8'
                            aria-label={t('alertTriangleAriaLabel')}
                            role='img'
                        />
                    </span>
                    <p role="alert"
                        className='text-sm font-semibold'
                    >

                        {t('warnText')}
                    </p>
                </div>

                <div className='bg-secondary px-4 mt-2 rounded-md w-fit'>
                    <LinkButton href="/link/verify-contact"
                        className='text-secondary-foreground'
                    >
                        {t('openVerificationPage')}
                    </LinkButton>
                </div>
            </Container>
        </div>

    );
};

export default UnconfirmedAccountWarning;
