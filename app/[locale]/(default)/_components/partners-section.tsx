import Container from "@/components/container"
import { H2 } from "@/components/headings";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PartnersSection = async () => {
    const t = await getTranslations('LandingPage.partners');
    const tFooter = await getTranslations('Index.footer.partners');

    const partners = [
        {
            href: "/informatie/partners/rivm",
            logo: "/static/images/logo-RIVM2.png",
            alt: tFooter('rivm'),
            width: 260,
            height: 100
        },
        {
            href: "/informatie/partners/wageningen",
            logo: "/static/images/logo-WUR2.png",
            alt: tFooter('wur'),
            width: 220,
            height: 100
        },
        {
            href: "/informatie/partners/amc",
            logo: "/static/images/logo-AMC2.png",
            alt: tFooter('amc'),
            width: 200,
            height: 100
        },
        {
            href: "/informatie/partners/fsd",
            logo: "/static/images/logo-FSD2.png",
            alt: tFooter('fsd'),
            width: 170,
            height: 100
        },

        {
            href: "/informatie/partners/radboudumc",
            logo: "/static/images/logo-radboudumc2.png",
            alt: tFooter('radboudumc'),
            width: 200,
            height: 100
        }
    ];

    return (
        <section>
            <Container>
                <H2
                    className="font-bold"
                    borderOnTop={false}
                >
                    {t('title')}
                </H2>

                <ul className="flex flex-wrap justify-center items-center gap-y-8 gap-x-1 py-8">
                    {partners.map((partner) => (
                        <li key={partner.href}>
                            <Button
                                variant={'ghost'}
                                className="h-auto p-2 hover:bg-secondary"
                                asChild
                            >
                                <Link
                                    href={partner.href}
                                    prefetch={false}
                                    className="rounded-md overflow-hidden"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.alt}
                                        width={partner.width}
                                        height={partner.height}
                                        className="object-contain"
                                    />
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}

export default PartnersSection;