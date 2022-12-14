import { useContext, useMemo } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import { ReferencesContext } from '@components/references/provider'
import { formatReferences } from '@components/references/utils'

import IconBackRef from '@icons/backRef'

interface ReferencesProps {
	order: string[]
	citations: Record<string, string[]>
}

export const References = ({ order, citations }: ReferencesProps) => {
	const references = useContext(ReferencesContext)
	const orderedReferences = useMemo(
		() =>
			order
				.map((referenceId) => references.find((r) => r.id === referenceId))
				.filter((reference): reference is CSL.Data => !!reference),
		[order, references],
	)

	const formattedReferences = formatReferences(orderedReferences)

	return (
		<Grid>
			<ReferencesWrap>
				<ReferencesHeader>References</ReferencesHeader>
				<ReferencesList>
					{orderedReferences.map(({ id }, i) => {
						return (
							<ReferenceItem key={id} id={`reference-${id}`}>
								<ReferenceContent
									dangerouslySetInnerHTML={{ __html: formattedReferences[i] }}
								/>
								{citations[id].map((citation) => (
									<ReferenceBackRef key={citation} href={`#citation-${id}-${citation}`}>
										<IconBackRef size="xs" />
									</ReferenceBackRef>
								))}
							</ReferenceItem>
						)
					})}
				</ReferencesList>
			</ReferencesWrap>
		</Grid>
	)
}

const ReferencesWrap = styled.section`
	${(p) => p.theme.gridColumn.text}
`

const ReferencesHeader = styled.h2`
	${(p) => p.theme.text.system.h6}
	color: var(--color-label);
`

const ReferencesList = styled.ol`
	margin-top: ${(p) => p.theme.space[2]};

	${(p) => p.theme.media.xs} {
		padding-left: ${(p) => p.theme.space[3]};
	}
`

const ReferenceItem = styled.li`
	list-style-type: decimal;
	color: var(--color-label);

	&::marker {
		font-weight: 500;
	}

	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space[2]};
	}
`

const ReferenceContent = styled.span`
	b {
		font-weight: 500;
	}
	a {
		position: relative;
		color: var(--color-label);
		text-decoration: underline;
		text-decoration-color: var(--color-link-underline);

		&:hover,
		&.focus-visible {
			color: var(--color-content-link-text);
			text-decoration-color: var(--color-content-link-underline);
		}

		&::before {
			content: ' —  ';
			white-space: pre;
			display: inline-block;
			text-decoration: none;
			opacity: 0.5;
		}
	}
	br {
		margin-bottom: ${(p) => p.theme.space[0]};
	}
`

const ReferenceBackRef = styled.a`
	display: inline-flex;
	align-items: center;
	height: 1.4em;
	margin-left: ${(p) => p.theme.space[0]};
	transform: translateY(0.15em);

	color: var(--color-label);
	font-size: ${(p) => p.theme.text.system.small.fontSize};

	&:hover {
		color: var(--color-heading);
	}

	/* Prevent iOS Safari from displaying ↩ as an emoji */
	font-family: 'Hiragino Mincho ProN', sans-serif;
`
