// Action Types
export const REPOS_LOAD    = "app/repos/load";
export const REPOS_FAILED  = "app/repos/failed";
export const REPOS_SUCCESS = "app/repos/success";

// Initial state
const initialState = {
	repos_loaded : false,
	repos_loading: false,
	repos        : null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case REPOS_LOAD:
			return {
				...state,
				repos_loaded : false,
				repos_loading: true,
				repos        : []
			};
		case REPOS_SUCCESS:
			return {
				...state,
				repos_loaded : true,
				repos_loading: false,
				repos        : action.data
			};
		case REPOS_FAILED:
			return {
				...state,
				repos_loaded : false,
				repos_loading: false,
				repos        : action.error
			};
		default:
			return state;
	}
}

// Action creators
export function ReposLoadFailed(error) {
	return {
		type: REPOS_FAILED,
		error
	};
}

export function ReposLoadSuccess(data) {
	return {
		type: REPOS_SUCCESS,
		data
	};
}

export function ReposLoad() {
	return (dispatch, getState, client) => {
		
		dispatch({
			type: REPOS_LOAD
		});
		
		return client
			.get('search/repositories?sort=stars&order=desc')
			.then(data => {
				dispatch(ReposLoadSuccess(data));
			})
			.catch(error => {
				dispatch(ReposLoadFailed(error));
			});
	};
}