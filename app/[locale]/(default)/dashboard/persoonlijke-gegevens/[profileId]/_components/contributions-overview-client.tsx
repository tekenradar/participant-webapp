"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Contribution {
    time: number;
    hasSymptoms: boolean;
}

interface ContributionsOverviewClientProps {
    contributionsList: Array<Contribution>;
    messages: {
        previousYear: string;
        nextYear: string;
        currentYear: string;
        beforeJoin: string;
        noSubmissions: string;
        submissionsCount: string;
        weekOf: string;
    };
}

const ContributionsOverviewClient: React.FC<ContributionsOverviewClientProps> = (props) => {
    const { contributionsList, messages } = props;

    // Extract year range from earliest contribution to current year
    const getYearsFromContributions = (contributions: Array<Contribution>): number[] => {
        if (contributions.length === 0) {
            return [new Date().getFullYear()];
        }

        const contributionYears = contributions.map(contribution => {
            // Convert POSIX timestamp (seconds) to Date and extract year
            const date = new Date(contribution.time * 1000);
            return date.getFullYear();
        });

        const earliestYear = Math.min(...contributionYears);
        const currentYear = new Date().getFullYear();

        // Generate array of all years from earliest to current
        const yearRange: number[] = [];
        for (let year = earliestYear; year <= currentYear; year++) {
            yearRange.push(year);
        }

        return yearRange;
    };

    const availableYears = getYearsFromContributions(contributionsList);
    const latestYear = availableYears.length > 0 ? availableYears[availableYears.length - 1] : new Date().getFullYear();

    // State to manage selected year, default to latest year
    const [selectedYear, setSelectedYear] = useState<number>(latestYear);

    // Navigation functions
    const goToPreviousYear = () => {
        const currentIndex = availableYears.indexOf(selectedYear);
        if (currentIndex > 0) {
            setSelectedYear(availableYears[currentIndex - 1]);
        }
    };

    const goToNextYear = () => {
        const currentIndex = availableYears.indexOf(selectedYear);
        if (currentIndex < availableYears.length - 1) {
            setSelectedYear(availableYears[currentIndex + 1]);
        }
    };

    // Check if navigation is possible
    const canGoToPrevious = availableYears.indexOf(selectedYear) > 0;
    const canGoToNext = availableYears.indexOf(selectedYear) < availableYears.length - 1;

    // Helper functions for ISO week calculations
    const getISOWeekDate = (year: number, week: number): { start: Date; end: Date } => {
        const jan4 = new Date(year, 0, 4);
        const jan4Day = jan4.getDay() || 7; // Convert Sunday (0) to 7
        const firstMonday = new Date(jan4.getTime() - (jan4Day - 1) * 24 * 60 * 60 * 1000);

        const weekStart = new Date(firstMonday.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
        weekEnd.setHours(23, 59, 59, 999);

        return { start: weekStart, end: weekEnd };
    };

    const getFirstContributionDate = (): Date | null => {
        if (contributionsList.length === 0) return null;
        const earliestTimestamp = Math.min(...contributionsList.map(c => c.time));
        return new Date(earliestTimestamp * 1000);
    };

    // Compute year matrix based on ISO weeks
    const computeYearMatrix = (): Array<Array<{
        category: 'beforeJoin' | 'noSubmissions' | 'hasSubmissions';
        hasSymptoms: boolean;
        count: number;
        weekStart: Date;
        weekEnd: Date;
    }>> => {
        const matrix = [];
        const firstContribution = getFirstContributionDate();

        for (let row = 0; row < 4; row++) {
            const matrixRow = [];
            for (let col = 0; col < 13; col++) {
                const weekNumber = row * 13 + col + 1;
                if (weekNumber > 52) {
                    // Handle weeks beyond 52 (some years have 53 weeks)
                    matrixRow.push({
                        category: 'noSubmissions' as const,
                        hasSymptoms: false,
                        count: 0,
                        weekStart: new Date(),
                        weekEnd: new Date()
                    });
                    continue;
                }

                const { start: weekStart, end: weekEnd } = getISOWeekDate(selectedYear, weekNumber);

                // Check if this week is before first contribution
                if (firstContribution && weekEnd < firstContribution) {
                    matrixRow.push({
                        category: 'beforeJoin' as const,
                        hasSymptoms: false,
                        count: 0,
                        weekStart,
                        weekEnd
                    });
                    continue;
                }

                // Find contributions for this week
                const weekContributions = contributionsList.filter(contribution => {
                    const contributionDate = new Date(contribution.time * 1000);
                    return contributionDate >= weekStart && contributionDate <= weekEnd;
                });

                const hasSymptoms = weekContributions.some(c => c.hasSymptoms);
                const count = weekContributions.length;

                matrixRow.push({
                    category: count > 0 ? 'hasSubmissions' as const : 'noSubmissions' as const,
                    hasSymptoms,
                    count,
                    weekStart,
                    weekEnd
                });
            }
            matrix.push(matrixRow);
        }

        return matrix;
    };

    const yearMatrix = computeYearMatrix();


    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            <TooltipProvider delayDuration={0}>
                <div className="flex flex-col gap-0.5">
                    {yearMatrix.map((row, rowIndex) => {
                        return (
                            <div className="flex flex-row gap-0.5" key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    const formatDate = (date: Date) => {
                                        return date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        });
                                    };

                                    const getTooltipContent = () => {
                                        const weekRange = `${messages.weekOf} ${formatDate(cell.weekStart)} - ${formatDate(cell.weekEnd)}`;

                                        if (cell.category === 'beforeJoin') {
                                            return `${weekRange}\n${messages.beforeJoin}`;
                                        }

                                        if (cell.category === 'noSubmissions') {
                                            return `${weekRange}\n${messages.noSubmissions}`;
                                        }

                                        const submissionText = messages.submissionsCount;

                                        return `${weekRange}\n${submissionText}${cell.count.toString()}`;
                                    };

                                    return (
                                        <Tooltip key={cellIndex}>
                                            <TooltipTrigger asChild>
                                                <div className={cn(
                                                    "size-6 bg-muted rounded-sm border border-border cursor-pointer",
                                                    {
                                                        "opacity-0": cell.category === 'beforeJoin',
                                                        "bg-primary border-primary": cell.category === 'hasSubmissions' && cell.hasSymptoms,
                                                        "bg-secondary border-secondary": cell.category === 'hasSubmissions' && !cell.hasSymptoms,
                                                    }
                                                )}>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div className="whitespace-pre-line">
                                                    {getTooltipContent()}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
            </TooltipProvider>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousYear}
                    disabled={!canGoToPrevious}
                >
                    <span className="sr-only">{messages.previousYear}</span>
                    <ChevronLeftIcon className="size-4" />
                </Button>
                <span className="font-bold min-w-[4rem] text-center">
                    <span className="sr-only">{messages.currentYear}</span>
                    {selectedYear}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNextYear}
                    disabled={!canGoToNext}
                >
                    <span className="sr-only">{messages.nextYear}</span>
                    <ChevronRightIcon className="size-4" />
                </Button>
            </div>


        </div>
    );
}

export default ContributionsOverviewClient;