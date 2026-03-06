const REVEAL_SELECTOR = '[data-animate="fade-up"]';
const READY_CLASS = 'fade-up-ready';
const VISIBLE_CLASS = 'animate-in';
const BOUND_ATTRIBUTE = 'data-animate-bound';

const revealImmediately = (elements: HTMLElement[]) => {
	for (const element of elements) {
		element.setAttribute(BOUND_ATTRIBUTE, 'true');
		element.classList.add(VISIBLE_CLASS);
	}
};

export const initScrollAnimations = () => {
	const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
		(element) => element.getAttribute(BOUND_ATTRIBUTE) !== 'true',
	);

	if (elements.length === 0) {
		return;
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		revealImmediately(elements);
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) {
					continue;
				}

				entry.target.classList.add(VISIBLE_CLASS);
				observer.unobserve(entry.target);
			}
		},
		{
			threshold: 0.2,
			rootMargin: '0px 0px -10% 0px',
		},
	);

	for (const element of elements) {
		element.setAttribute(BOUND_ATTRIBUTE, 'true');
		element.classList.add(READY_CLASS);
		observer.observe(element);
	}
};
