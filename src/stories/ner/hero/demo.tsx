import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import http, { ResponseData } from '../http'
import { getTokenSpaces, tokenize } from '../utils'

import { Theme } from '@theme'

import Button from '@components/button'
import Grid from '@components/grid'
import Panel from '@components/panel'
import Spinner from '@components/spinner'
import Tooltip from '@components/tooltip'

import IconAutoAwesome from '@icons/autoAwesome'

import { debounce, makeCancelable } from '@utils/functions'
import { fadeIn } from '@utils/style'
import useMountEffect from '@utils/useMountEffect'

const Demo = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const tableWrapperRef = useRef<HTMLDivElement>(null)

	// Store input value & split it into tokens
	const [inputValue, setInputValue] = useState('The UK Department of Transport')
	const [tokens, setTokens] = useState<string[]>([])
	const tokenSpaces = useMemo(
		() => getTokenSpaces(inputValue, tokens),
		[inputValue, tokens],
	)

	// Fetch & store predictions
	const [hmmPredictions, setHmmPredictions] = useState<string[]>([])
	const [crfPredictions, setCrfPredictions] = useState<string[]>([])
	const [loadingPredictions, setLoadingPredictions] = useState(true)
	const [initialized, setInitialized] = useState(false)
	const [pendingRequest, setPendingRequest] =
		useState<ReturnType<typeof makeCancelable>>()

	const debouncedUpdatePredictions = useMemo(
		() =>
			debounce<[value: string]>((value) => {
				const tokens = tokenize(value)

				if (tokens.length === 0) {
					setHmmPredictions([])
					setCrfPredictions([])
					return
				}

				// Cancel any pending requests, we only want results from the latest one
				if (pendingRequest) {
					pendingRequest.cancel()
				}

				const cancelable = makeCancelable(
					Promise.all([
						http.post<ResponseData>('/hmm', { instances: [tokens] }),
						http.post<ResponseData>('/crf', { instances: [tokens] }),
					]),
				)

				cancelable.promise
					.then(([hmmResponse, crfResponse]) => {
						setTokens(tokens)
						setLoadingPredictions(false)
						setInitialized(true)

						if (hmmResponse.status === 200) {
							setHmmPredictions(hmmResponse.data.predictions[0])
						}
						if (crfResponse.status === 200) {
							setCrfPredictions(crfResponse.data.predictions[0])
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
		[pendingRequest],
	)

	// Sync scroll positions of input & table
	useMountEffect(() => {
		debouncedUpdatePredictions(inputValue)

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

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				<Description>
					Which words refer to a named entity? Predictions from two graphical models.
				</Description>
				<InputGroup>
					<Input ref={inputRef} value={inputValue} onChange={onInputChange} />
					<RandomizeButtonTooltip
						delay={250}
						placement="bottom"
						content="New Text Sample"
					>
						{(tooltipTriggerProps) => (
							<RandomizeButton directProps={tooltipTriggerProps}>
								<IconAutoAwesome size="xl" />
							</RandomizeButton>
						)}
					</RandomizeButtonTooltip>
				</InputGroup>

				<ResultsWrapper>
					<CSSTransition in={!initialized} timeout={250} appear unmounOnExit>
						<ResultsSpinner
							showLabel
							label="Getting predictions"
							diameter={16}
							strokeWidth={1.25}
						/>
					</CSSTransition>
					<CSSTransition in={initialized} timeout={250} appear>
						<ResultsAnimationWrapper>
							<TableWrapper ref={tableWrapperRef}>
								<Table>
									<thead>
										<tr>
											<Header>Model</Header>
											{tokens.map((token, i) => (
												<Header key={i} aria-hidden="true">
													{token}
													{tokenSpaces[i] && '\u00a0'}
													{token && <Connector isLoading={loadingPredictions} />}
												</Header>
											))}
										</tr>
									</thead>
									<tbody>
										<tr>
											<ModelName>
												<ModelNameContent>
													<span>HMM</span>
													<CSSTransition
														in={loadingPredictions}
														timeout={250}
														unmountOnExit
														appear
													>
														<ModelNameSpinner
															label="Loading new predictions"
															diameter={12}
															strokeWidth={1}
														/>
													</CSSTransition>
												</ModelNameContent>
											</ModelName>

											{hmmPredictions.map((pred, i) => (
												<Pred key={i}>
													<ZeroWidth isLoading={loadingPredictions}>
														{tokens[i] && (
															<PredSpan isOut={pred === 'O'}>
																<PredBackground aria-hidden="true" />
																{pred.includes('-') ? pred.split('-')[1] : pred}
															</PredSpan>
														)}
													</ZeroWidth>
												</Pred>
											))}

											<RowPadding aria-hidden="true" />
										</tr>

										<tr>
											<ModelName>
												<ModelNameContent>
													<span>CRF</span>
													<CSSTransition
														in={loadingPredictions}
														timeout={250}
														unmountOnExit
														appear
													>
														<ModelNameSpinner
															label="Loading new predictions"
															diameter={12}
															strokeWidth={1}
														/>
													</CSSTransition>
												</ModelNameContent>
											</ModelName>

											{crfPredictions.map((pred, i) => (
												<Pred key={i}>
													<ZeroWidth isLoading={loadingPredictions}>
														{tokens[i] && (
															<PredSpan isOut={pred === 'O'}>
																<PredBackground aria-hidden="true" />
																{pred.includes('-') ? pred.split('-')[1] : pred}
															</PredSpan>
														)}
													</ZeroWidth>
												</Pred>
											))}

											<RowPadding aria-hidden="true" />
										</tr>
									</tbody>
								</Table>
							</TableWrapper>

							<Legend>
								<LegendItem>
									<LegendLabel>O</LegendLabel>
									<LegendText> = not a name</LegendText>
								</LegendItem>
								<LegendItem>
									<LegendLabel>ORG</LegendLabel>
									<LegendText> = organization</LegendText>
								</LegendItem>
								<LegendItem>
									<LegendLabel>PER</LegendLabel>
									<LegendText> = person</LegendText>
								</LegendItem>
								<LegendItem>
									<LegendLabel>LOC</LegendLabel>
									<LegendText> = Location</LegendText>
								</LegendItem>
							</Legend>
						</ResultsAnimationWrapper>
					</CSSTransition>
				</ResultsWrapper>
			</StyledPanel>
		</Grid>
	)
}

export default Demo

const MODEL_NAME_WIDTH = '5rem'
const inputPaddingRight = ({ theme }: { theme: Theme }) =>
	`calc(${theme.space[1.5]} + ${theme.space[4]} + ${theme.space[1.5]})`

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.space.marginTop[5]}
	max-width: 60rem;
`

const Description = styled.p`
	color: ${(p) => p.theme.label};
	margin-left: ${MODEL_NAME_WIDTH};
	margin-bottom: ${(p) => p.theme.space[1.5]};
`

const InputGroup = styled.div`
	position: relative;
	width: calc(100% - ${MODEL_NAME_WIDTH} + ${(p) => p.theme.space[1.5]});
	margin-left: calc(${MODEL_NAME_WIDTH} - ${(p) => p.theme.space[1.5]} - 1px);
`

const Input = styled.input`
	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	letter-spacing: -0.035em;

	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.s};
	border: solid 1px ${(p) => p.theme.line};

	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[1.5]};
	padding-right: ${inputPaddingRight};
	width: 100%;
`

const RandomizeButtonTooltip = styled(Tooltip)`
	&& {
		position: absolute;
	}
	top: 50%;
	right: ${(p) => p.theme.space[0.5]};
	transform: translateY(-50%);
`

const RandomizeButton = styled(Button)`
	color: ${(p) => p.theme.label};
`

const ResultsWrapper = styled.div`
	position: relative;
`

const ResultsAnimationWrapper = styled.div`
	width: calc(100% - ${inputPaddingRight});

	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.fastOut};

	&.enter-active,
	&.enter-done {
		opacity: 1;
	}

	&.exit-active {
		opacity: 0;
	}
`

const ResultsSpinner = styled(Spinner)`
	${(p) => p.theme.utils.absCenter}

	/* Offset extra padding at bottom of StyledPanel */
	transform: translate(-50%, calc(-50% + ${(p) => p.theme.space[1]}));

	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.fastOut};

	&.enter-active,
	&.enter-done {
		opacity: 1;
	}

	&.exit-active {
		opacity: 0;
	}
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

