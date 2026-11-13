import styles from "./ShowsSkeleton.module.css";

export const ShowsSkeleton = () => {
	return (
		<div className={styles.grid} aria-hidden="true">
			<div className={styles.skeleton} />
			<div className={styles.skeleton} />
			<div className={styles.skeleton} />
		</div>
	);
};
