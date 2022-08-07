import { csv, timeParse } from 'd3'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Data } from './index'

import Spinner from '@components/spinner'

import { makeCancelable } from '@utils/functions'

const DataContext = createContext<Data | null>(null)
export default DataContext

type RawData = Record<keyof Data[0], string | undefined>[]
type Props = { children?: ReactNode }

export const DataProvider = ({ children }: Props) => {
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

type DataConsumerProps = { render: (data: Data) => ReactNode }

export const DataConsumer = ({ render }: DataConsumerProps) => {
	const data = useContext(DataContext)

	if (!data) return <StyledSpinner label="Loading CO₂ data…" showLabel />

	return render(data)
}

const StyledSpinner = styled(Spinner)`
	margin: ${(p) => p.theme.space[5]} auto 0;
`
