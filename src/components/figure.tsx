import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	children: ReactNode
	caption: string
	source?: string
	className?: string
}

const Figure = ({ caption, source, children, className }: Props) => {
	return (
		<Wrap className={className}>
			{children}
			<Caption>
				{caption}
				{source && <Source>{` ${source}.`}</Source>}
			</Caption>
		</Wrap>
	)
}

export default Figure

const Wrap = styled.figure`
	margin: 0;
	padding: 0;
`

const Caption = styled.figcaption`
	${(p) => p.theme.text.viz.label};
	line-height: 1.4;
	margin-top: ${(p) => p.theme.space[1]};
	max-width: 40rem;
`

const Source = styled.span`
	color: ${(p) => p.theme.label};
`
