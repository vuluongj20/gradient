import useMatchMedia from '@utils/hooks/useMatchMedia'

/**
 * Returns whether the user prefers reduced motion
 */
const useReducedMotion = (): boolean => {
  return useMatchMedia(`(prefers-reduced-motion)`)
}

export default useReducedMotion
