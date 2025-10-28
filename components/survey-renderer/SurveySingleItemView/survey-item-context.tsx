import { createContext, useContext, useEffect, useRef, useState } from "react";


interface SurveyItemContextValue {
    itemKey: string;
    headerId: string;
    width: number;
}


const SurveyItemContext = createContext<SurveyItemContextValue | null>(null);


interface SurveyItemContextProviderProps {
    children: React.ReactNode;
    itemKey: string;
}

export const SurveyItemContextProvider: React.FC<SurveyItemContextProviderProps> = ({
    children,
    itemKey,
}) => {
    const [width, setWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateWidth = () => {
            setWidth(containerRef.current?.offsetWidth ?? null);
        };

        // Set initial width
        updateWidth();

        // Create ResizeObserver to track width changes
        const resizeObserver = new ResizeObserver(updateWidth);
        const currentContRef = containerRef.current;
        resizeObserver.observe(currentContRef);

        return () => {
            if (currentContRef) {
                resizeObserver.unobserve(currentContRef);
            }
        };
    }, []);

    const contextValue: SurveyItemContextValue = {
        itemKey,
        headerId: `${itemKey}-header`,
        width: width || 0,
    };

    return <SurveyItemContext.Provider value={contextValue}>
        <div
            className='@container'
            ref={containerRef}
        >
            {children}
        </div>
    </SurveyItemContext.Provider>
}

export const useSurveyItemCtx = () => {
    const context = useContext(SurveyItemContext);
    if (!context) {
        throw new Error('useSurveyItemCtx must be used within a SurveyItemContextProvider');
    }
    return context;
};
