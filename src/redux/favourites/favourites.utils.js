/**
 * Utility function to add a movie/series to the favourites list
 * Prevents duplicates by checking if item already exists in the list
 * 
 * @param {Array} favouritesList - Current array of favourite items
 * @param {Object} favouriteToAdd - Item to add to favourites (must have an id property)
 * @returns {Array} Updated favourites list (unchanged if item already exists, or with new item added)
 */
export const addToFavouritesUtil = (favouritesList, favouriteToAdd) => {
    const existingFavourite = favouritesList.find(fav => fav.id === favouriteToAdd.id);

    return existingFavourite
        ? [...favouritesList]
        : [...favouritesList, favouriteToAdd];
}

/**
 * Utility function to remove a movie/series from the favourites list
 * Filters out the item matching the provided id
 * 
 * @param {Array} favouritesList - Current array of favourite items
 * @param {Object} favouriteToRemove - Item to remove from favourites (must have an id property)
 * @returns {Array} Updated favourites list with the item removed (unchanged if item doesn't exist)
 */
export const removeFromFavouritesUtil = (favouritesList, favouriteToRemove) => {
    const existingFavourite = favouritesList.find(fav => fav.id === favouriteToRemove.id);
    
    return existingFavourite
        ? favouritesList.filter(fav => fav.id !== favouriteToRemove.id)
        : [...favouritesList];
}