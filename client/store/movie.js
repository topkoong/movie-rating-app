import axios from 'axios';

/**
 * ACTION TYPES
 * String literals for action types
 */

const ADD_NEW_MOVIE = 'ADD_NEW_MOVIE';
const GET_MOVIES = 'GET_MOVIES';
const GET_MOVIE = 'GET_MOVIE';

const UPDATE_MOVIE = 'UPDATE_MOVIE';
const REMOVE_MOVIE = 'REMOVE_MOVIE';

const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';

const ADD_NEW_RATING = 'ADD_NEW_RATING';

/**
 * INITIAL STATE
 */
const initialState = {
	movies: [],
	selectedMovie: {},
	comments: [],
	ratings: 0
};

/**
 * ACTION CREATORS
 * Action creators are exactly that—functions that create actions.
 */

const addMovie = movie => ({ type: ADD_NEW_MOVIE, movie });
const getMovies = movies => ({ type: GET_MOVIES, movies });
const getMovie = movie => ({ type: GET_MOVIE, movie });
const removeMovie = id => ({ type: REMOVE_MOVIE, id });
const updateMovie = movie => ({ type: UPDATE_MOVIE, movie });
const addComment = comment => ({ type: ADD_NEW_COMMENT, comment });

/**
 * THUNK CREATORS
 */

export const fetchMovies = () => async dispatch => {
	try {
		const { data } = await axios.get('/api/movies/');
		const movies = data;
		dispatch(getMovies(movies || initialState.movies));
	} catch (error) {
		console.error(error);
	}
};

export const fetchSingleMovie = id => async dispatch => {
	try {
		const { data } = await axios.get(`/api/movies/${id}`);
		const movie = data;
		dispatch(getMovie(movie || initialState.selectedMovie));
	} catch (error) {
		console.error(error);
	}
};

export const createMovie = (movie, history) => async dispatch => {
	try {
		const { data } = await axios.post('/api/movies/', movie);
		const newMovie = data;
		dispatch(addMovie(newMovie));
		history.push('/favorites');
	} catch (error) {
		console.error(error);
	}
};

export const deleteMovie = id => async dispatch => {
	try {
		await axios.delete(`/api/movies/${id}`);
		dispatch(removeMovie(id));
	} catch (error) {
		console.error('Deleting a movie is not successful');
	}
};

export const createComment = (id, comment) => async dispatch => {
	try {
		const { data } = await axios.post(
			`/api/movies/${id}/comments`,
			comment
		);
		const newComment = data;
		dispatch(addComment(newComment));
	} catch (error) {
		console.error(error);
	}
};

export const updatedMovie = (id, ratings) => async dispatch => {
	try {
		const { data } = await axios.put(`/api/movies/${id}`, ratings);
		const updated = data;
		dispatch(updateMovie(updated));
	} catch (error) {
		console.error('Updating a movie rating is not successful');
	}
};

/**
 * REDUCER
 * Reducers specify how the application's state changes in response to actions sent to the store. 
 * Remember that reducers take in two parameters:
  1. The (previous) state. When we use 'createStore', the previous state is undefined,
     so, the reducer is initially invoked with undefined as the first argument.
    This means that if we set a default parameter value, we can use that as our initial return value

  2. The action object, which we get whenever we use `store.dispatch`
 */

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MOVIES:
			return {
				...state,
				movies: action.movies
			};
		case GET_MOVIE:
			return {
				...state,
				selectedMovie: action.movie
			};
		case ADD_NEW_MOVIE:
			return {
				...state,
				movies: [...state.movies, action.movie]
			};
		case REMOVE_MOVIE:
			return {
				...state,
				movies: state.movies.filter(movie => movie.id !== action.id)
			};
		case UPDATE_MOVIE:
			return {
				...state,
				movies: state.movies.map(movie =>
					action.movie.id === movie.id ? action.movie : movie
				),
				selectedMovie: action.movie
			};
		case ADD_NEW_COMMENT:
			return {
				...state,
				selectedMovie: {
					...state.selectedMovie,
					comments: [...state.selectedMovie.comments, action.comment]
				},
				comments: [...state.comments, action.comment]
			};
		default:
			return state;
	}
}
