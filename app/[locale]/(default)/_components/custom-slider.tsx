"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderTrackVariants = cva(
    "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
    {
        variants: {
            variant: {
                default: "bg-white",
                secondary: "bg-secondary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface SliderProps
    extends React.ComponentProps<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderTrackVariants> { }

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    variant,
    ...props
}: SliderProps) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                    ? defaultValue
                    : [min, max],
        [value, defaultValue, min, max]
    )

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                "py-3 data-[orientation=vertical]:py-0 data-[orientation=vertical]:px-3",
                className
            )}
            {...props}
        >

            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(sliderTrackVariants({ variant }))}
            >
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-between px-1.5">
                    {Array.from({ length: max - min + 1 }, (_, index) => (
                        <div key={index} className="text-sm h-6 bg-neutral-500 w-1 rounded-full">

                        </div>
                    ))}
                </div>
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className="border-white ring-offset-1 ring-primary/50 block size-5 shrink-0 rounded-full border bg-primary shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 outline-none focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                />
            ))}
        </SliderPrimitive.Root>
    )
}

export { Slider }
