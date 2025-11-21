import Container from "@/components/container"
import { ImageLinkCard } from "@/components/image-link-card";
import { getTranslations } from "next-intl/server";

const MoreInfosSection = async () => {

    const t = await getTranslations('LandingPage.moreInfos');
    return (
        <section>
            <Container>
                todo: more infos

                <ul>
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>
                        <ImageLinkCard
                            title={t('cards.about.title')}
                            moreBtnLabel={t('cards.about.moreBtnLabel')}
                            href="/informatie/about"
                            imageSrc="/static/images/ANP-371602781-1024.jpg"
                            imageAlt={t('cards.about.imageAlt')}
                        >
                            <p className="italic">
                                {t('cards.about.text')}
                            </p>
                        </ImageLinkCard>
                    </li>
                    <li>
                        <ImageLinkCard
                            title={t('cards.currentResults.title')}
                            moreBtnLabel={t('cards.currentResults.moreBtnLabel')}
                            href="/results"
                            imageSrc="/static/images/ANP-7666051-1024.jpg"
                            imageAlt={t('cards.currentResults.imageAlt')}
                        >
                            <p className="italic">
                                {t('cards.currentResults.text')}
                            </p>
                        </ImageLinkCard>
                    </li>
                    <li>
                        <ImageLinkCard
                            title={t('cards.register.title')}
                            moreBtnLabel={t('cards.register.moreBtnLabel')}
                            href="/dashboard"
                            imageSrc="/static/images/iStock-1311747918_small.jpg"
                            imageAlt={t('cards.register.imageAlt')}
                            imageClassName="object-top"
                        >
                            <p className="italic">
                                {t('cards.register.text')}
                            </p>
                        </ImageLinkCard>
                    </li>
                </ul>
            </Container>
        </section>
    )
}

export default MoreInfosSection;