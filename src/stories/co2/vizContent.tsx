import styled from 'styled-components'

import { VizData } from './index'

type Props = {
	content: VizData['vizContent']
}

const VizContent = ({ content }: Props) => (
	<Wrap>
		<VizWrap>
			<VizSvgOuterWrap>
				<VizSvgWrap />
			</VizSvgOuterWrap>
		</VizWrap>
		<VizScrollBox>
			<VizDesText className="dummy" data-index="-1" aria-hidden="true"></VizDesText>
			<VizScrollAnchorTop aria-hidden="true" />
			<VizDesWrap>
				{content.map((chunk, index) => {
					return (
						<VizDesText data-index={index} key={index}>
							{chunk.des}
						</VizDesText>
					)
				})}
			</VizDesWrap>
			<VizScrollAnchorBottom aria-hidden="true" />
		</VizScrollBox>
	</Wrap>
)
export default VizContent

const Wrap = styled.div`
	display: contents;
`

export const VizWrap = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	position: sticky;
	top: -1px;
`

export const VizSvgOuterWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const VizSvgWrap = styled.div`
	width: 100%;

	svg {
		display: block;
		margin: 0 auto;
	}
`

export const VizScrollBox = styled.div`
	height: 100%;
	margin: 0 7.5%;
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	pointer-events: none;

	${(p) => p.theme.utils.media.s} {
		width: 85%;
	}
`

export const VizDesWrap = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	height: 100%;
	flex-shrink: 1;

	${(p) => p.theme.utils.media.s} {
		width: 100%;
		align-items: center;
	}
`

export const VizScrollAnchorTop = styled.div`
	height: 100vh;
	flex-shrink: 0;
`

export const VizScrollAnchorBottom = styled.div`
	height: 100vh;
	flex-shrink: 0;
`

export const VizDesText = styled.p`
	display: block;
	width: 24rem;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
	padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[3]};
	background: ${(p) => p.theme.colors.oBackground};
	border-radius: ${(p) => p.theme.radii.m};
	box-shadow: 0 0 0 1px ${(p) => p.theme.colors.line}, ${(p) => p.theme.shadows.l};

	&.dummy {
		visibility: hidden;
	}

	${(p) => p.theme.utils.media.s} {
		width: 20rem;
	}
`
