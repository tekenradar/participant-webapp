import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type SurveyItemSkeletonVariant = 'singleChoice' | 'display';

interface SurveyItemSkeletonProps {
    variant?: SurveyItemSkeletonVariant;
    showBottomText?: boolean;
    numOptions?: number; // For singleChoice variant
}

export default function SurveyItemSkeleton({
    variant = 'singleChoice',
    showBottomText = false,
    numOptions = 4, // Default number of options for singleChoice
}: SurveyItemSkeletonProps) {
    // Single choice variant: title in header, options with radio buttons
    if (variant === 'singleChoice') {
        const optionWidths = ['w-full', 'w-4/5', 'w-3/4', 'w-5/6', 'w-2/3', 'w-1/2'];
        const actualNumOptions = Math.min(numOptions, 6); // Cap at 6 for reasonable display

        return (
            <div
                role='group'
                className={cn(
                    'bg-[--survey-card-bg] rounded-[--survey-card-border-radius-sm] @md:rounded-[--survey-card-border-radius] relative'
                )}
            >
                <fieldset className='min-w-64'>
                    {/* Header with title */}
                    <legend
                        className={cn(
                            'flex items-center w-full',
                            'rounded-t-[--survey-card-border-radius-sm] @md:rounded-t-[--survey-card-border-radius]',
                            'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-2 @md:py-4',
                            'bg-[--survey-card-header-bg]'
                        )}
                    >
                        <div className="grow">
                            <Skeleton className="h-6 @md:h-7 w-3/4 bg-[--survey-skeleton-header-bg]" />
                        </div>
                    </legend>

                    {/* Options */}
                    <div className="py-2 @md:py-4">
                        {Array.from({ length: actualNumOptions }).map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'flex items-center gap-2 @md:gap-3',
                                    'px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-1.5'
                                )}
                            >
                                {/* Radio button skeleton */}
                                <Skeleton className="size-5 rounded-full bg-[--survey-skeleton-bg]" />
                                {/* Option text with varying widths */}
                                <Skeleton
                                    className={cn(
                                        'h-5 bg-[--survey-skeleton-bg]',
                                        optionWidths[index % optionWidths.length]
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        );
    }

    // Display variant: no header, just body content
    if (variant === 'display') {
        return (
            <div
                role='group'
                className={cn(
                    'bg-[--survey-card-bg] rounded-[--survey-card-border-radius-sm] @md:rounded-[--survey-card-border-radius] relative'
                )}
            >
                <div className="px-[--survey-card-px-sm] @md:px-[--survey-card-px] py-2 @md:py-4">
                    {/* Content */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-[--survey-skeleton-bg]" />
                        <Skeleton className="h-4 w-5/6 bg-[--survey-skeleton-bg]" />
                        <Skeleton className="h-4 w-4/5 bg-[--survey-skeleton-bg]" />
                    </div>

                    {/* Additional content if needed */}
                    {showBottomText && (
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-full bg-[--survey-skeleton-bg]" />
                            <Skeleton className="h-4 w-3/4 bg-[--survey-skeleton-bg]" />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
