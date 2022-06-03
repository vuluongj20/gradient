import styled from 'styled-components'

const Canvas = () => {
	return <Wrap />
}

export default Canvas

const Wrap = styled.canvas`
	width: 100%;
	border-radius: ${(p) => p.theme.radii.l};
`
