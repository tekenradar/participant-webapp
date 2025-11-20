import { LocaleParams } from "../../utils";
// import { getTranslations } from "next-intl/server";


export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    console.log(locale);
    return (
        <div>
            todo: news page
        </div>
    );
}
