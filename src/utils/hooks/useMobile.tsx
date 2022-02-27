import useMatchMedia from '@utils/hooks/useMatchMedia'
import { breakpoints } from '@utils/style'

/**
 * Returns whether the screen is mobile
 */
const useMobile = (): boolean => {
  const isXS = useMatchMedia(`(max-width: ${breakpoints.xs})`)
  const isLandscape = useMatchMedia(`(max-height: ${breakpoints.s})`)
  return isXS || isLandscape
}

export default useMobile
