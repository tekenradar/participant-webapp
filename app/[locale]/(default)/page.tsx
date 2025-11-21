import Container from "@/components/container";
import ReportCard from "@/components/report-card";
import { useTranslations } from 'next-intl';
import { setRequestLocale } from "next-intl/server";
import { use } from 'react';
import LatestNewsSection from "./_components/latest-news-section";
import MoreInfosSection from "./_components/more-infos-section";
import PartnersSection from "./_components/partners-section";


export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('LandingPage');

  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="space-y-6 py-6">
      <Container>
        <h1 className='sr-only'>
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="order-2 lg:order-1 flex justify-center">
            <ReportCard showMyTekenradarLink={true} />
          </div>

          <div className="order-1 lg:order-2 col-span-full lg:col-span-2">
            <div className="h-full w-full bg-muted border border-border rounded-md border-dashed flex justify-center items-center">
              maps
            </div>
          </div>
        </div>
      </Container >

      <LatestNewsSection />

      <MoreInfosSection />

      <PartnersSection />
    </div>
  );
}
