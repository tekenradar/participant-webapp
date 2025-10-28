import Container from "@/components/container";
import FullwidthImageWithContent from "@/components/fullwidth-image-with-content"
import { ImageLinkCard } from "@/components/image-link-card";
import PageTitlebar from "@/components/page-titlebar";
import { useTranslations } from 'next-intl';


export default function Home() {
  const t = useTranslations('LandingPage');

  return (
    <>
      <PageTitlebar>
        {t('title')}
      </PageTitlebar>
      <FullwidthImageWithContent
        imageSrc="/static/images/login_background.jpg"
        imageClassName="object-[47%_27%]"
        sectionClassName="h-[367px]"
        imageAlt=""
      />

      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
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

      <Container>
        <div className="w-full h-full mb-6">
          <video
            className="w-full h-full"
            controls
            poster="https://www.rovid.nl/rivm/aco/2024/rivm-aco-20240807-idljgf0ar-still-middel.jpg"
            controlsList="nodownload"
          >
            <source src="https://www.rovid.nl/rivm/aco/2024/rivm-aco-20240807-idljgf0ar-web-hd.mp4" type="video/mp4" />
            <source src="https://www.rovid.nl/rivm/aco/2024/rivm-aco-20240807-idljgf0ar-web-hd.mxf" type="video/mxf" />
            <source src="https://www.rovid.nl/rivm/aco/2024/rivm-aco-20240807-idljgf0ar-web-hd.webm" type="video/webm" />
            <p>Your browser does not support the video tag.</p>
          </video>
        </div>
      </Container>
    </>
  );
}
