import type { SearchedShow } from "@/model/searchedShow";
import { getSummaryText } from "./utils/getSummaryText";

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
	const ratingText = show.rating?.toString() ?? "Нет оценки";

	return {
		name: show.name,
		href,
		linkLabel: `${show.name} — подробнее на TVMaze (откроется в новой вкладке)`,
		posterUrl: show.posterUrl?.trim() || null,
		posterAlt: `Постер сериала «${show.name}»`,
		summary: getSummaryText(show.summaryHtml) || "Описание отсутствует.",
		genres:
			show.genres
				.map((genre) => genre.trim())
				.filter(Boolean)
				.join(" · ") || "Жанры не указаны",
		hasRating: show.rating !== null,
		ratingText,
		ratingLabel:
			show.rating === null ? "Нет оценки" : `Рейтинг: ${ratingText} из 10`,
	};
};
