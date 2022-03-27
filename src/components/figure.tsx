import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { Image } from '@types'

type Props = Image & {
	caption: string
	from?: string
	className?: string
}

const Figure = ({ src, alt, caption, from, className }: Props) => {
	const image = getImage(src)

	return (
		<Wrap className={className}>
			<StyledImage image={image} alt={alt} />
			<Caption>
				{caption}
				{from && <From>{` ${from}.`}</From>}
			</Caption>
		</Wrap>
	)
}

export default Figure

const Wrap = styled.figure`
	margin: 0;
	padding: 0;
`

const StyledImage = styled(GatsbyImage)`
	border-radius: ${(p) => p.theme.radii.m};
`

const Caption = styled.figcaption`
	${(p) => p.theme.text.viz.label};
	line-height: 1.4;
	margin-top: ${(p) => p.theme.space[1]};
	max-width: 40rem;
`

const From = styled.span`
	color: ${(p) => p.theme.label};
`
