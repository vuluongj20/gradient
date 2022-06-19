/** Check if current environment is development */
export const isDev = process.env.NODE_ENV === 'development'

export const isDefined = <T,>(item: T): item is NonNullable<T> =>
	typeof item !== 'undefined' && item !== null

/** Check if an item is an object */
export const isObject = (item: unknown) =>
	!!item && typeof item === 'object' && !Array.isArray(item)

/** Simple array summation */
export const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0)

export const debounce = <FunctionArguments extends []>(
	func: (...args: FunctionArguments) => void,
	wait: number,
) => {
	let timeout: NodeJS.Timeout | undefined
	return (...args: FunctionArguments) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => func.apply(this, args), wait)
	}
}

/**
 * Creates a cancelable Promise. Useful for dealing with React memory leak
 * warnings.
 */
export function makeCancelable<ReturnType>(promise: Promise<ReturnType>) {
	let isCanceled = false

	const wrappedPromise = new Promise<ReturnType>((resolve, reject) => {
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
