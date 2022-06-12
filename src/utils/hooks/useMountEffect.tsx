/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useMountEffect = (fun) => useEffect(fun, [])

export default useMountEffect
