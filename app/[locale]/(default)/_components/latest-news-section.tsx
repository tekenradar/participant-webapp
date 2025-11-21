import Container from "@/components/container"
import { H2 } from "@/components/headings";
import { getTranslations } from "next-intl/server";

const LatestNewsSection = async () => {
    const t = await getTranslations('LandingPage.latestNews');


    return (
        <section>
            <Container>
                <H2
                    className="font-bold"
                    borderOnTop={false}
                >
                    {t('title')}
                </H2>
                <div className="h-80 flex bg-muted justify-center items-center w-full border border-border rounded-md border-dashed mt-6">

                    todo: top news
                </div>
            </Container>
        </section>
    )
}

export default LatestNewsSection;