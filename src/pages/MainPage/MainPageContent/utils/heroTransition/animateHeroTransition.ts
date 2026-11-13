type Origin = { panelTop: number };

export const animateHeroTransition = (
	hero: HTMLElement,
	origin: Origin,
	onFinish: () => void,
) => {
	const duration = Number.parseFloat(
		getComputedStyle(hero).getPropertyValue("--motion-hero"),
	);
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const startedAt = performance.now();

	let frame = 0;
	let interrupted = false;

	const interrupt = () => {
		interrupted = true;
	};

	window.addEventListener("wheel", interrupt, { passive: true });
	window.addEventListener("touchstart", interrupt, { passive: true });

	const cleanup = () => {
		cancelAnimationFrame(frame);
		window.removeEventListener("wheel", interrupt);
		window.removeEventListener("touchstart", interrupt);
	};

	const animate = (now: number) => {
		const progress =
			reducedMotion.matches || !duration
				? 1
				: Math.min(Math.max(now - startedAt, 0) / duration, 1);

		const easedProgress = 1 - (1 - progress) ** 3;

		if (!interrupted) {
			// Панель приближается к верху по общей кривой, пока высота hero меняется.
			const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
			window.scrollTo({
				top: heroBottom - origin.panelTop * (1 - easedProgress),
				behavior: "instant",
			});
		}

		if (progress < 1) {
			frame = requestAnimationFrame(animate);
		} else {
			cleanup();
			onFinish();
		}
	};

	frame = requestAnimationFrame(animate);

	return cleanup;
};
