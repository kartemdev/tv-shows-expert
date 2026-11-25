import {
	useSearchedShowCount,
	useSearchedShowStore,
} from "@/model/searchedShow";

export const useResultsSearchPresenter = () => {
	const hasResults = useSearchedShowStore(
		(state) => state.lastSuccessfulQuery !== null,
	);
	const count = useSearchedShowCount();

	return {
		countLabel: hasResults ? `Найдено: ${count}` : "Поиск сериалов",
	};
};
