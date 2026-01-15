'use client';

import { CaseReport } from "@/lib/server/data-fetching/reports";
import { Profile } from "@/lib/server/data-fetching/user";
import { useEffect, useState, useTransition, useCallback } from "react";
import ProfileSelector from "./profile-selector";
import SimpleLoader from "@/components/simple-loader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ReportCard from "./report-card";

interface ReportHistoryClientProps {
    profiles: Profile[];
    locale: string;
    messages: {
        profileSelectorLabel: string;
        noProfileSelected: string;
        mainProfileLabel: string;
        loadMoreBtnLabel: string;
        errorLoadingReports: string;
        noReports: string;
        reportCards: {
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
        };
    }
}

const pageSize = 25;

const ReportHistoryClient = (props: ReportHistoryClientProps) => {
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
    const { profiles } = props;
    const [reports, setReports] = useState<CaseReport[]>([]);
    const [isPending, startTransition] = useTransition();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const loadReports = useCallback(async (profileId: string, pageNum: number, reset: boolean = false) => {
        try {
            const url = `/api/reports/${profileId}?page=${pageNum}&limit=${pageSize}`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to fetch reports');
                return;
            }

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
                return;
            }

            if (data.pagination) {
                setHasMore(data.pagination.currentPage < data.pagination.totalPages);
                setPage(data.pagination.currentPage + 1);
            }

            if (data.reports) {
                if (reset) {
                    setReports(data.reports);
                } else {
                    setReports(prev => [...prev, ...data.reports]);
                }
            }
        } catch (error) {
            toast.error(props.messages.errorLoadingReports, {
                description: error instanceof Error ? error.message : 'Unknown error',
            });
            console.error('Error fetching reports:', error);
        }
    }, []);

    useEffect(() => {
        const mainProfile = profiles.find((p: Profile) => p.mainProfile === true);
        if (mainProfile) {
            setSelectedProfileId(mainProfile.id);
        }
    }, [profiles]);

    useEffect(() => {
        // Reset state when profile changes
        if (selectedProfileId) {
            setReports([]);
            setPage(1);
            setHasMore(false);
            startTransition(async () => {
                await loadReports(selectedProfileId, 1, true);
            });
        }
    }, [selectedProfileId, loadReports]);

    const loadMoreReports = () => {
        if (!selectedProfileId) {
            toast.error(props.messages.noProfileSelected);
            return;
        }
        startTransition(async () => {
            await loadReports(selectedProfileId, page, false);
        });
    }

    const relevantReports = reports.filter((report) => {
        return report.key === 'TB' || report.key === 'EM' || report.key === 'LB' || report.key === 'chronic' || report.key === 'Fever';
    });


    let content: React.ReactNode = null;
    if (!selectedProfileId) {
        content = <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-4 border border-border text-center my-8">
            {props.messages.noProfileSelected}
        </p>
    } else {
        content = <ul className="space-y-4">
            {relevantReports.length < 1 && <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-4 border border-border text-center my-8">
                {props.messages.noReports}
            </p>}

            {relevantReports.map((report) => (
                <li key={report.id}>
                    <ReportCard
                        report={report}
                        locale={props.locale}
                        messages={props.messages.reportCards}
                    />
                </li>
            ))}
        </ul>
    }


    return <div className="space-y-4">
        {profiles.length > 1 && (
            <ProfileSelector
                disabled={isPending}
                profiles={profiles}
                messages={props.messages}
                selectedProfileId={selectedProfileId}
                onSelectedProfileIdChange={setSelectedProfileId}
            />)}
        {content}
        {isPending && <SimpleLoader />}
        {(!isPending && hasMore) && <div
            className="flex justify-center"
        >
            <Button
                variant="outline"
                onClick={loadMoreReports}>
                {props.messages.loadMoreBtnLabel}
            </Button>
        </div>}
    </div>
}

export default ReportHistoryClient;