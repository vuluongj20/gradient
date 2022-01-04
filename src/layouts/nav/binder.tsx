import styled from 'styled-components'

import Hamburger, { HamProps } from './ham'
import Settings from './settings'
import Stamp from './stamp'
import Target from './target'

import TransitionLink from '@components/transitionLink'

type Props = HamProps

const Binder = ({ toggleMenu, menuOpen }: Props): JSX.Element => (
	<Wrap>
		<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
		<Stamp />
		<Target left />
		<Logo to="/">Gradient</Logo>
		<StyledSettings />
	</Wrap>
)

export default Binder

const Wrap = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-right: solid 1px ${(p) => p.theme.colors.line};
	box-sizing: content-box;
	background: ${(p) => p.theme.colors.iBackground};

	${(p) => p.theme.utils.media.xs} {
		background: ${(p) => p.theme.colors.background};
		border-right: none;
	}
`

const Logo = styled(TransitionLink)`
	${(p) => p.theme.text.content.h3};
	${(p) => p.theme.utils.absCenter};
	font-weight: 700;
	display: none;

	${(p) => p.theme.utils.media.xs} {
		display: initial;
	}
`

const StyledSettings = styled(Settings)`
	position: absolute;
	bottom: ${(p) => p.theme.space[1]};
	left: 50%;
	transform: translateX(-50%);

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`
