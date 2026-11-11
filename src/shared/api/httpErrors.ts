export class HttpError extends Error {
	readonly status: number;
	readonly statusText: string;

	constructor(status: number, statusText: string) {
		super(`HTTP ${status}: ${statusText}`);
		this.name = "HttpError";
		this.status = status;
		this.statusText = statusText;
	}
}

export class NetworkError extends Error {
	constructor(options?: ErrorOptions) {
		super("Network request failed", options);
		this.name = "NetworkError";
	}
}

export class InvalidResponseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "InvalidResponseError";
	}
}
