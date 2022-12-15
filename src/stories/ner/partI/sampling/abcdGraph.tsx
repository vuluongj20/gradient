import { observer } from 'mobx-react-lite'
import { ComponentProps, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import GraphView from '../../graph/view'
import SamplingEdge from './model/edge'
import SamplingGraph from './model/graph'
import SamplingNode from './model/node'
import SamplingNodePanel from './nodePanel'
import PairGrid from './pairGrid'

import BalancedText from '@components/balancedText'
import Divider from '@components/divider'
import Grid from '@components/grid'
import GuideArrow from '@components/guideArrow'
import Panel from '@components/panel'

import { usePointerAction } from '@utils/text'
import useMobile from '@utils/useMobile'
import useMountEffect from '@utils/useMountEffect'

const createGraph = () => {
	const g = new SamplingGraph()

	const nodeA = new SamplingNode({ label: 'A', x: -60, y: -60 })
	const nodeB = new SamplingNode({ label: 'B', x: 40, y: -80 })
	const nodeC = new SamplingNode({ label: 'C', x: -10, y: 120 })
	const nodeD = new SamplingNode({ label: 'D', x: 10, y: 20 })
	g.addNode(nodeA)
	g.addNode(nodeB)
	g.addNode(nodeC)
	g.addNode(nodeD)

	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeA.id, target: nodeB.id },
			isDirected: true,
		}),
	)

	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeA.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeB.id, target: nodeD.id },
			isDirected: true,
		}),
	)
	g.addEdge(
		new SamplingEdge({
			nodes: { source: nodeC.id, target: nodeD.id },
			isDirected: true,
		}),
	)

	return g
}

const ABCDGraph = () => {
	const [graph] = useState(() => createGraph())
	const [showGuide, setShowGuide] = useState(false)
	const [guidePosition, setGuidePosition] = useState<{ x?: number; y?: number }>({})
	const [nodeEventListeners, setNodeEventListeners] = useState<
		ComponentProps<typeof GraphView>['nodeEventListeners']
	>([])

	useMountEffect(() => {
		setTimeout(() => {
			const nodeA = document.querySelector<SVGGElement>(`g#node-${graph.nodes[0].id}`)
			if (!nodeA) return

			const nodeABBox = nodeA.getBBox()
			setGuidePosition({ x: nodeABBox.x + nodeABBox.width / 2, y: nodeABBox.y })
			setShowGuide(true)
			nodeA.classList.add('highlighted-guide')

			setNodeEventListeners([
				[
					'mousedown',
					() => {
						nodeA?.classList.remove('highlighted-guide')
						setShowGuide(false)
						// Remove listener
						setNodeEventListeners([])
					},
				],
				[
					'touchstart',
					() => {
						nodeA?.classList.remove('highlighted-guide')
						setShowGuide(false)
						// Remove listener
						setNodeEventListeners([])
					},
				],
			])
		}, 2000)
	})

	const pointerAction = usePointerAction(true)
	const isMobile = useMobile()

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				<GraphViewWrap>
					<StyledGraphView
						graph={graph}
						nodeEventListeners={nodeEventListeners}
						renderNodePanel={({ node, overlayProps }) => (
							<SamplingNodePanel
								// styled-components doesn't preserve generic props
								// https://github.com/styled-components/styled-components/issues/1803
								node={node as SamplingNode}
								incomingEdges={graph.getIncomingEdges(node.id)}
								parentNodes={graph.getParentNodes(node.id)}
								overlayProps={overlayProps}
							/>
						)}
					/>
					<CSSTransition in={showGuide} timeout={500} mountOnEnter appear>
						<GuideWrap x={guidePosition.x} y={guidePosition.y} aria-hidden="true">
							<GuideArrow from="right" to="bottom" width={48} height={120} />
							<GuideText>
								<BalancedText>{`${pointerAction} to view & edit distribution.`}</BalancedText>
							</GuideText>
						</GuideWrap>
					</CSSTransition>
				</GraphViewWrap>

				<StyledDivider orientation={isMobile ? 'horizontal' : 'vertical'} />
				<StyledPairGrid
					graph={graph}
					title="Pair grid showing pairwise relationships between variables. Each cell in the grid is a scatterplot for the corresponding variables pair. There is a correlation between variables A and B, A and D, B and D, and C and D."
				/>
			</StyledPanel>
		</Grid>
	)
}

export default observer(ABCDGraph)

const StyledPanel = styled(Panel)`
	margin-top: var(--adaptive-space-3);
	margin-bottom: var(--adaptive-space-3);
	padding: 0;
	height: 36rem;
	display: flex;

	${(p) => p.theme.media.mobile} {
		flex-direction: column;
		height: auto;
	}
`

const StyledDivider = styled(Divider)`
	margin: 0;

	${(p) => p.theme.media.mobile} {
		margin-left: var(--page-margin-left);
		margin-right: var(--page-margin-right);
	}
`

const GraphViewWrap = styled.div`
	position: relative;
	height: 100%;
	width: 35%;
	flex-shrink: 0;

	${(p) => p.theme.media.mobile} {
		width: 100%;
		height: 22rem;
	}
`

const StyledGraphView = styled(GraphView)`
	width: 100%;
	height: 100%;
`

const GuideWrap = styled.div<{ x?: number; y?: number }>`
	display: flex;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	pointer-events: none;

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-medium-out);

	${(p) =>
		p.x &&
		p.y &&
		`
		transform: translate(calc(-24px ${p.x > 0 ? `+ ${p.x}` : `- ${-p.x}`}px), calc(-100% ${
			p.y > 0 ? `+${p.y}` : `- ${-p.y}`
		}px));
	`}
`

const StyledPairGrid = styled(PairGrid)`
	width: 100%;
	margin: var(--space-3);

	${(p) => p.theme.media.mobile} {
		width: calc(100% - var(--space-3) * 2);
		margin-left: var(--page-margin-left);
		margin-right: var(--page-margin-right);
		height: 28rem;
	}
`

const GuideText = styled.p`
	${(p) => p.theme.text.system.small}
	color: var(--color-label);
	margin-left: var(--space-0);
	width: 8rem;
`
