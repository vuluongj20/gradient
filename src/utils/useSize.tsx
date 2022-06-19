import { RefObject, useMemo, useState } from 'react'

import { debounce } from '@utils/functions'
import useResizeObserver from '@utils/useResizeObserver'

type State = { width?: number; height?: number }

const useSize = (ref: RefObject<HTMLElement>) => {
	const [size, setSize] = useState<State>({})

	const debouncedOnResize = useMemo(() => {
		const updateSize = () =>
			setSize({ width: ref.current?.clientWidth, height: ref.current?.clientHeight })
		updateSize()

		return debounce(updateSize, 100)
	}, [ref])

	useResizeObserver({ ref, onResize: debouncedOnResize })

	return size
}

export default useSize
