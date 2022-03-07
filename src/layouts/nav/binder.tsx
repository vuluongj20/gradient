import { useLocation } from '@reach/router'
import styled from 'styled-components'

import Breadcrumbs from './breadcrumbs'
import Hamburger, { HamProps } from './ham'
import Settings from './settings'

import TransitionLink from '@components/transitionLink'

type Props = HamProps & {
	pageTitle: string
	beforeSettingsDialogOpen?: () => void
	afterSettingsDialogClose?: () => void
}

const Binder = ({
	toggleMenu,
	menuOpen,
	pageTitle,
	beforeSettingsDialogOpen,
	afterSettingsDialogClose,
}: Props): JSX.Element => {
	const location = useLocation()
	const linkIsDisabled = location.pathname === '/'

	return (
		<Wrap>
			<Hamburger toggleMenu={toggleMenu} menuOpen={menuOpen} />
			<StyledSettings
				beforeDialogOpen={beforeSettingsDialogOpen}
				afterDialogClose={afterSettingsDialogClose}
			/>
			<Breadcrumbs pageTitle={pageTitle} />
			<LogoWrap aria-hidden={linkIsDisabled}>
				<Logo to="/" tabIndex={linkIsDisabled ? -1 : 0}>
					Gradient
				</Logo>
			</LogoWrap>
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
	border-right: solid 1px ${(p) => p.theme.line};
	background: ${(p) => p.theme.background};
	box-sizing: border-box;
	padding-top: calc(${(p) => p.theme.space[0]} + var(--sat, 0));
	padding-bottom: calc(${(p) => p.theme.space[0]} + var(--sab, 0));

	${(p) => p.theme.utils.media.mobile} {
		${(p) => p.theme.utils.space.paddingHorizontal[p.theme.utils.media.xs]}
		align-items: flex-start;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		padding-top: 0;
		padding-bottom: 0;
		background: ${(p) => p.theme.background};
		border-right: none;
	}
`

const LogoWrap = styled.li`
	${(p) => p.theme.utils.absCenter};
	display: none;

	${(p) => p.theme.utils.media.mobile} {
		display: initial;
	}
`
const Logo = styled(TransitionLink)`
	${(p) => p.theme.text.content.h4};
	color: ${(p) => p.theme.heading};
	font-weight: 700;
`

const StyledSettings = styled(Settings)`
	${(p) => p.theme.utils.media.mobile} {
		display: none;
	}
`
