import { Fragment, useContext, useMemo } from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import { Reference, ReferencesContext } from '@components/references/provider'
import SectionDivider from '@components/sectionDivider'

export const References = () => {
	const { references, referencesOrder, registeredCitations } =
		useContext(ReferencesContext)

	const orderedReferences = useMemo(
		() =>
			referencesOrder
				.map((refId) => references.find((ref) => ref.id === refId))
				.filter((ref): ref is Reference => !!ref),
		[references, referencesOrder],
	)

	if (orderedReferences.length === 0) return null

	return (
		<Fragment>
			<SectionDivider />
			<Grid>
				<ReferencesWrap>
					<ReferencesHeader>References</ReferencesHeader>
					<ReferencesList>
						{orderedReferences.map((reference) => (
							<ReferenceItem key={reference.id} id={`reference-${reference.id}`}>
								<ReferenceTitle>
									{reference.title}
									{registeredCitations[reference.id]?.map((citationId) => (
										<ReferenceBackRef
											key={citationId}
											href={`#citation-${reference.id}-${citationId}`}
										>
											&#8617;
										</ReferenceBackRef>
									))}
								</ReferenceTitle>
								<br />
								<ReferenceDetails>
									{reference.author
										.map((author) => `${author.family}, ${author.given.substring(0, 1)}.`)
										.join(', ')}
									,&nbsp;{reference.year}.
									{[reference.containerTitle].filter((item) => !!item).join('. ')}
								</ReferenceDetails>
							</ReferenceItem>
						))}
					</ReferencesList>
				</ReferencesWrap>
			</Grid>
		</Fragment>
	)
}

const ReferencesWrap = styled.section`
	${(p) => p.theme.gridColumn.text}
`

const ReferencesHeader = styled.h2`
	${(p) => p.theme.text.system.h6}
	color: ${(p) => p.theme.label};
`

const ReferencesList = styled.ol`
	margin-top: ${(p) => p.theme.space[2]};

	${(p) => p.theme.media.xs} {
		padding-left: ${(p) => p.theme.space[3]};
	}
`

const ReferenceItem = styled.li`
	list-style-type: decimal;
	color: ${(p) => p.theme.label};

	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space[2]};
	}
`

const ReferenceTitle = styled.span`
	display: inline-block;
	font-weight: 500;
`

const ReferenceBackRef = styled.a`
	display: inline-block;
	color: ${(p) => p.theme.label};
	padding-left: ${(p) => p.theme.space[0]};
	font-size: ${(p) => p.theme.text.system.small.fontSize};

	/* Prevent iOS Safari from displaying ↩ as an emoji */
	font-family: 'Hiragino Mincho ProN', sans-serif;
`

const ReferenceDetails = styled.span`
	display: inline-block;
	margin-top: ${(p) => p.theme.space[0]};
`
