import Container from "@/components/container"
import { H2 } from "@/components/headings";
import { ImageLinkCard } from "@/components/image-link-card";
import { getTranslations } from "next-intl/server";

const cards = [
    {
        key: 'onderzoek',
        href: '/onderzoek',
        imageSrc: '/static/images/small-pexels-rodnae-productions-8068694.jpg',
    },
    {
        key: 'teken',
        href: '/informatie/teken',
        imageSrc: '/static/images/small-teken-card.jpg',
    },
    {
        key: 'lyme',
        href: '/informatie/lyme',
        imageSrc: '/static/images/small-82073-1920.jpg',
        imageCredits: '© RIVM',
    },
    {
        key: 'faq',
        href: '/faq',
        imageSrc: '/static/images/small-faq.jpg',
    },
    {
        key: 'verwijderCard',
        href: '/informatie/hoe-verwijder-ik-een-teek',
        imageSrc: '/static/images/small-82106-1920.jpg',
        imageCredits: '© RIVM',
    },
    {
        key: 'about',
        href: '/informatie/tekenradar',
        imageSrc: '/static/images/small-tekenradarWithBackground.jpg',
    },

]

const MoreInfosSection = async () => {

    const t = await getTranslations('LandingPage.moreInfos');
    return (
        <section>
            <Container>
                <H2
                    className="font-bold"
                    borderOnTop={false}
                >
                    {t('title')}
                </H2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    {cards.map((card) => (
                        <li key={card.key}>
                            <ImageLinkCard
                                title={t(`cards.${card.key}.title`)}
                                moreBtnLabel={t(`cards.${card.key}.moreBtnLabel`)}
                                href={card.href}
                                imageSrc={card.imageSrc}
                                imageAlt={t(`cards.${card.key}.imageAlt`)}
                                imageCredits={card.imageCredits}
                            />
                        </li>
                    ))}
                </ul>

            </Container>
        </section>
    )
}

export default MoreInfosSection;