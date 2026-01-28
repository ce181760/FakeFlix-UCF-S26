import { getOneMonthAgoReleaseDate } from "./utils";

// GitHub repository URLs
export const GITHUB_BASE_URL = "https://github.com/Th3Wall";
export const GITHUB_AVATAR_URL = "https://avatars.githubusercontent.com/u/25078541?v=4";
const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix";

// TMDB API configuration constants
export const LANG = "en-US";
export const REGION = "US";

// Image and asset URLs
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_readme.png`;
export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_logo.png`;
export const MOBILE_LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_favicon_192.png`;
export const PROFILE_PIC_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_profilepic.png`;
export const SIGNIN_BGIMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_auth_bg.jpg`;
export const TADUM_SOUND_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_TaDum.mp3`;

// Date constant for recent releases (one month ago)
const ONEMONTHAGO = getOneMonthAgoReleaseDate();

// API key from environment variables
const { REACT_APP_API_KEY } = process.env;

/**
 * API request endpoints for The Movie Database (TMDB)
 * Each property contains a pre-configured URL endpoint with necessary query parameters
 * for fetching different categories of movies and TV series
 */
const requests = {
	// Search endpoint - append query string to search for movies/series
	fetchSearchQuery: `/search/multi?api_key=${REACT_APP_API_KEY}&language=${LANG}&query=`,
	// Trending content across all categories for the current week
	fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// Movies released within the past month
	fetchReleasedMoviesByOneMonth: `/discover/movie?api_key=${REACT_APP_API_KEY}&primary_release_date.gte=${ONEMONTHAGO}&sort_by=popularity.desc&language=${LANG}`,
    // Movies
	// Trending movies for the current week
	fetchTrendingMovies: `/trending/movie/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// Upcoming movies scheduled for release
	fetchUpcomingMovies: `/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=${LANG}`,
	// Top-rated movies by user ratings
	fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&region=${REGION}`,
	// Action movies (genre ID: 28)
	fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28&sort_by=popularity.desc&language=${LANG}`,
	// Adventure movies (genre ID: 12)
	fetchAdventureMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=12&sort_by=popularity.desc&language=${LANG}`,
	// Comedy movies (genre ID: 35)
	fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	// Horror movies (genre ID: 27)
	fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=27&sort_by=popularity.desc&language=${LANG}`,
	// Romance movies (genre ID: 10749)
	fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10749&sort_by=popularity.desc&language=${LANG}`,
	// War movies (genre ID: 10752)
	fetchWarMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10752&sort_by=popularity.desc&language=${LANG}`,
	// Animation movies (genre ID: 16)
	fetchAnimationMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	// Discover all movies sorted by popularity
	discoverMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    // Series
	// Discover all TV series sorted by popularity
	discoverSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// Trending TV series for the current week
	fetchTrendingSeries: `/trending/tv/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// Netflix Original series (network ID: 213)
	fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_networks=213&sort_by=popularity.desc&language=${LANG}`,
	// Action & Adventure series (genre ID: 10759)
	fetchActionAdventureSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10759&sort_by=popularity.desc&language=${LANG}`,
	// Animation series (genre ID: 16)
	fetchAnimationSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	// Comedy series (genre ID: 35)
	fetchComedySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	// Crime series (genre ID: 80)
	fetchCrimeSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=80&sort_by=popularity.desc&language=${LANG}`,
	// Documentary series (genre ID: 99)
	fetchDocumentarySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=99&sort_by=popularity.desc&language=${LANG}`,
	// Family series (genre ID: 10751)
	fetchFamilySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10751&sort_by=popularity.desc&language=${LANG}`,
	// Kids series (genre ID: 10762)
	fetchKidsSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10762&sort_by=popularity.desc&language=${LANG}`,
	// Sci-Fi & Fantasy series (genre ID: 10765)
	fetchSciFiFantasySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10765&sort_by=popularity.desc&language=${LANG}`,
};

export default requests;
