// Adapted from nslocum's useWindowWidth hook:
// https://gist.github.com/nslocum/f147149a243069577a91f5e1beaa5776
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const useWindowWidth = (delay = 700): number => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    const debouncedResizeHandler = debounce(handleResize, delay)

    window.addEventListener('resize', debouncedResizeHandler)
    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  }, [delay])

  return width
}

export default useWindowWidth
