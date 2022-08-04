import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import SamplingEdge from '../model/edge'
import SamplingNode from '../model/node'

import NumberField from '@components/fields/number'

import { tl } from '@utils/text'

type Props = {
	node: SamplingNode
	incomingEdges: SamplingEdge[]
	parentNodes: SamplingNode[]
}

const letters = ['\u03B1', '\u03B2', '\u03B3', '\u03B4', '\u03B5']

const ChildNodeFields = ({ node, incomingEdges, parentNodes }: Props) => {
	const nodeDescription = tl(
		`${node.label} is a child of $1. It's sampled from a normal distribution whose mean is a {1,multiple,weighted sum} of its {1,parent's,parents'} sampled {1,value,values}.`,
		parentNodes.map((n) => n.label),
	)
	const valueFn = `${node.label} = Normal(${incomingEdges
		.map((edge, i) => {
			const parentNode = parentNodes.find((n) => n.id === edge.nodes.source)
			if (!parentNode) return ''
			return `${letters[i]}\u00b7${parentNode.label}`
		})
		.join(' + ')}, \u03c3)`

	return (
		<Wrap>
			<NodeDescription>{nodeDescription}</NodeDescription>
			<ValueFnWrap>
				<ValueFn>{valueFn}</ValueFn>
			</ValueFnWrap>

			{incomingEdges.map((edge, i) => {
				const { id, coefficient } = edge
				const parentNode = parentNodes.find((n) => n.id === edge.nodes.source)
				if (!parentNode) return null
				return (
					<NumberField
						key={id}
						small
						rowLayout
						value={coefficient}
						onChange={(val) => edge.setCoefficient(val)}
						label={letters[i]}
						description={`${parentNode.label}'s coefficient.`}
						step={0.1}
						inputWidth="4rem"
					/>
				)
			})}
			<NumberField
				small
				rowLayout
				value={node.distribution.parameterValues.sigma}
				onChange={(val) => node.distribution.setParameterValue('sigma', val)}
				label={'\u03c3'}
				description="Scale parameter (standard deviation) for normal distribution."
				step={0.1}
				inputWidth="4rem"
			/>
		</Wrap>
	)
}

export default observer(ChildNodeFields)

const Wrap = styled.div``

const NodeDescription = styled.p`
	color: ${(p) => p.theme.label};
	margin-bottom: ${(p) => p.theme.space[1]};
`

const ValueFnWrap = styled.div`
	margin: ${(p) => p.theme.space[2]} 0;
	padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[2]};
	border-left: solid 2px ${(p) => p.theme.line};
`

const ValueFn = styled.p`
	${(p) => p.theme.text.viz.body};
`
