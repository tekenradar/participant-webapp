import { useTranslations } from "next-intl";
import Container from "./container";
import Link from "next/link";
import { FaYoutube, FaXTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
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
                className='flex items-center min-w-60 hover:underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded'
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
                        <FooterColumn title={t('services.title')}>
                            <FooterLink
                                href="/algemeen/contact"
                                prefetch={false}
                            >
                                {t('services.contactLink')}
                            </FooterLink>
                            <FooterLink
                                href="https://x.com/rivm"
                                prefetch={false}
                                target="_blank"
                            >
                                <span className="mr-2">
                                    <FaXTwitter />
                                </span>
                                {t('services.twitterLink')}
                            </FooterLink>
                            <FooterLink
                                href="https://www.facebook.com/RIVMnl"
                                prefetch={false}
                                target="_blank"
                            >
                                <span className="mr-2">
                                    <FaFacebook />
                                </span>
                                {t('services.facebookLink')}
                            </FooterLink>
                            <FooterLink
                                href="https://www.instagram.com/rivmnl/#"
                                prefetch={false}
                                target="_blank"
                            >
                                <span className="mr-2">
                                    <FaInstagram />
                                </span>
                                {t('services.instagramLink')}
                            </FooterLink>
                            <FooterLink
                                href="https://www.youtube.com/user/RIVMnl"
                                prefetch={false}
                                target="_blank"
                            >
                                <span className="mr-2">
                                    <FaYoutube />
                                </span>
                                {t('services.youtubeLink')}
                            </FooterLink>
                            <FooterLink
                                href="https://nl.linkedin.com/company/rivm"
                                prefetch={false}
                                target="_blank"
                            >
                                <span className="mr-2">
                                    <FaLinkedin />
                                </span>
                                {t('services.linkedInLink')}
                            </FooterLink>
                        </FooterColumn>

                        <FooterColumn title={t('about.title')}>
                            <FooterLink
                                href="/algemeen/privacy"
                                prefetch={false}
                            >
                                {t('about.privacyLink')}
                            </FooterLink>
                            <FooterLink
                                href="/algemeen/disclaimer"
                                prefetch={false}
                            >
                                {t('about.disclaimerLink')}
                            </FooterLink>
                            <FooterLink
                                href="/algemeen/toegankelijkheid"
                                prefetch={false}
                            >
                                {t('about.toegankelijkheidLink')}
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