import {
	useSearchedShowResults,
	useSearchedShowState,
} from "@/model/searchedShow";

export const useGenreTabsPresenter = () => {
	const { shows, lastSuccessfulQuery } = useSearchedShowState();
	const { genres } = useSearchedShowResults();

	const hasResults = lastSuccessfulQuery !== null;

	const options = [
		{ key: "all", genre: null, label: "Все жанры" },
		...genres.map((genre) => ({ key: `genre-${genre}`, genre, label: genre })),
	];

	return {
		options,
		showGenres: hasResults && genres.length > 0,
		showUnavailable: hasResults && shows.length > 0 && genres.length === 0,
	};
};
