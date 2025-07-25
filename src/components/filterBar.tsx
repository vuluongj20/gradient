import styled from 'styled-components'

import Select from '@components/fields/select'
import Grid from '@components/grid'

export interface FilterProps {
	name: string
	'aria-label': string
	defaultValue: string
	options: [
		{
			value: string
			label: string
		},
	]
}

interface FilterBarProps {
	filters: FilterProps[]
	onChange: (filterName: string, value: string) => void
	showDialogOnMobile?: boolean
}

const FilterBar = ({
	filters,
	onChange,
	showDialogOnMobile,
	...rest
}: FilterBarProps) => {
	return (
		<Wrap {...rest}>
			{filters.map((filter) => (
				<StyledSelect
					key={filter.name}
					onChange={(key) => onChange(filter.name, key as string)}
					showDialogOnMobile={showDialogOnMobile}
					{...filter}
				/>
			))}
		</Wrap>
	)
}

export default FilterBar

const Wrap = styled(Grid)`
	position: sticky;
	top: 0;
	padding-top: var(--space-0);
	padding-bottom: var(--space-0);
	background: var(--color-background);
	transform: translateX(calc(var(--space-1) * -1));
	z-index: 9;
`

const StyledSelect = styled(Select)`
	padding: 0;
	grid-column-end: span 2;
`
