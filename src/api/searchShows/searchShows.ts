import { createHttpClient } from "@/shared/api";
import { parseSearchResponse } from "./parseSearchResponse";
import type { TvMazeShowDto } from "./types";

export const createShowSearchApi = (
	fetchImplementation: typeof fetch = globalThis.fetch,
) => {
	const client = createHttpClient(
		"https://api.tvmaze.com",
		fetchImplementation,
	);

	const searchShows = async <T extends object>(
		query: string,
		mapper: (responseDTO: TvMazeShowDto) => T,
		signal?: AbortSignal,
	): Promise<T[]> => {
		const response = await client.get("/search/shows", {
			query: { q: query },
			signal,
		});
		return parseSearchResponse(response).map(({ show }) => mapper(show));
	};

	return { searchShows };
};

export const { searchShows } = createShowSearchApi();
