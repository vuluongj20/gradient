import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { Image } from '@types'

type Props = Image & {
	caption: string
	from?: string
	className?: string
}

const Figure = ({ src, alt, loading = 'lazy', caption, from, className }: Props) => {
	const image = getImage(src)

	return (
		<Wrap className={className}>
			<ImageWrap>
				<StyledImage image={image} alt={alt} loading={loading} />
			</ImageWrap>
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

const ImageWrap = styled('div')`
	${(p) => p.theme.utils.flexCenter};
	position: relative;
	width: 100%;
	overflow: hidden;
	border-radius: ${(p) => p.theme.radii.m};
	mask-image: radial-gradient(white, black);
	background: ${(p) => p.theme.iBackground};

	::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: ${(p) => p.theme.radii.m};
		box-shadow: inset 0 0 0 1px ${(p) => p.theme.line};
	}
`

const StyledImage = styled(GatsbyImage)`
	width: 100%;
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
