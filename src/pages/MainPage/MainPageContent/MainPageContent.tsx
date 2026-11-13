import styles from "./MainPageContent.module.css";
import { MainPageFooter } from "./MainPageFooter/MainPageFooter";
import { useMainPageContentPresenter } from "./useMainPageContentPresenter";

export const MainPageContent = () => {
	const { initialHint } = useMainPageContentPresenter();

	return (
		<div>
			<div className={styles.intro} data-theme="dark">
				<header className={styles.header}>
					<p className={styles.brand}>TV Shows Expert</p>
				</header>
				<main className={styles.content}>
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
						{initialHint && (
							<div className={styles.hint}>
								<p className={styles.hintTitle}>{initialHint.title}</p>
								<p>{initialHint.description}</p>
							</div>
						)}
					</div>
				</main>
			</div>
			<MainPageFooter />
		</div>
	);
};
