import type { TvMazeShowDto } from "@/api/searchShows";
import type { SearchedShow } from "./types";

export const searchedShowMapper = (show: TvMazeShowDto): SearchedShow => ({
	id: show.id,
	name: show.name,
	url: show.url ?? null,
	summaryHtml: show.summary ?? null,
	rating: show.rating?.average ?? null,
	genres: show.genres ? [...show.genres] : [],
	posterUrl: show.image?.medium ?? show.image?.original ?? null,
});
