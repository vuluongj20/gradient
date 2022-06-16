import { ComponentProps } from 'react'
import styled from 'styled-components'

import { Theme } from '@theme'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = ComponentProps<typeof LocalThemeProvider> & {
	size?: 's' | 'm' | 'l'
	gridColumn?: keyof Theme['utils']['gridColumn']
	className?: string
}

const Panel = ({
	size,
	gridColumn,
	className,
	children,
	...themeProviderProps
}: Props) => (
	<LocalThemeProvider {...themeProviderProps}>
		<Wrap className={className} size={size} gridColumn={gridColumn}>
			{children}
		</Wrap>
	</LocalThemeProvider>
)

export default Panel

const getPadding = (p: { size?: Props['size']; theme: Theme }) => {
	switch (p.size) {
		case 's':
			return `
				padding: ${p.theme.space[2]} ${p.theme.space[3]};

				${p.theme.utils.media.s} {
					padding: ${p.theme.space[1]} ${p.theme.space[2]};
				}
			`
		case 'm':
			return `
					padding: ${p.theme.space[3]} ${p.theme.space[4]};

					${p.theme.utils.media.s} {
						padding: ${p.theme.space[2]} ${p.theme.space[3]};
					}
				`
		case 'l':
			return `
				padding: ${p.theme.space[4]} ${p.theme.space[5]};

				${p.theme.utils.media.s} {
					padding: ${p.theme.space[3]} ${p.theme.space[4]};
				}
			`
		default:
			return null
	}
}

const Wrap = styled.div<{
	size?: Props['size']
	gridColumn?: Props['gridColumn']
}>`
	background-color: ${(p) => p.theme.background};
	border-radius: ${(p) => p.theme.radii.l};
	border: solid 1px ${(p) => p.theme.iLine};

	${getPadding}

	${(p) => p.gridColumn && p.theme.utils.gridColumn[p.gridColumn]}

	${(p) => p.gridColumn === 'wide' && p.theme.utils.space.paddingHorizontalMobile}

	${(p) =>
		p.gridColumn === 'wide' &&
		`
			${p.theme.utils.media.s} {
				border-radius: 0;
				border-left-width: 0;
				border-right-width: 0;
			}
		`}
`
