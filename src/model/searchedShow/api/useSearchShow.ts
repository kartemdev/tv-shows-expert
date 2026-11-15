import { type Dispatch, useCallback, useEffect, useRef } from "react";
import { searchShows } from "@/api/searchShows";
import type { SearchedShowAction, SearchedShowState } from "../store";
import { searchedShowMapper } from "./searchedShowMapper";

type SearchState = Pick<SearchedShowState, "lastSubmittedQuery" | "status">;

export const useShowSearch = (
	dispatch: Dispatch<SearchedShowAction>,
	{ lastSubmittedQuery, status }: SearchState,
) => {
	const activeRequest = useRef<{
		query: string;
		controller: AbortController;
	} | null>(null);
	const activeRequestId = useRef(0);

	useEffect(() => {
		return () => {
			activeRequestId.current += 1;
			activeRequest.current?.controller.abort();
			activeRequest.current = null;
		};
	}, []);

	return useCallback(
		async (query: string) => {
			const submittedQuery = query.trim();

			if (
				!submittedQuery ||
				activeRequest.current?.query === submittedQuery ||
				(!activeRequest.current &&
					status === "success" &&
					submittedQuery === lastSubmittedQuery)
			) {
				return;
			}

			const requestId = ++activeRequestId.current;
			activeRequest.current?.controller.abort();

			const controller = new AbortController();
			activeRequest.current = { query: submittedQuery, controller };

			const isCurrentRequest = () =>
				activeRequestId.current === requestId && !controller.signal.aborted;

			dispatch({ type: "searchStarted", query: submittedQuery });

			try {
				const shows = await searchShows(
					submittedQuery,
					searchedShowMapper,
					controller.signal,
				);

				if (isCurrentRequest()) {
					dispatch({ type: "searchSucceeded", query: submittedQuery, shows });
				}
			} catch (error) {
				if (
					isCurrentRequest() &&
					!(error instanceof Error && error.name === "AbortError")
				) {
					const currentError =
						error instanceof Error
							? error
							: new Error("Show search failed", { cause: error });

					dispatch({
						type: "searchFailed",
						error: currentError,
					});
				}
			} finally {
				if (activeRequestId.current === requestId) {
					activeRequest.current = null;
				}
			}
		},
		[dispatch, lastSubmittedQuery, status],
	);
};
