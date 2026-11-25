import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { animateHeroTransition } from "./animateHeroTransition";

export const useHeroTransition = (hasSubmittedSearch: boolean) => {
	const heroRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const origin = useRef<{ panelTop: number; fromKeyboard: boolean } | null>(
		null,
	);
	const completed = useRef(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const onInitialSubmit = useCallback((fromKeyboard: boolean) => {
		origin.current = {
			panelTop: heroRef.current?.getBoundingClientRect().bottom ?? 0,
			fromKeyboard,
		};

		setIsTransitioning(true);
	}, []);

	useLayoutEffect(() => {
		if (!hasSubmittedSearch || completed.current || !heroRef.current) {
			return;
		}

		if (origin.current?.fromKeyboard) {
			inputRef.current?.focus({ preventScroll: true });
		}

		return animateHeroTransition(
			heroRef.current,
			origin.current ?? { panelTop: 0 },
			() => {
				completed.current = true;
				setIsTransitioning(false);
			},
		);
	}, [hasSubmittedSearch]);

	return { heroRef, panelRef, inputRef, isTransitioning, onInitialSubmit };
};
