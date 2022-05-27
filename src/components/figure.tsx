import { GatsbyImage, GatsbyImageProps, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

type Props = GatsbyImageProps & {
	caption?: string
	from?: string
	fullWidthOnMobile?: boolean
	className?: string
}

const Figure = ({
	image,
	alt,
	loading = 'lazy',
	caption,
	from,
	fullWidthOnMobile = false,
	className,
}: Props) => {
	const imageData = getImage(image)

	if (!caption) {
		return (
			<ImageWrap fullWidthOnMobile={fullWidthOnMobile}>
				<StyledImage image={imageData} alt={alt} loading={loading} />
			</ImageWrap>
		)
	}

	return (
		<Wrap className={className}>
			<ImageWrap fullWidthOnMobile={fullWidthOnMobile}>
				<StyledImage image={imageData} alt={alt} loading={loading} />
			</ImageWrap>
			<Caption fullWidthOnMobile={fullWidthOnMobile}>
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

const ImageWrap = styled('div')<{ fullWidthOnMobile: boolean }>`
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

	${(p) =>
		p.fullWidthOnMobile &&
		`
			${p.theme.utils.media.s} {
				border-radius: 0;
				border-left-width: 0;
				border-right-width: 0;
				::after {
					border-radius: 0;
					width: calc(100% + 2px);
					transform: translateX(-1px);
				}
			}
		`}
`

const StyledImage = styled(GatsbyImage)`
	width: 100%;
`

const Caption = styled.figcaption<{ fullWidthOnMobile: boolean }>`
	${(p) => p.theme.text.viz.label};
	line-height: 1.4;
	margin-top: ${(p) => p.theme.space[1]};
	max-width: 40rem;

	${(p) => p.fullWidthOnMobile && p.theme.utils.space.paddingHorizontalMobile}
`

const From = styled.span`
	color: ${(p) => p.theme.label};
`
