import {
	useSearchedShowActions,
	useSearchedShowState,
} from "@/model/searchedShow";

export const useGenreChipPresenter = (genre: string | null) => {
	const { selectedGenre } = useSearchedShowState();

	const { selectGenre, resetGenre } = useSearchedShowActions();

	const onClick = () => {
		if (genre === null) {
			resetGenre();
		} else {
			selectGenre(genre);
		}
	};

	return { isSelected: selectedGenre === genre, onClick };
};
