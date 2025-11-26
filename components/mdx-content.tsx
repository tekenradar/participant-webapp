import * as runtime from 'react/jsx-runtime'
import AccordionWithMd from './accordion-generator'
import ContentLink from './buttons/content-link'
import { cn } from '@/lib/utils'
import { H1, H2, H3 } from './headings'
import { ReactNode } from 'react'
import { ImageLinkCard } from './image-link-card'
import Container from './container'
import ImageGallery from './image-gallery'


const sharedComponents = {
    AccordionWithMd,
    ImageLinkCard,
    ImageGallery,
    Container,
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
            'mt-6',
            className,
        )}
        {...props}
    />,
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <H3
            className={cn(
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className={cn(
                "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
            {...props}
        />
    ),
}


const useMDXComponent = (code: string) => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

interface MDXProps {
    code: string
    components?: Record<string, React.ComponentType>
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
    const Component = useMDXComponent(code)
    return <Component
        components={{ ...sharedComponents, ...components }} />
}