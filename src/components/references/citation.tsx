import { useContext, useMemo } from 'react'
import styled from 'styled-components'

import { ReferencesContext } from '@components/references/provider'
import Tooltip from '@components/tooltip'

import useMountEffect from '@utils/useMountEffect'

type CitationProps = {
	id: string
	refId: string
}

export const Citation = ({ id, refId }: CitationProps) => {
	const { references, referencesOrder, registerCitation } = useContext(ReferencesContext)

	useMountEffect(() => registerCitation(refId, id))
	const reference = useMemo(
		() => references.find((ref) => ref.id === refId),
		[refId, references],
	)

	const referenceNumber = useMemo(
		() => referencesOrder.findIndex((referenceId) => referenceId === refId) + 1,
		[refId, referencesOrder],
	)

	if (!reference || referenceNumber === 0) return null

	return (
		<Tooltip
			content={
				<CitationDetails>
					<CitationTitle>{reference.title}</CitationTitle>
					<CitationDetail>
						{reference.author
							.map((author) => `${author.given.substring(0, 1)}. ${author.family}`)
							.join(', ')}
					</CitationDetail>
					<CitationDetail>{[reference.containerTitle, reference.year]}</CitationDetail>
				</CitationDetails>
			}
			maxWidth="20rem"
			renderWrapperAsSpan
			delay={0}
			offset={6}
		>
			{(tooltipProps) => (
				<CitationLink
					{...tooltipProps}
					id={`citation-${refId}-${id}`}
					href={`#reference-${refId}`}
				>
					<sup>[{referenceNumber}]</sup>
				</CitationLink>
			)}
		</Tooltip>
	)
}

const CitationLink = styled.a`
	${(p) => p.theme.text.content.body}
	font-style: italic;
`

const CitationDetails = styled.div`
	text-align: left;
	padding: ${(p) => p.theme.space[0]};
`

const CitationTitle = styled.p`
	font-weight: 500;
	color: ${(p) => p.theme.heading};
`

const CitationDetail = styled.p`
	color: ${(p) => p.theme.label};
`
