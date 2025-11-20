import { newsPages } from "@/.velite";
import PageRenderer, { getContent } from "./_components/page-renderer";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
    params: Promise<{
        locale: string;
        newsId: string;
    }>;
}

export function generateStaticParams() {
    const staticParams = newsPages.map(({ slugAsParams, locale }) => {
        return {
            locale,
            newsId: slugAsParams.split('/')[0]
        };
    });
    return staticParams;
}

export const generateMetadata = async (props: PageProps) => {
    const { locale, newsId } = await props.params;
    const name = newsId;
    const page = await getContent(locale, name);

    if (!page) {
        return null;
    }

    return {
        title: page.title,
    };
}

export default async function Page(
    props: PageProps
) {
    const { locale, newsId } = await props.params;
    setRequestLocale(locale);

    const name = newsId;
    return (
        <PageRenderer
            locale={locale}
            name={name}
        />
    );
}
