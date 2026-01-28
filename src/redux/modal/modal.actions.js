import { modalActionTypes } from "./modal.types";

/**
 * Redux action creator to show the modal with movie/series details
 * 
 * @param {Object} modalContent - Content object containing movie/series data to display in modal
 * @returns {Object} Redux action object with type and payload
 */
export const showModalDetail = modalContent => ({
    type: modalActionTypes.SHOW_MODAL_DETAILS,
    payload: modalContent
})

/**
 * Redux action creator to hide/close the detail modal
 * 
 * @returns {Object} Redux action object with type to hide modal
 */
export const hideModalDetail = () => ({
    type: modalActionTypes.HIDE_MODAL_DETAILS
})