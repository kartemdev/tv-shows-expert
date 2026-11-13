import { useSearchedShowState } from "@/model/searchedShow";
import styles from "./MainPageContent.module.css";
import { useHeroTransition } from "./utils/heroTransition";

export const useMainPageContentPresenter = () => {
	const { hasSubmittedSearch } = useSearchedShowState();
	const transition = useHeroTransition(hasSubmittedSearch);

	return {
		showInitialSearch: !hasSubmittedSearch || transition.isTransitioning,
		showResults: hasSubmittedSearch,
		resultsClassName: hasSubmittedSearch ? styles.results : undefined,
		introClassName: hasSubmittedSearch ? styles.compactIntro : styles.intro,
		pageClassName: transition.isTransitioning
			? styles.transitioning
			: undefined,
		...transition,
	};
};
