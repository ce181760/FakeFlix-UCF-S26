import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for implementing lazy loading with Intersection Observer API
 * Monitors when a target element enters the viewport and triggers a callback
 * Useful for infinite scroll and lazy loading of content
 * 
 * @param {Function} customCallback - Callback function to execute when element is intersecting
 * @returns {Array} Tuple containing [ref to attach to target element, boolean indicating if intersecting]
 */
const useLazyLoad = (customCallback) => {
    const endPageRef = useRef(null);
    const [ isIntersecting, setIsIntersecting ] = useState(false);
    const currentRef = endPageRef.current;

    /**
     * Callback function for Intersection Observer
     * Sets intersection state and triggers custom callback when element is in view
     */
    const callbackFunction = useCallback((entries) => {
        const [ entry ] = entries;
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) customCallback();

    }, [customCallback])

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction)
        if (currentRef) observer.observe(currentRef)

        return () => {
            if(currentRef) observer.unobserve(currentRef)
        }
    }, [currentRef, callbackFunction])

    return [endPageRef, isIntersecting];
}

export default useLazyLoad;