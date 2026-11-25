import { useMemo } from "react";
import { filterShowsByGenre, getShowGenres, paginateShows } from "../selectors";
import { useSearchedShowStore } from "../store";

export const useSearchedShowGenres = () => {
	const shows = useSearchedShowStore((state) => state.shows);

	return useMemo(() => getShowGenres(shows), [shows]);
};

export const useSearchedShowCount = () =>
	useSearchedShowStore(
		({ shows, selectedGenre }) =>
			filterShowsByGenre(shows, selectedGenre).length,
	);

export const useSearchedShowResults = () => {
	const shows = useSearchedShowStore((state) => state.shows);
	const selectedGenre = useSearchedShowStore((state) => state.selectedGenre);
	const page = useSearchedShowStore((state) => state.page);

	const filteredShows = useMemo(
		() => filterShowsByGenre(shows, selectedGenre),
		[shows, selectedGenre],
	);

	const pagination = useMemo(
		() => paginateShows(filteredShows, page),
		[filteredShows, page],
	);

	return { filteredShows, ...pagination };
};
