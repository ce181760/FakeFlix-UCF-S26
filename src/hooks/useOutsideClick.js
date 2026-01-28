import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a specified element
 * Useful for closing modals, dropdowns, and other UI elements when clicking outside
 * 
 * @param {React.RefObject} ref - React ref object pointing to the element to monitor
 * @param {Function} callback - Function to call when a click occurs outside the element
 */
const useOutsideClick = (ref, callback) => {

	/**
	 * Handler that checks if click occurred outside the referenced element
	 * Executes callback if click is outside
	 */
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	});
};

export default useOutsideClick;
