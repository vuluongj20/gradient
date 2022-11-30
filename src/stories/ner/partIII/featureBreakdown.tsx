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
			<BreakdownWrap overlay>
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
						<TableHeader>
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
						</TableHeader>
						<TableBody>
							{sortedFeatureBreakdown.map(({ feature, tag, weight, value }) => (
								<TR key={feature + tag} inactive={value === 0}>
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
								</TR>
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
						<TableFooter>
							<TR aria-hidden="true">
								<TH align="right" colSpan={3}>
									SUM(&#955;<sub>a</sub>f<sub>a</sub>)
								</TH>
								<TD align="right">{toFixedUnlessZero(sum ?? 0, decimalPlaces)}</TD>
							</TR>
						</TableFooter>
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
			<StyledPanel overlay gridColumn="wide">
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
								onChange={setWord}
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
	${(p) => p.theme.marginVertical[3]}
`

const StyledPanel = styled(Panel)`
	max-width: 48rem;
	overflow: hidden;

	${(p) => p.theme.media.mobile} {
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
	border-radius: ${(p) => p.theme.radii.m};

	padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]};
	margin-bottom: ${(p) => p.theme.space[1]};

	input,
	button,
	span {
		text-align: center;
		${(p) => p.theme.text.viz.body};
	}

	${(p) => p.theme.paddingHorizontalMobile}
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

	margin-right: ${(p) => p.theme.space[4]};
`

const StyledGuideArrow = styled(GuideArrow)`
	margin: ${(p) => p.theme.space[0]};
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
	padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]}
		${(p) => p.theme.space[4]};
	background: ${(p) => p.theme.oBackground};
	${(p) => p.theme.paddingHorizontalMobile}
`

const StyledPopoverArrow = styled(PopoverArrow)`
	top: 0;
	left: calc(50% + 3.75em);
	background: ${(p) => p.theme.background};
`

const BreakdownHeader = styled.div`
	position: relative;
	margin-bottom: ${(p) => p.theme.space[2]};
`

const BreakdownHeading = styled.p`
	${(p) => p.theme.text.system.h6};
	margin-bottom: ${(p) => p.theme.space[0]};
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
	color: ${(p) => p.theme.label};

	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.vFastOut};
`

const BreakdownContent = styled.div`
	position: relative;
`

const BreakdownTable = styled.table<{ visible: boolean }>`
	width: calc(100% + ${(p) => p.theme.space[1.5]} * 2);
	transform: translateX(-${(p) => p.theme.space[1.5]});
	border-spacing: 0;

	opacity: ${(p) => (p.visible ? 1 : 0)};
	transition: opacity ${(p) => p.theme.animation.fastOut};

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

	${(p) => p.theme.media.mobile} {
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

const TR = styled.tr<{ inactive?: boolean }>`
	${(p) => p.inactive && `color: ${p.theme.label};`}

	tbody > &:last-of-type {
		color: ${(p) => p.theme.label};
		opacity: 0.75;
	}

	tfoot > & {
		td,
		th {
			padding-top: ${(p) => p.theme.space[2]};
		}
	}

	/* Row background */
	&:nth-of-type(2n) > th,
	&:nth-of-type(2n) > td {
		position: relative;
		z-index: 1;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: ${(p) => p.theme.iiBackground};
			z-index: -1;
			transition: background-color ${(p) => p.theme.animation.fastOut};
		}

		&:first-child::before {
			border-top-left-radius: ${(p) => p.theme.radii.s};
			border-bottom-left-radius: ${(p) => p.theme.radii.s};
		}
		&:last-child::before {
			border-top-right-radius: ${(p) => p.theme.radii.s};
			border-bottom-right-radius: ${(p) => p.theme.radii.s};
		}
	}
`

const TH = styled.th<{ align?: 'left' | 'right' }>`
	font-weight: 400;
	padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1.5]};
	${(p) => p.align && `text-align: ${p.align};`}

	& > span {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`

const TD = styled.td<{ align?: 'left' | 'right' }>`
	font-weight: 400;
	padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1.5]};
	${(p) => p.align && `text-align: ${p.align};`}
`

const TableHeader = styled.thead`
	th {
		color: ${(p) => p.theme.label};
		border-bottom: solid 1px ${(p) => p.theme.iLine};
	}
`

const TableBody = styled.tbody`
	${(p) => p.theme.text.viz.body}
	& > tr:first-of-type > th,
	& > tr:first-of-type > td {
		padding-top: ${(p) => p.theme.space[1]};
	}
`

const TableFooter = styled.tfoot`
	th {
		color: ${(p) => p.theme.label};
		font-weight: 500;
	}
	td {
		${(p) => p.theme.text.viz.body}
		color: ${(p) => p.theme.heading};
		font-weight: 500;
	}
`

const ProbabilityCalculation = styled.p<{ visible: boolean }>`
	display: flex;
	justify-content: center;
	padding-top: ${(p) => p.theme.space[3]};
	margin-top: ${(p) => p.theme.space[2]};
	border-top: solid 1px ${(p) => p.theme.iLine};

	font-weight: 600;
	font-variant-numeric: tabular-nums;
	letter-spacing: 0.025em;
	white-space: nowrap;
	color: ${(p) => p.theme.heading};

	opacity: ${(p) => (p.visible ? 1 : 0)};
	transition: opacity ${(p) => p.theme.animation.fastOut};
`

const ProbabilityCalculationLeftWrap = styled.span`
	display: flex;
	justify-content: end;
	color: ${(p) => p.theme.heading};
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
	background: ${(p) => p.theme.background};
	border: dashed 1px ${(p) => p.theme.oLine};
	border-radius: ${(p) => p.theme.radii.m};
	padding: ${(p) => p.theme.space[2]};

	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.vFastOut};
`

const NoObservationMessage = styled.p`
	${(p) => p.theme.text.system.small};
	color: ${(p) => p.theme.label};
	text-align: center;
	max-width: 28em;
`
