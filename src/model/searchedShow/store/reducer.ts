import {
	clampShowsPage,
	filterShowsByGenre,
	getShowsPageCount,
} from "../selectors";
import type { SearchedShowAction, SearchedShowState } from "./types";

export const initialSearchedShowState: SearchedShowState = {
	query: "",
	lastSubmittedQuery: "",
	lastSuccessfulQuery: null,
	shows: [],
	selectedGenre: null,
	page: 1,
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
		case "genreSelected":
			return { ...state, selectedGenre: action.genre, page: 1 };
		case "genreReset":
			return { ...state, selectedGenre: null, page: 1 };
		case "pageChanged": {
			if (state.status !== "success") return state;

			const count = filterShowsByGenre(state.shows, state.selectedGenre).length;
			return {
				...state,
				page: clampShowsPage(action.page, getShowsPageCount(count)),
			};
		}
		case "searchStarted":
			return {
				...state,
				lastSubmittedQuery: action.query,
				selectedGenre: null,
				page: 1,
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
