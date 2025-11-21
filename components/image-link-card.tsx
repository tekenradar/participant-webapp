import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

export const ImageLinkCard = ({ title, moreBtnLabel, href, imageSrc, imageAlt, children, imageClassName, imageCredits }: {
    title: string;
    children?: React.ReactNode;
    moreBtnLabel: string;
    href: string;
    imageClassName?: string;
    imageSrc: string;
    imageAlt: string;
    imageCredits?: string;
}) => {
    return (
        <div
            className='w-full h-full grow'
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
                        "relative min-w-60 w-full h-full flex flex-col rounded-md overflow-hidden bg-secondary border border-border group",
                    )}>
                        <AspectRatio
                            ratio={16 / 9}
                            className="relative"
                        >
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className={cn('w-full object-cover', imageClassName)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 370px"
                            />
                            {imageCredits && (<div className="absolute bottom-2 left-2 px-1 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm">
                                <p className="text-white text-xs">
                                    {imageCredits}
                                </p>
                            </div>)}
                        </AspectRatio>

                        <div className="flex flex-col underline-offset-4 grow">
                            <p className="px-4 py-2 font-bold text-secondary-foreground text-lg tracking-wide group-hover:underline text-wrap">
                                {title}
                            </p>
                            <div className="text-secondary-foreground px-4 text-wrap">
                                {children}
                            </div>
                            <p className="px-4 py-2 text-sm text-secondary-foreground group-hover:underline flex gap-1 items-end justify-end grow">
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