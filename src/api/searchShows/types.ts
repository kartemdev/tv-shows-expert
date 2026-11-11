export type TvMazeShowDto = {
	id: number;
	name: string;
	url?: string | null;
	summary?: string | null;
	rating?: { average?: number | null } | null;
	genres?: string[] | null;
	image?: { medium?: string | null; original?: string | null } | null;
};

export type TvMazeSearchResultDto = {
	show: TvMazeShowDto;
};
