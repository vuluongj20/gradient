import { csv, timeParse } from 'd3'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Data } from './index'

import Spinner from '@components/spinner'

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

const DataConsumer = ({ render }: { render: (data) => ReactNode }) => {
	const data = useContext(DataContext)

	if (!data) return <StyledSpinner label="Loading CO₂ data…" showLabel />

	return render(data)
}

export { DataContext as default, DataProvider, DataConsumer }

const StyledSpinner = styled(Spinner)`
	margin: ${(p) => p.theme.space[5]} auto 0;
`
