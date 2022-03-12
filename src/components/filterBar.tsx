import { Item } from '@react-stately/collections'
import styled from 'styled-components'

import Grid from '@components/grid'
import Select from '@components/select'

export type FilterProps = {
	name: string
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
	showDialogOnMobile?: boolean
}

const FilterBar = ({
	filters,
	onChange,
	showDialogOnMobile,
	...rest
}: Props): JSX.Element => {
	return (
		<Wrap {...rest}>
			{filters.map((filter) => (
				<StyledSelect
					key={filter.name}
					defaultSelectedKey={filter.defaultValue}
					onSelectionChange={(key: string) => onChange(filter.name, key)}
					showDialogOnMobile={showDialogOnMobile}
					{...filter}
				>
					{filter.options.map((o) => (
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
	background: ${(p) => p.theme.background};
	z-index: 9;
`

const StyledSelect = styled(Select)`
	grid-column-end: span 2;
`
