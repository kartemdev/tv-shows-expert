import { useSearchedShowState } from "@/model/searchedShow";

export const useResultsSearchPresenter = () => {
	const { lastSuccessfulQuery, shows } = useSearchedShowState();

	return {
		countLabel:
			lastSuccessfulQuery !== null
				? `Найдено: ${shows.length}`
				: "Поиск сериалов",
	};
};
