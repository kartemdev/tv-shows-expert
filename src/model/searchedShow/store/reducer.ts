import type { SearchedShowAction, SearchedShowState } from "./types";

export const initialSearchedShowState: SearchedShowState = {
	query: "",
	lastSubmittedQuery: "",
	lastSuccessfulQuery: null,
	shows: [],
	status: "idle",
	error: null,
	hasSubmittedSearch: false,
};

export const searchedShowReducer = (
	state: SearchedShowState,
	action: SearchedShowAction,
): SearchedShowState => {
	switch (action.type) {
		case "queryChanged":
			return { ...state, query: action.query };
		case "searchStarted":
			return {
				...state,
				lastSubmittedQuery: action.query,
				status: "loading",
				error: null,
				hasSubmittedSearch: true,
			};
		case "searchSucceeded":
			return {
				...state,
				shows: action.shows,
				lastSuccessfulQuery: action.query,
				status: "success",
				error: null,
			};
		case "searchFailed":
			return { ...state, status: "error", error: action.error };
	}
};
