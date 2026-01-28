import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/**
 * Custom hook to retrieve and configure data for different page types
 * Dispatches appropriate Redux actions based on the page type and returns formatted row data
 * 
 * @param {string} type - Type of content to retrieve ("movies", "series", or "popular")
 * @returns {Array|null} Array of row configuration objects or null if not yet loaded
 * Each row object contains: id, title, genre, selector, and isLarge properties
 */
export const useRetrieveData = (type) => {

    const dispatch = useDispatch()
    const [data, setData] = useState(null)

    useEffect(() => {
        let selectedConfigArray = null;
        // Select the appropriate configuration array based on page type
        switch (type) {
            case "movies":
                selectedConfigArray = fetchMovieDataConfig;
                break;
            case "series":
                selectedConfigArray = fetchSeriesDataConfig;
                break;
            case "popular":
                selectedConfigArray = fetchPopularDataConfig;
                break;
            default:
                break;
        }

        let isPage = true;
        // Map through configuration array and dispatch Redux actions for each row
        const rowsData = selectedConfigArray.map(el => {
            dispatch(el.thunk(el.url, isPage))
            return {
                id: el.id,
                title: el.title,
                genre: el.genre,
                selector: el.selector,
                isLarge: el.isLarge
            }
        })
        setData(rowsData)

    }, [type, dispatch])

    return data
}
