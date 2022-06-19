import { Breakpoint, breakpoints } from '@utils/style'
import useMatchMedia from '@utils/useMatchMedia'

/**
 * Returns whether each breakpoint is matches
 */
const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMatchMedia(`(max-width: ${breakpoints[breakpoint]})`)
}

export default useBreakpoint
