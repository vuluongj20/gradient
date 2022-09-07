import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import http, { ResponseData } from '../http'
import { getTokenSpaces, tokenize } from '../utils'

import Grid from '@components/grid'
import Panel from '@components/panel'
import Spinner from '@components/spinner'

import { debounce } from '@utils/functions'
import { fadeIn } from '@utils/style'
import useMountEffect from '@utils/useMountEffect'

const Demo = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const tableWrapperRef = useRef<HTMLDivElement>(null)

	// Store input value & split it into tokens
	const [inputValue, setInputValue] = useState('The UK Department of Transport.')
	const [tokens, setTokens] = useState<string[]>([])
	const tokenSpaces = useMemo(
		() => getTokenSpaces(inputValue, tokens),
		[inputValue, tokens],
	)

	// Fetch & store predictions
	const [hmmPredictions, setHmmPredictions] = useState<string[]>([])
	const [crfPredictions, setCrfPredictions] = useState<string[]>([])
	const [loadingPredictions, setLoadingPredictions] = useState(true)
	const debouncedUpdatePredictions = useMemo(
		() =>
			debounce<[value: string]>((value) => {
				const tokens = tokenize(value)

				if (tokens.length === 0) {
					setHmmPredictions([])
					setCrfPredictions([])
					return
				}

				Promise.all([
					http.post<ResponseData>('/hmm', { instances: [tokens] }),
					http.post<ResponseData>('/crf', { instances: [tokens] }),
				])
					.then(([hmmResponse, crfResponse]) => {
						setTokens(tokens)
						setLoadingPredictions(false)

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
					.catch(console.warn)
			}, 500),
		[],
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

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setInputValue(value)

		setLoadingPredictions(true)
		debouncedUpdatePredictions(value)
	}

	return (
		<Grid noPaddingOnMobile>
			<StyledPanel overlay size="m" gridColumn="wide">
				<Input ref={inputRef} value={inputValue} onChange={onInputChange} />
				<TableWrapper ref={tableWrapperRef}>
					<Table>
						<thead>
							<tr>
								<ModelHeader>Model</ModelHeader>
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
											<StyledSpinner
												label="Loading new predictions"
												diameter={12}
												strokeWidth={1}
											/>
										</CSSTransition>
									</ModelNameContent>
								</ModelName>

								{hmmPredictions.map((pred, i) => (
									<Pred key={i}>
										<ZeroWidthContent isLoading={loadingPredictions}>
											{tokens[i] && (pred.includes('-') ? pred.split('-')[1] : pred)}
										</ZeroWidthContent>
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
											<StyledSpinner
												label="Loading new predictions"
												diameter={12}
												strokeWidth={1}
											/>
										</CSSTransition>
									</ModelNameContent>
								</ModelName>

								{crfPredictions.map((pred, i) => (
									<Pred key={i}>
										<ZeroWidthContent isLoading={loadingPredictions}>
											{tokens[i] && (pred.includes('-') ? pred.split('-')[1] : pred)}
										</ZeroWidthContent>
									</Pred>
								))}

								<RowPadding aria-hidden="true" />
							</tr>
						</tbody>
					</Table>
				</TableWrapper>
			</StyledPanel>
		</Grid>
	)
}

export default Demo

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.space.marginTop[5]}
`

const TableWrapper = styled.div`
	overflow: auto;
	position: relative;
	width: calc(100% - ${(p) => p.theme.space[1.5]});

	padding-top: ${(p) => p.theme.space[0]};

	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
`

const Table = styled.table`
	border-spacing: 0;
	padding-right: ${(p) => p.theme.space[1.5]};

	th {
		font-weight: 400;
	}

	tr:not(:last-child) > td,
	tr:not(:last-child) > th {
		border-bottom: solid 1px ${(p) => p.theme.line};
	}

	td {
		padding: ${(p) => p.theme.space[2]} 0;
	}
`

const Header = styled.th`
	position: relative;
	padding: ${(p) => p.theme.space[2]} 0;

	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
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

const MODEL_NAME_WIDTH = '5rem'
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

const StyledSpinner = styled(Spinner)`
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

const ModelHeader = styled(ModelName)`
	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};
	color: transparent;

	padding: ${(p) => p.theme.space[2]} 0;

	&& {
		border-bottom: none;
	}
`

const Pred = styled.td`
	${(p) => p.theme.text.viz.label};
	font-weight: 500;
	text-align: center;

	opacity: 0;
	animation: ${fadeIn} ${(p) => p.theme.animation.fastOut} forwards;
`

const ZeroWidthContent = styled.span<{ isLoading: boolean }>`
	width: 0;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	transition: opacity ${(p) => p.theme.animation.fastOut};
	${(p) => p.isLoading && `opacity: 0.25;`};
`

const RowPadding = styled.td`
	width: 100%;
`

const Input = styled.input`
	${(p) => p.theme.text.content.h5};
	font-family: ${(p) => p.theme.text.content.body.fontFamily};
	font-weight: ${(p) => p.theme.text.content.body.fontWeight};

	background: ${(p) => p.theme.iBackground};
	border-radius: ${(p) => p.theme.radii.s};
	border: solid 1px ${(p) => p.theme.line};

	padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[1.5]};
	margin-left: calc(${MODEL_NAME_WIDTH} - ${(p) => p.theme.space[1.5]} - 1px);
	width: calc(100% - ${MODEL_NAME_WIDTH} + ${(p) => p.theme.space[1.5]});
`
