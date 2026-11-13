import styles from "./ShowPoster.module.css";
import { useShowPosterPresenter } from "./useShowPosterPresenter";

type Props = { src: string | null; alt: string };

export const ShowPoster = ({ src, alt }: Props) => {
	const { posterUrl, onError } = useShowPosterPresenter(src);

	return (
		<div className={styles.frame}>
			{posterUrl ? (
				<img
					className={styles.image}
					src={posterUrl}
					alt={alt}
					width="400"
					height="600"
					loading="lazy"
					decoding="async"
					onError={onError}
				/>
			) : (
				<p className={styles.placeholder}>Нет постера</p>
			)}
		</div>
	);
};
