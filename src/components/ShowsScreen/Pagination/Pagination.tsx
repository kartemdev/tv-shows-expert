import styles from "./Pagination.module.css";
import { PaginationButton } from "./PaginationButton/PaginationButton";
import { usePaginationPresenter } from "./usePaginationPresenter";

export const Pagination = () => {
	const { isVisible, buttons } = usePaginationPresenter();

	return (
		<>
			{isVisible && (
				<nav className={styles.pagination} aria-label="Страницы результатов">
					{buttons.map((button) => (
						<PaginationButton
							key={button.label}
							page={button.page}
							label={button.label}
							ariaLabel={button.ariaLabel}
							isCurrent={button.isCurrent}
							isDisabled={button.isDisabled}
						/>
					))}
				</nav>
			)}
		</>
	);
};
