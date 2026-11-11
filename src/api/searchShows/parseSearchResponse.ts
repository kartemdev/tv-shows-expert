import { InvalidResponseError } from "@/shared/api";
import type { TvMazeSearchResultDto, TvMazeShowDto } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const isOptionalString = (value: unknown): boolean =>
	value == null || typeof value === "string";

const isRating = (value: unknown): boolean =>
	value == null ||
	(isRecord(value) &&
		(value.average == null ||
			(typeof value.average === "number" && Number.isFinite(value.average))));

const isImage = (value: unknown): boolean =>
	value == null ||
	(isRecord(value) &&
		isOptionalString(value.medium) &&
		isOptionalString(value.original));

const isGenres = (value: unknown): boolean =>
	value == null ||
	(Array.isArray(value) && value.every((genre) => typeof genre === "string"));

const isShow = (value: unknown): value is TvMazeShowDto =>
	isRecord(value) &&
	typeof value.id === "number" &&
	Number.isSafeInteger(value.id) &&
	value.id > 0 &&
	typeof value.name === "string" &&
	value.name.trim().length > 0 &&
	isOptionalString(value.url) &&
	isOptionalString(value.summary) &&
	isRating(value.rating) &&
	isGenres(value.genres) &&
	isImage(value.image);

const isSearchResult = (value: unknown): value is TvMazeSearchResultDto =>
	isRecord(value) && isShow(value.show);

export const parseSearchResponse = (
	value: unknown,
): TvMazeSearchResultDto[] => {
	if (!Array.isArray(value) || !value.every(isSearchResult)) {
		throw new InvalidResponseError("Invalid TVMaze search response structure");
	}
	return value;
};
