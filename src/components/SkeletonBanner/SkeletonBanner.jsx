import "./skeletonBanner.scss"
import SkeletonElement from "../SkeletonElement/SkeletonElement";

/**
 * SkeletonBanner Component
 * 
 * A placeholder/skeleton loader component that displays while the actual Banner content
 * is being fetched from the API. This provides visual feedback to users during loading
 * and improves perceived performance by showing the structure of the content that will appear.
 * 
 * The skeleton mimics the layout of the actual Banner component with placeholder elements
 * for the title, buttons, and description text.
 * 
 * @component
 * @returns {JSX.Element} The skeleton loader for the Banner component
 * 
 * @see Banner - The main Banner component that uses this skeleton loader
 */
const SkeletonBanner = () => {
	return (
		<div className="Skeleton__Banner">
			{/* Skeleton placeholder for the banner title */}
			<SkeletonElement type="title" />
			{/* Container for the two action buttons (Play and More Info) */}
			<div className="Skeleton__inline">
				{/* Skeleton placeholder for the Play button */}
				<SkeletonElement type="button" />
				{/* Skeleton placeholder for the More Info button */}
				<SkeletonElement type="button" />
			</div>
			{/* Skeleton placeholders for the description text (3 lines) */}
			<SkeletonElement type="text" />
			<SkeletonElement type="text" />
			<SkeletonElement type="text" />
		</div>
	);
};

export default SkeletonBanner