import type { ReactNode } from "react";
import { Pagination } from "./Pagination/Pagination";
import { ShowCard } from "./ShowCard/ShowCard";
import styles from "./ShowsScreen.module.css";
import { ShowsSkeleton } from "./ShowsSkeleton/ShowsSkeleton";
import { useShowsScreenPresenter } from "./useShowsScreenPresenter";

type Props = { children: ReactNode };

export const ShowsScreen = ({ children }: Props) => {
	const {
		showResults,
		queryLabel,
		countLabel,
		statusMessage,
		visibleStatus,
		isLoading,
		showSkeletons,
		hasShows,
		showFilterEmpty,
		filterEmptyMessage,
		onResetGenre,
		errorMessage,
		onRetry,
		shows,
	} = useShowsScreenPresenter();

	return (
		<>
			<p className={styles.announcement} role="status" aria-atomic="true">
				{statusMessage}
			</p>
			{showResults && (
				<section className={styles.screen} aria-labelledby="results-title">
					<div className={styles.content}>
						<h2 className={styles.kicker} id="results-title">
							Результаты поиска
						</h2>
						<div className={styles.heading}>
							<p className={styles.query}>{queryLabel}</p>
							<p className={styles.count}>{countLabel}</p>
						</div>
						{children}
						{visibleStatus && (
							<p className={styles.status} aria-hidden="true">
								{visibleStatus}
							</p>
						)}
						{errorMessage && (
							<div className={styles.error}>
								<p role="alert">{errorMessage}</p>
								<button
									className={styles.retry}
									type="button"
									onClick={onRetry}
								>
									Повторить
								</button>
							</div>
						)}
						<div aria-busy={isLoading}>
							{showFilterEmpty && (
								<div className={styles.filterEmpty}>
									<p>{filterEmptyMessage}</p>
									<button
										className={styles.retry}
										type="button"
										onClick={onResetGenre}
									>
										Сбросить жанр
									</button>
								</div>
							)}
							{showSkeletons && <ShowsSkeleton />}
							{hasShows && (
								<ul className={styles.grid}>
									{shows.map((show) => (
										<ShowCard key={show.id} show={show} />
									))}
								</ul>
							)}
						</div>
						<Pagination />
					</div>
				</section>
			)}
		</>
	);
};
