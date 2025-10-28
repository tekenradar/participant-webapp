import DeleteAccountSection from "./_components/delete-account-section";
import { Suspense } from "react";
import SimpleLoader from "@/components/simple-loader";
import { LocaleParams } from "../../utils";
import AccountSettingsSection from "./_components/account-settings-section";

export const dynamic = 'force-dynamic';

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;

    return (
        <div className="space-y-12">
            <Suspense
                fallback={
                    <SimpleLoader />
                }
            >
                <AccountSettingsSection
                    locale={locale}
                />
            </Suspense>


            <Suspense
                fallback={
                    <SimpleLoader />
                }
            >
                <DeleteAccountSection
                    locale={locale}
                />
            </Suspense>
        </div>
    );
}
