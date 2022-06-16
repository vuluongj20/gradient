import { csv, timeParse } from 'd3'
import { ReactNode, createContext, useEffect, useState } from 'react'

import { Data } from './index'

import { makeCancelable } from '@utils/functions'

const DataContext = createContext<Data | null>(null)

type Props = { children?: ReactNode }
type RawData = Record<keyof Data[0], string | undefined>[]

const DataProvider = ({ children }: Props) => {
	const [data, setData] = useState<Data | null>(null)

	useEffect(() => {
		const cancelable = makeCancelable<RawData>(
			csv('https://storage.googleapis.com/vl-gradient/co2/weekly_in_situ_co2_mlo.csv'),
		)

		cancelable.promise
			.then((resData: RawData) => {
				setData(
					resData.map((d) => ({
						date: timeParse('%Y-%m-%d')(d.date ?? '') as Date,
						level: +(d.level ?? 0),
					})),
				)
			})
			.catch(() => console.warn('CO2 data did not finish loading.'))

		return () => cancelable.cancel()
	}, [])

	return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export { DataContext as default, DataProvider }
