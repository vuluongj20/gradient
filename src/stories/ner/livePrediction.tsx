import { ChangeEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import http, { ResponseData } from './http'
import { getTokenSpaces, tokenize } from './utils'

import { Theme } from '@theme'

import Button from '@components/button'
import Grid from '@components/grid'
import Panel from '@components/panel'
import Spinner from '@components/spinner'

import IconRestart from '@icons/restart'

import { debounce, isDev, makeCancelable } from '@utils/functions'
import { fadeIn } from '@utils/style'
import useMountEffect from '@utils/useMountEffect'

const SAMPLES = [
	'The St. Louis Merchants',
	'The Green Bay Packers',
	'The Czech second city Brno',
	'Australia coach Geoff Marsh',
	'Polish brewer Zywiec',
	'South African Breweries Ltd',
	'Czech President Vaclav Havel',
	'The British government',
	'Trade and Industry Secretary Ian Lang',
	'The London-to-Boston route',
	'British Prime Minister John Major’s office',
	'New York Commodities Desk',
	'The London Stock Exchange',
	'PaineWebber analyst Marc Cohen',
	'New York Stock Exchange',
	'The elected Bangui government',
	'French-owned hotel',
	'Polish-born Pope John Paul',
	'East Timorese-born activist Jose Ramos Horta',
	'The Indonesian ambassador to Norway',
	"Suu Kyi's National League for Democracy",
	'Director of the WTO secretariat',
	'Canadian Grain Commission',
	'Chicago Board of Trade',
]

enum MODEL {
	HMM = 'hmm',
	MEMM = 'memm',
	CRF = 'crf',
}

const MODEL_LABELS = {
	[MODEL.HMM]: 'Hidden Markov Model',
	[MODEL.MEMM]: 'Maximum-Entropy Markov Model',
	[MODEL.CRF]: 'Conditional Random Field',
}

const MODEL_ENDPOINTS = {
	[MODEL.HMM]: '/hmm',
	[MODEL.MEMM]: '/memm',
	[MODEL.CRF]: '/crf',
}

const EMPTY_PREDS = { [MODEL.HMM]: [], [MODEL.MEMM]: [], [MODEL.CRF]: [] }

const PRED_LABELS = [
	['O', 'not a name'],
	['ORG', 'organization'],
	['PER', 'person'],
	['LOC', 'location'],
	['MISC', 'miscellaneous'],
]

type Props = { models: MODEL[]; label?: ReactNode; hideTagPrefixes?: boolean }
const Demo = ({ models, label, hideTagPrefixes }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const tableWrapperRef = useRef<HTMLDivElement>(null)

	// Store input value & split it into tokens
	const [inputValue, setInputValue] = useState('The UK Department of Transport')
	const [tokens, setTokens] = useState<string[]>([])
	const [tokenSpaces, setTokenSpaces] = useState<boolean[]>([])

	// Fetch & store predictions
	const [predictions, setPredictions] = useState<Record<MODEL, string[]>>(EMPTY_PREDS)
	const [loadingPredictions, setLoadingPredictions] = useState(true)
	const [initialized, setInitialized] = useState(false)
	const [pendingRequest, setPendingRequest] =
		useState<ReturnType<typeof makeCancelable>>()

	const debouncedUpdatePredictions = useMemo(
		() =>
			debounce<[value: string]>((value: string) => {
				const tokens = tokenize(value)

				if (tokens.length === 0) {
					setPredictions(EMPTY_PREDS)
					return
				}

				// Cancel any pending requests, we only want results from the latest one
				if (pendingRequest) {
					pendingRequest.cancel()
				}

				const cancelable = makeCancelable(
					Promise.all(
						models.map((model) =>
							http.post<ResponseData>(MODEL_ENDPOINTS[model], { instances: [tokens] }),
						),
					),
				)

				cancelable.promise
					.then((responses) => {
						setTokens(tokens)
						setTokenSpaces(getTokenSpaces(value, tokens))
						setLoadingPredictions(false)
						setInitialized(true)

						if (responses.every((response) => response.status === 200)) {
							setPredictions(
								Object.fromEntries(
									responses.map((response, i) => [
										models[i],
										response.data.predictions[0],
									]),
								) as Record<MODEL, string[]>,
							)
						}

						setTimeout(() => {
							inputRef.current &&
								tableWrapperRef.current &&
								tableWrapperRef.current.scrollTo(inputRef.current.scrollLeft, 0)
						}, 0)
					})
					.catch((reason: { isCanceled: boolean }) => {
						if (reason.isCanceled) return
						console.warn(reason)
					})

				setPendingRequest(cancelable)
			}, 500),
		[models, pendingRequest],
	)

	// Sync scroll positions of input & table
	useMountEffect(() => {
		if (!inputRef.current || !tableWrapperRef.current) return
		let scrollingFromInput = false
		let scrollingFromInputKeypress = false
		let scrollingFromTable = false

		inputRef.current.onkeyup = (e) => {
			if (scrollingFromTable) {
				scrollingFromTable = false
				return
			}

			if (!tableWrapperRef.current) return
			scrollingFromInputKeypress = true
			tableWrapperRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft
		}

		inputRef.current.onscroll = (e) => {
			if (scrollingFromTable) {
				scrollingFromTable = false
				return
			}

			if (!tableWrapperRef.current) return
			scrollingFromInput = true
			tableWrapperRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft
		}

		tableWrapperRef.current.onscroll = (e) => {
			if (scrollingFromInput) {
				scrollingFromInput = false
				return
			}

			if (scrollingFromInputKeypress) {
				scrollingFromInputKeypress = false
				return
			}

			if (!inputRef.current) return
			scrollingFromTable = true
			inputRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft
		}

		if (isDev) return
		debouncedUpdatePredictions(inputValue)
	})

	const onInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target
			setInputValue(value)

			setLoadingPredictions(true)
			debouncedUpdatePredictions(value)
		},
		[debouncedUpdatePredictions],
	)

	const randomize = useCallback(() => {
		function getRandomIndex() {
			return Math.round(Math.random() * SAMPLES.length - 1)
		}

		let newValue = SAMPLES[getRandomIndex()]
		while (newValue === inputValue) {
			newValue = SAMPLES[getRandomIndex()]
		}

		setInputValue(newValue)

		setLoadingPredictions(true)
		debouncedUpdatePredictions(newValue)
	}, [inputValue, debouncedUpdatePredictions])

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				{label && <Label modelNameOffset={models.length > 1}>{label}</Label>}

				<InputGroup modelNameOffset={models.length > 1}>
					<Input ref={inputRef} value={inputValue} onChange={onInputChange} />
					<RandomizeButton
						small
						onPress={randomize}
						title="Try new text sample"
						isLoading={loadingPredictions}
					>
						<SwitchTransition>
							<CSSTransition
								key={initialized && loadingPredictions ? 'loading' : ''}
								timeout={125}
								appear
							>
								{initialized && loadingPredictions ? (
									<LoadingSpinner
										label="Loading new predictions"
										diameter={16}
										strokeWidth={2}
									/>
								) : (
									<StyledIconRestart size="xl" />
								)}
							</CSSTransition>
						</SwitchTransition>
					</RandomizeButton>
				</InputGroup>

				<ResultsWrapper>
					<CSSTransition in={!initialized} timeout={250} unmountOnExit appear>
						<LoadingWrap showBorders={models.length > 1}>
							<LoadingMessage>Starting prediction server…</LoadingMessage>
						</LoadingWrap>
					</CSSTransition>
					<CSSTransition in={initialized} timeout={250} appear>
						<ResultsAnimationWrapper aria-hidden={!initialized}>
							<TableWrapper ref={tableWrapperRef}>
								<Table showModelNames={models.length > 1}>
									<thead>
										<ConnectorRow>
											<ModelNameHeader scope="col" aria-label="Model" />
											{tokens.map((token, i) => (
												<ConnectorCell key={i} scope="col">
													{token}
													{tokenSpaces[i] && <span aria-hidden="true">&nbsp;</span>}
													{token && <Connector isLoading={loadingPredictions} />}
												</ConnectorCell>
											))}
										</ConnectorRow>
									</thead>
									<tbody>
										{models.map((model) => (
											<PredRow key={model}>
												<ModelName scope="row">
													<ModelNameContent>
														<abbr title={MODEL_LABELS[model]}>{model}</abbr>
													</ModelNameContent>
												</ModelName>

												{predictions[model]?.map((pred, i) => (
													<Pred key={i}>
														<ZeroWidth isLoading={loadingPredictions}>
															{tokens[i] && (
																<PredSpan isOut={pred === 'O'}>
																	<PredBackground aria-hidden="true" />
																	{hideTagPrefixes ? pred.split('-').slice(-1) : pred}
																</PredSpan>
															)}
														</ZeroWidth>
													</Pred>
												))}

												<RowPadding aria-hidden="true" />
											</PredRow>
										))}
									</tbody>
								</Table>
							</TableWrapper>

							<Legend>
								{PRED_LABELS.map(([term, label]) => (
									<LegendItem key={term}>
										<LegendDT>{term}</LegendDT>
										<LegendDD>
											<span aria-hidden="true">&nbsp;=&nbsp;</span>
											{label}
										</LegendDD>
									</LegendItem>
								))}
							</Legend>
						</ResultsAnimationWrapper>
					</CSSTransition>
				</ResultsWrapper>
			</StyledPanel>
		</Grid>
	)
}

