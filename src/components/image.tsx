import { Image as CloudinaryImage } from 'cloudinary-react'
import styled from 'styled-components'

import { Image } from '@types'

type Props = Image

const ImageWrap = ({ src, alt, aspectRatio }: Image): JSX.Element => {
	const getPaddingTop = (aspectRatio: string): string => {
		switch (aspectRatio) {
			/** 1:1 */
			case 'square':
				return '100%'
			/** 4:3 */
			case 'rect':
				return '75%'
			/** 16:9 */
			case 'wide':
			default:
				return '56.25%'
		}
	}

	const paddingTop = aspectRatio ? getPaddingTop(aspectRatio) : null

	if (process.env.NODE_ENV === 'development') {
		return (
			<Wrap paddingTop={paddingTop}>
				<StyledImage src={`../images/${src}`} alt={alt} spread={!!aspectRatio} />
			</Wrap>
		)
	}

	return (
		<Wrap paddingTop={paddingTop}>
			<StyledCloudinaryImage
				publicId={`gradient/${src}`}
				alt={alt}
				spread={!!aspectRatio}
			/>
		</Wrap>
	)
}

export default ImageWrap

const Wrap = styled.div<{ paddingTop?: string }>`
	display: block;
	width: 100%;
	position: relative;

	${(p) => p.paddingTop && `padding-top: ${p.paddingTop};`}
`

const StyledImage = styled.img<{ spread: boolean }>`
	width: 100%;
	${(p) =>
		p.spread &&
		`
			position: absolute;
			height: 100%;
			top: 0;
			object-fit: cover;
			object-position: center;
		`}
`

const StyledCloudinaryImage = styled(CloudinaryImage)<{ spread: boolean }>`
	width: 100%;
	${(p) =>
		p.spread &&
		`
			position: absolute;
			height: 100%;
			top: 0;
			object-fit: cover;
			object-position: center;
		`}
`
