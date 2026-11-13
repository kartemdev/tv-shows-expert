import type { SearchedShow } from "@/model/searchedShow";

export const useShowCardPresenter = (show: SearchedShow) => {
	const fallbackUrl = `https://www.tvmaze.com/shows/${show.id}`;

	let href = fallbackUrl;

	if (show.url) {
		try {
			const url = new URL(show.url);

			if (url.protocol === "https:" && url.hostname === "www.tvmaze.com") {
				href = url.href;
			}
		} catch {}
	}
	return { name: show.name, href };
};
