import { useSearchedShowStore } from "@/model/searchedShow";
import styles from "../MainPage.module.css";
import { useHeroTransition } from "./heroTransition";
import { searchShows } from "./tasks/searchShows";

export const useMainPagePresenter = () => {
	const hasSubmittedSearch = useSearchedShowStore(
		(state) => state.hasSubmittedSearch,
	);
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
		onInitialSubmit: (fromKeyboard: boolean) => {
			transition.onInitialSubmit(fromKeyboard);
			void searchShows("submit");
		},
		onSubmitSearch: () => void searchShows("submit"),
		onRetrySearch: () => void searchShows("retry"),
	};
};
