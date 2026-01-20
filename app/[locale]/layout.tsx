import { Metadata } from "next"

import '../globals.css'
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import UnconfirmedAccountWarning from "@/components/unconfirmed-account-warning";
import { headers } from "next/headers";
import PiwikProProvider from "@piwikpro/next-piwik-pro";
import { Open_Sans } from "next/font/google";
import { LocaleParams } from "./utils";
import TekenradarHeader from "@/components/tekenradar-header";
import { routing } from "@/i18n/routing";



export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: {
            default: t('title'),
            template: `%s | ${t('title')}`,
        },
        description: t('description'),
        metadataBase: process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL) : undefined,
    }
}

export function generateStaticParams() {
    return routing.locales.map((locale: string) => ({ locale }));
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>
}

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default async function RootLayout(props: LayoutProps) {
    const { locale } = await props.params;
    const nonce = (await headers()).get('x-nonce')

    setRequestLocale(locale);

    const t = await getTranslations('Index');

    const content = (<html
        lang={locale}
    >
        <head>
            <link rel="alternate" type="application/rss+xml" title="RSS Feed Tekenradar Nieuws"
                href="/nieuws.rss" />
            <meta name="google-site-verification"
                content={process.env.GOOGLE_SITE_VERIFICATION || ''}
            />
        </head>
        <body className={`${openSans.variable} font-sans h-screen flex flex-col`}>
            <Link
                className="sr-only focus:not-sr-only text-primary hover:underline px-4 py-2"
                href="#main"
            >
                {t('skipToMainContentBtn')}
            </Link>
            <TekenradarHeader />
            {props.children}
            <Toaster
                position="bottom-center"
                toastOptions={{
                    classNames: {
                        error: 'text-destructive',
                    }
                }}
                duration={6000}
            />
        </body>
    </html >)

    const containerId = process.env.NEXT_PUBLIC_CONTAINER_ID || '';
    const containerUrl = process.env.NEXT_PUBLIC_CONTAINER_URL || '';

    if (containerId && containerUrl) {
        return (
            <PiwikProProvider
                containerUrl={containerUrl}
                containerId={containerId}
                nonce={nonce !== null ? nonce : undefined}
            >
                {content}
            </PiwikProProvider>
        );
    }
    return (
        content
    );
}
