import { Breakpoint } from '@types'

export const isObject = (item: unknown): boolean =>
	item && typeof item === 'object' && !Array.isArray(item)

export const getNestedKey = (obj: unknown, path: string): unknown => {
	if (!isObject(obj)) {
		return null
	}

	return path
		.split('.')
		.map((item) => item.split(/(\[\d\])/g))
		.flat()
		.filter((item) => item)
		.reduce((obj, key) => {
			const modifiedKey = key.replace(/^\[(.+)\]$/g, '$1')
			return obj && obj[modifiedKey] !== 'undefined' ? obj[modifiedKey] : null
		}, obj)
}

export const deepMergeUnpure = (
	target: Record<string, unknown>,
	source: unknown,
): unknown => {
	if (!source) return target

	if (isObject(source)) {
		for (const [key, value] of Object.entries(source)) {
			if (isObject(value)) {
				if (!target[key]) Object.assign(target, { [key]: {} })
				deepMergeUnpure(target[key] as Record<string, unknown>, source[key])
			} else {
				Object.assign(target, { [key]: value })
			}
		}
	}

	return target
}

export const deepMerge = (target: Record<string, unknown>, source: unknown): unknown => {
	const safeTarget = JSON.parse(JSON.stringify(target))
	return deepMergeUnpure(safeTarget, source)
}

/** Simplify calls to the theme object in styled-components.
 *  Instead of having to write `${p => p.theme.[path]}`
 *  we can write `${theme([path])}`
 *  */
export const theme =
	(key: string) =>
	(props: Record<string, unknown>): unknown =>
		getNestedKey(props.theme, key)

export const sum = (arr: number[]): number => arr.reduce((acc, cur) => acc + cur, 0)

export const reducedMotion = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false
	}
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type ColCounts = Record<Breakpoint, number>

export const gridColCounts: ColCounts = { xl: 12, l: 10, m: 8, s: 6, xs: 4 }
