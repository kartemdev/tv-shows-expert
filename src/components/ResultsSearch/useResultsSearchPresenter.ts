import {
	useSearchedShowResults,
	useSearchedShowState,
} from "@/model/searchedShow";

export const useResultsSearchPresenter = () => {
	const { lastSuccessfulQuery } = useSearchedShowState();
	const { filteredShows } = useSearchedShowResults();

	return {
		countLabel:
			lastSuccessfulQuery !== null
				? `Найдено: ${filteredShows.length}`
				: "Поиск сериалов",
	};
};
