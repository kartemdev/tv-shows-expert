import { useMemo } from "react";
import { filterShowsByGenre, getShowGenres } from "../selectors";
import { useSearchedShowState } from "./useSearchedShowState";

export const useSearchedShowResults = () => {
	const { shows, selectedGenre } = useSearchedShowState();

	const genres = useMemo(() => getShowGenres(shows), [shows]);

	const filteredShows = useMemo(
		() => filterShowsByGenre(shows, selectedGenre),
		[shows, selectedGenre],
	);

	return { genres, filteredShows };
};
