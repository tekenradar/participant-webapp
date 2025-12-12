import PageTitlebar from "@/components/page-titlebar";
import SurveyItemSkeleton from "@/components/survey-components/survey-item-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const SurveySkeleton = () => {
    return (
        <div>
            <PageTitlebar>
                <Skeleton className="w-64 h-8 bg-primary/20" />
            </PageTitlebar>
            <div className="max-w-[800px] mx-auto pt-6 pb-10 survey @container">
                <div className="space-y-4">
                    <SurveyItemSkeleton variant="display"
                        showBottomText={true}
                    />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={2} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={6} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={3} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={4} />
                </div>
            </div>
        </div>
    );
};

export default SurveySkeleton;