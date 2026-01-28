import { useState, useEffect } from "react"

/**
 * Custom hook to track whether the page has been scrolled past a specified height
 * Useful for triggering effects like sticky navigation bars or showing scroll-to-top buttons
 * 
 * @param {number} heightLimit - Height threshold in pixels at which scroll state changes
 * @returns {boolean} True if page scroll position exceeds the height limit, false otherwise
 */
const useScroll = heightLimit => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        /**
         * Checks current scroll position against the height limit
         * Updates scroll state accordingly
         */
        const checkScroll = () => {
            window.scrollY > heightLimit ? setIsScrolled(true) : setIsScrolled(false);
        };

        window.addEventListener("scroll", checkScroll)
        return () => window.removeEventListener("scroll", checkScroll)
    }, [heightLimit])

    return isScrolled;
}

export default useScroll
