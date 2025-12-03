import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

export const ImageLinkCard = ({
    title, moreBtnLabel, dateLabel, href, imageSrc, imageAlt, children, imageClassName, imageCredits, imageHeightClassName: imageMaxHeight,
    imagePlacement = 'top'
}: {
    title: string;
    children?: React.ReactNode;
    moreBtnLabel: string;
    dateLabel?: string;
    href: string;
    imagePlacement?: 'left' | 'top';
    imageClassName?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageCredits?: string;
    imageHeightClassName?: string;
}) => {

    const imageComponent = imageSrc ? (
        <Image
            src={imageSrc}
            alt={imageAlt || ''}
            fill
            className={cn('w-full object-cover', imageClassName)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 370px"
        />
    ) : null;

    return (
        <div
            className='w-full h-full grow @container'
        >
            <Button asChild
                className='p-0 w-full h-full'
            >
                <Link
                    href={href}
                    prefetch={false}
                    className=""
                >
                    <div className={cn(
                        "relative min-w-60 w-full h-full flex rounded-md overflow-hidden bg-secondary border border-border group",
                        imagePlacement === 'left' && 'flex-row',
                        imagePlacement === 'top' && 'flex-col',
                    )}>
                        {imageSrc && (<>
                            {(imageMaxHeight || imagePlacement === 'left') ? (
                                <div className={cn("relative", imageMaxHeight, imagePlacement === 'left' && 'min-w-36 @xl:min-w-60 hidden @md:block')}>
                                    {imageComponent}
                                    {imageCredits && (<div className="absolute bottom-2 left-2 px-1 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm">
                                        <p className="text-white text-xs">
                                            {imageCredits}
                                        </p>
                                    </div>)}
                                </div>
                            ) : (
                                <AspectRatio
                                    ratio={16 / 9}
                                    className={cn("relative", imageClassName)}
                                >
                                    {imageComponent}
                                    {imageCredits && (<div className="absolute bottom-2 left-2 px-1 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm">
                                        <p className="text-white text-xs">
                                            {imageCredits}
                                        </p>
                                    </div>)}
                                </AspectRatio>
                            )}
                        </>)}



                        <div className="flex flex-col underline-offset-4 grow">
                            <p className="px-4 py-2 font-bold text-secondary-foreground text-lg tracking-wide group-hover:underline text-wrap">
                                {title}
                            </p>
                            <div className="text-secondary-foreground px-4 text-wrap">
                                {children}
                            </div>
                            <p className="px-4 py-2 text-sm text-secondary-foreground group-hover:underline flex gap-1 items-end justify-end grow">
                                {dateLabel && <span className='text-secondary-foreground/80 grow'>
                                    {dateLabel}
                                </span>}
                                <span className='flex gap-1 items-center'>
                                    {moreBtnLabel}
                                    <span>
                                        <ArrowRight className='size-4' />
                                    </span>
                                </span>
                            </p>

                        </div>
                    </div>

                </Link >
            </Button>
        </div>
    )
}