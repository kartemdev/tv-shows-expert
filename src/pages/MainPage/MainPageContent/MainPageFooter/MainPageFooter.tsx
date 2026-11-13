import styles from "./MainPageFooter.module.css";
import { useMainPageFooterPresenter } from "./useMainPageFooterPresenter";

export const MainPageFooter = () => {
	const { dataSource } = useMainPageFooterPresenter();

	return (
		<footer className={styles.footer} data-theme="dark">
			<div className={styles.content}>
				<p className={styles.brand}>TV Shows Expert</p>
				<p>Ваш следующий любимый сериал — здесь.</p>
				<p>
					Данные о сериалах —{" "}
					<a href={dataSource.href} target="__blank">
						{dataSource.label}
					</a>
				</p>
			</div>
		</footer>
	);
};