const Table = styled.table`
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
`

const Header = styled.th`
	position: relative;
	padding: ${(p) => p.theme.space[1]} 0;
	user-select: none;

	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	letter-spacing: -0.035em;
	color: transparent;

	opacity: 0;
	animation: ${fadeIn} ${(p) => p.theme.animation.fastOut} forwards;
`

const Connector = styled.div<{ isLoading: boolean }>`
	width: 0;
	height: calc(100% - ${(p) => p.theme.space[2]});
	border-right: solid 1px ${(p) => p.theme.line};

	${(p) => p.theme.utils.absCenter}

	transition: opacity ${(p) => p.theme.animation.fastOut};
	transition-delay: 10ms;
	${(p) => p.isLoading && `opacity: 0;`};
`

const ModelName = styled.th`
	position: sticky;
	left: 0;
	width: ${MODEL_NAME_WIDTH};
	min-width: ${MODEL_NAME_WIDTH};

	padding-right: ${(p) => p.theme.space[2]};
	background: ${(p) => p.theme.background};
	color: ${(p) => p.theme.label};
	z-index: 1;
`

const ModelNameContent = styled.span`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 3rem;
`

const ModelNameSpinner = styled(Spinner)`
	opacity: 0;
	transition: opacity ${(p) => p.theme.animation.fastOut};

	&.enter-active,
	&.enter-done {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	&.exit-active {
		opacity: 0;
	}
`

const Pred = styled.td`
	${(p) => p.theme.text.viz.label};
	font-weight: 500;
	text-align: center;

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
	${(p) => p.theme.utils.absCenter}

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

const Legend = styled.p`
	display: flex;
	flex-wrap: wrap;

	${(p) => p.theme.text.system.small}
	color: ${(p) => p.theme.label};

	width: 100%;
	border-top: solid 1px ${(p) => p.theme.iLine};
	padding-top: ${(p) => p.theme.space[2]};
`

const LegendItem = styled.span`
	margin-right: ${(p) => p.theme.space[2]};
	white-space: nowrap;
`

const LegendLabel = styled.span`
	${(p) => p.theme.text.viz.small}
`

const LegendText = styled.span``
