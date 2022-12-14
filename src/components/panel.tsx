import { ComponentProps } from 'react'
import styled, { useTheme } from 'styled-components'

import { Theme } from '@theme'

import { isDefined } from '@utils/functions'
import LocalThemeProvider from '@utils/localThemeProvider'

interface PanelWrapProps extends ComponentProps<typeof LocalThemeProvider> {
	size?: 's' | 'm' | 'l'
	mt?: number
	mb?: number
	gridColumn?: keyof Theme['gridColumn']
	className?: string
}

const PanelWrap = ({ children, className, ...props }: PanelWrapProps) => {
	const { elevation } = useTheme()

	return (
		<Wrap {...props} className={`surface-${elevation} ${className ?? ''}`}>
			{children}
		</Wrap>
	)
}

export interface PanelProps
	extends ComponentProps<typeof LocalThemeProvider>,
		PanelWrapProps {}

const Panel = ({
	size,
	mt,
	mb,
	gridColumn,
	className,
	children,
	...themeProviderProps
}: PanelProps) => (
	<LocalThemeProvider {...themeProviderProps}>
		<PanelWrap className={className} size={size} mt={mt} mb={mb} gridColumn={gridColumn}>
			{children}
		</PanelWrap>
	</LocalThemeProvider>
)

export default Panel

const getPadding = (p: { size?: PanelProps['size']; theme: Theme }) => {
	switch (p.size) {
		case 's':
			return `
				padding: ${p.theme.space[3]};
				${p.theme.media.s} {padding: ${p.theme.space[2]}}
			`
		case 'm':
			return `
					padding: ${p.theme.space[4]};
					${p.theme.media.s} {padding: ${p.theme.space[3]}}
				`
		case 'l':
			return `
				padding: ${p.theme.space[5]};
				${p.theme.media.s} {padding: ${p.theme.space[4]}}
			`
		default:
			return null
	}
}

const Wrap = styled.div<{
	size?: PanelProps['size']
	mt?: number
	mb?: number
	gridColumn?: PanelProps['gridColumn']
}>`
	background-color: var(--color-background);
	border-radius: ${(p) => p.theme.radii.l};
	border: solid 1px var(--color-i-line);

	${getPadding}

	${(p) => p.gridColumn && p.theme.gridColumn[p.gridColumn]}
	${(p) => p.gridColumn === 'wide' && p.theme.paddingHorizontalMobile}

	${(p) =>
		p.gridColumn === 'wide' &&
		`
			${p.theme.media.s} {
				border-radius: 0;
				border-left-width: 0;
				border-right-width: 0;
			}
		`}

	${(p) => isDefined(p.mt) && p.theme.marginTop[p.mt]};
	${(p) => isDefined(p.mb) && p.theme.marginBottom[p.mb]};
`
