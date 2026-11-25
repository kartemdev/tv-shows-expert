import { searchShows as requestShows } from "@/api/searchShows";
import { searchedShowMapper, useSearchedShowStore } from "@/model/searchedShow";

let activeRequest: AbortController | null = null;

export const searchShows = async (source: "submit" | "retry") => {
	const {
		query,
		lastSubmittedQuery,
		status,
		startSearch,
		completeSearch,
		failSearch,
	} = useSearchedShowStore.getState();
	const submittedQuery = (
		source === "retry" ? lastSubmittedQuery : query
	).trim();

	if (
		!submittedQuery ||
		(submittedQuery === lastSubmittedQuery &&
			(status === "loading" || status === "success"))
	) {
		return;
	}

	activeRequest?.abort();
	const controller = new AbortController();
	activeRequest = controller;
	startSearch(submittedQuery);

	try {
		const shows = await requestShows(
			submittedQuery,
			searchedShowMapper,
			controller.signal,
		);
		if (activeRequest === controller) {
			completeSearch(submittedQuery, shows);
		}
	} catch (error) {
		if (activeRequest === controller) {
			failSearch(
				error instanceof Error
					? error
					: new Error("Show search failed", { cause: error }),
			);
		}
	} finally {
		if (activeRequest === controller) {
			activeRequest = null;
		}
	}
};
