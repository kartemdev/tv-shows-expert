import {
	useSearchedShowGenres,
	useSearchedShowStore,
} from "@/model/searchedShow";

export const useGenreTabsPresenter = () => {
	const hasResults = useSearchedShowStore(
		(state) => state.lastSuccessfulQuery !== null,
	);
	const hasShows = useSearchedShowStore((state) => state.shows.length > 0);
	const genres = useSearchedShowGenres();

	const options = [
		{ key: "all", genre: null, label: "Все жанры" },
		...genres.map((genre) => ({ key: `genre-${genre}`, genre, label: genre })),
	];

	return {
		options,
		showGenres: hasResults && genres.length > 0,
		showUnavailable: hasResults && hasShows && genres.length === 0,
	};
};
