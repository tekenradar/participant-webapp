import { onderzoekPages } from "@/.velite";
import PageRenderer, { getContent } from "./_components/page-renderer";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string[];
    }>;
}

export function generateStaticParams() {
    const staticParams: Array<{
        locale: string;
        slug: string[];
    }> = onderzoekPages.map(({ locale, slugAsParams }) => {
        return { locale, slug: slugAsParams.split('/') };
    });
    return staticParams;
}

export const generateMetadata = async (props: PageProps) => {
    const { locale, slug } = await props.params;
    const name = slug.join("/");
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
    const { locale, slug } = await props.params;
    setRequestLocale(locale);

    const name = slug.join("/");
    return (
        <PageRenderer
            locale={locale}
            name={name}
        />
    );
}
