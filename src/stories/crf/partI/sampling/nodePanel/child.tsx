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
		'This node has {1,one,two,#} {1,parent,parents}: $1. Its value is a {1,multiple,weighted sum} of that of its {1,parent,parents}.',
		parentNodes.map((n) => n.label),
	)
	const valueFn = `${node.label} = ${incomingEdges
		.map((edge, i) => {
			const parentNode = parentNodes.find((n) => n.id === edge.nodes.source)
			if (!parentNode) return ''
			return `${letters[i]}\u00b7${parentNode.label}`
		})
		.join(' + ')} + \u03b5`
	const valueFnDetails = tl(
		'where $1 {1,is a,are} {1,coefficient,coefficients} and \u03b5 is an error term.',
		letters
			.slice(0, incomingEdges.length)
			.map((letter) => <NodeLabelSpan key={letter}>{letter}</NodeLabelSpan>),
	)
	const fieldsDescription = tl(
		'Mutable values:',
		parentNodes.map((n) => n.label),
	)

	return (
		<Wrap>
			<NodeDescription>{nodeDescription}</NodeDescription>
			<ValueFnWrap>
				<ValueFn>{valueFn}</ValueFn>
				<ValueFnDetails>{valueFnDetails}</ValueFnDetails>
			</ValueFnWrap>
			<FieldsDescription>{fieldsDescription}</FieldsDescription>
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
						step={0.1}
						inputWidth="4rem"
					/>
				)
			})}
			<NumberField
				small
				rowLayout
				value={node.errorDistribution.parameterValues.sigma}
				onChange={(val) => node.errorDistribution.setParameterValue('sigma', val)}
				label={'\u03b5 scale parameter'}
				description="Scale parameter in normal distribution used to model error term."
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
	padding: ${(p) => p.theme.space[1]};
	border-top: solid 1px ${(p) => p.theme.line};
	border-bottom: solid 1px ${(p) => p.theme.line};
	text-align: center;
`

const ValueFn = styled.p`
	${(p) => p.theme.text.viz.body};
	font-weight: 500;
`

const ValueFnDetails = styled.p`
	color: ${(p) => p.theme.label};
`

const NodeLabelSpan = styled.span`
	${(p) => p.theme.text.viz.body};
`

const FieldsDescription = styled(NodeDescription)`
	margin-bottom: 0;
`
