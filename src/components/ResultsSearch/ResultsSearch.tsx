import type { Ref } from "react";
import styles from "./ResultsSearch.module.css";
import { ResultsSearchForm } from "./ResultsSearchForm/ResultsSearchForm";
import { useResultsSearchPresenter } from "./useResultsSearchPresenter";

type Props = {
	panelRef: Ref<HTMLElement>;
	inputRef: Ref<HTMLInputElement>;
};

export const ResultsSearch = ({ panelRef, inputRef }: Props) => {
	const { countLabel } = useResultsSearchPresenter();

	return (
		<section className={styles.panel} ref={panelRef} aria-label="Панель поиска">
			<div className={styles.content}>
				<a
					className={styles.brand}
					href="#top"
					aria-label="TV Shows Expert — к началу"
				>
					TV<span aria-hidden="true">•</span>
				</a>
				<ResultsSearchForm inputRef={inputRef} />
				<p className={styles.count}>{countLabel}</p>
			</div>
		</section>
	);
};
