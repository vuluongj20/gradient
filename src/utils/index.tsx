/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const getNestedObject = (obj, path: string) => {
	return path
		.split('.')
		.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), obj)
}

/** Simplify calls to the theme object in styled-components.
 *  Instead of having to write `${p => p.theme.[path]}`
 *  we can write `${theme([path])}`
 *  */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types*/
export const theme = (path: string) => (props) => getNestedObject(props.theme, path)

export const sum = (arr: number[]): number => arr.reduce((acc, cur) => acc + cur, 0)

export const reducedMotion = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false
	}
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type ColCounts = Record<Breakpoint, number>

export const gridColCounts: ColCounts = { xl: 12, l: 10, m: 8, s: 6, xs: 4 }
