import { Suspense } from "react";
import ReportMapClient from "./report-map-client";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import ErrorInfo from "@/components/error-info";


const ReportMapLoader = async () => {
    const t = await getTranslations('LandingPage.infoTabs.tekenmeldingen');

    const dataURL = process.env.TB_MAP_DATA_URL;
    const apiKey = process.env.CONTENT_SERVICE_API_KEY;

    if (!dataURL || !apiKey) {
        return <div>Error: TB_MAP_DATA_URL or CONTENT_SERVICE_API_KEY is not set</div>;
    }

    const response = await fetch(`${dataURL}`, {
        headers: {
            'Api-Key': apiKey
        }
    });

    if (!response.ok) {
        let errorMessage = response.statusText;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || response.statusText;
        } catch {
            // If response is not JSON, use statusText
        }
        return <div className="w-full h-full flex justify-center items-center p-4 sm:p-6">
            <ErrorInfo
                title={t('error.title')}
                description={t('error.description', { errorMessage })}
            />
        </div>
    }

    const data = await response.json();

    console.log(data);

    return <ReportMapClient />;
};

const ReportMap = async () => {
    return <Suspense fallback={<ReportMapSkeleton />}>
        <ReportMapLoader />
    </Suspense>;
};

const ReportMapSkeleton = () => {
    return <SimpleLoader className="w-full h-full min-h-52" />;
};

export default ReportMap;