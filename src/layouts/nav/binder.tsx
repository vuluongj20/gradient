import styled from 'styled-components'

import Hamburger, { HamProps } from './ham'
import Settings from './settings'
import Stamp from './stamp'
import Target from './target'

import TransitionLink from '@components/transitionLink'

type Props = HamProps & {
	beforeSettingsDialogOpen?: () => void
	afterSettingsDialogClose?: () => void
}

const Binder = ({
	toggleMenu,
	menuOpen,
	beforeSettingsDialogOpen,
	afterSettingsDialogClose,
}: Props): JSX.Element => (
	<Wrap>
		<ListWrap>
			<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
			<LogoWrap>
				<Logo to="/">Gradient</Logo>
			</LogoWrap>
			<StyledSettings
				beforeDialogOpen={beforeSettingsDialogOpen}
				afterDialogClose={afterSettingsDialogClose}
			/>
		</ListWrap>
		<Stamp />
		<Target />
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
		height: 3em;
		background: ${(p) => p.theme.colors.background};
		border-right: none;
	}
`

const ListWrap = styled.ul``

const LogoWrap = styled.li`
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
