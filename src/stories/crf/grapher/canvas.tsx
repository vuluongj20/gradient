import * as jsnx from 'jsnetworkx'
import styled from 'styled-components'

const Canvas = () => {
	const G = new jsnx.balancedTree(2, 4)
	return <Wrap />
}

export default Canvas

const Wrap = styled.canvas`
	width: 100%;
	border-radius: ${(p) => p.theme.radii.l};
`
