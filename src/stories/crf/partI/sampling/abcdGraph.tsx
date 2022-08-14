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

	const nodeA = new SamplingNode({ label: 'A', x: -40, y: -20 })
	const nodeB = new SamplingNode({ label: 'B', x: 40, y: -20 })
	const nodeC = new SamplingNode({ label: 'C', x: -40, y: 20 })
	const nodeD = new SamplingNode({ label: 'D', x: 40, y: 20 })
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
			nodeA.classList.add('highlighted')

			setNodeEventListeners([
				[
					'mousedown',
					() => {
						nodeA?.classList.remove('highlighted')
						setShowGuide(false)
						// Remove listener
						setNodeEventListeners([])
					},
				],
				[
					'touchstart',
					() => {
						nodeA?.classList.remove('highlighted')
						setShowGuide(false)
						// Remove listener
						setNodeEventListeners([])
					},
				],
			])
		}, 3000)
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
						renderNodePanel={(node, overlayProps) => (
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
					<CSSTransition in={showGuide} timeout={500} unmountOnExit mountOnEnter appear>
						<GuideWrap x={guidePosition.x} y={guidePosition.y}>
							<GuideArrow from="right" to="bottom" width={48} height={120} />
							<GuideText>
								<BalancedText>{`${pointerAction} to view & edit distribution.`}</BalancedText>
							</GuideText>
						</GuideWrap>
					</CSSTransition>
				</GraphViewWrap>

				<StyledDivider orientation={isMobile ? 'horizontal' : 'vertical'} />
				<StyledPairGrid graph={graph} />
			</StyledPanel>
		</Grid>
	)
}

export default observer(ABCDGraph)

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.space.marginVertical[3]}
	height: 36rem;
	display: flex;

	${(p) => p.theme.utils.media.mobile} {
		${(p) => p.theme.utils.space.paddingVertical[6]}
		flex-direction: column;
		height: auto;
	}
`

const StyledDivider = styled(Divider)`
	margin: 0 ${(p) => p.theme.space[3]};

	${(p) => p.theme.utils.media.mobile} {
		margin: ${(p) => p.theme.space[3]} 0;
	}
`

const GraphViewWrap = styled.div`
	position: relative;
	height: 100%;
	width: 30%;
	flex-shrink: 0;

	${(p) => p.theme.utils.media.mobile} {
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

	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.mediumOut};

	&.enter-active,
	&.enter-done {
		opacity: 1;
	}
	&.exit-active {
		opacity: 0;
	}

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

	${(p) => p.theme.utils.media.mobile} {
		height: 28rem;
	}
`

const GuideText = styled.p`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
	margin-left: ${(p) => p.theme.space[0]};
	width: 8rem;
`