export default Demo

const MODEL_NAME_WIDTH = '2.5rem'

const inputPaddingRight = ({ theme }: { theme: Theme }) =>
	`calc(${theme.space[2]} + ${theme.space[2]} + ${theme.space[2]})`

const StyledPanel = styled(Panel)`
	max-width: 60rem;
`

const Label = styled.span<{ modelNameOffset?: boolean }>`
	display: block;
	color: ${(p) => p.theme.label};
	margin-bottom: ${(p) => p.theme.space[1.5]};

	${(p) => p.modelNameOffset && `margin-left: ${MODEL_NAME_WIDTH};`}
`

const InputGroup = styled.div<{ modelNameOffset?: boolean }>`
	position: relative;
	width: calc(
		100% - ${(p) => (p.modelNameOffset ? MODEL_NAME_WIDTH : '0px')} +
			${(p) => p.theme.space[1.5]}
	);
	margin-left: calc(
		${(p) => (p.modelNameOffset ? MODEL_NAME_WIDTH : '0px')} -
			${(p) => p.theme.space[1.5]} - 1px
	);
`

const Input = styled.input`
	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	letter-spacing: -0.03em;

	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.m};
	border: solid 1px ${(p) => p.theme.line};

	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[1.5]};
	padding-right: ${inputPaddingRight};
	width: 100%;
`

