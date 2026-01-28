import "./banner.scss";
import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";

/**
 * Banner Component
 * 
 * A hero banner component that displays featured content (movies or series) with a full-width
 * background image. This component serves as the main showcase section at the top of the page,
 * similar to Netflix's hero banner.
 * 
 * Features:
 * - Displays a random featured movie or series from the selected category
 * - Shows backdrop image, title, and truncated description
 * - Includes Play and More Info action buttons
 * - Handles loading states with a skeleton loader
 * - Animated entrance using Framer Motion
 * - Responsive to different content types (movies/series/trending)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - The type of content to display ('movies', 'series', or default for Netflix movies)
 * @returns {JSX.Element} The rendered Banner component
 * 
 * @example
 * // Display trending movies in the banner
 * <Banner type="movies" />
 * 
 * @example
 * // Display Netflix series in the banner
 * <Banner type="series" />
 */
const Banner = ({ type }) => {
	/**
	 * Determine which Redux selector to use based on the content type.
	 * This switch statement maps the 'type' prop to the appropriate Redux selector
	 * for fetching the corresponding movie or series data.
	 */
	let selector;
	switch (type) {
		case "movies":
			// Use trending movies selector for 'movies' type
			selector = selectTrendingMovies;
			break;
		case "series":
			// Use Netflix series selector for 'series' type
			selector = selectNetflixSeries;
			break;
		default:
			// Default to Netflix movies selector
			selector = selectNetflixMovies;
			break;
	}

	/**
	 * Fetch data from Redux store using the determined selector.
	 * The data includes loading state, error state, and the actual results array.
	 */
	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	
	/**
	 * Select a random item from the results array to display in the banner.
	 * This ensures variety and prevents showing the same content every time.
	 */
	const finalData = results[randomize(results)];
	
	/**
	 * Determine the display title with fallback options.
	 * Different content types may have different title properties (title, name, original_name).
	 */
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	
	/**
	 * Truncate the description to 150 characters for better UI presentation.
	 * This prevents overly long descriptions from cluttering the banner.
	 */
	const description = truncate(finalData?.overview, 150);
	
	/**
	 * Redux dispatch function for triggering actions.
	 */
	const dispatch = useDispatch();

	/**
	 * Handles the play button click event.
	 * Stops event propagation to prevent parent elements from handling the click.
	 * This ensures the Link navigation works correctly without triggering other click handlers.
	 * 
	 * @param {Event} event - The click event object
	 */
	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	/**
	 * Opens the modal with detailed information about the selected content.
	 * Dispatches the showModalDetail action with the content data merged with the fallback title.
	 * This creates a complete content object with all necessary properties including a guaranteed title.
	 * Allows users to view more information before deciding to watch the content.
	 */
	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<>
			{/* 
				Loading and Error Section
				Displays a skeleton loader while data is being fetched,
				or an error message if the fetch fails.
			*/}
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{/* Show skeleton loader during data fetch */}
				{loading && <SkeletonBanner />}
				{/* Show error message if data fetch fails */}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{/* 
				Main Banner Section
				Rendered only when data has loaded successfully and finalData is available.
				Features:
				- Full-width background image using the backdrop_path
				- Animated entrance with fade-in effects
				- Content overlay with title, buttons, and description
			*/}
			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`}}
				>
					{/* 
						Banner Content Container
						Uses staggered animation for child elements (title, buttons, description)
						to create a sequential reveal effect
					*/}
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{/* Content title with fade-in-up animation */}
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						
						{/* Action buttons container with fade-in-up animation */}
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{/* Play button - navigates to the play page */}
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							{/* More Info button - opens detailed modal */}
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						
						{/* Content description with fade-in-up animation */}
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					
					{/* Gradient panel for better text readability */}
					<div className="Banner__panel" />
					{/* Bottom shadow for smooth transition to content below */}
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

/**
 * Export the Banner component wrapped in React.memo for performance optimization.
 * React.memo prevents unnecessary re-renders when props haven't changed,
 * which is beneficial since this component can be relatively expensive to render
 * due to its animations and large background images.
 */
export default React.memo(Banner);