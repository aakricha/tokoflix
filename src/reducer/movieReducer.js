import { GET_ALL_MOVIES, GET_MOVIE_DETAIL, GET_SIMILAR_MOVIES } from "../actions/constants";

const initialState = {
  movies: [],
  status_code: 0,
  currentPage: 0,
  nextUrl: false,
  isFetch: false,
  total_pages: 0,
  total_results: 0,
  movie: {}
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_MOVIES}_PROGRESS`:
      return {
        ...state, 
        isFetch: true
      }
    case GET_ALL_MOVIES:
      const { results, page, total_pages, total_results } = action.payload.data;
      return {
        ...state,
        movies: results,
        currentPage: page,
        nextUrl: results.length ? true : false,
        total_pages: total_pages,
        total_results: total_results,
        isFetch: false
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movie: action.payload
      };
    case GET_SIMILAR_MOVIES:
      return {
        ...state,
        movies: action.payload.data.results,
        isFetch: false
      };
    default:
      return state;
  }
}

export default movieReducer;