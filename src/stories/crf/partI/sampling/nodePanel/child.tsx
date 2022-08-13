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

const ChildNodeFields = ({ node, incomingEdges, parentNodes }: Props) => {
	const nodeDescription = tl(
		`${node.label} is conditionally depdendent on $1. It will be sampled from a normal distribution whose mean is a {1,multiple,weighted sum} of its {1,parent's, parents'} sampled {1,value,values}:`,
		parentNodes.map((n) => n.label),
	)

	const valueFn = `${node.label} ~ Normal(${incomingEdges
		.map((edge) => {
			const parentNode = parentNodes.find((n) => n.id === edge.nodes.source)
			if (!parentNode) return ''

			return `${edge.coefficient}${parentNode.label.toLowerCase()}`
		})
		.join(' + ')}, \u03c3\u00B2)`

	const valueFnDescription = tl(
		`where $1`,
		parentNodes.map((n) => `${n.label.toLowerCase()} is a sample of ${n.label}`),
	)

	return (
		<Wrap>
			<NodeDescription>{nodeDescription}</NodeDescription>
			<ValueFnWrap>
				<ValueFn>{valueFn}</ValueFn>
				<ValueFnDescription>{valueFnDescription}.</ValueFnDescription>
			</ValueFnWrap>

			{incomingEdges.map((edge) => {
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
						label={`Coefficient of ${parentNode.label.toLowerCase()}`}
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
				label={'\u03c3 – scale parameter'}
				description="Determines the normal distribution's standard deviation."
				step={0.1}
				inputWidth="4rem"
			/>
		</Wrap>
	)
}

export default observer(ChildNodeFields)

const Wrap = styled.div``

const NodeDescription = styled.p`
	${(p) => p.theme.text.system.small}
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

const ValueFnDescription = styled.small`
	${(p) => p.theme.text.system.small};
`
