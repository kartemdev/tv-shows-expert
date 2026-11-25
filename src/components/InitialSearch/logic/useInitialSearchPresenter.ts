import {
	type ChangeEvent,
	type FormEvent,
	type KeyboardEvent,
	useRef,
} from "react";
import { useSearchedShowStore } from "@/model/searchedShow";
import styles from "../InitialSearch.module.css";

export const useInitialSearchPresenter = (
	onAcceptedSubmit: (fromKeyboard: boolean) => void,
) => {
	const query = useSearchedShowStore((state) => state.query);
	const status = useSearchedShowStore((state) => state.status);
	const hasSubmittedSearch = useSearchedShowStore(
		(state) => state.hasSubmittedSearch,
	);
	const setQuery = useSearchedShowStore((state) => state.setQuery);

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
