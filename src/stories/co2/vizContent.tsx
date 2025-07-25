import { ForwardRefRenderFunction, forwardRef } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import { Body } from '@components/text'

interface VizContentProps {
	height: string
	content: { state: string; des: string; params?: number[] }[]
	isResizing: boolean
}

const VizContent: ForwardRefRenderFunction<HTMLDivElement, VizContentProps> = (
	{ height, content, isResizing },
	ref,
) => (
	<Grid>
		<Wrap style={{ height }} ref={ref}>
			<VizWrap>
				<VizSvgWrap isResizing={isResizing} className="svg-wrap" />
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
	</Grid>
)

export default forwardRef(VizContent)

const Wrap = styled.div`
	display: flex;
	${(p) => p.theme.gridColumn.wide}
`

export const VizWrap = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	position: sticky;
	top: -1px;
`

export const VizSvgWrap = styled.div<{ isResizing: boolean }>`
	position: relative;
	width: 100%;

	svg {
		display: block;
		margin: 0 auto;
		transition: var(--animation-medium-out);
		${(p) => p.theme.vizText.body};
	}

	${(p) =>
		p.isResizing &&
		`
		svg {
			opacity: 0.75;
			filter: blur(2rem);
		}
	`}
`

export const VizScrollBox = styled.div`
	height: 100%;
	margin: 0 7.5%;
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	pointer-events: none;

	${(p) => p.theme.breakpoints.s} {
		width: 85%;
	}
`

export const VizDesWrap = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	height: 100%;
	flex-shrink: 1;

	${(p) => p.theme.breakpoints.s} {
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

export const VizDesText = styled(Body)`
	display: block;
	width: 24rem;
	max-width: 100%;
	box-sizing: border-box;
	margin: 0;
	padding: var(--space-2) var(--space-3);
	background: var(--color-background-raised);
	border-radius: var(--border-radius-m);
	box-shadow:
		0 0 0 1px var(--color-line),
		var(--box-shadow-l);

	&.dummy {
		visibility: hidden;
	}

	${(p) => p.theme.breakpoints.s} {
		width: 20rem;
	}
`
