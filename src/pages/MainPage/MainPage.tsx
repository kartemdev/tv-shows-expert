import { SearchedShowProvider } from "@/model/searchedShow";
import { MainPageContent } from "./MainPageContent/MainPageContent";
import { useMainPagePresenter } from "./useMainPagePresenter";

export const MainPage = () => {
	useMainPagePresenter();

	return (
		<SearchedShowProvider>
			<MainPageContent />
		</SearchedShowProvider>
	);
};
