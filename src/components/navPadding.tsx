import styled from 'styled-components'

const NavPadding = styled.div`
	width: 100%;
	height: 4em;

	${(p) => p.theme.u.media.s} {
		height: 3.5em;
	}

	${(p) => p.theme.u.media.xs} {
		height: 3em;
	}
`

export default NavPadding
