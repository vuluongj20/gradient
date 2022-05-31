import { csv, timeParse } from 'd3'
import { ReactNode, createContext, useEffect, useState } from 'react'

import { Data } from './index'

const DataContext = createContext(null)

type Props = { children?: ReactNode }

const DataProvider = ({ children }: Props) => {
	const [data, setData] = useState<Data>(null)

	useEffect(() => {
		csv('https://storage.googleapis.com/vl-gradient/co2/weekly_in_situ_co2_mlo.csv').then(
			(resData) => {
				setData(
					resData.map((d) => ({
						date: timeParse('%Y-%m-%d')(d.date),
						level: +d.level,
					})),
				)
			},
		)
	}, [])

	return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export { DataContext as default, DataProvider }
