import { ChangeEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

import { MODEL_FULL, PREDICTION_MODEL } from './constants'
import http, { PredictionResponseData } from './http'
import { getTokenSpaces, tokenize } from './utils'

import Button from '@components/button'
import Grid from '@components/grid'
import Panel from '@components/panel'
import Spinner from '@components/spinner'

import IconRestart from '@icons/restart'

import { debounce, isDev, makeCancelable } from '@utils/functions'
import useMountEffect from '@utils/useMountEffect'

const SAMPLES = [
	'The St. Louis Merchants',
	'The Green Bay Packers',
	'The Czech second city Brno',
	'Australia coach Geoff Marsh',
	'Polish brewer Zywiec',
	'South African Breweries Ltd',
	'Czech President Vaclav Havel',
	'Trade and Industry Secretary Ian Lang',
	'The London-to-Boston route',
	'British Prime Minister John Major’s office',
	'New York Commodities Desk',
	'The London Stock Exchange',
	'PaineWebber analyst Marc Cohen',
	'New York Stock Exchange',
	'The elected Bangui government',
	'Polish-born Pope John Paul',
	'East Timorese-born activist Jose Ramos Horta',
	'The Indonesian ambassador to Norway',
	"Suu Kyi's National League for Democracy",
	'Canadian Grain Commission',
	'Chicago Board of Trade',
]

const MODEL_ENDPOINTS = {
	[PREDICTION_MODEL.HMM]: '/hmm/predict',
	[PREDICTION_MODEL.MEMM]: '/memm/predict',
	[PREDICTION_MODEL.CRF]: '/crf/predict',
}

const EMPTY_PREDS = {
	[PREDICTION_MODEL.HMM]: [],
	[PREDICTION_MODEL.MEMM]: [],
	[PREDICTION_MODEL.CRF]: [],
}

const PRED_LABELS = [
	['O', 'not a name'],
	['ORG', 'organization'],
	['PER', 'person'],
	['LOC', 'location'],
	['MISC', 'miscellaneous'],
]

interface LivePredictionProps {
	models: PREDICTION_MODEL[]
	label?: ReactNode
	initialInputValue?: string
	hideTagPrefixes?: boolean
	noMargin?: boolean
}

const LivePrediction = ({
	models,
	label,
	initialInputValue,
	hideTagPrefixes,
	noMargin,
}: LivePredictionProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const tableWrapperRef = useRef<HTMLDivElement>(null)

	// Store input value & split it into tokens
	const [inputValue, setInputValue] = useState(initialInputValue ?? '')
	const [tokens, setTokens] = useState<string[]>([])
	const [tokenSpaces, setTokenSpaces] = useState<boolean[]>([])

	// Fetch & store predictions
	const [predictions, setPredictions] =
		useState<Record<PREDICTION_MODEL, string[]>>(EMPTY_PREDS)
	const [loadingPredictions, setLoadingPredictions] = useState(true)
	const [initialized, setInitialized] = useState(false)
	const [pendingRequest, setPendingRequest] =
		useState<ReturnType<typeof makeCancelable>>()

	const debouncedUpdatePredictions = useMemo(
		() =>
			debounce<[value: string]>((value: string) => {
				const tokens = tokenize(value ?? '')

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
							http.post<PredictionResponseData>(MODEL_ENDPOINTS[model], {
								instances: [tokens],
							}),
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
								) as Record<PREDICTION_MODEL, string[]>,
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

			if (!value) return
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
			<StyledPanel raised size="m" gridColumn="wide" noMargin={noMargin}>
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
														<abbr title={MODEL_FULL[model]}>{model}</abbr>
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

export default LivePrediction

const MODEL_NAME_WIDTH = '3rem'
const inputPaddingRight = 'calc(var(--space-2) + var(--space-2) + var(--space-2))'

const StyledPanel = styled(Panel)<{ noMargin?: boolean }>`
	${(p) => !p.noMargin && `margin-bottom: var(--adaptive-space-3);`}
`

const Label = styled.span<{ modelNameOffset?: boolean }>`
	display: block;
	color: var(--color-label);
	margin-bottom: var(--space-1-5);

	${(p) => p.modelNameOffset && `margin-left: ${MODEL_NAME_WIDTH};`}
`

const InputGroup = styled.div<{ modelNameOffset?: boolean }>`
	position: relative;
	width: calc(
		100% - ${(p) => (p.modelNameOffset ? MODEL_NAME_WIDTH : '0px')} + var(--space-1-5)
	);
	margin-left: calc(
		${(p) => (p.modelNameOffset ? MODEL_NAME_WIDTH : '0px')} - var(--space-1-5) - 1px
	);

	${(p) => p.theme.breakpoints.xs} {
		margin-left: calc(
			${(p) => (p.modelNameOffset ? MODEL_NAME_WIDTH : '0px')} - var(--space-1) - 1px
		);
	}
`

const Input = styled.input`
	${(p) => p.theme.text.h5};
	font-family: ${(p) => p.theme.text.body1.fontFamily};
	font-weight: ${(p) => p.theme.text.body1.fontWeight};
	letter-spacing: -0.03em;

	background: var(--color-background-recessed);
	border-radius: var(--border-radius-m);
	border: solid 1px var(--color-line);

	padding: var(--space-1) var(--space-1-5);
	padding-right: ${inputPaddingRight};
	width: 100%;

	${(p) => p.theme.breakpoints.xs} {
		padding-left: var(--space-1);
	}
`

const RandomizeButton = styled(Button)<{ isLoading: boolean }>`
	position: absolute;
	top: 50%;
	right: var(--space-1);
	transform: translateY(-50%);
	width: var(--space-4);
	height: var(--space-4);

	color: var(--color-label);
`

const LoadingSpinner = styled(Spinner)`
	${(p) => p.theme.absCenter}
	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-v-fast-out);
	color: var(--color-label);
`

const StyledIconRestart = styled(IconRestart)`
	${(p) => p.theme.absCenter}
	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-v-fast-out);
`

const ResultsWrapper = styled.div`
	position: relative;
`

const ResultsAnimationWrapper = styled.div`
	width: calc(100% - ${inputPaddingRight});

	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-fast-out);
`

const LoadingWrap = styled.div<{ showBorders: boolean }>`
	position: absolute;
	top: var(--space-2);
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: var(--border-radius-m);

	${(p) => p.showBorders && `border: dashed 1px var(--color-line);`}

	${(p) => p.theme.flexCenter};
	${(p) => p.theme.transitionGroupFade}
	transition: opacity var(--animation-fast-out);
	z-index: 1;
`

const LoadingMessage = styled.p`
	color: var(--color-label);
`

const TableWrapper = styled.div`
	overflow: auto;
	position: relative;

	padding-top: var(--space-0);

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
		border-bottom: solid 1px var(--color-line);
	}

	td {
		padding: var(--space-2) 0;
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
	padding: var(--space-1) 0;
	user-select: none;

	${(p) => p.theme.text.h5};
	font-family: ${(p) => p.theme.text.body1.fontFamily};
	font-weight: ${(p) => p.theme.text.body1.fontWeight};
	letter-spacing: -0.03em;
	color: transparent;

	opacity: 0;
	animation: ${(p) => p.theme.fadeIn} var(--animation-fast-out) forwards;
`

const Connector = styled.div<{ isLoading: boolean }>`
	width: 0;
	height: calc(100% - var(--space-2));
	border-right: solid 1px var(--color-line);

	${(p) => p.theme.absCenter}

	transition: opacity var(--animation-fast-out);
	transition-delay: 10ms;
	${(p) => p.isLoading && `opacity: 0;`};
`

const ModelNameHeader = styled(ConnectorCell)`
	position: sticky;
	left: 0;
	width: ${MODEL_NAME_WIDTH};
	min-width: ${MODEL_NAME_WIDTH};

	background: var(--color-background);
	color: transparent;
	z-index: 1;
`

const ModelName = styled.th`
	position: sticky;
	left: 0;
	width: ${MODEL_NAME_WIDTH};
	min-width: ${MODEL_NAME_WIDTH};

	background: var(--color-background);
	color: var(--color-label);
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
	${(p) => p.theme.vizText.label};
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;
	white-space: nowrap;

	opacity: 0;
	animation: ${(p) => p.theme.fadeIn} var(--animation-fast-out) forwards;
`

const ZeroWidth = styled.span<{ isLoading: boolean }>`
	width: 0;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	transition: opacity var(--animation-fast-out);
	${(p) => p.isLoading && `opacity: 0.25;`};
`

const PredSpan = styled.span<{ isOut?: boolean }>`
	display: inline-block;
	position: relative;

	${(p) => p.isOut && `color: var(--color-label);`}
`

const PredBackground = styled.div`
	${(p) => p.theme.absCenter}

	width: calc(100% + var(--space-0));
	height: calc(100% + var(--space-0));
	background: var(--color-background);
	border-radius: var(--border-radius-s);
	opacity: 0.9;
	z-index: -1;
`

const RowPadding = styled.td`
	width: 100%;
`

const Legend = styled.dl`
	display: flex;
	flex-wrap: wrap;

	${(p) => p.theme.text.small}
	color: var(--color-label);

	width: 100%;
	border-top: solid 1px var(--color-line);
	padding-top: var(--space-2);
	margin: 0;
	white-space: nowrap;
`

const LegendItem = styled.div`
	display: flex;
	margin-right: var(--space-2);
`

const LegendDT = styled.dt`
	${(p) => p.theme.vizText.small}
`

const LegendDD = styled.dd`
	margin: 0;
`
