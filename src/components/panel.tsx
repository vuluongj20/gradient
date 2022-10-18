import { ComponentProps } from 'react'
import styled from 'styled-components'

import { Theme } from '@theme'

import { isDefined } from '@utils/functions'
import LocalThemeProvider from '@utils/localThemeProvider'

export type PanelProps = ComponentProps<typeof LocalThemeProvider> & {
	size?: 's' | 'm' | 'l'
	mt?: number
	mb?: number
	gridColumn?: keyof Theme['gridColumn']
	className?: string
}

const Panel = ({
	size,
	mt,
	mb,
	gridColumn,
	className,
	children,
	...themeProviderProps
}: Props) => (
	<LocalThemeProvider {...themeProviderProps}>
		<Wrap className={className} size={size} mt={mt} mb={mb} gridColumn={gridColumn}>
			{children}
		</Wrap>
	</LocalThemeProvider>
)

export default Panel

const getPadding = (p: { size?: Props['size']; theme: Theme }) => {
	switch (p.size) {
		case 's':
			return `
				padding: ${p.theme.space[3]};

				${p.theme.media.s} {
					padding: ${p.theme.space[2]};
				}
			`
		case 'm':
			return `
					padding: ${p.theme.space[4]};

					${p.theme.media.s} {
						padding: ${p.theme.space[3]};
					}
				`
		case 'l':
			return `
				padding: ${p.theme.space[5]};

				${p.theme.media.s} {
					padding: ${p.theme.space[4]};
				}
			`
		default:
			return null
	}
}

const Wrap = styled.div<{
	size?: Props['size']
	mt?: number
	mb?: number
	gridColumn?: Props['gridColumn']
}>`
	background-color: ${(p) => p.theme.background};
	border-radius: ${(p) => p.theme.radii.l};
	border: solid 1px ${(p) => p.theme.iLine};

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
