import { Theme, Utils } from './types'

export const generateUtils = (theme: Omit<Theme, 'u'>): Utils => ({
	spread: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	absCenter: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	focusVisible: {
		outline: 'none',
		boxShadow: `0 0 0 4px ${theme.c.focus}`,
	},
	media: {
		xs: `@media only screen and (max-width: ${theme.b.xs})`,
		s: `@media only screen and (max-width: ${theme.b.s})`,
		m: `@media only screen and (max-width: ${theme.b.m})`,
		l: `@media only screen and (max-width: ${theme.b.l})`,
		xl: `@media only screen and (max-width: ${theme.b.xl})`,
	},
})
