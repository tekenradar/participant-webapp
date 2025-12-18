'use client';

import { CommonResponseComponentProps } from "@/components/survey-renderer/SurveySingleItemView/utils";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CaseReport } from "@/lib/server/data-fetching/reports";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { format, subMonths } from 'date-fns';
import { nl } from 'date-fns/locale';
import { cn } from "@/lib/utils";

export interface ReportSelectorMessages {
    loading: string;
    noReports: string;
    errorLoadingReports: string;
    reportCards?: {
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
    };
}

interface ReportSelectorProps extends CommonResponseComponentProps {
    profileID: string;
    locale: string;
    messages?: ReportSelectorMessages;
}

const ReportSelector: React.FC<ReportSelectorProps> = (props) => {

    const [isPending, startTransition] = useTransition();
    const [reports, setReports] = useState<CaseReport[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>(
        props.prefill?.value || ''
    );

    const loadReports = useEffectEvent(async () => {
        startTransition(async () => {
            try {
                // Calculate date 6 months ago
                const now = new Date();
                const sixMonthsAgo = subMonths(now, 6);

                // Convert to timestamps (seconds since epoch)
                const nowTimestamp = Math.floor(now.getTime() / 1000);
                const sixMonthsAgoTimestamp = Math.floor(sixMonthsAgo.getTime() / 1000);

                // Create filter for TB key reports from last 6 months
                const filter = JSON.stringify({
                    $and: [
                        { key: 'TB' },
                        { timestamp: { $gte: sixMonthsAgoTimestamp, $lte: nowTimestamp } }
                    ]
                });

                // Fetch reports from API
                const url = `/api/reports/${props.profileID}?filter=${encodeURIComponent(filter)}&page=1&limit=1000`;
                const response = await fetch(url);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch reports');
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                // Set reports from response
                if (data.reports) {
                    setReports(data.reports);
                } else {
                    setReports([]);
                }
                setError(null);
            } catch (err) {
                console.error('Error loading reports:', err);
                setError(err instanceof Error ? err.message : 'Failed to load reports');
                setReports([]);
            }
        });
    });

    useEffect(() => {
        loadReports();
    }, []);

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        props.responseChanged({
            key: props.compDef.key ? props.compDef.key : 'no key found',
            value: value
        });
    };

    const getDateLocale = (locale: string) => {
        switch (locale) {
            case 'nl':
                return nl;
            default:
                return nl;
        }
    };

    const formatReportDate = (timestamp: number): string => {
        return format(new Date(timestamp * 1000), 'PPP', { locale: getDateLocale(props.locale) });
    };

    const getTranslatedKey = (reportKey: string, itemKey: string): string => {
        if (!props.messages?.reportCards) return itemKey;
        const reportMessage = props.messages.reportCards[reportKey as keyof typeof props.messages.reportCards];
        if (typeof reportMessage === 'object' && reportMessage !== null) {
            const itemMessage = (reportMessage as any)[itemKey];
            if (itemMessage && typeof itemMessage === 'object' && 'label' in itemMessage) {
                return itemMessage.label;
            }
        }
        return itemKey;
    };

    const getTranslatedValue = (reportKey: string, itemKey: string, itemValue: string): string => {
        if (!props.messages?.reportCards) return itemValue;
        const reportMessage = props.messages.reportCards[reportKey as keyof typeof props.messages.reportCards];
        if (typeof reportMessage === 'object' && reportMessage !== null) {
            const itemMessage = (reportMessage as any)[itemKey];
            if (itemMessage && typeof itemMessage === 'object' && itemValue in itemMessage) {
                return itemMessage[itemValue];
            }
        }
        return itemValue;
    };

    return (
        <div className="px-[--survey-card-px-sm] @md:px-[--survey-card-px]">
            {isPending && <div className="flex items-center gap-2 justify-center h-52">
                <Spinner className="text-primary" />
                <span>{props.messages?.loading}</span>
            </div>}
            {error && !isPending && (
                <div className="text-sm text-destructive text-center my-8 space-y-2">
                    <p className="font-medium">{props.messages?.errorLoadingReports || 'Error loading reports'}</p>
                    <p className="text-xs text-muted-foreground">
                        {error}
                    </p>
                </div>
            )}
            {!isPending && !error && reports.length === 0 && (
                <div className="text-sm text-muted-foreground text-center my-8">
                    {props.messages?.noReports || 'No reports found'}
                </div>
            )}
            {!isPending && !error && reports.length > 0 && (
                <RadioGroup
                    value={selectedValue}
                    onValueChange={handleValueChange}
                    className="my-4 gap-2"
                >
                    {reports.map((report) => (
                        <div key={report.id} className={cn("flex items-center gap-4 border border-border rounded-md p-2", {
                            'border-primary bg-primary/10': selectedValue === (report.responseID || report.id)
                        })}>
                            <RadioGroupItem
                                value={report.responseID || report.id}
                                id={report.responseID || report.id}
                                className="mt-0"
                            />
                            <Label
                                htmlFor={report.responseID || report.id}
                                className="flex-1 cursor-pointer font-normal"
                            >
                                <div className="flex flex-col w-full">
                                    <span className="text-sm font-medium">
                                        {formatReportDate(report.timestamp)}
                                    </span>
                                    {(() => {
                                        const payloadData = report.data?.filter(item => {
                                            return !['icon'].includes(item.key);
                                        }) || [];

                                        if (payloadData.length === 0) {
                                            return null;
                                        }

                                        return (
                                            <ul className="flex gap-4 justify-between flex-wrap mt-2">
                                                {payloadData.map((item, index) => {
                                                    const translatedKey = getTranslatedKey(report.key, item.key);
                                                    const translatedValue = getTranslatedValue(report.key, item.key, item.value);

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
                                        );
                                    })()}
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}

export default ReportSelector;