const RandomizeButton = styled(Button)<{ isLoading: boolean }>`
	position: absolute;
	top: 50%;
	right: ${(p) => p.theme.space[1]};
	transform: translateY(-50%);
	width: ${(p) => p.theme.space[4]};
	height: ${(p) => p.theme.space[4]};

	color: ${(p) => p.theme.label};
`

const LoadingSpinner = styled(Spinner)`
	${(p) => p.theme.absCenter}
	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.vFastOut};
	color: ${(p) => p.theme.label};
`

const StyledIconRestart = styled(IconRestart)`
	${(p) => p.theme.absCenter}
	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.vFastOut};
`

const ResultsWrapper = styled.div`
	position: relative;
`

const ResultsAnimationWrapper = styled.div`
	width: calc(100% - ${inputPaddingRight});

	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.fastOut};
`

const LoadingWrap = styled.div<{ showBorders: boolean }>`
	position: absolute;
	top: ${(p) => p.theme.space[2]};
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: ${(p) => p.theme.radii.m};

	${(p) => p.showBorders && `border: dashed 1px ${p.theme.line};`}

	${(p) => p.theme.flexCenter};
	${(p) => p.theme.transitionGroupFade}
	transition: opacity ${(p) => p.theme.animation.fastOut};
	z-index: 1;
`

