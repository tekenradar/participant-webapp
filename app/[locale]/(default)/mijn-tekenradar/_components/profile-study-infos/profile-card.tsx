import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getAvatarURL } from '@/lib/avatars';
import { SubmissionHistory } from '@/lib/server/data-fetching/responses';
import { AssignedSurvey, AssignedSurveys } from '@/lib/server/data-fetching/survey';
import { Profile } from '@/lib/server/data-fetching/user';
import { cn } from '@/lib/utils';
import { ArrowUpRight, BellIcon, CalendarIcon, ChevronRightIcon, HistoryIcon, MoreVerticalIcon, PauseIcon, SquarePenIcon, UserRound, } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { addDays, format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getLocalizedString } from '@/lib/get-localized-string';


interface ProfileCardProps {
    profile: Profile;
    assignedSurveys?: AssignedSurveys;
    submissionHistory?: SubmissionHistory;
    studyKey: string;

    locale: string;
    messages: {
        mainProfileLabel: string;
        actionsMenu: {
            open: string;
            label: string;
            pauseFollowUp: string;
            changeContactOrConsent: string;
        },
        activeSurveysHeading: string;
        noActiveSurveys: string;
        nextFollowUpLabel: string;
        nextFollowUpDatePrefix: string;
        goToAanmelden: string;
        previousSubmissions: {
            heading: string;
            noPreviousSubmissions: string;
        }
    }
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
    const submissionsForProfile = props.submissionHistory?.submissions?.filter(s => s.profileID === props.profile.id);
    const assignedSurveysForProfile = props.assignedSurveys?.surveys.filter(s => s.profileID === props.profile.id);

    const now = Date.now() / 1000;
    const activeSurveys = assignedSurveysForProfile?.filter((s: AssignedSurvey) => {
        if (s.validFrom && s.validFrom > now) {
            return false;
        }
        if (s.validUntil && s.validUntil < now) {
            return false;
        }
        return true;
    })


    let nextFollowupDate: Date | undefined = undefined;

    if (assignedSurveysForProfile) {
        for (const s of assignedSurveysForProfile) {
            if (s.surveyKey === 'FU_1' && s.validFrom !== undefined) {
                nextFollowupDate = new Date(s.validFrom * 1000);
                break;
            }
        }
    }

    if (nextFollowupDate === undefined) {
        let lastFU_1_submission = 0;
        let lastT0_1_submission = 0;
        if (submissionsForProfile) {
            for (const sub of submissionsForProfile) {
                if (sub.surveyKey === 'FU_1' && sub.timestamp > lastFU_1_submission) {
                    lastFU_1_submission = sub.timestamp;
                }
                if (sub.surveyKey === 'T0_1' && sub.timestamp > lastT0_1_submission) {
                    lastT0_1_submission = sub.timestamp;
                }
            }
        }

        const lastSubmission = Math.max(lastFU_1_submission, lastT0_1_submission) * 1000;
        nextFollowupDate = lastSubmission ? addDays(new Date(lastSubmission), 90) : undefined;
    }

