export const contactLinks = {
	email: {
		href: 'mailto:mis8680@gmail.com',
		label: 'Email',
		detail: 'mis8680@gmail.com',
		external: false,
	},
	github: {
		href: 'https://github.com/mis8680',
		label: 'GitHub',
		detail: 'github.com/mis8680',
		external: true,
	},
	linkedin: {
		href: 'https://www.linkedin.com/in/insu-eric-mun',
		label: 'LinkedIn',
		detail: 'linkedin.com/in/insu-eric-mun',
		external: true,
	},
} as const;

export type ContactLinkKey = keyof typeof contactLinks;
