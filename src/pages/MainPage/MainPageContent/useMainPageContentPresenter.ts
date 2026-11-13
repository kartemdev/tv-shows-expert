import { useSearchedShowState } from "@/model/searchedShow";

export const useMainPageContentPresenter = () => {
	const { hasSubmittedSearch } = useSearchedShowState();

	return {
		initialHint: hasSubmittedSearch
			? null
			: {
					title: "Поиск скоро появится",
					description:
						"Начните с названия сериала: здесь можно будет найти истории по вкусу, выбрать жанр и посмотреть описание и рейтинг.",
				},
	};
};
