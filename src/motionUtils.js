/**
 * Motion utilities for Framer Motion animations throughout the application
 * Contains animation variants for modals, pages, banners, and other UI components
 * Each variant defines initial, animate, and exit states for smooth transitions
 */

// Default cubic-bezier easing for smooth animations
export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

/**
 * Stagger animation for child elements with 0.05s delay between each
 */
export const staggerHalf = {
	animate: { transition: { staggerChildren: .05 } }
}

/**
 * Stagger animation for child elements with 0.1s delay between each
 */
export const staggerOne = {
	animate: { transition: { staggerChildren: .1 } }
}

/**
 * Modal animation variants - slides in from bottom and fades in
 */
export const modalVariants = {
	hidden: { opacity: 0, top: "100%", transition: { duration: .8, ease: defaultEasing } },
	visible: { opacity: 1, top: "50%", transition: { duration: .8, ease: defaultEasing } }
}

/**
 * Modal overlay animation variants - simple fade in/out
 */
export const modalOverlayVariants = {
	hidden: { opacity: 0, transition: { duration: .2, delay: .2 } },
	visible: { opacity: 1, transition: { duration: .2 } }
}

/**
 * Modal content fade-in-up animation variants
 */
export const modalFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .8, ease: defaultEasing } }
};

/**
 * Authentication page fade-in-up animation variants
 */
export const authFadeInUpVariants = {
	initial: { y: 30, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .8, ease: defaultEasing } }
};

/**
 * Navbar fade animation variants
 */
export const navbarFadeInVariants = {
	hidden: { opacity: 0, transition: { duration: .2 } },
	visible: { opacity: 1, transition: { duration: .2 } }
}

/**
 * Poster fade-in-up animation variants for movie/series posters
 */
export const posterFadeInVariants = {
	initial: { y: 20, opacity: 0, transition: { duration: .5, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .5, ease: defaultEasing } },
	exit: { y: 20, opacity: 0, transition: { duration: .5, ease: defaultEasing } }
};

/**
 * Banner fade-in animation variants for homepage banner
 */
export const bannerFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { opacity: 1, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { opacity: 0, transition: { delay: .4, duration: .8, ease: defaultEasing }, willChange: "opacity, transform" }
};

/**
 * Banner loading section animation variants
 */
export const bannerFadeInLoadSectionVariants = {
	initial: { opacity: 0, transition: { duration: .4, ease: defaultEasing }},
	animate: { opacity: 1, transition: { duration: .4, ease: defaultEasing }},
	exit: { opacity: 0, transition: { duration: .4, ease: defaultEasing }}
};

/**
 * Banner fade-in-up animation variants with child stagger
 */
export const bannerFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { y: 0, opacity: 1, transition: { delayChildren: .4, duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" }
};

/**
 * Authentication page fade animation variants
 */
export const authPageFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .6, ease: defaultEasing }},
	animate: { opacity: 1, transition: { duration: .6, ease: defaultEasing }},
	exit: { opacity: 0, transition: { duration: .6, ease: defaultEasing }}
};

/**
 * Credits section fade-in-up animation variants with delay
 */
export const creditsFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { delay: .8, duration: .8, ease: defaultEasing } },
	exit: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }  }
};

/**
 * Default page fade animation variants for general page transitions
 */
export const defaultPageFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { opacity: 1, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" }
};