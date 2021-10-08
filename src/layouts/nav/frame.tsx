import { theme } from '@utils'
import styled from 'styled-components'

type CornerProps = {
	width: number
	rotation: number
	top?: boolean
	left?: boolean
	bottom?: boolean
	right?: boolean
}

type SideProps = {
	width: number
	left?: boolean
	right?: boolean
}

type StampProps = {
	width: number
}

type FrameProps = {
	width: number
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

const Stamp = (props: StampProps): JSX.Element => {
	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	const dateString = new Date(Date.now()).toLocaleString('en-US', dateFormat)

	return (
		<StampWrapper {...props}>
			<StampSection>
				<StampText>GRDNT</StampText>
			</StampSection>
			<StampSection>
				<StampText>{dateString}</StampText>
			</StampSection>
		</StampWrapper>
	)
}

const Frame = ({ width }: FrameProps): JSX.Element => (
	<FrameWrapper>
		<Corner width={width} rotation={0} top left />
		<Corner width={width} rotation={90} top right />
		<Corner width={width} rotation={180} bottom right />
		<Corner width={width} rotation={270} bottom left />
		<Side width={width} left />
		<Side width={width} right />
		<Stamp width={width} />
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
`

const CornerWrapper = styled.div<CornerProps>`
	position: absolute;
	width: ${(p) => p.width * 0.5}em;
	height: ${(p) => p.width * 0.5}em;
	transform: rotate(${(p) => p.rotation}deg);

	${(p) => p.top && `top: ${p.width * 0.5}em;`}
	${(p) => p.bottom && `bottom: ${p.width * 0.5}em;`}
	${(p) => p.left && `left: ${p.width * 0.5}em;`}
	${(p) => p.right && `right: ${p.width * 0.5}em;`}
`

const Line = styled('div')`
	position: absolute;
	width: 100%;
	height: 2px;
	border-radius: 2px;
	background-color: ${theme('c.gray1')};
	opacity: 0.4;
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
	width: ${(p) => p.width * 0.6875}em;
	height: ${(p) => p.width * 0.6875}em;

	${(p) => p.left && `left: ${p.width * 0.3125}em;`}
	${(p) => p.right && `right: ${p.width * 0.3125}em;`}
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
	border: solid 2px ${theme('c.gray1')};
	border-radius: 50%;
	opacity: 0.4;
`

const StampWrapper = styled('div')<StampProps>`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	width: ${(p) => p.width}em;
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
