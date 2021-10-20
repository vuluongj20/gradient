import styled from 'styled-components'

import { frameWidth, gridColCounts } from '@utils/styling'

const Grid = styled.div`
	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xl}, 1fr) [end];
	column-gap: ${(p) => p.theme.s[3]};

	max-width: ${(p) => p.theme.b.xl};
	margin: 0 auto;
	padding: 0 ${frameWidth}em;

	${(p) => p.theme.u.media.l} {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	${(p) => p.theme.u.media.m} {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		column-gap: ${(p) => p.theme.s[2]};
	}

	${(p) => p.theme.u.media.s} {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];
	}

	${(p) => p.theme.u.media.xs} {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		column-gap: ${(p) => p.theme.s[1]};
	}
`

export default Grid
