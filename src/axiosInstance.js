import axios from "axios"

/**
 * Axios instance configured for The Movie Database (TMDB) API
 * Pre-configured with the base URL to simplify API requests throughout the application
 */
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default instance
