/**
 * Banner Component
 * 
 * Displays a large hero banner at the top of pages featuring a randomly selected
 * movie or TV show with its backdrop image, title, description, and action buttons.
 * 
 * Features:
 * - Randomly selects content from the appropriate category (movies/series/netflix)
 * - Shows loading skeleton during data fetch
 * - Displays Play and More Info buttons
 * - Uses Framer Motion for smooth animations
 * - Truncates long descriptions to 150 characters
 * - Responsive design with gradient overlays
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - Type of content to display ("movies", "series", or default for netflix originals)
 * @returns {JSX.Element} Banner component with featured content
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

const Banner = ({ type }) => {
	/**
	 * Select the appropriate Redux selector based on content type
	 * - "movies": Shows trending movies
	 * - "series": Shows Netflix original series
	 * - default: Shows Netflix original movies
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

	// Get data from Redux store using the selected selector
	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	
	// Select a random item from the results to feature in the banner
	const finalData = results[randomize(results)];
	
	// Get title with fallback options (title, name, or original_name)
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	
	// Truncate description to 150 characters for better UI presentation
	const description = truncate(finalData?.overview, 150);
	
	const dispatch = useDispatch();

	/**
	 * Prevents event propagation when Play button is clicked
	 * Allows navigation to play page without triggering parent handlers
	 * 
	 * @param {Event} event - Click event
	 */
	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	/**
	 * Opens the detail modal with the featured content information
	 * Dispatches Redux action to show modal with full item details
	 */
	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<>
			{/* Loading and error section - shown while data is being fetched */}
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{/* Display skeleton loader during data fetch */}
				{loading && <SkeletonBanner />}
				{/* Display error message if data fetch fails */}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{/* Main banner content - shown after data is loaded */}
			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					// Set backdrop image as background
					style={{backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`}}
				>
					{/* Banner content container with stagger animation for children */}
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						{/* Featured content title */}
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						
						{/* Action buttons container */}
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{/* Play button - navigates to play animation page */}
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
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
						
						{/* Truncated description text */}
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					
					{/* Gradient panel for visual depth */}
					<div className="Banner__panel" />
					{/* Bottom shadow for smooth transition to content below */}
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

/**
 * Export Banner component wrapped with React.memo for performance optimization
 * React.memo prevents unnecessary re-renders when props haven't changed
 */
export default React.memo(Banner);