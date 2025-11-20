import { useTranslations } from "next-intl";
import Container from "./container";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";


function FooterColumn({ children, title }: { title: string, children: React.ReactNode }) {
    return (<div className='col-12 col-md-6 col-lg-4'>
        <h2 className='border-b border-foreground text-2xl pb-2 mb-2'>{title}</h2>
        <ul className='grid gap-y-2 grid-cols-1'>
            {children}
        </ul>
    </div>
    )
}

function FooterLink({ children, href, prefetch, target }: { children: React.ReactNode, href: string, prefetch?: boolean, target?: string }) {
    return (
        <li>
            <Link
                href={href}
                prefetch={prefetch}
                target={target}
                className='flex items-center min-w-60 hover:underline focus:outline-none focus:border-none focus:ring-offset-2 focus:ring-2 focus:ring-accent/50 rounded'
            >
                {children}
                {target === '_blank' && <span className="ml-2">
                    <ArrowUpRight className='size-4' />
                </span>}
            </Link>
        </li>
    )
}


const Footer: React.FC = () => {
    const t = useTranslations('Index.footer');

    const year = new Date().getFullYear();

    return (
        <footer >
            <div className='bg-secondary text-secondary-foreground py-6'>
                <Container >
                    <div className='flex flex-col sm:flex-row flex-wrap  gap-6 '>
                        <FooterColumn title={t('partners.title')}>

                            <FooterLink
                                href="/informatie/partners/rivm"
                                prefetch={false}
                            >
                                {t('partners.rivm')}
                            </FooterLink>
                            <FooterLink
                                href="/informatie/partners/wageningen"
                                prefetch={false}
                            >
                                {t('partners.wur')}
                            </FooterLink>
                            <FooterLink
                                href="/informatie/partners/fsd"
                                prefetch={false}
                            >
                                {t('partners.fsd')}
                            </FooterLink>
                            <FooterLink
                                href="/informatie/partners/amc"
                                prefetch={false}
                            >
                                {t('partners.amc')}
                            </FooterLink>
                            <FooterLink
                                href="/informatie/partners/radboudumc"
                                prefetch={false}
                            >
                                {t('partners.radboudumc')}
                            </FooterLink>
                        </FooterColumn>

                        <FooterColumn title={t('about.title')}>
                            <FooterLink
                                href="/algemeen/contact"
                                prefetch={false}
                            >
                                {t('about.contact')}
                            </FooterLink>
                            <FooterLink
                                href="/algemeen/privacy"
                                prefetch={false}
                            >
                                {t('about.privacy')}
                            </FooterLink>
                            <FooterLink
                                href="/algemeen/disclaimer"
                                prefetch={false}
                            >
                                {t('about.disclaimer')}
                            </FooterLink>
                            <FooterLink
                                href="/algemeen/toegankelijkheid"
                                prefetch={false}
                            >
                                {t('about.accessibility')}
                            </FooterLink>
                        </FooterColumn>
                    </div>




                </Container>
            </div>

            <div
                className='bg-primary text-primary-foreground'
            >
                <Container>
                    <div>
                        <p className='text-center pt-6 pb-6'>
                            {t('signature', { year })}
                        </p>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;