import { Image as CloudinaryImage } from 'cloudinary-react'
import styled from 'styled-components'

type Props = {
	src: string
	alt: string
}

const Image = ({ src, alt }: Props): JSX.Element => {
	if (process.env.NODE_ENV === 'development') {
		return <StyledImage src={`../images/${src}`} alt={alt} />
	}

	return <CloudinaryImage src={src} alt={alt} />
}

export default Image

const StyledImage = styled.img`
	display: block;
	width: 100%;
`
