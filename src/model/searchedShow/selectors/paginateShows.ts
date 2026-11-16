import type { SearchedShow } from "../store";

const pageSize = 3;

export const getShowsPageCount = (count: number) => Math.ceil(count / pageSize);

export const clampShowsPage = (page: number, pageCount: number) =>
	Number.isSafeInteger(page)
		? Math.min(Math.max(page, 1), Math.max(pageCount, 1))
		: 1;

export const paginateShows = (shows: readonly SearchedShow[], page: number) => {
	const pageCount = getShowsPageCount(shows.length);
	const currentPage = clampShowsPage(page, pageCount);
	const start = (currentPage - 1) * pageSize;

	return {
		page: currentPage,
		pageCount,
		pageShows: shows.slice(start, start + pageSize),
	};
};
