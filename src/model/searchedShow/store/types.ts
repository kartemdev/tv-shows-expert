export type SearchedShow = {
	id: number;
	name: string;
	url: string | null;
	summaryHtml: string | null;
	rating: number | null;
	genres: string[];
	posterUrl: string | null;
};

export type SearchedShowState = {
	query: string;
	lastSubmittedQuery: string;
	lastSuccessfulQuery: string | null;
	shows: readonly SearchedShow[];
	selectedGenre: string | null;
	page: number;
	status: "idle" | "loading" | "success" | "error";
	error: Error | null;
	hasSubmittedSearch: boolean;
};

export type SearchedShowActions = {
	setQuery: (query: string) => void;
	selectGenre: (genre: string) => void;
	resetGenre: () => void;
	setPage: (page: number) => void;
	startSearch: (query: string) => void;
	completeSearch: (query: string, shows: SearchedShow[]) => void;
	failSearch: (error: Error) => void;
};