const LoadingMessage = styled.p`
	color: ${(p) => p.theme.label};
`

const TableWrapper = styled.div`
	overflow: auto;
	position: relative;

	padding-top: ${(p) => p.theme.space[0]};

	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
`

const Table = styled.table<{ showModelNames?: boolean }>`
	border-spacing: 0;
	width: 100%;

	th {
		font-weight: 400;
	}

	tr:not(:last-child) > td,
	tr:not(:last-child) > th {
		border-bottom: solid 1px ${(p) => p.theme.iLine};
	}

	td {
		padding: ${(p) => p.theme.space[2]} 0;
	}

	${(p) =>
		!p.showModelNames &&
		`
			& > thead > tr > th:first-child,
			& > tbody > tr > th:first-child {
				display: none;
			}
		`}
`

const ConnectorRow = styled.tr`
	height: 3rem;
`

const ConnectorCell = styled.th`
	position: relative;
	padding: ${(p) => p.theme.space[1]} 0;
	user-select: none;

	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	letter-spacing: -0.03em;
	color: transparent;

	opacity: 0;
	animation: ${fadeIn} ${(p) => p.theme.animation.fastOut} forwards;
`

const Connector = styled.div<{ isLoading: boolean }>`
	width: 0;
	height: calc(100% - ${(p) => p.theme.space[2]});
	border-right: solid 1px ${(p) => p.theme.line};

	${(p) => p.theme.absCenter}

	transition: opacity ${(p) => p.theme.animation.fastOut};
	transition-delay: 10ms;
	${(p) => p.isLoading && `opacity: 0;`};
`

const ModelNameHeader = styled(ConnectorCell)`
	position: sticky;
	left: 0;
	width: ${MODEL_NAME_WIDTH};
	min-width: ${MODEL_NAME_WIDTH};

	background: ${(p) => p.theme.background};
	color: transparent;
	z-index: 1;
`

const ModelName = styled.th`
	position: sticky;
	left: 0;
	width: ${MODEL_NAME_WIDTH};
	min-width: ${MODEL_NAME_WIDTH};

	padding-right: ${(p) => p.theme.space[2]};
	background: ${(p) => p.theme.background};
	color: ${(p) => p.theme.label};
	text-transform: uppercase;
	z-index: 1;
`

const ModelNameContent = styled.span`
	position: relative;
	display: flex;
	align-items: center;
	min-height: 3rem;
`

const PredRow = styled.tr`
	height: 3rem;
`

const Pred = styled.td`
	${(p) => p.theme.text.viz.label};
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;

	opacity: 0;
	animation: ${fadeIn} ${(p) => p.theme.animation.fastOut} forwards;
`

const ZeroWidth = styled.span<{ isLoading: boolean }>`
	width: 0;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	transition: opacity ${(p) => p.theme.animation.fastOut};
	${(p) => p.isLoading && `opacity: 0.25;`};
`

const PredSpan = styled.span<{ isOut?: boolean }>`
	display: inline-block;
	position: relative;

	${(p) => p.isOut && `color: ${p.theme.label};`}
`

const PredBackground = styled.div`
	${(p) => p.theme.absCenter}

	width: calc(100% + ${(p) => p.theme.space[0]});
	height: calc(100% + ${(p) => p.theme.space[0]});
	background: ${(p) => p.theme.background};
	border-radius: ${(p) => p.theme.radii.s};
	opacity: 0.9;
	z-index: -1;
`

const RowPadding = styled.td`
	width: 100%;
`

const Legend = styled.dl`
	display: flex;
	flex-wrap: wrap;

	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};

	width: 100%;
	border-top: solid 1px ${(p) => p.theme.iLine};
	padding-top: ${(p) => p.theme.space[2]};
	margin: 0;
	white-space: nowrap;
`

const LegendItem = styled.div`
	display: flex;
	margin-right: ${(p) => p.theme.space[2]};
`

const LegendDT = styled.dt`
	${(p) => p.theme.text.viz.small}
`

const LegendDD = styled.dd`
	margin: 0;
`
