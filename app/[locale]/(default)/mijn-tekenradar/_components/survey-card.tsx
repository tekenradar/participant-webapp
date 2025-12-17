import { getAvatarURL } from '@/lib/avatars';
import { getLocalizedString } from '@/lib/get-localized-string';
import { SurveyInfo } from '@/lib/server/data-fetching/survey';
import { Profile } from '@/lib/server/data-fetching/user';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

export interface SurveyCardProps {
    surveyKey: string;
    studyKey?: string;
    category: string;
    validUntil?: number;
    profiles: Profile[];
    surveyInfos?: SurveyInfo;
    language: string;
}

const SurveyCard: React.FC<SurveyCardProps> = (props) => {
    return (
        <li>

            <Link
                href={{
                    pathname: `/survey/${props.studyKey}/${props.surveyKey}`,
                    query: {
                        pid: props.profiles[0].id,
                    }
                }}
                prefetch={false}
                className={clsx(
                    'block p-4 rounded shadow-sm',
                    'hover:scale-[1.01] transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    {
                        'bg-primary text-white': ['prio', 'immediate'].includes(props.category),
                        'bg-secondary': ['normal'].includes(props.category),
                        'bg-gray-200 ': ['optional'].includes(props.category),
                    }
                )}>
                <div className='font-bold'>
                    <span className="text-basse">
                        {getLocalizedString(props.surveyInfos?.name, props.language)}
                    </span>
                    <span className={
                        clsx("ms-1 text-sm font-normal ", {
                            "text-secondary-foreground": props.category === 'normal',
                            "text-primary-foreground": ['prio', 'immediate'].includes(props.category),
                            //"text-gray-700": props.category === 'optional',
                        })
                    }>
                        {getLocalizedString(props.surveyInfos?.typicalDuration, props.language)}
                    </span>
                </div>
                <p className="italic">
                    {getLocalizedString(props.surveyInfos?.description, props.language)}
                </p>

                <div className='flex justify-end items-center text-lg mt-2 '>
                    <div className={clsx(
                        'flex items-center rounded px-2 py-2',
                        {
                            'bg-primary text-primary-foreground': ['normal'].includes(props.category),
                            'bg-secondary text-secondary-foreground': ['prio', 'immediate'].includes(props.category),
                            'bg-gray-500 text-white': ['optional'].includes(props.category),
                        }
                    )}>
                        <Avatar className='size-7 rounded-sm'>
                            <AvatarImage
                                className={clsx('bg-secondary p-0.5',
                                    {
                                        'bg-white': ['prio', 'immediate', 'optional'].includes(props.category),
                                    }
                                )}
                                src={getAvatarURL(props.profiles[0].avatarID || "")}
                            />
                            <AvatarFallback className="bg-secondary rounded-sm">
                                <UserRound className='text-secondary-foreground size-5' />
                            </AvatarFallback>
                        </Avatar>

                        <span className='ms-2 inline-block truncate max-w-[200px] text-sm'>
                            {props.profiles[0].alias}
                        </span>
                        <i className="flex items-center">
                            <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                            </svg>
                        </i>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default SurveyCard;
