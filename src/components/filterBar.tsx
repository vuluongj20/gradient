import { Item } from '@react-stately/collections'
import styled from 'styled-components'

import Select from './form/select'

import Grid from '@components/grid'

type FilterProps = {
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
					onChange={onChange}
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
	background: ${(p) => p.theme.c.background};
	z-index: 9;
`

const StyledSelect = styled(Select)`
	grid-column-end: span 2;
	padding: 0 ${(p) => p.theme.s[0]};
`
