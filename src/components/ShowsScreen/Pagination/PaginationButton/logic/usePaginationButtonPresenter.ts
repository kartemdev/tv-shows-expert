import { useSearchedShowStore } from "@/model/searchedShow";
import styles from "../PaginationButton.module.css";

export const usePaginationButtonPresenter = (
	page: number,
	isCurrent: boolean,
) => {
	const setPage = useSearchedShowStore((state) => state.setPage);

	const onClick = () => setPage(page);

	return {
		onClick,
		className: isCurrent ? styles.current : styles.button,
		ariaCurrent: isCurrent ? ("page" as const) : undefined,
	};
};
