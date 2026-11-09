import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainPage } from "@/pages/main-page";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		'Не удалось найти корневой элемент с id "root". Проверьте index.html',
	);
}

createRoot(rootElement).render(
	<StrictMode>
		<MainPage />
	</StrictMode>,
);
