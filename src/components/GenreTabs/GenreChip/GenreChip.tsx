import styles from "./GenreChip.module.css";
import { useGenreChipPresenter } from "./useGenreChipPresenter";

type Props = { genre: string | null; label: string };

export const GenreChip = ({ genre, label }: Props) => {
	const { isSelected, onClick } = useGenreChipPresenter(genre);

	return (
		<button
			className={styles.chip}
			type="button"
			aria-pressed={isSelected}
			onClick={onClick}
		>
			{isSelected && (
				<span className={styles.check} aria-hidden="true">
					✓
				</span>
			)}
			<span>{label}</span>
		</button>
	);
};
