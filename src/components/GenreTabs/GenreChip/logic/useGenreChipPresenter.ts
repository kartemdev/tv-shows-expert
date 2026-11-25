import { useSearchedShowStore } from "@/model/searchedShow";

export const useGenreChipPresenter = (genre: string | null) => {
	const isSelected = useSearchedShowStore(
		(state) => state.selectedGenre === genre,
	);
	const selectGenre = useSearchedShowStore((state) => state.selectGenre);
	const resetGenre = useSearchedShowStore((state) => state.resetGenre);

	const onClick = () => {
		if (genre === null) {
			resetGenre();
		} else {
			selectGenre(genre);
		}
	};

	return { isSelected, onClick };
};
