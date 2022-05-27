import { ComponentProps } from 'react'
import styled from 'styled-components'

import LocalThemeProvider from '@utils/localThemeProvider'

type Props = ComponentProps<typeof LocalThemeProvider> & { className?: string }

const Panel = ({ className, children, ...props }: Props) => (
	<LocalThemeProvider {...props}>
		<Wrap className={className}>{children}</Wrap>
	</LocalThemeProvider>
)

export default Panel

const Wrap = styled.div`
	background-color: ${(p) => p.theme.background};
	border-radius: ${(p) => p.theme.radii.m};
	border: solid 1px ${(p) => p.theme.line};
	height: 10rem;
`
