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
	status: "idle" | "loading" | "success" | "error";
	error: Error | null;
	hasSubmittedSearch: boolean;
};

export type SearchedShowAction =
	| { type: "queryChanged"; query: string }
	| { type: "searchStarted"; query: string }
	| { type: "searchSucceeded"; query: string; shows: SearchedShow[] }
	| { type: "searchFailed"; error: Error };

export type SearchedShowActions = {
	setQuery: (query: string) => void;
	submitSearch: () => Promise<void>;
	retrySearch: () => Promise<void>;
};
