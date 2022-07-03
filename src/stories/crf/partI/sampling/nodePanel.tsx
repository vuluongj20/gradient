import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { ContinuousDistribution, DiscreteDistribution } from './distributions/types'
import SamplingNode from './node'

import Select from '@components/select'
import TypeArea from '@components/typeArea'

type Props = {
	node: SamplingNode
	overlayProps: HTMLAttributes<HTMLDivElement>
}

const SamplingNodePanel = ({ node, overlayProps }: Props) => {
	function onDistributionChange(dist) {
		console.log(dist)
	}

	return (
		<Wrap type="system" {...overlayProps}>
			<NodeLabel>{node.label}</NodeLabel>
			<NodeDesciption>
				This is a root node. When sampled, it&apos;s value comes from a probability
				didtribution.
			</NodeDesciption>
			<Fields>
				<Field>
					<FieldLabel>Distribution</FieldLabel>
					<Select
						name="distribution"
						label="Distribution"
						popoverProps={{ placement: 'bottom right' }}
						onChange={onDistributionChange}
						options={Object.entries(ContinuousDistribution).map(([name, value]) => ({
							value,
							label: name,
						}))}
					/>
				</Field>
			</Fields>
		</Wrap>
	)
}

export default SamplingNodePanel

const Wrap = styled(TypeArea)`
	width: 16rem;
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

const Field = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	:not(:last-child) {
		border-bottom: solid 1px ${(p) => p.theme.line};
	}
`

const FieldLabel = styled.label``
