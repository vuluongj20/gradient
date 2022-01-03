import { Item } from '@react-stately/collections'
import styled from 'styled-components'

import Select from './form/select'

import Grid from '@components/grid'

export type FilterProps = {
	id: string
	label: string
	defaultValue: string
	options: [
		{
			value: string
			label: string
		},
	]
}

type Props = {
	filters: FilterProps[]
	onChange: (filterName: string, value: string) => void
}

const FilterBar = ({ filters, onChange }: Props): JSX.Element => {
	return (
		<Wrap>
			{filters.map((f) => (
				<StyledSelect
					key={f.id}
					name={f.id}
					label={f.label}
					defaultSelectedKey={f.defaultValue}
					onSelectionChange={(key: string) => onChange(f.id, key)}
				>
					{f.options.map((o) => (
						<Item key={o.value}>{o.label}</Item>
					))}
				</StyledSelect>
			))}
		</Wrap>
	)
}

export default FilterBar

const Wrap = styled(Grid)`
	position: sticky;
	top: 0;
	padding-top: ${(p) => p.theme.space[0]};
	padding-bottom: ${(p) => p.theme.space[0]};
	background: ${(p) => p.theme.colors.background};
	z-index: 9;
`

const StyledSelect = styled(Select)`
	grid-column-end: span 2;
	padding: 0 ${(p) => p.theme.space[0]};
`
