import {
	useSearchedShowActions,
	useSearchedShowState,
} from "@/model/searchedShow";
import { getSearchErrorMessage } from "./utils/getSearchErrorMessage";

export const useShowsScreenPresenter = () => {
	const {
		shows,
		status,
		error,
		lastSubmittedQuery,
		lastSuccessfulQuery,
		hasSubmittedSearch,
	} = useSearchedShowState();
	const { retrySearch } = useSearchedShowActions();

	const isLoading = status === "loading";
	const isSuccess = status === "success";

	const hasResults = lastSuccessfulQuery !== null;
	const hasShows = shows.length > 0;

	const emptyMessage = "Ничего не найдено. Попробуйте другое название.";
	const countLabel = hasResults ? `Найдено сериалов: ${shows.length}` : "";

	let statusMessage = "";

	if (isLoading) statusMessage = "Загрузка…";

	if (isSuccess) {
		statusMessage = shows.length
			? `По запросу «${lastSubmittedQuery}» найдено сериалов: ${shows.length}.`
			: emptyMessage;
	}

	const visibleStatus = hasResults
		? hasShows
			? null
			: emptyMessage
		: statusMessage;

	return {
		showResults: hasSubmittedSearch,
		queryLabel: `По запросу «${lastSuccessfulQuery ?? lastSubmittedQuery}»`,
		countLabel,
		statusMessage,
		visibleStatus,
		isLoading,
		showSkeletons: isLoading && !hasResults,
		hasShows,
		errorMessage: status === "error" ? getSearchErrorMessage(error) : null,
		onRetry: retrySearch,
		shows,
	};
};
