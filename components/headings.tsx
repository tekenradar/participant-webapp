import { cn } from "@/lib/utils";

export const H1 = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
        className={cn(
            "font-heading mt-2 scroll-m-20 text-4xl font-bold",
            className
        )}
        {...props}
    />
)

export const H2 = ({
    borderOnTop = false,
    className, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { borderOnTop?: boolean }) => (
    <h2
        className={cn(
            "font-heading mt-6 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 border-primary",
            borderOnTop ? "border-t-2 pt-2" : "border-b-2 pb-2",
            className
        )}
        {...props}
    />
)

export const H3 = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
        className={cn(
            "font-heading mt-6 scroll-m-20 text-xl font-semibold tracking-tight",
            className
        )}
        {...props}
    />
)