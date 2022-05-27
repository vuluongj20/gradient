import { ComponentProps } from 'react'
import styled from 'styled-components'

import LocalThemeProvider from '@utils/localThemeProvider'

type Size = 's' | 'm' | 'l'

type Props = ComponentProps<typeof LocalThemeProvider> & {
	size?: Size
	fullWidthOnMobile?: boolean
	className?: string
}

const Panel = ({
	size = 'm',
	fullWidthOnMobile = false,
	className,
	children,
	...themeProviderProps
}: Props) => (
	<LocalThemeProvider {...themeProviderProps}>
		<Wrap className={className} size={size} fullWidthOnMobile={fullWidthOnMobile}>
			{children}
		</Wrap>
	</LocalThemeProvider>
)

export default Panel

const getPadding = (p) => {
	switch (p.size) {
		case 's':
			return `
				padding: ${p.theme.space[2]} ${p.theme.space[3]};

				${p.theme.utils.media.s} {
					padding: ${p.theme.space[1]} ${p.theme.space[2]};
				}
			`
		case 'l':
			return `
				padding: ${p.theme.space[4]} ${p.theme.space[5]};

				${p.theme.utils.media.s} {
					padding: ${p.theme.space[3]} ${p.theme.space[4]};
				}
			`
		case 'm':
		default:
			return `
				padding: ${p.theme.space[3]} ${p.theme.space[4]};

				${p.theme.utils.media.s} {
					padding: ${p.theme.space[2]} ${p.theme.space[3]};
				}
			`
	}
}

const Wrap = styled.div<{ size: Size; fullWidthOnMobile: boolean }>`
	background-color: ${(p) => p.theme.background};
	border-radius: ${(p) => p.theme.radii.l};
	border: solid 1px ${(p) => p.theme.line};

	${getPadding}

	${(p) =>
		p.fullWidthOnMobile &&
		`
			${p.theme.utils.media.xs} {
				padding-left: ${p.theme.utils.space.paddingHorizontalMobile};
				padding-right: ${p.theme.utils.space.paddingHorizontalMobile};
				border-radius: 0;
				border-left-width: 0;
				border-right-width: 0;
			}
		`}
`
