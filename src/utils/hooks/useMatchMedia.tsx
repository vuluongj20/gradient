import { useState } from 'react'

const useMatchMedia = (query: string, fallback?: boolean): boolean => {
	const [matches, setMatches] = useState(fallback ?? false)

	/**
	 * During the Gatsby build process, window and document are undefined
	 * so return the fallback value instead
	 */
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return matches
	} else {
		const mediaQueryList = window.matchMedia(query)
		if (matches !== mediaQueryList.matches) {
			setMatches(mediaQueryList.matches)
		}
		mediaQueryList.onchange = (e) => {
			setMatches(e.matches)
		}
	}

	return matches
}

export default useMatchMedia
