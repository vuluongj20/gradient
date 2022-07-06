import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import {
	ContinuousDistributionType,
	DiscreteDistributionType,
	DistributionType,
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
			{Object.entries(parameters).map(([param, paramInfo]) => {
				const { displayName, description, minValue, maxValue, step } = paramInfo
				return (
					<NumberField
						key={param}
						small
						rowLayout
						value={parameterValues[param]}
						onChange={(val) => node.distribution.setParameterValue(param, val)}
						label={displayName}
						description={description}
						minValue={minValue}
						maxValue={maxValue}
						step={step ?? 1}
						inputWidth="4rem"
					/>
				)
			})}
		</Wrap>
	)
}

export default observer(NodeDistributionFields)

const Wrap = styled.div`
	margin-top: ${(p) => p.theme.space[2]};
`
