import Link from 'next/link';
import { H2 } from './headings';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface RelatedPage {
    title?: string;
    description?: string;
    btnLabel?: string;
    date?: string;

    href?: string;
    imageURL?: string;
    imageMode?: ImageMode;
}

interface RelatedPagesProps {
    title: string;
    previousPage?: RelatedPage;
    nextPage?: RelatedPage;
    overviewPage?: RelatedPage;
}


type ImageMode = 'none' | 'left' | 'background';

const LinkCard: React.FC<RelatedPage> = (props) => {

    let imageMode: ImageMode = 'none';
    if (props.imageURL) {
        if (props.imageMode) {
            imageMode = props.imageMode;
        } else {
            imageMode = 'background';
        }
    }

    const hasImageBg = imageMode === 'background';
    const hasImageLeft = imageMode === 'left';

    return (

        <Link
            href={props.href || ''}
            className={cn(
                "@container relative group w-full flex items-stretch whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] transition-transform duration-150",
                'border border-border',
                {
                    'bg-secondary text-secondary-foreground': !hasImageBg,
                    'text-white': hasImageBg,
                },
                hasImageBg && "before:absolute before:inset-0 before:bg-black/50 before:backdrop-blur-sm before:rounded-md before:z-0",
                !hasImageBg && !hasImageLeft && "items-center justify-center"
            )}
            style={{
                backgroundImage: hasImageBg ? `url(${props.imageURL})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {hasImageLeft && props.imageURL && (
                <div className="relative hidden @md:block w-32 min-h-full flex-shrink-0 rounded-l-md overflow-hidden"
                    style={{
                        backgroundImage: `url(${props.imageURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                </div>
            )}

            <div className={cn(
                'p-4 w-full space-y-2 flex flex-col h-full',
                hasImageBg && 'relative z-10'
            )}>
                <div className={'group-hover:underline text-lg font-bold tracking-wide text-wrap'}>
                    {props.title}
                </div>
                <div className='text-sm text-wrap grow'>
                    {props.description}
                </div>
                <div className='text-sm group-hover:underline flex gap-1 items-end justify-end grow'>
                    {props.date && <span className='text-secondary-foreground/80 grow'>
                        {props.date}
                    </span>}
                    {props.btnLabel}
                    <span>
                        <ArrowRight className='size-4' />
                    </span>
                </div>
            </div>
        </Link>

    );
}


const RelatedPages: React.FC<RelatedPagesProps> = async (props) => {

    const hasTopContent = props.previousPage || props.nextPage;

    return (
        <div className='space-y-4 w-full'>
            <H2>
                {props.title}
            </H2>
            {hasTopContent && <div className='flex flex-col md:flex-row gap-4'>
                {props.previousPage && <LinkCard {...props.previousPage} />}
                {props.nextPage && <LinkCard {...props.nextPage} />}
            </div>}
            {props.overviewPage && <div className='flex gap-4 w-full'>
                <LinkCard {...props.overviewPage} />
            </div>}
        </div>
    );
};

export default RelatedPages;