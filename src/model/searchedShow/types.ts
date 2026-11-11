export type SearchedShow = {
	id: number;
	name: string;
	url: string | null;
	summaryHtml: string | null;
	rating: number | null;
	genres: string[];
	posterUrl: string | null;
};
