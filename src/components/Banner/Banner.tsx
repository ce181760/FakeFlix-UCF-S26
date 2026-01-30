/**
 * Banner Component
 * 
 * A hero banner component that displays a featured movie or TV series with a backdrop image,
 * title, description, and action buttons. The component uses Framer Motion for animations
 * and Redux for state management.
 * 
 * Features:
 * - Displays a random movie/series from the selected category
 * - Animated entrance and transitions using Framer Motion
 * - Loading state with skeleton component
 * - Error handling for failed data fetches
 * - Responsive design that adapts to different screen sizes
 * - Play button that navigates to video player
 * - Info button that opens a detailed modal
 * 
 * @component
 * @example
 * // Display banner for movies
 * <Banner type="movies" />
 * 
 * // Display banner for TV series
 * <Banner type="series" />
 * 
 * // Display default banner (Netflix originals)
 * <Banner />
 */

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
 * Props for the Banner component
 */
interface BannerProps {
	/** Type of content to display ('movies', 'series', or undefined for default) */
	type?: "movies" | "series";
}

/**
 * Banner Component
 * 
 * @param props - Component props
 * @returns The rendered Banner component
 */
const Banner: React.FC<BannerProps> = ({ type }) => {
	// Determine which Redux selector to use based on the type prop
	// This allows the banner to display different content categories
	let selector;
	switch (type) {
		case "movies":
			// Use trending movies for the movies page
			selector = selectTrendingMovies;
			break;
		case "series":
			// Use Netflix series for the TV series page
			selector = selectNetflixSeries;
			break;
		default:
			// Default to Netflix original movies for the homepage
			selector = selectNetflixMovies;
			break;
	}

	// Fetch data from Redux store using the selected selector
	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	
	// Select a random item from the results array to display
	const finalData = results[randomize(results)];
	
	// Extract the title with fallback to alternative title fields
	// Different content types may use different title properties
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	
	// Truncate the description to 150 characters for better UI presentation
	const description = truncate(finalData?.overview, 150);
	
	// Redux dispatch for triggering actions
	const dispatch = useDispatch();

	/**
	 * Handles the play button click event
	 * Prevents event propagation to avoid triggering parent element handlers
	 * 
	 * @param event - The click event object
	 */
	const handlePlayAnimation = (event: React.MouseEvent<HTMLAnchorElement>): void => {
		event.stopPropagation();
	};

	/**
	 * Opens the detail modal for the current banner content
	 * Dispatches a Redux action with the content data and fallback title
	 */
	const handleModalOpening = (): void => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<> 
			{/* Loading/Error Section - Displays while data is being fetched or if an error occurs */}
			<motion.div
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
			</motion.div>

			{/* Main Banner Content - Only renders when data is loaded and available */}
			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					// Set the backdrop image as the banner background
					style={{backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`}}
				>
					{/* Banner Content Container - Title, buttons, and description */}
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{/* Banner Title with fade-in-up animation */}
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">
							{fallbackTitle}
						</motion.h1>
						{/* Action Buttons Container */}
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{/* Play Button - Navigates to the video player page */}
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							{/* More Info Button - Opens the detail modal */}
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						{/* Content Description with fade-in-up animation */}
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">
							{description}
						</motion.p>
					</motion.div>
					{/* Semi-transparent overlay panel for better text readability */}
					<div className="Banner__panel" />
					{/* Bottom shadow gradient for smooth transition to content below */}
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</> 
	);
}

// Export with React.memo for performance optimization
// Prevents unnecessary re-renders when props haven't changed
export default React.memo(Banner);
