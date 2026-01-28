import { genresList } from "../dataConfig";

/**
 * Custom hook to convert genre IDs to genre names
 * Takes an array of genre IDs and returns a list of corresponding genre names
 * Limited to the first 3 genres to avoid cluttering the UI
 * 
 * @param {Array<number>} genreIds - Array of TMDB genre IDs
 * @returns {Array<string>} Array of genre names (maximum 3 items)
 */
const useGenreConversion = genreIds => {
	const genresConvertedList = [];
	genreIds
		.slice(0, 3)
		.map(genreId =>
			genresList
				.filter(el => el.id === genreId)
				.map(el => genresConvertedList.push(el.name))
		);

	return genresConvertedList;
};

export default useGenreConversion;
