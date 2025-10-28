import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import ContentLink from './buttons/content-link';
import { cn } from '@/lib/utils';
import { H1, H2 } from './headings';
import rehypeRaw from 'rehype-raw'


interface MarkdownRendererProps {
    className?: string;
    children: string;
}

const EmbeddedMarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return (
        <div className={props.className}>
            <ReactMarkdown
                components={{
                    a: ({ ...props }) => {
                        return <ContentLink
                            prefetch={false}
                            href={props.href as string}
                        >
                            {props.children as ReactNode}
                        </ContentLink>

                    },
                    h1: H1,
                    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <H2
                        className={cn(
                            'mt-2',
                            className,
                        )}
                        {...props}
                    />,
                    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                        <h3
                            className={cn(
                                "font-heading mt-2 scroll-m-20 text-xl font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                        <h4
                            className={cn(
                                "font-heading mt-2 scroll-m-20 text-lg font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                        <h5
                            className={cn(
                                "mt-2 scroll-m-20 text-lg font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
                        <h6
                            className={cn(
                                "mt-2 scroll-m-20 text-base font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
                        <p
                            className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}
                            {...props}
                        />
                    ),
                    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
                        <ul className={cn("my-3 ml-4 list-disc", className)} {...props} />
                    ),
                    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
                        <ol className={cn("my-3 ml-4 list-decimal", className)} {...props} />
                    ),
                    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
                        <li className={cn("mt-0", className)} {...props} />
                    ),
                    u: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
                        <u className={cn("underline-offset-4", className)} {...props} />
                    ),
                    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
                        <blockquote
                            className={cn("mt-3 border-l-2 pl-6 italic", className)}
                            {...props}
                        />
                    ),
                }}
                rehypePlugins={[rehypeRaw]}
            >
                {props.children}
            </ReactMarkdown>
        </div>
    );
};

export default EmbeddedMarkdownRenderer;
