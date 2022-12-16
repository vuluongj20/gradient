import { useEffect, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { nameTags } from '../constants'
import http from '../http'

import BalancedText from '@components/balancedText'
import SelectField from '@components/fields/select'
import TextField from '@components/fields/text'
import Grid from '@components/grid'
import GuideArrow from '@components/guideArrow'
import Panel from '@components/panel'
import PopoverArrow from '@components/popoverArrow'
import Spinner from '@components/spinner'
import { TD, TH, TR, Table, TableBody, TableFoot, TableHead } from '@components/table'

import { debounce, isDev, makeCancelable, toFixedUnlessZero } from '@utils/functions'
import useMobile from '@utils/useMobile'

const tagOptions = nameTags.map((tag) => ({ value: tag, label: tag }))

const ENDPOINT = '/memm/breakdown'
const featureNameSortOrder = [
	'word',
	'shape',
	'lowercase',
	'is_title_case',
	'is_uppercase',
	'is_digit',
	'is_not_title_case',
	'is_not_uppercase',
	'is_not_digit',
]

type NameTag = typeof nameTags[number]
type FeatureBreakdown = Array<{
	feature: string
	tag: string
	value: number
	weight: number
}>
type Breakdown = {
	features: Partial<Record<NameTag, FeatureBreakdown>>
	sums: Partial<Record<NameTag, number>>
	probabilities: Partial<Record<NameTag, number>>
	z: string | number
}

const MEMMFeatureBreakdown = () => {
	const [prevTag, setPrevTag] = useState<NameTag>('O')
	const [currentTag, setCurrentTag] = useState<NameTag>('B-LOC')
	const [word, setWord] = useState('UK')
	const [usedWord, setUsedWord] = useState('UK')

	const [breakdown, setBreakdown] = useState<Breakdown>({
		features: {},
		sums: {},
		probabilities: {},
		z: 1,
	})
	const [loading, setLoading] = useState(true)
	const [initialized, setInitialized] = useState(false)
	const [pendingRequest, setPendingRequest] =
		useState<ReturnType<typeof makeCancelable>>()

	const debouncedUpdateBreakdown = useMemo(
		() =>
			debounce<[{ word: string; prevTag: NameTag }]>(({ word, prevTag }) => {
				// Cancel any pending requests, we only want results from the latest one
				if (pendingRequest) {
					pendingRequest.cancel()
				}

				const cancelable = makeCancelable(
					http.post<Breakdown>(ENDPOINT, { word, prevTag }),
				)

				cancelable.promise
					.then((response) => {
						setLoading(false)
						setInitialized(true)

						if (response.status === 200) {
							setBreakdown(response.data)
							setUsedWord(word)
						}
					})
					.catch((reason: { isCanceled: boolean }) => {
						if (reason.isCanceled) return
						console.warn(reason)
					})

				setPendingRequest(cancelable)
			}, 500),
		[pendingRequest],
	)

	useEffect(() => {
		if (isDev) return
		debouncedUpdateBreakdown({ word, prevTag })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [word, prevTag])

	const sortedFeatureBreakdown = useMemo(() => {
		const currentTagBreakdown = breakdown.features[currentTag]
		if (!currentTagBreakdown) {
			return []
		}

		function sortGroup(group: FeatureBreakdown) {
			return group.sort((a, b) => {
				return (
					featureNameSortOrder.findIndex((s) => s === a.feature.split('==')[0]) -
					featureNameSortOrder.findIndex((s) => s === b.feature.split('==')[0])
				)
			})
		}

		return [
			sortGroup(currentTagBreakdown.filter((entry) => entry.value === 1)),
			sortGroup(currentTagBreakdown.filter((entry) => entry.value === 0)),
		].flat()
	}, [breakdown, currentTag])

	const isMobile = useMobile()
	const decimalPlaces = useMemo(() => (isMobile ? 2 : 3), [isMobile])
	const sum = useMemo(() => breakdown.sums[currentTag], [breakdown, currentTag])

	const breakdownContent = useMemo(
		() => (
			<BreakdownWrap raised>
				<StyledPopoverArrow size="l" />
				<BreakdownHeader>
					<BreakdownHeading>
						Calculating P<sub>{prevTag}</sub>({currentTag} | &apos;{usedWord}&apos;)
					</BreakdownHeading>
					<BreakdownDescription>
						<BalancedText>
							{`With weights retrieved from a MEMM trained on CoNLL-2003 data. Numbers are rounded to ${decimalPlaces} decimal places for clarity.`}
						</BalancedText>
					</BreakdownDescription>
					<CSSTransition
						in={!isDev && (!initialized || loading)}
						timeout={125}
						unmountOnExit
						appear
					>
						<LoadingSpinner
							label="Loading feature breakdown"
							diameter={16}
							strokeWidth={2}
						/>
					</CSSTransition>
				</BreakdownHeader>
				<BreakdownContent>
					<BreakdownTable visible={initialized && !loading && !!sum}>
						<colgroup>
							<col span={1} />
							<col span={1} />
							<col span={1} />
							<col span={1} />
						</colgroup>
						<TableHead>
							<TR>
								<TH scope="column" id="memm_feature_breakdown_header">
									Feature-State Pair (a)
								</TH>
								<TH scope="column" align="right">
									&#955;<sub>a</sub>
								</TH>
								<TH scope="column" align="right">
									f<sub>a</sub>
								</TH>
								<TH scope="column" align="right">
									&#955;<sub>a</sub>f<sub>a</sub>
								</TH>
							</TR>
						</TableHead>
						<TableBody>
							{sortedFeatureBreakdown.map(({ feature, tag, weight, value }) => (
								<BreakdownTR key={feature + tag} inactive={value === 0}>
									<TH headers="memm_feature_breakdown_header" scope="row">
										<span>
											{feature} <LongEm>-</LongEm> {tag}
										</span>
									</TH>
									<TD align="right">{toFixedUnlessZero(weight, decimalPlaces)}</TD>
									<TD align="right">{value}</TD>
									<TD align="right">
										{toFixedUnlessZero(value * weight, decimalPlaces)}
									</TD>
								</BreakdownTR>
							))}
							{new Array(8 - sortedFeatureBreakdown.length).fill(0).map((_, index) => (
								<TR aria-hidden="true" key={index}>
									<TH headers="memm_feature_breakdown_header">……</TH>
									<TD align="right">…</TD>
									<TD align="right">…</TD>
									<TD align="right">…</TD>
								</TR>
							))}
							<TR aria-hidden="true">
								<TH headers="memm_feature_breakdown_header">……</TH>
								<TD align="right">…</TD>
								<TD align="right">…</TD>
								<TD align="right">…</TD>
							</TR>
						</TableBody>
						<BreakdownTableFoot>
							<TR aria-hidden="true">
								<TH align="right" colSpan={3}>
									SUM(&#955;<sub>a</sub>f<sub>a</sub>)
								</TH>
								<TD align="right">{toFixedUnlessZero(sum ?? 0, decimalPlaces)}</TD>
							</TR>
						</BreakdownTableFoot>
					</BreakdownTable>
					<ProbabilityCalculation visible={initialized && !loading && !!sum}>
						<ProbabilityCalculationLeftWrap>
							<span>
								P<sub>{prevTag}</sub>({currentTag} | &apos;{usedWord}&apos;)&nbsp;
							</span>
						</ProbabilityCalculationLeftWrap>
						<ProbabilityCalculationRightWrap>
							= e
							<sup>
								SUM(&#955;<sub>a</sub>f<sub>a</sub>)
							</sup>
							&nbsp; / Z
							<br />≈ e<sup>{toFixedUnlessZero(sum ?? 0, decimalPlaces)}</sup> /{' '}
							{toFixedUnlessZero(+breakdown.z ?? 0, decimalPlaces)}
							<br />
							≈&nbsp;
							<ProbabilityCalculationResult>
								{toFixedUnlessZero(breakdown.probabilities[currentTag] ?? 0, 3)}
							</ProbabilityCalculationResult>
						</ProbabilityCalculationRightWrap>
					</ProbabilityCalculation>
					<CSSTransition in={initialized && !sum} timeout={250} unmountOnExit appear>
						<NoObservationWrap>
							<NoObservationMessage>
								<BalancedText>
									{`The transition from ${prevTag} to ${currentTag} never occurred in the train set, so no applicable feature-state pair was found. The transition probability is 0.`}
								</BalancedText>
							</NoObservationMessage>
						</NoObservationWrap>
					</CSSTransition>
				</BreakdownContent>
			</BreakdownWrap>
		),
		[
			breakdown,
			sortedFeatureBreakdown,
			sum,
			prevTag,
			currentTag,
			usedWord,
			initialized,
			loading,
			decimalPlaces,
		],
	)

	const textFieldSize = useMemo(() => Math.max(word.length, 2), [word])
	return (
		<Wrap noPaddingOnMobile>
			<StyledPanel raised gridColumn="wide">
				<InputWrap>
					<PrevTagWrap>
						<SelectWrap>
							<SelectField
								small
								skipFieldWrapper
								value={prevTag}
								options={tagOptions}
								onChange={setPrevTag}
								aria-label="Previous name tag"
							/>
						</SelectWrap>
						<StyledGuideArrow from="left" to="right" strokeWidth="2" height={16} />
					</PrevTagWrap>
					<CurrentTagWrap>
						<SelectWrap>
							<SelectField
								small
								skipFieldWrapper
								value={currentTag}
								options={tagOptions}
								onChange={setCurrentTag}
								aria-label="Current name tag"
							/>
						</SelectWrap>
						<StyledGuideArrow from="bottom" to="top" strokeWidth="2" width={16} />
						<WordInputWrap>
							<TextField
								small
								skipFieldWrapper
								value={word}
								onChange={(word) => setWord(word.replace(' ', ''))}
								size={textFieldSize}
								aria-label="Current word"
							/>
						</WordInputWrap>
					</CurrentTagWrap>
				</InputWrap>
				{breakdownContent}
			</StyledPanel>
		</Wrap>
	)
}

export default MEMMFeatureBreakdown

const Wrap = styled(Grid)`
	margin-top: var(--adaptive-space-3);
	margin-bottom: var(--adaptive-space-3);
`

const StyledPanel = styled(Panel)`
	overflow: hidden;

	${(p) => p.theme.breakpoints.mobile} {
		padding-left: 0;
		padding-right: 0;
	}
`

const LongEm = styled.span`
	display: inline-block;
	text-align: center;
	transform: scaleX(2);
`

const InputWrap = styled.div`
	display: flex;
	align-items: start;
	justify-content: center;
	border-radius: var(--border-radius-m);

	padding: var(--space-3) var(--space-4);
	margin-bottom: var(--space-1);

	input,
	button,
	span {
		text-align: center;
		${(p) => p.theme.text.viz.body};
	}

	${(p) => p.theme.breakpoints.mobile} {
		padding-left: var(--page-margin-left);
		padding-right: var(--page-margin-right);
	}
`

const PrevTagWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

const CurrentTagWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-right: var(--space-4);
`

const StyledGuideArrow = styled(GuideArrow)`
	margin: var(--space-0);
`

const SelectWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: inherit;
	min-width: 6em;
`

const WordInputWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 0;
`

const BreakdownWrap = styled(Panel)`
	position: relative;
	border-left: 0;
	border-right: 0;
	border-bottom: 0;
	border-radius: 0;
	padding: var(--space-3) var(--space-4) var(--space-4);
	background: var(--color-background-raised);

	${(p) => p.theme.breakpoints.mobile} {
		padding-left: var(--page-margin-left);
		padding-right: var(--page-margin-right);
	}
`

const StyledPopoverArrow = styled(PopoverArrow)`
	top: 0;
	left: calc(50% + 3.75em);
	background: var(--color-background);
`

const BreakdownHeader = styled.div`
	position: relative;
	margin-bottom: var(--space-2);
`

const BreakdownHeading = styled.p`
	${(p) => p.theme.text.system.h6};
	margin-bottom: var(--space-0);
`

const BreakdownDescription = styled.small`
	display: block;
	max-width: 24rem;
`

const LoadingSpinner = styled(Spinner)`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	color: var(--color-label);

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-v-fast-out);
`

const BreakdownContent = styled.div`
	position: relative;
`

const BreakdownTable = styled(Table)<{ visible: boolean }>`
	opacity: ${(p) => (p.visible ? 1 : 0)};
	transition: opacity var(--animation-fast-out);

	tbody {
		${(p) => p.theme.text.viz.body}
	}

	tbody > tr:last-of-type {
		color: var(--color-label);
		opacity: 0.75;
	}

	tfoot > & {
		td,
		th {
			padding-top: var(--space-2);
		}
	}

	colgroup {
		col:nth-child(1) {
			width: calc(70% - 8em);
		}
		col:nth-child(2) {
			width: 6em;
		}
		col:nth-child(3) {
			width: 6em;
		}
		col:nth-child(4) {
			width: 6em;
		}
	}

	${(p) => p.theme.breakpoints.mobile} {
		colgroup {
			col:nth-child(1) {
				width: calc(100% - 12em);
			}
			col:nth-child(2) {
				width: 4em;
			}
			col:nth-child(3) {
				width: 4em;
			}
			col:nth-child(4) {
				width: 4em;
			}
		}
	}
`

const BreakdownTableFoot = styled(TableFoot)`
	th {
		color: var(--color-label);
		font-weight: 500;
	}
	td {
		${(p) => p.theme.text.viz.body}
		color: var(--color-heading);
		font-weight: 500;
	}
`

const BreakdownTR = styled(TR)<{ inactive?: boolean }>`
	${(p) => p.inactive && `color: var(--color-label);`}
`

const ProbabilityCalculation = styled.p<{ visible: boolean }>`
	display: flex;
	justify-content: center;
	padding-top: var(--space-3);
	margin-top: var(--space-2);
	border-top: solid 1px var(--color-line);

	font-weight: 600;
	font-variant-numeric: tabular-nums;
	letter-spacing: 0.025em;
	white-space: nowrap;
	color: var(--color-heading);

	opacity: ${(p) => (p.visible ? 1 : 0)};
	transition: opacity var(--animation-fast-out);
`

const ProbabilityCalculationLeftWrap = styled.span`
	display: flex;
	justify-content: end;
	color: var(--color-heading);
	width: 10em;
`

const ProbabilityCalculationRightWrap = styled.span`
	width: 10em;
`

const ProbabilityCalculationResult = styled.span`
	${(p) => p.theme.text.system.h5};
`

const NoObservationWrap = styled.div`
	${(p) => p.theme.spread}
	${(p) => p.theme.flexCenter};
	background: var(--color-background);
	border: dashed 1px var(--color-line);
	border-radius: var(--border-radius-m);
	padding: var(--space-2);

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-v-fast-out);
`

const NoObservationMessage = styled.p`
	${(p) => p.theme.text.system.small};
	color: var(--color-label);
	text-align: center;
	max-width: 28em;
`
