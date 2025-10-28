import { getGeneralContent } from "./utils";
import { setRequestLocale } from "next-intl/server";
import { renderGeneralPageContent } from "./pageRenderer";


export type PageParams = {
    params: Promise<{
        locale: string;
        topic: string;
    }>;
};

export const generateMetadata = async ({ params }: PageParams) => {
    const { locale, topic } = await params;
    const pageContent = await getGeneralContent(locale, topic);
    if (!pageContent) {
        return null;
    }
    return {
        title: pageContent.title,
    };
}

export default async function Page(
    props: PageParams
) {
    const { locale, topic } = await props.params;
    setRequestLocale(locale);
    return renderGeneralPageContent(locale, topic);
}
