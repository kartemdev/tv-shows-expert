import type { SearchedShow } from "../store";

export const filterShowsByGenre = (
	shows: readonly SearchedShow[],
	selectedGenre: string | null,
) =>
	selectedGenre === null
		? shows
		: shows.filter((show) =>
				show.genres.some((genre) => genre.trim() === selectedGenre),
			);
