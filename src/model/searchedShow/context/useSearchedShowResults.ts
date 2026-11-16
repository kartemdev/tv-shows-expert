import { useMemo } from "react";
import { filterShowsByGenre, getShowGenres, paginateShows } from "../selectors";
import { useSearchedShowState } from "./useSearchedShowState";

export const useSearchedShowResults = () => {
	const { shows, selectedGenre, page } = useSearchedShowState();

	const genres = useMemo(() => getShowGenres(shows), [shows]);

	const filteredShows = useMemo(
		() => filterShowsByGenre(shows, selectedGenre),
		[shows, selectedGenre],
	);

	const pagination = useMemo(
		() => paginateShows(filteredShows, page),
		[filteredShows, page],
	);

	return { genres, filteredShows, ...pagination };
};
