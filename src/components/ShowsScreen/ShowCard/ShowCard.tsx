import type { SearchedShow } from "@/model/searchedShow";
import styles from "./ShowCard.module.css";
import { useShowCardPresenter } from "./useShowCardPresenter";

type Props = { show: SearchedShow };

export const ShowCard = ({ show }: Props) => {
	const { name, href } = useShowCardPresenter(show);

	return (
		<li className={styles.card}>
			<h3>
				<a className={styles.link} href={href} target="_blank" rel="noreferrer">
					{name}
				</a>
			</h3>
			<p className={styles.source}>
				Подробнее на TVMaze <span aria-hidden="true">↗</span>
			</p>
		</li>
	);
};
