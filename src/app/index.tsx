import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainPage } from "@/pages/MainPage";
import styles from "@/shared/styles/index.module.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		'Не удалось найти корневой элемент с id "root". Проверьте index.html',
	);
}

rootElement.className = styles.root ?? "";

createRoot(rootElement).render(
	<StrictMode>
		<MainPage />
	</StrictMode>,
);
