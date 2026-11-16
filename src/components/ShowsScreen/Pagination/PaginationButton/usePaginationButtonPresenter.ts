import { useSearchedShowActions } from "@/model/searchedShow";
import styles from "./PaginationButton.module.css";

export const usePaginationButtonPresenter = (
	page: number,
	isCurrent: boolean,
) => {
	const { setPage } = useSearchedShowActions();

	const onClick = () => setPage(page);

	return {
		onClick,
		className: isCurrent ? styles.current : styles.button,
		ariaCurrent: isCurrent ? ("page" as const) : undefined,
	};
};
