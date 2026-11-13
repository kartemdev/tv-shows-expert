import type { SearchedShow } from "@/model/searchedShow";
import styles from "./ShowCard.module.css";
import { ShowPoster } from "./ShowPoster/ShowPoster";
import { useShowCardPresenter } from "./useShowCardPresenter";

type Props = { show: SearchedShow };

export const ShowCard = ({ show }: Props) => {
	const {
		name,
		href,
		linkLabel,
		posterUrl,
		posterAlt,
		summary,
		genres,
		hasRating,
		ratingText,
		ratingLabel,
	} = useShowCardPresenter(show);

	return (
		<li className={styles.card}>
			<div className={styles.poster}>
				<ShowPoster key={posterUrl} src={posterUrl} alt={posterAlt} />
				<p className={styles.rating} data-theme="dark">
					{hasRating && (
						<span className={styles.star} aria-hidden="true">
							★
						</span>
					)}
					<span aria-hidden="true">{ratingText}</span>
					<span className={styles.ratingLabel}>{ratingLabel}</span>
				</p>
			</div>
			<h3>
				<a
					className={styles.link}
					href={href}
					aria-label={linkLabel}
					target="_blank"
					rel="noreferrer"
				>
					<span>{name}</span>
					<span aria-hidden="true">↗</span>
				</a>
			</h3>
			<p className={styles.genres}>{genres}</p>
			<p className={styles.summary}>{summary}</p>
		</li>
	);
};
