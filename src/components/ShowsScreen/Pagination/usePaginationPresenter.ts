import {
	useSearchedShowResults,
	useSearchedShowState,
} from "@/model/searchedShow";

export const usePaginationPresenter = () => {
	const { status } = useSearchedShowState();
	const { page, pageCount } = useSearchedShowResults();

	const buttons = [
		{
			page: page - 1,
			label: "Назад",
			ariaLabel: "Предыдущая страница",
			isCurrent: false,
			isDisabled: page === 1,
		},
		...Array.from({ length: pageCount }, (_, index) => ({
			page: index + 1,
			label: String(index + 1),
			ariaLabel: `Страница ${index + 1}`,
			isCurrent: page === index + 1,
			isDisabled: false,
		})),
		{
			page: page + 1,
			label: "Вперёд",
			ariaLabel: "Следующая страница",
			isCurrent: false,
			isDisabled: page === pageCount,
		},
	];

	return { isVisible: status === "success" && pageCount > 1, buttons };
};
