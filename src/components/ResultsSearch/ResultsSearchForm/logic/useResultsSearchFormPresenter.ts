import type { ChangeEvent, FormEvent } from "react";
import { useSearchedShowStore } from "@/model/searchedShow";
import { useDebounce } from "@/shared/hooks";

export const useResultsSearchFormPresenter = (onSubmitSearch: () => void) => {
	const query = useSearchedShowStore((state) => state.query);
	const status = useSearchedShowStore((state) => state.status);
	const lastSubmittedQuery = useSearchedShowStore(
		(state) => state.lastSubmittedQuery,
	);
	const hasSuccessfulSearch = useSearchedShowStore(
		(state) => state.lastSuccessfulQuery !== null,
	);
	const setQuery = useSearchedShowStore((state) => state.setQuery);

	const trimmedQuery = query.trim();
	const isPendingQuery =
		status === "loading" &&
		(!trimmedQuery || trimmedQuery === lastSubmittedQuery);
	const isDisabled = !trimmedQuery || isPendingQuery;

	const { schedule, cancel } = useDebounce(() => {
		if (!isDisabled) {
			onSubmitSearch();
		}
	}, 300);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;

		setQuery(value);

		if (value.trim()) {
			schedule();
		} else {
			cancel();
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		cancel();

		if (!isDisabled) {
			onSubmitSearch();
		}
	};

	return {
		query,
		onChange,
		onSubmit,
		loadingLabel:
			status === "loading" && hasSuccessfulSearch ? "Загрузка…" : "",
	};
};
