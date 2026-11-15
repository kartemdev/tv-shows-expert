import { useCallback, useMemo, useReducer } from "react";
import { useShowSearch } from "../api";
import { initialSearchedShowState, searchedShowReducer } from "./reducer";
import type { SearchedShowActions } from "./types";

export const useSearchedShowStore = () => {
	const [state, dispatch] = useReducer(
		searchedShowReducer,
		initialSearchedShowState,
	);

	const runSearch = useShowSearch(dispatch, state);

	const setQuery = useCallback((query: string) => {
		dispatch({ type: "queryChanged", query });
	}, []);

	const selectGenre = useCallback((genre: string) => {
		dispatch({ type: "genreSelected", genre });
	}, []);

	const resetGenre = useCallback(() => {
		dispatch({ type: "genreReset" });
	}, []);

	const submitSearch = useCallback(
		() => runSearch(state.query),
		[runSearch, state.query],
	);

	const retrySearch = useCallback(
		() => runSearch(state.lastSubmittedQuery),
		[runSearch, state.lastSubmittedQuery],
	);

	const actions = useMemo<SearchedShowActions>(
		() => ({ setQuery, selectGenre, resetGenre, submitSearch, retrySearch }),
		[setQuery, selectGenre, resetGenre, submitSearch, retrySearch],
	);

	return { state, actions };
};
