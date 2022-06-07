/** Check if current environment is development */
export const isDev = process.env.NODE_ENV === 'development'

/** Check if an item is an object */
export const isObject = (item: unknown): boolean =>
	item && typeof item === 'object' && !Array.isArray(item)

/** Get nested value from an object using a path string, e.g. 'a.b[0]' */
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

/** WARNING: unpure function, will modify target */
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

/** Deep merge two objects, where source overrides target */
export const deepMerge = (target: Record<string, unknown>, source: unknown): unknown => {
	const safeTarget = JSON.parse(JSON.stringify(target))
	return deepMergeUnpure(safeTarget, source)
}

/** Simple array summation */
export const sum = (arr: number[]): number => arr.reduce((acc, cur) => acc + cur, 0)

export const arraysAreEqual = (a, b) => {
	if (a === b) return true
	if (a === null || b === null) return false
	if (a.length !== b.length) return true

	a.forEach((e, i) => {
		if (e !== b[i]) return false
	})

	return true
}

export const debounce = (func, wait) => {
	let timeout
	return function (...args) {
		const later = function () {
			timeout = null
			func.apply(this, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

/**
 * Creates a cancelable Promise. Useful for dealing with React memory leak
 * warnings.
 */
export function makeCancelable(promise: Promise<unknown>) {
	let isCanceled = false

	const wrappedPromise = new Promise((resolve, reject) => {
		promise
			.then((val) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
			.catch((error) => (isCanceled ? reject({ isCanceled }) : reject(error)))
	})

	return {
		promise: wrappedPromise,
		cancel() {
			isCanceled = true
		},
	}
}
