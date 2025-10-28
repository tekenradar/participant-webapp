import PageTitlebar from "@/components/page-titlebar";
import SimpleLoader from "@/components/simple-loader";
import CloseResultsBtn from "./_components/close-results-btn";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations('ResultsPage');

    return (
        <div className="absolute inset-0 p-0 sm:p-2 z-50 bg-black/50 backdrop-blur-lg">
            <div className="rounded-none sm:rounded-md overflow-hidden  relative h-full w-full">
                <div className="shadow-md">
                    <PageTitlebar>
                        <div className="flex items-center justify-between gap-4">
                            <div >
                                {t('title')}
                            </div>
                            <CloseResultsBtn
                                closeAriaLabel={t('closeBtn')}
                            />
                        </div>
                    </PageTitlebar>
                </div>
                <div className="absolute z-0 bg-white w-full min-w-full overflow-y-scroll min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
                    <SimpleLoader />
                </div>

                <div className="absolute w-full">
                    <iframe
                        className="w-full min-w-full overflow-y-scroll min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-70px)]"
                        title="Dashboard"
                        src="https://dashboard.infectieradar.nl"
                        id="iFrameResizer0"
                        allow="fullscreen"
                    />
                </div>

            </div>
        </div>
    );
}
