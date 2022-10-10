import { Fragment, useContext, useMemo } from 'react'
import styled from 'styled-components'

import Divider from '@components/divider'
import { ReferencesContext } from '@components/references/provider'
import { formatReferences } from '@components/references/utils'
import Tooltip from '@components/tooltip'

type CitationProps = {
	citeItems: {
		id: string
		referenceId: string
		referenceNumber: number
		suppressAuthor?: boolean
		prefix?: string
		suffix?: string
	}[]
}

export const Citation = ({ citeItems }: CitationProps) => {
	const references = useContext(ReferencesContext)

	const citedReferences = useMemo(
		() =>
			citeItems
				.map(({ referenceId }) =>
					references.find((reference) => reference.id === referenceId),
				)
				.filter((reference): reference is CSL.Data => !!reference),
		[references, citeItems],
	)

	const formattedReferences = formatReferences(citedReferences)

	return (
		<Tooltip
			content={formattedReferences.map((formattedText, i) => (
				<Fragment key={i}>
					<CitationText dangerouslySetInnerHTML={{ __html: formattedText }} />
					{i < formattedReferences.length - 1 && <StyledDivider />}
				</Fragment>
			))}
			maxWidth="28rem"
			renderWrapperAsSpan
			renderOverlayAsSpan
			delay={0}
			offset={4}
		>
			{(tooltipProps) => (
				<Wrap {...tooltipProps}>
					{citeItems.length > 1 ? (
						citeItems.map(({ id, referenceId, referenceNumber }, i) => (
							<CitationLink
								key={referenceId}
								id={`citation-${referenceId}-${id}`}
								href={`#reference-${referenceId}`}
							>
								{i === 0 && '['}
								{i > 0 && i < citeItems.length ? ' ' : ''}
								{referenceNumber}
								{i < citeItems.length - 1 ? ',' : ']'}
							</CitationLink>
						))
					) : (
						<CitationLink
							id={`citation-${citeItems[0].referenceId}-${citeItems[0].id}`}
							href={`#reference-${citeItems[0].referenceId}`}
						>
							[{citeItems[0].referenceNumber}]
						</CitationLink>
					)}
				</Wrap>
			)}
		</Tooltip>
	)
}

const Wrap = styled.sup`
	font-style: italic;
	vertical-align: top;
	position: relative;
	top: -0.1em;
	white-space: nowrap;
`

const CitationLink = styled.a`
	font-family: inherit;

	&:hover,
	&:target,
	&.focus-visible {
		color: ${(p) => p.theme.primaryLinkText};
		text-decoration-color: ${(p) => p.theme.primaryLinkUnderline};
	}
`

const CitationText = styled.span`
	${(p) => p.theme.text.system.body};
	display: block;
	text-align: left;
	margin: ${(p) => p.theme.space[0.5]};

	b {
		display: inline-block;
		margin-bottom: ${(p) => p.theme.space[0]};
		color: ${(p) => p.theme.heading};
		font-weight: 500;
	}
`

const StyledDivider = styled(Divider)`
	margin: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[0.5]};
`
