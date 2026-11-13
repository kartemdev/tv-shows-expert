import type { ChangeEvent, FormEvent } from "react";
import {
	useSearchedShowActions,
	useSearchedShowState,
} from "@/model/searchedShow";
import { useDebounce } from "@/shared/hooks";

export const useResultsSearchFormPresenter = () => {
	const { query, status, lastSubmittedQuery, lastSuccessfulQuery } =
		useSearchedShowState();
	const { setQuery, submitSearch } = useSearchedShowActions();

	const trimmedQuery = query.trim();
	const isPendingQuery =
		status === "loading" &&
		(!trimmedQuery || trimmedQuery === lastSubmittedQuery);
	const isDisabled = !trimmedQuery || isPendingQuery;

	const { schedule, cancel } = useDebounce(() => {
		if (!isDisabled) {
			void submitSearch();
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
			void submitSearch();
		}
	};

	return {
		query,
		onChange,
		onSubmit,
		loadingLabel:
			status === "loading" && lastSuccessfulQuery !== null ? "Загрузка…" : "",
	};
};
