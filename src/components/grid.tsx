import styled from 'styled-components'

import { gridColCounts, frameWidth } from '@utils/styling'

const Grid = styled.div`
	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xl}, 1fr) [end];
	grid-gap: 1.25em;

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
		grid-gap: 1em;
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
		grid-gap: 0.75em;
	}
`

export default Grid
