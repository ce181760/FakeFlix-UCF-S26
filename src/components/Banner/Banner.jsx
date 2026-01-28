/**
 * Banner Component
 * 
 * Displays a hero banner section with a random movie or series backdrop image,
 * title, description, and action buttons (Play and More Info).
 * Includes loading states with skeleton screens and error handling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - Type of content to display ('movies', 'series', or default)
 * @returns {JSX.Element} Banner section with backdrop, title, description, and action buttons
 */

// Component styles
import "./banner.scss";

// React core library
import React from "react";

// Framer Motion for animations
import { motion } from "framer-motion";

// Animation variants for different sections of the banner
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";

// Base URL for TMDB images
import { BASE_IMG_URL } from "../../requests";

// Icons for Play and Info buttons
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";

// Utility functions for randomizing and truncating text
import { randomize, truncate } from "../../utils";

// Router link for navigation
import { Link } from "react-router-dom";

// Loading skeleton component
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";

// Redux hooks for state management
import { useDispatch, useSelector } from "react-redux";

// Redux action for showing modal
import { showModalDetail } from "../../redux/modal/modal.actions";

// Redux selectors for fetching movies and series data
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";

/**
 * Banner.jsx
 * 
 * This file contains the Banner component which displays a hero banner section
 * on various pages (Homepage, Movies, TV Series). It randomly selects content
 * from Redux store based on the page type, displays it with animations, and
 * provides interactive buttons for playing content or viewing more details.
 * 
 * Key Features:
 * - Random content selection from fetched movie/series data
 * - Skeleton loading state during data fetch
 * - Error handling with user-friendly messages
 * - Animated transitions using Framer Motion
 * - Integration with Redux for state management
 * - Click handlers for Play and More Info actions
 */

const Banner = ({ type }) => {
	/**
	 * Determine which Redux selector to use based on content type
	 * - 'movies': Uses trending movies selector
	 * - 'series': Uses Netflix series selector
	 * - default: Uses Netflix movies selector
	 */
	let selector;
	switch (type) {
		case "movies":
			selector = selectTrendingMovies;
			break;
		case "series":
			selector = selectNetflixSeries;
			break;
		default:
			selector = selectNetflixMovies;
			break;
	}

	// Fetch data from Redux store using the selected selector
	const myData = useSelector(selector);
	
	// Destructure loading state, error state, and results array from Redux data
	const { loading, error, data: results } = myData;
	
	// Select a random item from the results array to display in the banner
	const finalData = results[randomize(results)];
	
	// Get the title with fallback options (title for movies, name for series)
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	
	// Truncate the overview description to 150 characters for display
	const description = truncate(finalData?.overview, 150);
	
	// Get dispatch function to trigger Redux actions
	const dispatch = useDispatch();

	/**
	 * Handles play button click event
	 * Prevents event propagation to parent elements
	 * 
	 * @param {Event} event - Click event object
	 */
	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	/**
	 * Opens the detail modal for the current movie/series
	 * Dispatches Redux action to show modal with content data and fallback title
	 */
	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<>
			{/* Loading and error section with fade-in animation */}
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{/* Show skeleton loader while data is being fetched */}
				{loading && <SkeletonBanner />}
				
				{/* Display error message if data fetching fails */}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{/* Main banner content - only render when data is loaded and available */}
			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					// Set backdrop image from TMDB as background
					style={{backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`}}
				>
					{/* Content container with stagger animation for child elements */}
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{/* Movie/Series title with fade-in-up animation */}
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						
						{/* Action buttons container with fade-in-up animation */}
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{/* Play button - navigates to /play route */}
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to="/play"
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							
							{/* More Info button - opens detail modal */}
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						
						{/* Movie/Series description with fade-in-up animation */}
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					
					{/* Gradient overlay panel for better text readability */}
					<div className="Banner__panel" />
					
					{/* Bottom shadow for smooth transition to content below */}
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

// Export component wrapped in React.memo for performance optimization
// Prevents unnecessary re-renders when props haven't changed
export default React.memo(Banner);