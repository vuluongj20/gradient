import styled from 'styled-components'

import { theme, frameWidth } from '@utils/styling'

type CornerProps = {
	rotation: number
	top?: boolean
	left?: boolean
	bottom?: boolean
	right?: boolean
}

type SideProps = {
	left?: boolean
	right?: boolean
}

const Corner = (props: CornerProps): JSX.Element => (
	<CornerWrapper {...props}>
		<CornerLineHorizontal />
		<CornerLineVertical />
	</CornerWrapper>
)

const Side = (props: SideProps): JSX.Element => (
	<SideWrapper {...props}>
		<SideLineHorizontal />
		<SideLineVertical />
		<SideCircle />
	</SideWrapper>
)

const Stamp = (): JSX.Element => {
	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	const dateString = new Date(Date.now()).toLocaleString('en-US', dateFormat)

	return (
		<StampWrapper>
			<StampSection>
				<StampText>GRDNT</StampText>
			</StampSection>
			<StampSection>
				<StampText>{dateString}</StampText>
			</StampSection>
		</StampWrapper>
	)
}

const Frame = (): JSX.Element => (
	<FrameWrapper>
		<Corner rotation={0} top left />
		<Corner rotation={90} top right />
		<Corner rotation={180} bottom right />
		<Corner rotation={270} bottom left />
		<Side left />
		<Side right />
		<Stamp />
	</FrameWrapper>
)

export default Frame

const FrameWrapper = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	pointer-events: none;

	@media only screen and (max-width: ${theme('b.s')}) {
		display: none;
	}
`

const CornerWrapper = styled.div<CornerProps>`
	position: absolute;
	width: ${frameWidth * 0.5}em;
	height: ${frameWidth * 0.5}em;
	transform: rotate(${(p) => p.rotation}deg);

	${(p) => p.top && `top: ${frameWidth * 0.5}em;`}
	${(p) => p.bottom && `bottom: ${frameWidth * 0.5}em;`}
	${(p) => p.left && `left: ${frameWidth * 0.5}em;`}
	${(p) => p.right && `right: ${frameWidth * 0.5}em;`}
`

const Line = styled('div')`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background-color: ${theme('c.heading')};
	opacity: 0.2;
`

const CornerLineHorizontal = styled(Line)`
	left: 0;
	bottom: 0;
`

const CornerLineVertical = styled(Line)`
	top: 0;
	right: 2px;
	transform-origin: top right;
	transform: rotate(-90deg);
`

const SideWrapper = styled('div')<SideProps>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: ${frameWidth * 0.6875}em;
	height: ${frameWidth * 0.6875}em;

	${(p) => p.left && `left: ${frameWidth * 0.15625}em;`}
	${(p) => p.right && `right: ${frameWidth * 0.15625}em;`}
`

const SideLineHorizontal = styled(Line)`
	top: 50%;
	transform: translateY(-50%);
`

const SideLineVertical = styled(Line)`
	top: calc(50% - 1px);
	left: 0;
	transform: rotate(90deg);
`

const SideCircle = styled('div')`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 68.75%;
	height: 68.75%;
	border: solid 2px ${theme('c.heading')};
	border-radius: 50%;
	opacity: 0.2;
`

const StampWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: ${frameWidth}em;
	height: 100%;
`

const StampSection = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const StampText = styled('p')`
	${theme('t.ui.label')}
	opacity: 0.6;
	white-space: nowrap;
	transform: rotate(-90deg);
`
