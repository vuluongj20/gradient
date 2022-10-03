import {
	Fragment,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import styled from 'styled-components'

import Grid from '@components/grid'
import SectionDivider from '@components/sectionDivider'
import Tooltip from '@components/tooltip'

import useMountEffect from '@utils/useMountEffect'

export type Reference = {
	id: string
	title: string
	author: { family: string; given: string }[]
	year: string | number
	containerTitle?: string
	volume?: string | number
	issue?: string | number
	page?: string | number
	doi?: string
	url?: string
}

type ReferenceContext = {
	references: Reference[]
	referencesOrder: string[]
	registerReference: (refId: string) => void
}

export const ReferencesContext = createContext<ReferenceContext>([])

type ReferencesProps = { references: Reference[]; children?: ReactNode }

export const ReferencesProvider = ({ references, children }: ReferencesProps) => {
	const [referencesOrder, setReferencesOrder] = useState<string[]>([])
	const registerReference = useCallback(
		(id: string) => {
			setReferencesOrder((currentOrder) =>
				currentOrder.includes(id) ? currentOrder : [...currentOrder, id],
			)
		},
		[setReferencesOrder],
	)

	return (
		<ReferencesContext.Provider
			value={{ references, referencesOrder, registerReference }}
		>
			{children}
		</ReferencesContext.Provider>
	)
}

type CitationProps = {
	id: string
}

export const Citation = ({ id }: CitationProps) => {
	const { references, referencesOrder, registerReference } = useContext(ReferencesContext)

	useMountEffect(() => registerReference(id))
	const reference = useMemo(
		() => references.find((ref) => ref.id === id),
		[id, references],
	)
	const referenceNumber = useMemo(
		() => referencesOrder.findIndex((refId) => refId === id) + 1,
		[id, referencesOrder],
	)

	if (!reference) return null

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
				<CitationLink {...tooltipProps} id={`#citation-${id}`} href={`#reference-${id}`}>
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

export const References = () => {
	const { references, referencesOrder } = useContext(ReferencesContext)
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
									<ReferenceBackRef href={`#citation-${reference.id}`}>
										&#8617;
									</ReferenceBackRef>
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
`

const ReferenceDetails = styled.span`
	display: inline-block;
	margin-top: ${(p) => p.theme.space[0]};
`
