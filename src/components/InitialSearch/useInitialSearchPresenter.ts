import {
	type ChangeEvent,
	type FormEvent,
	type KeyboardEvent,
	useRef,
} from "react";
import {
	useSearchedShowActions,
	useSearchedShowState,
} from "@/model/searchedShow";
import styles from "./InitialSearch.module.css";

export const useInitialSearchPresenter = (
	onAcceptedSubmit: (fromKeyboard: boolean) => void,
) => {
	const { query, status, hasSubmittedSearch } = useSearchedShowState();
	const { setQuery, submitSearch } = useSearchedShowActions();

	const fromKeyboard = useRef(false);

	const isDisabled =
		hasSubmittedSearch || !query.trim() || status === "loading";

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			fromKeyboard.current = true;
		}
	};

	const onPointerDown = () => {
		fromKeyboard.current = false;
	};

	const onSubmit = (event: FormEvent<HTMLElement>) => {
		event.preventDefault();

		if (isDisabled) {
			return;
		}

		onAcceptedSubmit(fromKeyboard.current);
		void submitSearch();
	};

	return {
		query,
		onChange,
		onSubmit,
		onKeyDown,
		onPointerDown,
		isDisabled,
		FormTag: hasSubmittedSearch ? ("div" as const) : ("form" as const),
		isLeaving: hasSubmittedSearch,
		containerClassName: hasSubmittedSearch ? styles.leaving : styles.container,
	};
};
