import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import {
	ContinuousDistributionType,
	DiscreteDistributionType,
	DistributionType,
	ParameterInfo,
} from '../model/distributions/types'
import SamplingNode from '../model/node'

import NumberField from '@components/fields/number'
import SelectField from '@components/fields/select'

type Props = {
	node: SamplingNode
}

const distributionOptions = [
	{
		title: 'Continuous',
		options: Object.entries(ContinuousDistributionType).map(([name, value]) => ({
			value,
			label: name,
		})),
	},
	{
		title: 'Discrete',
		options: Object.entries(DiscreteDistributionType).map(([name, value]) => ({
			value,
			label: name,
		})),
	},
]

const NodeDistributionFields = ({ node }: Props) => {
	const { parameters, parameterValues, type: distributionType } = node.distribution

	return (
		<Wrap>
			<SelectField
				small
				rowLayout
				label="Distribution"
				value={distributionType}
				onChange={(dist) => node.setDistribution(dist as DistributionType)}
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
		</Wrap>
	)
}

export default observer(NodeDistributionFields)

const Wrap = styled.div`
	margin-top: ${(p) => p.theme.space[2]};
`
