import { useLayoutEffect, useState } from 'react'

const useMatchMedia = (query: string, defaultValue = false): boolean => {
	if (typeof window === 'undefined') return defaultValue

	const mediaQueryList = window.matchMedia(query)

	// State and setter for matched value
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, setValue] = useState(mediaQueryList.matches)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useLayoutEffect(() => {
		const handler = (): void => setValue(mediaQueryList.matches)
		mediaQueryList.addListener(handler)
		return (): void => mediaQueryList.removeListener(handler)
	}, [mediaQueryList])

	return value
}

export default useMatchMedia
