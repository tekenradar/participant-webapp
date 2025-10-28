import React from "react";
import { getClassName } from "../../utils";
import { cn } from "@/lib/utils";

const bootstrapBreakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'];

interface BreakpointModeDef {
    start?: string;
    end?: string;
    variant: Variant;
}

export type Variant = BipolarLikertScaleVariant | SingleChoiceVariant;

type SingleChoiceVariant = 'vertical' | 'horizontal' | 'table';
type BipolarLikertScaleVariant = 'vertical' | 'withLabelRow' | 'table';

const getModeForBreakpont = (bp: string, styles?: Array<{ key: string, value: string }>): Variant | undefined => {
    if (!styles) { return undefined };
    const bpMode = styles.find(style => style.key === `${bp}Mode`);
    if (!bpMode) {
        return undefined;
    }
    return bpMode.value as Variant;
}

const getDefaultMode = (styles?: Array<{ key: string, value: string }>): Variant | undefined => {
    if (!styles) { return undefined };
    const bpMode = styles.find(style => style.key === 'defaultMode');
    if (!bpMode) {
        return 'vertical';
    }
    return bpMode.value as Variant;
}

export const getResponsiveModes = (width: number, renderMode: (variant: Variant, namePrefix: string) => React.ReactNode, styles?: Array<{ key: string, value: string }>) => {
    const defaultMode = getDefaultMode(styles);
    if (!defaultMode) {
        return <p>No default mode found.</p>
    }
    let currentMode: BreakpointModeDef = {
        variant: defaultMode
    };

    const screenSize = getScreenSizeLabel(width);
    const screenSizeIndex = bootstrapBreakpoints.indexOf(screenSize);

    bootstrapBreakpoints.forEach((bp, index) => {
        if (index >= screenSizeIndex) {
            return
        }
        const mode = getModeForBreakpont(bp, styles);
        if (mode === undefined) {
            return;
        }
        currentMode.end = bp;
        currentMode = {
            start: bp,
            variant: mode,
        }
    });


    const className = getClassName(styles);

    return (
        <React.Fragment>
            <div
                className={cn(
                    'overflow-visible',
                    className,
                )}
            >
                {renderMode(currentMode.variant, currentMode.start ? currentMode.start : 'default')}
            </div>
        </React.Fragment>
    )
}

const breakpoints = {
    sm: 448,
    md: 512,
    lg: 768,
    xl: 896,
    xxl: 1024,
}


export const getScreenSizeLabel = (width: number): string => {
    let screenSizeLabel = 'xs';
    for (const key in breakpoints) {
        if (width < breakpoints[key as keyof typeof breakpoints]) {
            screenSizeLabel = key;
            break;
        }
    }
    return screenSizeLabel;
}

export const getBreakpointValue = (bp?: string): number => {
    if (!bp || !bootstrapBreakpoints.includes(bp)) {
        return 0;
    }
    return breakpoints[bp as keyof typeof breakpoints];
}
