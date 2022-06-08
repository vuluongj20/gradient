import { RefObject, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Props<T> = {
  ref: RefObject<T>
  onResize: () => void
}

const useResizeObserver = <T extends Element>({ ref, onResize }: Props<T>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const ResizeObserverInstance = new ResizeObserver((entries) => {
      if (!entries.length) {
        return
      }
      onResize()
    })

    ResizeObserverInstance.observe(element)

    return () => element && ResizeObserverInstance.unobserve(element)
  }, [ref, onResize])
}

export default useResizeObserver
