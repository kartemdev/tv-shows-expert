import type { Ref } from "react";
import styles from "./ResultsSearchForm.module.css";
import { useResultsSearchFormPresenter } from "./useResultsSearchFormPresenter";

type Props = { inputRef: Ref<HTMLInputElement> };

export const ResultsSearchForm = ({ inputRef }: Props) => {
	const { query, onChange, onSubmit, loadingLabel } =
		useResultsSearchFormPresenter();

	return (
		<search className={styles.search} aria-label="Поиск сериалов">
			<form onSubmit={onSubmit}>
				<div className={styles.labelRow}>
					<label className={styles.label} htmlFor="results-query">
						Название сериала
					</label>
					<span className={styles.status} aria-hidden="true">
						{loadingLabel}
					</span>
				</div>
				<input
					className={styles.input}
					ref={inputRef}
					id="results-query"
					name="query"
					type="search"
					value={query}
					onChange={onChange}
					placeholder="Название сериала"
				/>
			</form>
		</search>
	);
};
