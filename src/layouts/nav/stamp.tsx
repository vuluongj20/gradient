import { useLocation } from '@reach/router'
import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

const Stamp = (): JSX.Element => {
	const location = useLocation()
	const disabled = location.pathname === '/'
	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	const dateString = new Date(Date.now()).toLocaleString('en-US', dateFormat)

	return (
		<StampWrap>
			<StampSection>
				<StampLink
					to="/"
					tooltip={!disabled && 'Home'}
					tooltipPlacement="right"
					height={4}
					tabIndex={disabled ? -1 : 0}
				>
					<StampText>GRDNT</StampText>
				</StampLink>
			</StampSection>
			<StampSection>
				<StampLink
					to="/"
					tooltip={!disabled && 'Home'}
					tooltipPlacement="right"
					height={6}
					tabIndex={-1}
				>
					<StampText>{dateString}</StampText>
				</StampLink>
			</StampSection>
		</StampWrap>
	)
}

export default Stamp

const StampWrap = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const StampSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const StampLink = styled(TransitionLink)<{ height: number }>`
	${(p) => p.theme.text.ui.label};
	${(p) => p.theme.utils.flexCenter};
	display: inline-flex;
	position: relative;
	width: 1.4em;
	height: ${(p) => p.height}em;
	opacity: 60%;
	line-height: 1.4;
	white-space: nowrap;
`

const StampText = styled.span`
	transform: rotate(-90deg);
`
