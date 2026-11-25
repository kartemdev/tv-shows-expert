import {
	useSearchedShowResults,
	useSearchedShowStore,
} from "@/model/searchedShow";
import { getSearchErrorMessage } from "./getSearchErrorMessage";

export const useShowsScreenPresenter = () => {
	const hasUnfilteredShows = useSearchedShowStore(
		(state) => state.shows.length > 0,
	);
	const selectedGenre = useSearchedShowStore((state) => state.selectedGenre);
	const status = useSearchedShowStore((state) => state.status);
	const error = useSearchedShowStore((state) => state.error);
	const lastSubmittedQuery = useSearchedShowStore(
		(state) => state.lastSubmittedQuery,
	);
	const lastSuccessfulQuery = useSearchedShowStore(
		(state) => state.lastSuccessfulQuery,
	);
	const hasSubmittedSearch = useSearchedShowStore(
		(state) => state.hasSubmittedSearch,
	);
	const resetGenre = useSearchedShowStore((state) => state.resetGenre);
	const { filteredShows, pageShows, page, pageCount } =
		useSearchedShowResults();

	const isLoading = status === "loading";

	const hasResults = lastSuccessfulQuery !== null;
	const hasShows = filteredShows.length > 0;
	const showFilterEmpty = hasResults && hasUnfilteredShows && !hasShows;

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
		? hasUnfilteredShows
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
		showFilterEmpty,
		filterEmptyMessage,
		onResetGenre: resetGenre,
		errorMessage: status === "error" ? getSearchErrorMessage(error) : null,
		shows: pageShows,
	};
};
