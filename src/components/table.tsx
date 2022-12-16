import styled from 'styled-components'

export const Table = styled.table`
	width: calc(100% + var(--space-1-5) * 2);
	transform: translateX(calc(var(--space-1-5) * -1));
	border-spacing: 0;

	${(p) => p.theme.breakpoints.xs} {
		width: calc(100% + var(--space-1) * 2);
		transform: translateX(calc(var(--space-1) * -1));
	}
`

export const TableHead = styled.thead`
	th {
		color: var(--color-label);
		border-bottom: solid 1px var(--color-line);
		white-space: nowrap;
	}
`

export const TableBody = styled.tbody`
	& > tr:first-of-type > th,
	& > tr:first-of-type > td {
		padding-top: var(--space-1);
	}
`

export const TableFoot = styled.tfoot``

export const TR = styled.tr`
	/* Row background */
	&:nth-of-type(2n) > th,
	&:nth-of-type(2n) > td {
		position: relative;
		z-index: 1;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: var(--color-background-recessed-lower);
			z-index: -1;
		}

		&:first-child::before {
			border-top-left-radius: var(--border-radius-s);
			border-bottom-left-radius: var(--border-radius-s);
		}
		&:last-child::before {
			border-top-right-radius: var(--border-radius-s);
			border-bottom-right-radius: var(--border-radius-s);
		}
	}
`

export type Alignment = 'left' | 'right'

export const TH = styled.th<{ align?: Alignment }>`
	font-weight: 400;
	padding: var(--space-0) var(--space-1-5);
	${(p) => p.align && `text-align: ${p.align};`}

	& > span {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	${(p) => p.theme.breakpoints.xs} {
		padding: var(--space-0) var(--space-1);
	}
`

export const TD = styled.td<{ align?: Alignment }>`
	font-weight: 400;
	padding: var(--space-0) var(--space-1-5);
	${(p) => p.align && `text-align: ${p.align};`}

	${(p) => p.theme.breakpoints.xs} {
		padding: var(--space-0) var(--space-1);
	}
`
