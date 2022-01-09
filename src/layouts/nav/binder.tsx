import { useLocation } from '@reach/router'
import styled from 'styled-components'

import Decorations from './decorations'
import Hamburger, { HamProps } from './ham'
import Settings from './settings'

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
}: Props): JSX.Element => {
	const location = useLocation()
	const linkIsDisabled = location.pathname === '/'

	return (
		<Wrap>
			<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
			<Decorations />
			<LogoWrap aria-hidden={linkIsDisabled}>
				<Logo to="/" tabIndex={linkIsDisabled ? -1 : 0}>
					Gradient
				</Logo>
			</LogoWrap>
			<StyledSettings
				beforeDialogOpen={beforeSettingsDialogOpen}
				afterDialogClose={afterSettingsDialogClose}
			/>
		</Wrap>
	)
}

export default Binder

const Wrap = styled.ul`
	${(p) => p.theme.utils.flexCenter};
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	border-right: solid 1px ${(p) => p.theme.colors.line};
	box-sizing: border-box;
	padding: ${(p) => p.theme.space[0]} 0;
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
	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`
