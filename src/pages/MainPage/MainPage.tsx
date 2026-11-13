import { SearchedShowProvider } from "@/model/searchedShow";
import { MainPageContent } from "./MainPageContent/MainPageContent";

export const MainPage = () => {
	return (
		<SearchedShowProvider>
			<MainPageContent />
		</SearchedShowProvider>
	);
};
