import styled from 'styled-components'

import TransitionLink from '@components/transitionLink'

type Props = {
	left?: boolean
	right?: boolean
}

const Target = (props: Props): JSX.Element => (
	<TargetWrap to="/" tabIndex={-1} {...props}>
		<TargetLineHorizontal />
		<TargetLineVertical />
		<TargetCircle />
	</TargetWrap>
)

export default Target

const Line = styled.div`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background: ${(p) => p.theme.colors.heading};
	opacity: 40%;
`

const TargetWrap = styled(TransitionLink)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1.5em;
	height: 1.5em;
	z-index: 1;

	${(p) => p.theme.utils.media.xs} {
		display: none;
	}
`

const TargetLineHorizontal = styled(Line)`
	top: 50%;
	transform: translateY(-50%);
`

const TargetLineVertical = styled(Line)`
	top: calc(50% - 1px);
	left: 0;
	transform: rotate(90deg);
`

const TargetCircle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 56.25%;
	height: 56.25%;
	border: solid 2px ${(p) => p.theme.colors.heading};
	border-radius: 50%;
	opacity: 40%;
`
