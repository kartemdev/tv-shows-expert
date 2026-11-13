export const getSummaryText = (html: string | null): string => {
	if (!html) return "";

	// Содержимое template инертно: скрипты и ресурсы не запускаются и не загружаются.
	const template = document.createElement("template");
	template.innerHTML = html;
	template.content
		.querySelectorAll(
			"script, style, template, noscript, iframe, object, svg, math",
		)
		.forEach((element) => {
			element.remove();
		});
	template.content
		.querySelectorAll(
			"address, article, aside, blockquote, br, div, dl, dt, dd, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, table, td, th, tr, ul",
		)
		.forEach((element) => {
			element.before(" ");
			element.after(" ");
		});

	return template.content.textContent?.replace(/\s+/gu, " ").trim() ?? "";
};
