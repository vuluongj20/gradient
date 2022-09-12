import { observer } from 'mobx-react-lite'
import { KeyboardEventHandler } from 'react'
import styled from 'styled-components'

import {
	ContinuousDistributionType,
	DiscreteDistributionType,
	DistributionType,
} from '../model/distributions/utils'
import SamplingNode from '../model/node'
import RootNodeDistributionViz from './rootViz'

import NumberField from '@components/fields/number'
import SelectField from '@components/fields/select'

type Props = {
	node: SamplingNode
	overlayOnKeyDown?: KeyboardEventHandler<HTMLDivElement>
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

const RootNodePanel = ({ node, overlayOnKeyDown }: Props) => {
	const { parameters, parameterValues, type: distributionType } = node.distribution

	return (
		<Wrap>
			<NodeDescription>
				{`${node.label} is not conditionally dependent on any variable. It will be sampled directly from the distribution below.`}
			</NodeDescription>
			<RootNodeDistributionViz node={node} />
			<SelectField
				small
				rowLayout
				onKeyDown={overlayOnKeyDown}
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

export default observer(RootNodePanel)

const Wrap = styled.div``

const NodeDescription = styled.p`
	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};
	margin-bottom: ${(p) => p.theme.space[1]};
`
