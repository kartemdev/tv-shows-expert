import type { SearchedShow } from "../store";

export const getShowGenres = (shows: readonly SearchedShow[]) => {
	const genres = shows.flatMap((show) =>
		show.genres.map((genre) => genre.trim()).filter(Boolean),
	);

	return [...new Set(genres)].sort((first, second) =>
		first.localeCompare(second),
	);
};
