import { create } from "zustand";
import {
	clampShowsPage,
	filterShowsByGenre,
	getShowsPageCount,
} from "../selectors";
import type { SearchedShowActions, SearchedShowState } from "./types";

export const useSearchedShowStore = create<
	SearchedShowState & SearchedShowActions
>()((set, get) => ({
	query: "",
	lastSubmittedQuery: "",
	lastSuccessfulQuery: null,
	shows: [],
	selectedGenre: null,
	page: 1,
	status: "idle",
	error: null,
	hasSubmittedSearch: false,
	setQuery: (query) => set({ query }),
	selectGenre: (selectedGenre) => set({ selectedGenre, page: 1 }),
	resetGenre: () => set({ selectedGenre: null, page: 1 }),
	setPage: (page) => {
		const { status, shows, selectedGenre } = get();
		if (status !== "success") return;
		const count = filterShowsByGenre(shows, selectedGenre).length;
		set({ page: clampShowsPage(page, getShowsPageCount(count)) });
	},
	startSearch: (query) =>
		set({
			lastSubmittedQuery: query,
			selectedGenre: null,
			page: 1,
			status: "loading",
			error: null,
			hasSubmittedSearch: true,
		}),
	completeSearch: (query, shows) =>
		set({ shows, lastSuccessfulQuery: query, status: "success" }),
	failSearch: (error) => set({ status: "error", error }),
}));
