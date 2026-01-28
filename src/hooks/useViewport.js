import { useState, useEffect } from "react"

/**
 * Custom hook to track the current viewport dimensions
 * Listens to window resize events and updates width and height state accordingly
 * 
 * @returns {Object} Object containing current viewport width and height
 * @returns {number} Object.width - Current viewport width in pixels
 * @returns {number} Object.height - Current viewport height in pixels
 */
const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    /**
     * Handler function that updates viewport dimensions when window is resized
     */
    const handleWindowResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    return { width, height }
}

export default useViewport
