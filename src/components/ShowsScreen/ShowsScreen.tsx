import { ShowCard } from "./ShowCard/ShowCard";
import styles from "./ShowsScreen.module.css";
import { ShowsSkeleton } from "./ShowsSkeleton/ShowsSkeleton";
import { useShowsScreenPresenter } from "./useShowsScreenPresenter";

export const ShowsScreen = () => {
	const {
		showResults,
		queryLabel,
		countLabel,
		statusMessage,
		visibleStatus,
		isLoading,
		showSkeletons,
		hasShows,
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
						<p className={styles.kicker}>Результаты поиска</p>
						<div className={styles.heading}>
							<h2 className={styles.title} id="results-title">
								Истории, которые стоят времени
							</h2>
							<p className={styles.count}>{countLabel}</p>
						</div>
						<p className={styles.query}>{queryLabel}</p>
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
							{showSkeletons && <ShowsSkeleton />}
							{hasShows && (
								<ul className={styles.grid}>
									{shows.map((show) => (
										<ShowCard key={show.id} show={show} />
									))}
								</ul>
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};
