import styled from 'styled-components'

import { Breakpoint } from '@theme/breakpoints'

export type GridColCounts = Record<Breakpoint | 'xxl', number>

/** Number of grid columns at different breakpoints */
export const gridColCounts: GridColCounts = {
	xxl: 14,
	xl: 12,
	l: 10,
	m: 8,
	s: 6,
	xs: 4,
}

const Grid = styled.div<{ noPaddingOnMobile?: boolean }>`
	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xxl}, 1fr) [end];
	column-gap: var(--space-3);
	padding-left: var(--page-margin-left);
	padding-right: var(--page-margin-right);

	${(p) => p.theme.breakpoints.xl} {
		grid-template-columns:
			[start] repeat(${gridColCounts.xl}, 1fr)
			[end];
	}

	${(p) => p.theme.breakpoints.l} {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	${(p) => p.theme.breakpoints.m} {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		column-gap: var(--space-2);
	}

	${(p) => p.theme.breakpoints.s} {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];

		${(p) => p.noPaddingOnMobile && `padding-left: 0; padding-right: 0;`}
	}

	${(p) => p.theme.breakpoints.xs} {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		column-gap: var(--space-1);
	}
`

export default Grid
