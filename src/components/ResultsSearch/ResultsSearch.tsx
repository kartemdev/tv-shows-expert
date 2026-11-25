import type { Ref } from "react";
import { useResultsSearchPresenter } from "./logic/useResultsSearchPresenter";
import styles from "./ResultsSearch.module.css";
import { ResultsSearchForm } from "./ResultsSearchForm/ResultsSearchForm";

type Props = {
	panelRef: Ref<HTMLElement>;
	inputRef: Ref<HTMLInputElement>;
	onSubmitSearch: () => void;
};

export const ResultsSearch = ({
	panelRef,
	inputRef,
	onSubmitSearch,
}: Props) => {
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
				<ResultsSearchForm
					inputRef={inputRef}
					onSubmitSearch={onSubmitSearch}
				/>
				<p className={styles.count}>{countLabel}</p>
			</div>
		</section>
	);
};
