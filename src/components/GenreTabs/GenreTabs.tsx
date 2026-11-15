import { GenreChip } from "./GenreChip/GenreChip";
import styles from "./GenreTabs.module.css";
import { useGenreTabsPresenter } from "./useGenreTabsPresenter";

export const GenreTabs = () => {
	const { options, showGenres, showUnavailable } = useGenreTabsPresenter();

	return (
		<>
			{showGenres && (
				<fieldset className={styles.genres} aria-label="Фильтр по жанру">
					{options.map((option) => (
						<GenreChip
							key={option.key}
							genre={option.genre}
							label={option.label}
						/>
					))}
				</fieldset>
			)}
			{showUnavailable && (
				<p className={styles.unavailable}>
					В этой выдаче жанры не указаны. Фильтрация недоступна.
				</p>
			)}
		</>
	);
};
