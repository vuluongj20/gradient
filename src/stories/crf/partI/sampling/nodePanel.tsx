import { observer } from 'mobx-react-lite'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import {
	ContinuousDistribution,
	DiscreteDistribution,
	Distribution,
	ParameterInfo,
} from './distributions/types'
import SamplingNode from './node'

import NumberField from '@components/fields/number'
import SelectField from '@components/fields/select'
import TypeArea from '@components/typeArea'

type Props = {
	node: SamplingNode
	overlayProps: HTMLAttributes<HTMLDivElement>
}

const distributionOptions = [
	{
		title: 'Continuous',
		options: Object.entries(ContinuousDistribution).map(([name, value]) => ({
			value,
			label: name,
		})),
	},
	{
		title: 'Discrete',
		options: Object.entries(DiscreteDistribution).map(([name, value]) => ({
			value,
			label: name,
		})),
	},
]

const SamplingNodePanel = ({ node, overlayProps }: Props) => {
	const { parameters, parameterValues, type: distributionType } = node.distribution

	return (
		<Wrap type="system" {...overlayProps}>
			<NodeLabel>{node.label}</NodeLabel>
			<NodeDesciption>
				This is a root node. When sampled, it&apos;s value comes from a probability
				didtribution.
			</NodeDesciption>
			<Fields>
				<SelectField
					small
					rowLayout
					label="Distribution"
					value={distributionType}
					onChange={(dist) => node.setDistribution(dist as Distribution)}
					options={distributionOptions}
				/>
				{(Object.entries(parameters) as [keyof typeof parameters, ParameterInfo][]).map(
					([param, paramInfo]) => (
						<NumberField
							key={param}
							small
							rowLayout
							value={parameterValues[param]}
							onChange={(val) => node.distribution.setParameterValue(param, val)}
							label={paramInfo.displayName}
							description={paramInfo.description}
							minValue={paramInfo.minValue}
							maxValue={paramInfo.maxValue}
							step={paramInfo.maxValue && paramInfo.maxValue <= 1 ? 0.1 : 1}
							inputWidth="4rem"
						/>
					),
				)}
			</Fields>
		</Wrap>
	)
}

export default observer(SamplingNodePanel)

const Wrap = styled(TypeArea)`
	width: 20rem;
`

const NodeLabel = styled.h2`
	&& {
		${(p) => p.theme.text.system.h6};
	}
	border-bottom: solid 1px ${(p) => p.theme.line};
	padding-bottom: ${(p) => p.theme.space[0]};
	margin-bottom: ${(p) => p.theme.space[1]};
`

const NodeDesciption = styled.p`
	color: ${(p) => p.theme.label};
`

const Fields = styled.div`
	margin-top: ${(p) => p.theme.space[2]};
`
