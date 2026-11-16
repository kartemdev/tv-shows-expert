import {
	useSearchedShowActions,
	useSearchedShowResults,
	useSearchedShowState,
} from "@/model/searchedShow";
import { getSearchErrorMessage } from "./utils/getSearchErrorMessage";

export const useShowsScreenPresenter = () => {
	const {
		shows,
		selectedGenre,
		status,
		error,
		lastSubmittedQuery,
		lastSuccessfulQuery,
		hasSubmittedSearch,
	} = useSearchedShowState();
	const { retrySearch, resetGenre } = useSearchedShowActions();
	const { filteredShows, pageShows, page, pageCount } =
		useSearchedShowResults();

	const isLoading = status === "loading";

	const hasResults = lastSuccessfulQuery !== null;
	const hasShows = filteredShows.length > 0;
	const showFilterEmpty = hasResults && shows.length > 0 && !hasShows;

	const emptyMessage = "Ничего не найдено. Попробуйте другое название.";
	const countLabel = hasResults
		? `Найдено сериалов: ${filteredShows.length}`
		: "";
	const filterEmptyMessage = `Нет сериалов с жанром «${selectedGenre}».`;
	const genreLabel = selectedGenre === null ? "" : ` Жанр: «${selectedGenre}».`;

	let statusMessage = "";

	if (isLoading) statusMessage = "Загрузка…";

	if (hasResults && !isLoading) {
		statusMessage = showFilterEmpty
			? filterEmptyMessage
			: hasShows
				? `По запросу «${lastSuccessfulQuery}» найдено сериалов: ${filteredShows.length}.${genreLabel} Страница ${page} из ${pageCount}.`
				: emptyMessage;
	}

	const visibleStatus = hasResults
		? shows.length === 0
			? emptyMessage
			: null
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
		showFilterEmpty,
		filterEmptyMessage,
		onResetGenre: resetGenre,
		errorMessage: status === "error" ? getSearchErrorMessage(error) : null,
		onRetry: retrySearch,
		shows: pageShows,
	};
};
