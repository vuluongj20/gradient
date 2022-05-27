import styled from 'styled-components'

import { gridColCounts } from '@utils/style'

const Grid = styled.div<{ noPaddingOnMobile?: boolean }>`
	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xxl}, 1fr) [end];
	column-gap: ${(p) => p.theme.space[3]};

	${(p) => p.theme.utils.space.paddingHorizontal};

	${(p) => p.theme.utils.media.xl} {
		grid-template-columns:
			[start] repeat(${gridColCounts.xl}, 1fr)
			[end];
	}

	${(p) => p.theme.utils.media.l} {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	${(p) => p.theme.utils.media.m} {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		column-gap: ${(p) => p.theme.space[2]};
	}

	${(p) => p.theme.utils.media.s} {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];

		${(p) => p.noPaddingOnMobile && `padding-left: 0; padding-right: 0;`}
	}

	${(p) => p.theme.utils.media.xs} {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		column-gap: ${(p) => p.theme.space[1]};
	}
`

export default Grid
