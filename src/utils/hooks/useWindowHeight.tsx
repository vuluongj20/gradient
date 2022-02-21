// Adapted from nslocum's useWindowWidth hook:
// https://gist.github.com/nslocum/f147149a243069577a91f5e1beaa5776
import { useEffect, useState } from 'react'

import { debounce } from '../functions'

const getWindowInnerHeight = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 900
  }
  return window.innerHeight
}

const useWindowHeight = (delay = 700): number => {
  const [height, setHeight] = useState(getWindowInnerHeight())

  useEffect(() => {
    const handleResize = () => setHeight(getWindowInnerHeight())
    const debouncedResizeHandler = debounce(handleResize, delay)

    window.addEventListener('resize', debouncedResizeHandler)
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  }, [delay])

  return height
}

export default useWindowHeight
