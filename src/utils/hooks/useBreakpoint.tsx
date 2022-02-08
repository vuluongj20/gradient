import useMatchMedia from '@utils/hooks/useMatchMedia'
import { Breakpoint, breakpoints } from '@utils/style'

/**
 * Returns whether each breakpoint is matches
 */
const useBreakpoint = (breakpoint: Breakpoint): boolean => {
	return useMatchMedia(`(max-width: ${breakpoints[breakpoint]})`)
}

export default useBreakpoint
