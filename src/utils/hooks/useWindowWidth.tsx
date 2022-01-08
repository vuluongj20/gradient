// Adapted from nslocum's useWindowWidth hook:
// https://gist.github.com/nslocum/f147149a243069577a91f5e1beaa5776
import { useEffect, useState } from 'react'

import { debounce } from '../functions'

const getWindowInnerWidth = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 1400
  }
  return window.innerWidth
}

const useWindowWidth = (delay = 700): number => {
  const [width, setWidth] = useState(getWindowInnerWidth())

  useEffect(() => {
    const handleResize = () => setWidth(getWindowInnerWidth())
    const debouncedResizeHandler = debounce(handleResize, delay)

    window.addEventListener('resize', debouncedResizeHandler)
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  }, [delay])

  return width
}

export default useWindowWidth
