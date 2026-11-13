import { HttpError, InvalidResponseError, NetworkError } from "@/shared/api";

export const getSearchErrorMessage = (error: Error | null): string => {
	if (error instanceof HttpError) {
		if (error.status === 429) {
			return "Слишком много запросов к TVMaze. Подождите немного и повторите поиск.";
		}
		if (error.status >= 500) {
			return "TVMaze временно недоступен. Попробуйте повторить поиск позже.";
		}
	}
	if (error instanceof NetworkError) {
		return "Не удалось подключиться к TVMaze. Проверьте интернет и повторите поиск.";
	}
	if (error instanceof InvalidResponseError) {
		return "TVMaze вернул некорректный ответ. Попробуйте повторить поиск позже.";
	}
	return "Не удалось найти сериалы. Попробуйте повторить поиск.";
};
