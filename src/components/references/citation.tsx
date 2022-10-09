import { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { ReferencesContext } from '@components/references/provider'
import { formatReferences } from '@components/references/utils'
import Tooltip from '@components/tooltip'

type CitationProps = {
	id: string
	referenceId: string
	referenceNumber: number
}

export const Citation = ({ id, referenceNumber, referenceId }: CitationProps) => {
	const references = useContext(ReferencesContext)
	const reference = useMemo(
		() => references.find((reference) => reference.id === referenceId),
		[references, referenceId],
	)

	if (!reference) {
		return null
	}

	const formattedReference = formatReferences([reference])[0]

	return (
		<Tooltip
			content={<CitationText dangerouslySetInnerHTML={{ __html: formattedReference }} />}
			maxWidth="28rem"
			renderWrapperAsSpan
			renderOverlayAsSpan
			delay={0}
			offset={4}
		>
			{(tooltipProps) => (
				<CitationLink
					{...tooltipProps}
					id={`citation-${referenceId}-${id}`}
					href={`#reference-${referenceId}`}
				>
					<SuperScript>[{referenceNumber}]</SuperScript>
				</CitationLink>
			)}
		</Tooltip>
	)
}

const CitationLink = styled.a`
	${(p) => p.theme.text.content.body}
	font-style: italic;
`

const CitationText = styled.span`
	${(p) => p.theme.text.system.body};
	display: block;
	text-align: left;
	padding: ${(p) => p.theme.space[1]};

	b {
		display: inline-block;
		margin-bottom: ${(p) => p.theme.space[0]};
		color: ${(p) => p.theme.heading};
		font-weight: 500;
	}
`

const SuperScript = styled.sup`
	vertical-align: top;
	position: relative;
	top: -0.1em;
`
