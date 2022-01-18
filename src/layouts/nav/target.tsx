import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

const Target = (): JSX.Element => (
	<OuterWrap aria-hidden="true">
		<StyledLink to="/" tabIndex={-1}>
			<LineHorizontal />
			<LineVertical />
			<Circle />
		</StyledLink>
	</OuterWrap>
)

export default Target

const OuterWrap = styled.li`
	${(p) => p.theme.utils.flexCenter};
	position: relative;
	width: 1.5rem;
	height: 1.5rem;
	flex-shrink: 0;

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const StyledLink = styled(TransitionLink)`
	${(p) => p.theme.utils.spread};
	z-index: 1;
`

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: ${(p) => p.theme.colors.heading};
	opacity: 40%;
`

const LineHorizontal = styled(Line)`
	top: 50%;
	transform: translateY(-50%);
`

const LineVertical = styled(Line)`
	top: calc(50% - 1px);
	left: 0;
	transform: rotate(90deg);
`

const Circle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 68.75%;
	height: 68.75%;
	border: solid 2px ${(p) => p.theme.colors.heading};
	border-radius: 50%;
	opacity: 40%;
`
