import { type Dispatch, useCallback, useEffect, useRef } from "react";
import { searchShows } from "@/api/searchShows";
import type { SearchedShowAction } from "../store";
import { searchedShowMapper } from "./searchedShowMapper";

export const useShowSearch = (dispatch: Dispatch<SearchedShowAction>) => {
	const activeController = useRef<AbortController | null>(null);
	const activeRequestId = useRef(0);

	useEffect(() => {
		return () => {
			activeRequestId.current += 1;
			activeController.current?.abort();
			activeController.current = null;
		};
	}, []);

	return useCallback(
		async (query: string) => {
			const submittedQuery = query.trim();

			if (!submittedQuery) {
				return;
			}

			const requestId = ++activeRequestId.current;
			activeController.current?.abort();

			const controller = new AbortController();
			activeController.current = controller;

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
					dispatch({ type: "searchSucceeded", shows });
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
					activeController.current = null;
				}
			}
		},
		[dispatch],
	);
};
