import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

import imageSrc from "@/public/static/images/cRIVM/iStock-168505070-1920.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import LinkButton from "./buttons/link-button";
import { auth } from "@/auth";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { getTranslations } from "next-intl/server";


interface ReportCardProps {
    showMyTekenradarLink: boolean;
}

interface MeldenButtonProps {
    label: string;
    href: string;
}

const MeldenButton: React.FC<MeldenButtonProps> = ({ label, href }) => {
    return (
        <Button
            asChild
            variant="tekenradar"
            className="w-full justify-start text-lg font-bold text-balance h-auto"
        >
            <Link href={href}>
                {label}
                <span>
                    <ArrowRight className="size-3" />
                </span>
            </Link>
        </Button>
    );
};

const MyTekenradarButton: React.FC = async () => {
    const t = await getTranslations('Index.reportCard');

    const session = await auth();
    if (!session) {
        return null;
    }

    return (
        <li>
            <Button
                asChild
                variant="default"
                className="w-full justify-start text-2xl font-bold text-balance h-auto"
            >
                <Link href="/mijn-tekenradar">
                    {t('links.myTekenradar')}
                    <span>
                        <ArrowRight className="size-5" />
                    </span>
                </Link>
            </Button>
        </li>
    );
};

interface InfoLinkButtonProps {
    href: string;
    label: string;
}

const InfoLinkButton: React.FC<InfoLinkButtonProps> = ({ href, label }) => {
    return (
        <Button
            asChild
            variant="link"
            className="w-full py-1 justify-start text-sm font-bold text-balance h-auto"
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    );
};

const ReportCard: React.FC<ReportCardProps> = ({ showMyTekenradarLink }) => {
    const t = useTranslations('Index.reportCard');
    return (
        <div className={cn(
            "relative min-w-60 w-full h-full flex flex-col rounded-md overflow-hidden bg-secondary border border-border group",
        )}>
            <AspectRatio
                ratio={16 / 9}
            >
                <Image
                    src={imageSrc}
                    alt={''}
                    fill
                    className={cn('w-full object-cover')}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 370px"
                />
            </AspectRatio>
            <ul className="space-y-4 p-4">
                {showMyTekenradarLink && (
                    <Suspense fallback={null}>
                        <MyTekenradarButton />
                    </Suspense>
                )}
                <li>
                    <MeldenButton label={t('links.tekenBeet')} href="/melden" />
                </li>
                <li>
                    <MeldenButton label={t('links.rodeRing')} href="/melden" />
                </li>
                <li>
                    <MeldenButton label={t('links.lyme')} href="/melden" />
                </li>
                <li>
                    <MeldenButton label={t('links.koorts')} href="/melden" />
                </li>
            </ul>

            <ul className="p-4 pt-0">
                <li>
                    <InfoLinkButton href="/informatie/hoe-verwijder-ik-een-teek" label={t('infoLinks.removeTick')} />
                </li>
                <li>
                    <InfoLinkButton href="/informatie/erythema-migrans" label={t('infoLinks.roseRingExamples')} />
                </li>
                <li>
                    <InfoLinkButton href="/onderzoek/vragenlijst" label={t('infoLinks.weeklyReportInfo')} />
                </li>
            </ul>
        </div>

    );
};

export default ReportCard;