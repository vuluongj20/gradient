import { AriaListBoxSectionProps, useListBoxSection } from '@react-aria/listbox'
import { useSeparator } from '@react-aria/separator'
import { SelectState } from '@react-stately/select'
import { Node } from '@react-types/shared'
import { Fragment } from 'react'
import styled from 'styled-components'

import Option from '@components/listBox/option'

interface ListBoxSectionProps extends AriaListBoxSectionProps {
	section: Node<unknown>
	state: SelectState<unknown>
	small: boolean
}

const Section = ({ section, state, small }: ListBoxSectionProps) => {
	const { itemProps, headingProps, groupProps } = useListBoxSection({
		heading: section.rendered,
		'aria-label': section['aria-label'],
	})

	const { separatorProps } = useSeparator({ elementType: 'li' })

	return (
		<Fragment>
			{section.key !== state.collection.getFirstKey() && (
				<Separator {...separatorProps} />
			)}
			<Wrap {...itemProps}>
				{section.rendered && <Title {...headingProps}>{section.rendered}</Title>}
				<Group {...groupProps}>
					{[...section.childNodes].map((node) => (
						<Option key={node.key} item={node} state={state} small={small} />
					))}
				</Group>
			</Wrap>
		</Fragment>
	)
}

export default Section

const Separator = styled.li`
	border-bottom: solid 1px ${(p) => p.theme.line};
	margin: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1]};
`
const Wrap = styled.li`
	padding: ${(p) => p.theme.space[0]} 0;
`

const Title = styled.p`
	&& {
		${(p) => p.theme.text.system.label}
	}
	color: ${(p) => p.theme.label};
	margin-left: ${(p) => p.theme.space[1]};
	margin-bottom: ${(p) => p.theme.space[0]};
`

const Group = styled.ul``
