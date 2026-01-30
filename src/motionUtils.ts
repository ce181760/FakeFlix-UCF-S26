export const defaultEasing = [0.6, -0.05, 0.01, 0.99] as const;

export const staggerHalf = {
	animate: { transition: { staggerChildren: .05 } }
} as const;

export const staggerOne = {
	animate: { transition: { staggerChildren: .1 } }
} as const;

export const modalVariants = {
	hidden: { opacity: 0, top: "100%", transition: { duration: .8, ease: defaultEasing } },
	visible: { opacity: 1, top: "50%", transition: { duration: .8, ease: defaultEasing } }
} as const;

export const modalOverlayVariants = {
	hidden: { opacity: 0, transition: { duration: .2, delay: .2 } },
	visible: { opacity: 1, transition: { duration: .2 } }
} as const;

export const modalFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .8, ease: defaultEasing } }
} as const;

export const authFadeInUpVariants = {
	initial: { y: 30, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .8, ease: defaultEasing } }
} as const;

export const navbarFadeInVariants = {
	hidden: { opacity: 0, transition: { duration: .2 } },
	visible: { opacity: 1, transition: { duration: .2 } }
} as const;

export const posterFadeInVariants = {
	initial: { y: 20, opacity: 0, transition: { duration: .5, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { duration: .5, ease: defaultEasing } },
	exit: { y: 20, opacity: 0, transition: { duration: .5, ease: defaultEasing } }
} as const;

export const bannerFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { opacity: 1, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { opacity: 0, transition: { delay: .4, duration: .8, ease: defaultEasing }, willChange: "opacity, transform" }
} as const;

export const bannerFadeInLoadSectionVariants = {
	initial: { opacity: 0, transition: { duration: .4, ease: defaultEasing }},
	animate: { opacity: 1, transition: { duration: .4, ease: defaultEasing }},
	exit: { opacity: 0, transition: { duration: .4, ease: defaultEasing }}
} as const;

export const bannerFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { y: 0, opacity: 1, transition: { delayChildren: .4, duration: .8, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }, willChange: "opacity, transform" }
} as const;

export const authPageFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .6, ease: defaultEasing }},
	animate: { opacity: 1, transition: { duration: .6, ease: defaultEasing }},
	exit: { opacity: 0, transition: { duration: .6, ease: defaultEasing }}
} as const;

export const creditsFadeInUpVariants = {
	initial: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing } },
	animate: { y: 0, opacity: 1, transition: { delay: .8, duration: .8, ease: defaultEasing } },
	exit: { y: 60, opacity: 0, transition: { duration: .8, ease: defaultEasing }  }
} as const;

export const defaultPageFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { opacity: 1, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" }
} as const;