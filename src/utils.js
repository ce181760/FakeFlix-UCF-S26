/**
 * Calculates the date that was one month ago from today
 * @returns {string} Formatted date string in YYYY-MM-DD format
 */
export const getOneMonthAgoReleaseDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toJSON().slice(0,10);

    return formattedDate;
}

/**
 * Extracts the year from a date string
 * @param {string} date - Date string in format YYYY-MM-DD
 * @returns {string} Year portion of the date (first 4 characters)
 */
export const dateToYearOnly = date => date.slice(0,4);

/**
 * Capitalizes the first letter of a given text string
 * @param {string} text - Text to capitalize
 * @returns {string} Text with first letter capitalized
 */
export const capitalizeFirstLetter = text => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

/**
 * Generates a random index within the range of the provided data array
 * @param {Array} data - Array to generate random index for
 * @returns {number} Random index within array bounds
 */
export const randomize = data => (
    Math.floor(Math.random() * data.length - 1)
);

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param {string} text - Text to truncate
 * @param {number} n - Maximum length before truncation
 * @returns {string} Truncated text with "..." appended if it exceeds the specified length
 */
export const truncate = (text, n) => (
    text?.length > n ? text.substr(0, n - 1) + "..." : text
);