'use client';

import React from 'react';
import { CaseReport } from "@/lib/server/data-fetching/reports";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import Image from "next/image";
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { ChevronDown } from "lucide-react";

interface ReportCardProps {
    report: CaseReport;
    locale?: string;
    messages: {
        hasNoData: string;
        followUp: {
            title: string;
        }
        TB: {
            title: string;
            environment: {
                label: string;
                a: string;
                b: string;
                c: string;
                d: string;
                e: string;
                f: string;
                g: string;
                h: string;
                i: string;
            };
            activity: {
                label: string;
                a: string;
                b: string;
                c: string;
                d: string;
                e: string;
                f: string;
                g: string;
                h: string;
                i: string;
            };
            count: {
                label: string;
            };
            location: {
                label: string;
            };
        };
        EM: {
            title: string;
        };
        LB: {
            title: string;
        };
        chronic: {
            title: string;
        };
        Fever: {
            title: string;
        };
    }
}



const reportIconMap = {
    "TB": '/static/images/report-icons/teek.svg',
    "EM": '/static/images/report-icons/em.svg',
    "LB": '/static/images/report-icons/gedissimineerd.svg',
    "chronic": '/static/images/report-icons/langdurige_klachten.svg',
    "Fever": '/static/images/report-icons/teek_met_thermo.svg',
    "followUp": '/static/images/report-icons/vragenlijst.svg'
}

const fallbackIconUrl = '/static/images/report-icons/vragenlijst.svg';

const getReportIconUrl = (report: CaseReport) => {
    if (!report.data) return fallbackIconUrl;
    const iconValue = report.data.find(item => item.key.toLowerCase() === 'icon')?.value;
    if (!iconValue) return fallbackIconUrl;
    return reportIconMap[iconValue as keyof typeof reportIconMap] || fallbackIconUrl;
}

const getTranslatedKey = (reportKey: string, itemKey: string, messages: ReportCardProps['messages']): string => {
    const reportMessage = messages[reportKey as keyof typeof messages];
    if (typeof reportMessage === 'object' && reportMessage !== null) {
        const itemMessage = (reportMessage as any)[itemKey];
        if (itemMessage && typeof itemMessage === 'object' && 'label' in itemMessage) {
            return itemMessage.label;
        }
    }
    return itemKey;
}

const getTranslatedValue = (reportKey: string, itemKey: string, itemValue: string, messages: ReportCardProps['messages'], dtype?: string): string => {
    if (dtype === 'int') {
        const numericValue = parseInt(itemValue);
        if (isNaN(numericValue)) {
            return itemValue;
        }
        return numericValue.toFixed(0);
    }
    const reportMessage = messages[reportKey as keyof typeof messages];
    if (typeof reportMessage === 'object' && reportMessage !== null) {
        const itemMessage = (reportMessage as any)[itemKey];
        if (itemMessage && typeof itemMessage === 'object' && itemValue in itemMessage) {
            return itemMessage[itemValue];
        }
    }
    return itemValue;
}


const getDateLocale = (locale: string) => {
    switch (locale) {
        case 'nl':
            return nl;
        default:
            return nl;
    }
}


const ReportCard: React.FC<ReportCardProps> = ({ report, messages, locale = 'nl' }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const iconUrl = getReportIconUrl(report);
    const reportMessage = messages[report.key as keyof typeof messages];
    const reportTitle = typeof reportMessage === 'string' ? reportMessage : reportMessage?.title ?? '';
    const dateStr = format(new Date(report.timestamp * 1000), 'PPP', { locale: getDateLocale(locale) });

    const payloadData = report.data?.filter(item => {
        return !['icon'].includes(item.key)
    }) || [];

    console.log(payloadData);

    return <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
            <button
                className={cn(
                    "w-full text-left rounded-lg border border-border bg-secondary hover:bg-primary/10 transition-colors duration-200 ease",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                aria-expanded={isOpen}
                aria-label={isOpen ? `${reportTitle} samenvouwen` : `${reportTitle} uitklappen`}
            >
                <div className="p-3 flex items-start gap-4">
                    {iconUrl && (
                        <div className="flex-shrink-0 size-12 relative border border-border rounded-md overflow-hidden bg-white p-1">
                            <div className="size-full relative">
                                <Image
                                    src={iconUrl}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">{dateStr}</p>
                        <h3 className="font-semibold text-base mb-1">{reportTitle}</h3>
                    </div>

                    <ChevronDown
                        className={cn(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>
            </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden -mt-4 pt-4 px-2 md:px-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="space-y-4 bg-secondary rounded-b-lg p-4 border border-border border-t-0">
                {payloadData.length < 1 && <p className='text-muted-foreground text-center'>
                    {messages.hasNoData}
                </p>}
                {payloadData.length > 0 && (

                    <ul className="flex gap-8 justify-between flex-wrap">
                        {payloadData.map((item, index) => {
                            const translatedKey = getTranslatedKey(report.key, item.key, messages);
                            const translatedValue = item.dtype === 'keyList' ?
                                item.value.split(';').map(value => getTranslatedValue(report.key, item.key, value, messages, item.dtype)).join(', ')
                                : getTranslatedValue(report.key, item.key, item.value, messages, item.dtype);

                            return (
                                <li key={`${item.key}-${index}`}>
                                    <dl>
                                        <dt className="font-medium text-xs text-muted-foreground">
                                            {translatedKey}
                                        </dt>
                                        <dd className={cn("text-sm font-semibold", item.dtype === 'int' && 'text-end')}>
                                            {translatedValue}
                                        </dd>
                                    </dl>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </CollapsibleContent>
    </Collapsible>
};

export default ReportCard;

