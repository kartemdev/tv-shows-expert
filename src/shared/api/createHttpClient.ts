import { HttpError, InvalidResponseError, NetworkError } from "./httpErrors";

type GetOptions = {
	query?: Record<string, string>;
	signal?: AbortSignal | undefined;
};

const throwNetworkError = (error: unknown, signal?: AbortSignal): never => {
	signal?.throwIfAborted();
	if (error instanceof Error && error.name === "AbortError") {
		throw error;
	}
	throw new NetworkError({ cause: error });
};

const readJson = async (
	response: Response,
	signal?: AbortSignal,
): Promise<unknown> => {
	try {
		const data: unknown = await response.json();
		signal?.throwIfAborted();
		return data;
	} catch (error) {
		signal?.throwIfAborted();
		if (error instanceof SyntaxError) {
			throw new InvalidResponseError("Response is not valid JSON", {
				cause: error,
			});
		}
		return throwNetworkError(error, signal);
	}
};

export const createHttpClient = (
	baseUrl: string,
	fetchImplementation: typeof fetch = globalThis.fetch,
) => {
	const get = async (
		path: string,
		{ query = {}, signal }: GetOptions = {},
	): Promise<unknown> => {
		const url = new URL(path, baseUrl);
		for (const [name, value] of new URLSearchParams(query)) {
			url.searchParams.set(name, value);
		}
		signal?.throwIfAborted();

		let response: Response;
		try {
			response = await fetchImplementation(url, {
				method: "GET",
				headers: { Accept: "application/json" },
				signal: signal ?? null,
			});
		} catch (error) {
			return throwNetworkError(error, signal);
		}

		signal?.throwIfAborted();
		if (!response.ok) {
			throw new HttpError(response.status, response.statusText);
		}
		return readJson(response, signal);
	};

	return { get };
};
