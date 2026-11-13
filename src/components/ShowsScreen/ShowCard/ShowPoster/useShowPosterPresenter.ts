import { useState } from "react";

export const useShowPosterPresenter = (src: string | null) => {
	const [hasError, setHasError] = useState(false);

	return {
		posterUrl: hasError ? null : src,
		onError: () => setHasError(true),
	};
};
