import { useEffect, useRef } from 'react';

export const useDebounce = (callbacks: Array<() => void>, delay: number, deps: Array<unknown>) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callbacks.forEach(callback => callback()); // Execute all callbacks
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [...deps]); // Only depend on 'deps'
};
