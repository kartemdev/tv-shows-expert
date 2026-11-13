import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (callback: () => void, delay: number) => {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const cancel = useCallback(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const schedule = useCallback(() => {
		cancel();
		timeoutRef.current = setTimeout(() => {
			timeoutRef.current = null;
			callbackRef.current();
		}, delay);
	}, [cancel, delay]);

	useEffect(() => cancel, [cancel]);

	return { schedule, cancel };
};
