import { InitialSearch } from "@/components/InitialSearch/InitialSearch";
import { ResultsSearch } from "@/components/ResultsSearch/ResultsSearch";
import { ShowsScreen } from "@/components/ShowsScreen/ShowsScreen";
import styles from "./MainPageContent.module.css";
import { MainPageFooter } from "./MainPageFooter/MainPageFooter";
import { MainPageHeader } from "./MainPageHeader/MainPageHeader";
import { useMainPageContentPresenter } from "./useMainPageContentPresenter";

export const MainPageContent = () => {
	const {
		showInitialSearch,
		showResults,
		resultsClassName,
		introClassName,
		pageClassName,
		heroRef,
		panelRef,
		inputRef,
		onInitialSubmit,
	} = useMainPageContentPresenter();

	return (
		<div id="top" className={pageClassName}>
			<main>
				<div className={introClassName} data-theme="dark" ref={heroRef}>
					<MainPageHeader />
					<div className={styles.content}>
						<div className={styles.container}>
							<p className={styles.kicker}>Время найти свою историю</p>
							<h1 className={styles.title}>
								Сериал на <em>вечер?</em>
								<br />
								Мы поможем найти.
							</h1>
							<p className={styles.subtitle}>
								Тщательно отобранные истории для любого настроения
							</p>
							{showInitialSearch && (
								<InitialSearch onAcceptedSubmit={onInitialSubmit} />
							)}
						</div>
					</div>
				</div>
				<div className={resultsClassName}>
					{showResults && (
						<ResultsSearch panelRef={panelRef} inputRef={inputRef} />
					)}
					<ShowsScreen />
				</div>
			</main>
			<MainPageFooter />
		</div>
	);
};
