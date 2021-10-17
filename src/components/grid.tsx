import styled from 'styled-components'

import { frameWidth, gridColCounts, theme } from '@utils/styling'

const Grid = styled.div`
	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xl}, 1fr) [end];
	column-gap: ${theme('s.3')};

	max-width: ${(p) => p.theme.b.xl};
	margin: 0 auto;
	padding: 0 ${frameWidth}em;

	@media only screen and (max-width: ${(p) => p.theme.b.l}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.m}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		column-gap: ${theme('s.2')};
	}

	@media only screen and (max-width: ${(p) => p.theme.b.s}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.xs}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		column-gap: ${theme('s.1')};
	}
`

export default Grid
