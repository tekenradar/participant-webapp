import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import { Loader } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import TempTokenLogin from "./_components/TempTokenLogin";


interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        token?: string;
        callback?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const { locale } = await props.params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale: locale, namespace: 'LinkResolvers.StudyLoginPage' });

    const token = (await props.searchParams).token;
    if (!token) {
        redirect('/auth/login?redirectTo=/dashboard');
    }

    let callback = (await props.searchParams).callback;
    if (!callback || callback.startsWith('http')) {
        callback = '/dashboard';
    }


    // TODO: if not logged in -> show email and password form, call login with temp token and password

    return (
        <CenteredPageLayout
            title={t('title')}
        >
            <div className="max-w-[600px] w-full mx-auto">
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center h-96">
                            <Loader
                                className='size-8 animate-spin'
                                aria-label='Loading...'
                            />
                        </div>
                    }
                >
                    <TempTokenLogin
                        locale={locale}
                        token={token}
                        callback={callback}
                    />
                </Suspense>
            </div>
        </CenteredPageLayout>
    );
}
