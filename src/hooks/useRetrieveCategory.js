import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/**
 * Custom hook to retrieve data for a specific category with pagination support
 * Determines which configuration to use based on URL and dispatches appropriate action
 * 
 * @param {string} slicedUrl - URL segment indicating content type ("browse", "movies", "tvseries", or "popular")
 * @param {string} categoryName - Genre/category name to filter by
 * @param {number} page - Page number for pagination
 * @returns {Object|undefined} Category configuration object containing thunk, selector, and other metadata
 */
export const useRetrieveCategory = (slicedUrl, categoryName, page) => {

	const dispatch = useDispatch();
	const [categoryData, setCategoryData] = useState();

	useEffect(() => {
		let selectedConfigArray = null;
		// Select configuration array based on URL segment
		switch (slicedUrl) {
			case "browse":
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "tvseries":
				selectedConfigArray = fetchSeriesDataConfig;
				break;
			case "popular":
				selectedConfigArray = fetchPopularDataConfig;
				break;
			default:
				break;
		}

		// Find the specific category configuration and dispatch fetch action with pagination
		const [data] = selectedConfigArray.filter(el => el.genre === categoryName);
		dispatch(data.thunk(`${data.url}&page=${page}`));
		setCategoryData(data);

	}, [dispatch, categoryName, slicedUrl, page])

	return categoryData;
}