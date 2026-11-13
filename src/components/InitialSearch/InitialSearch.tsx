import styles from "./InitialSearch.module.css";
import { useInitialSearchPresenter } from "./useInitialSearchPresenter";

type Props = {
	onAcceptedSubmit: (fromKeyboard: boolean) => void;
};

export const InitialSearch = ({ onAcceptedSubmit }: Props) => {
	const {
		query,
		onChange,
		onSubmit,
		onKeyDown,
		onPointerDown,
		isDisabled,
		FormTag,
		isLeaving,
		containerClassName,
	} = useInitialSearchPresenter(onAcceptedSubmit);

	return (
		<div
			className={containerClassName}
			aria-hidden={isLeaving}
			inert={isLeaving}
		>
			<search className={styles.content} aria-label="Поиск сериалов">
				<FormTag
					className={styles.form}
					onSubmit={onSubmit}
					onKeyDownCapture={onKeyDown}
					onPointerDownCapture={onPointerDown}
				>
					<label className={styles.label} htmlFor="initial-query">
						Название сериала
					</label>
					<div className={styles.controls}>
						<input
							className={styles.input}
							id="initial-query"
							name="query"
							type="search"
							value={query}
							onChange={onChange}
							disabled={isLeaving}
							placeholder="Например, Sherlock"
							aria-describedby="initial-hint"
						/>
						<button
							className={styles.button}
							type="submit"
							disabled={isDisabled}
						>
							Искать
						</button>
					</div>
					<p className={styles.hint} id="initial-hint">
						Введите название и нажмите «Искать» или Enter.
					</p>
				</FormTag>
			</search>
		</div>
	);
};
