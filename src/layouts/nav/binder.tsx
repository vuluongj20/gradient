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
		<LogoWrap>
			<Logo to="/" tooltip="Home" spread>
				Gradient
			</Logo>
		</LogoWrap>
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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2.75em;
		background: ${(p) => p.theme.colors.background};
		border-right: none;
	}
`

const LogoWrap = styled.div`
	${(p) => p.theme.utils.absCenter};
	display: none;

	${(p) => p.theme.utils.media.xs} {
		display: initial;
	}
`
const Logo = styled(TransitionLink)`
	${(p) => p.theme.text.content.h3};
	font-weight: 700;
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