    return (
        <div className='border border-border rounded-md overflow-hidden'>
            <h3 className='text-lg font-semibold flex items-center gap-2 overflow-x-auto bg-secondary p-4 py-2 border-border border-b'>
                <Avatar className='size-8 rounded-sm'>
                    <AvatarImage
                        className={cn('bg-secondary p-0.5')}
                        src={getAvatarURL(props.profile.avatarID || "")}
                        alt={props.profile.avatarID}
                    />
                    <AvatarFallback className="bg-secondary rounded-sm">
                        <UserRound className='text-secondary-foreground size-5' />
                    </AvatarFallback>
                </Avatar>
                <span className='grow'>
                    {props.profile.alias}
                    <span>
                        {props.profile.mainProfile && <span className='text-xs ms-1 text-muted-foreground'>
                            ({props.messages.mainProfileLabel})
                        </span>}
                    </span>
                </span>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVerticalIcon className='size-4' />
                            <span className='sr-only'>
                                {props.messages.actionsMenu.open}
                            </span>
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>{props.messages.actionsMenu.label}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href={{
                                    pathname: `/survey/${props.studyKey}/Study_preferences`,
                                    query: {
                                        pid: props.profile.id,
                                        ignoreImmediateSurveys: true,
                                    }
                                }}
                                prefetch={false}
                            >
                                <SquarePenIcon className='mr-2 text-muted-foreground size-4' />
                                {props.messages.actionsMenu.changeContactOrConsent}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={{
                                    pathname: `/survey/${props.studyKey}/User_pause`,
                                    query: {
                                        pid: props.profile.id,
                                        ignoreImmediateSurveys: true,
                                    }
                                }}
                                prefetch={false}
                            >
                                <PauseIcon className='mr-2 text-muted-foreground size-4' />
                                {props.messages.actionsMenu.pauseFollowUp}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </h3>

            <div className='space-y-4 px-4 py-4'>
                <Collapsible defaultOpen={true}
                    className='group'
                >
                    <CollapsibleTrigger
                        className='w-full'
                    >
                        <h4 className='font-semibold flex items-center gap-2 w-full'>
                            <span>
                                <BellIcon className='text-muted-foreground size-4' />
                            </span>
                            <span className='grow text-start'>
                                {props.messages.activeSurveysHeading}
                                <span className='text-primary ms-1'>
                                    {activeSurveys?.length || 0}
                                </span>
                            </span>
                            <span>
                                <ChevronRightIcon className='text-muted-foreground size-4 group-data-[state=open]:rotate-90' />
                            </span>

                        </h4>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='px-0 sm:px-6 pt-4'>
                        {(activeSurveys === undefined || activeSurveys.length === 0) ? <p className='text-muted-foreground border border-border border-dotted rounded-md text-center px-4 py-2 text-sm'>
                            {props.messages.noActiveSurveys}
                        </p> :
                            <TooltipProvider>
                                <ul className='space-y-2'>
                                    {activeSurveys?.map((s) => {
                                        const surveyInfo = props.assignedSurveys?.surveyInfos.find(si => si.studyKey === props.studyKey && si.surveyKey === s.surveyKey);
                                        if (!surveyInfo) {
                                            console.error('survey info not found for survey', s.surveyKey);
                                            return null;
                                        }
                                        return (
                                            <li key={s.surveyKey}
                                                className=''
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link
                                                            href={{
                                                                pathname: `/survey/${props.studyKey}/${s.surveyKey}`,
                                                                query: {
                                                                    pid: props.profile.id,
                                                                }
                                                            }}
                                                            prefetch={false}
                                                            className={cn(
                                                                'flex items-center p-4 rounded shadow-sm',
                                                                'hover:scale-[1.01] transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                                                {
                                                                    'bg-primary text-white': ['prio', 'immediate'].includes(s.category),
                                                                    'bg-secondary': ['normal'].includes(s.category),
                                                                    'bg-gray-200 ': ['optional'].includes(s.category),
                                                                }
                                                            )}
                                                        >
                                                            <div className='font-bold grow'>
                                                                <p className="text-lg">
                                                                    {getLocalizedString(surveyInfo?.name, props.locale)}
                                                                </p>
                                                                <p className={
                                                                    cn("text-sm font-normal ", {
                                                                        "text-secondary-foreground": s.category === 'normal',
                                                                        "text-primary-foreground": ['prio', 'immediate'].includes(s.category),
                                                                        //"text-gray-700": props.category === 'optional',
                                                                    })
                                                                }>
                                                                    {getLocalizedString(surveyInfo?.typicalDuration, props.locale)}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <ChevronRightIcon />
                                                            </div>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent className='w-80'>
                                                        {getLocalizedString(surveyInfo.description, props.locale)}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </li>)
                                    }
                                    )}
                                </ul>
                            </TooltipProvider>}
                        <div className='mt-6'>
                            <h5 className='text-sm flex items-center gap-2'>
                                <CalendarIcon className='text-muted-foreground size-4' />
                                {props.messages.nextFollowUpLabel}
                            </h5>
                            {nextFollowupDate ? <p className='font-medium text-primary h-10 flex items-center'>
                                {props.messages.nextFollowUpDatePrefix}  {format(nextFollowupDate, 'PP', {
                                    locale: nl,
                                })}
                            </p> : <Button variant='link' className='px-0 text-base h-10' asChild>
                                <Link href={`/melden?profile=${props.profile.id}`}>
                                    {props.messages.goToAanmelden}
                                    <span>
                                        <ArrowUpRight className='size-4 ms-2' />
                                    </span>
                                </Link>
                            </Button>
                            }
                        </div>

                    </CollapsibleContent>
                </Collapsible>

                <Separator />

                <Collapsible
                    className='group'
                >
                    <CollapsibleTrigger
                        className='w-full'
                    >
                        <h4 className='font-semibold flex items-center gap-2 w-full'>
                            <span>
                                <HistoryIcon className='text-muted-foreground size-4' />
                            </span>
                            <span className='grow text-start'>
                                {props.messages.previousSubmissions.heading}
                            </span>
                            <span>
                                <ChevronRightIcon className='text-muted-foreground size-4 group-data-[state=open]:rotate-90' />
                            </span>

                        </h4>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {(submissionsForProfile === undefined || submissionsForProfile.length === 0) ? <p className='text-muted-foreground border border-border border-dotted rounded-md text-center px-4 py-2 text-sm'>
                            {props.messages.previousSubmissions.noPreviousSubmissions}
                        </p> :
                            <ul className='gap-4 px-0 sm:px-6 py-2 grid grid-cols-1 sm:grid-cols-2'>
                                {submissionsForProfile.map((s, i) => {
                                    let surveyInfo = props.submissionHistory?.surveyInfos.find(si => si.surveyKey === s.surveyKey && si.versionId === s.versionId);
                                    if (!surveyInfo) {
                                        surveyInfo = props.submissionHistory?.surveyInfos.find(si => si.surveyKey === s.surveyKey);
                                    }

                                    return (
                                        <li key={s.profileID + i.toString()}
                                            className='px-4 py-2 border border-border rounded-md'
                                        >
                                            <p className='text-xs text-muted-foreground'>
                                                {format(new Date(s.timestamp * 1000), 'PP p', { locale: nl })}
                                            </p>
                                            <p className='text-sm font-mdium'>
                                                {surveyInfo !== undefined ? getLocalizedString(surveyInfo.name, props.locale) : s.surveyKey}
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                        }

                    </CollapsibleContent>
                </Collapsible>

            </div>
        </div>
    );
};

export default ProfileCard;
