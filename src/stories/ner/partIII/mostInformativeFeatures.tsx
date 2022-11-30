import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { nameTags } from '../constants'

import SelectField from '@components/fields/select'
import Grid from '@components/grid'
import Panel from '@components/panel'

type NameTag = typeof nameTags[number]
const informativeFeatures: Record<NameTag, Array<string | number>[]> = {
	['O']: [
		["word='germany'", 'B-LOC', 11.492],
		["word='van'", 'B-PER', 8.972],
		["word='wall'", 'B-ORG', 8.525],
		["word='della'", 'B-PER', 7.86],
		["lowercase='della'", 'B-PER', 7.86],
		['is_not_title_case', 'B-PER', -6.949],
		["word='de'", 'B-PER', 6.781],
		["shape='X.X.'", 'O', -6.713],
		["shape='xxxx'", 'B-ORG', -6.642],
		["word='CLINTON'", 'B-ORG', 6.456],
	],
	['B-ORG']: [
		['is_not_title_case', 'B-MISC', -4.967],
		['is_not_title_case', 'B-PER', -4.733],
		['is_not_uppercase', 'B-ORG', -3.36],
		['is_not_uppercase', 'B-PER', -3.244],
		['is_not_uppercase', 'B-MISC', -2.715],
		['is_not_digit', 'B-PER', -2.578],
		["shape='xxxx'", 'I-ORG', -2.5],
		['is_not_title_case', 'B-ORG', -2.374],
		['word="Mar\'ie"', 'B-PER', 2.24],
		['lowercase="mar\'ie"', 'B-PER', 2.24],
	],
	['I-ORG']: [
		['is_not_uppercase', 'B-PER', -5.541],
		['is_not_uppercase', 'B-MISC', -5.541],
		['is_not_digit', 'B-ORG', -5.121],
		['is_not_digit', 'B-PER', -3.263],
		['is_not_digit', 'B-MISC', -3.261],
		["word='Tupolev'", 'B-MISC', 2.593],
		["lowercase='tupolev'", 'B-MISC', 2.593],
		["word='Airbus'", 'B-MISC', 2.59],
		["lowercase='airbus'", 'B-MISC', 2.59],
		["word='Ali'", 'B-PER', 2.577],
	],
	['B-PER']: [
		['is_title_case', 'O', -8.489],
		['is_not_digit', 'B-MISC', -6.559],
		["word='Calderon'", 'B-LOC', 6.437],
		["lowercase='calderon'", 'B-LOC', 6.437],
		["word='Akbar'", 'O', 6.334],
		["lowercase='akbar'", 'O', 6.334],
		["word='Salamanca'", 'B-LOC', 6.176],
		["lowercase='salamanca'", 'B-LOC', 6.176],
		['is_not_uppercase', 'B-MISC', -6.087],
		["word='Sept'", 'O', 5.873],
	],
	['I-PER']: [
		['is_title_case', 'O', -7.552],
		['is_not_title_case', 'I-PER', -6.266],
		["word='der'", 'I-PER', 5.223],
		["word='de'", 'I-PER', 4.947],
		["lowercase='de'", 'I-PER', 4.947],
		["word='Ongania'", 'O', 4.367],
		["lowercase='ongania'", 'O', 4.367],
		["word='Meng'", 'O', 4.259],
		["lowercase='meng'", 'O', 4.259],
		["lowercase='der'", 'I-PER', 3.913],
	],
	['B-LOC']: [
		["word='Perfetti'", 'B-PER', 38.791],
		["lowercase='perfetti'", 'B-PER', 38.791],
		['is_not_digit', 'B-PER', -8.739],
		['is_not_uppercase', 'B-LOC', -6.552],
		["shape='Xxxxx'", 'O', -6.217],
		['is_not_uppercase', 'B-PER', -5.789],
		["word='High'", 'B-LOC', 5.783],
		["lowercase='high'", 'B-LOC', 5.783],
		['is_not_uppercase', 'B-ORG', -5.781],
		["word='Senate'", 'B-ORG', 5.512],
	],
	['I-LOC']: [
		["word='Free'", 'O', 6.04],
		['is_not_digit', 'B-ORG', -5.606],
		['is_not_uppercase', 'B-LOC', -4.703],
		["word='Daewoo'", 'B-ORG', 4.614],
		["lowercase='daewoo'", 'B-ORG', 4.614],
		['is_not_uppercase', 'B-ORG', -4.479],
		["word='free'", 'I-LOC', 4.44],
		["word='Israel'", 'B-LOC', 4.342],
		["lowercase='israel'", 'B-LOC', 4.342],
		['is_not_title_case', 'B-MISC', -4.13],
	],
	['B-MISC']: [
		['is_not_title_case', 'B-PER', -7.686],
		["word='interior'", 'B-ORG', 6.809],
		["word='MaliVai'", 'B-PER', 4.959],
		["shape='XxxxXxx'", 'B-PER', 4.959],
		["word='Russia'", 'B-LOC', 4.816],
		["lowercase='russia'", 'B-LOC', 4.816],
		['is_not_title_case', 'B-ORG', -4.748],
		["word='Doboj'", 'B-LOC', 4.483],
		["lowercase='doboj'", 'B-LOC', 4.483],
		["word='UAE'", 'B-LOC', 4.482],
	],
	['I-MISC']: [
		['is_not_digit', 'B-LOC', -5.548],
		['is_not_digit', 'B-PER', -5.109],
		['is_not_digit', 'B-MISC', -4.801],
		["word='South'", 'B-LOC', 4.434],
		["lowercase='south'", 'B-LOC', 4.434],
		["word='division'", 'I-MISC', 4.372],
		["word='Johnson'", 'B-LOC', 4.222],
		["lowercase='johnson'", 'B-LOC', 4.222],
		["word='convention'", 'I-MISC', 4.199],
		["word='World'", 'B-MISC', 4.159],
	],
}

const selectOptions = nameTags.map((tag) => ({ value: tag, label: tag }))

const MEMMMostInformativeFeatures = () => {
	const [prevTag, setPrevTag] = useState<NameTag>('O')
	const features = useMemo(() => informativeFeatures[prevTag], [prevTag])

	return (
		<Grid noPaddingOnMobile>
			<Wrap overlay size="m" gridColumn="wide">
				<Heading>
					Most Informative Features when Previous State is&nbsp;
					<SelectField
						skipFieldWrapper
						options={selectOptions}
						value={prevTag}
						onChange={setPrevTag}
					/>
				</Heading>
				<Table>
					<TableHeader>
						<TR>
							<TH scope="col">Feature</TH>
							<TH scope="col">State</TH>
							<TH scope="col" align="right">
								Weight
							</TH>
						</TR>
					</TableHeader>
					<TableBody>
						{features.map(([feature, currentTag, weight]) => (
							<TR key={`${feature}-${currentTag}`}>
								<TD>{feature}</TD>
								<TD>{currentTag}</TD>
								<TD align="right">{weight}</TD>
							</TR>
						))}
					</TableBody>
				</Table>
			</Wrap>
		</Grid>
	)
}

export default MEMMMostInformativeFeatures

const Wrap = styled(Panel)`
	${(p) => p.theme.marginBottom[3]};
`

const Heading = styled.p`
	${(p) => p.theme.text.system.h6};
	display: flex;
	align-items: center;
	margin-bottom: ${(p) => p.theme.space[1]};

	button {
		${(p) => p.theme.text.system.h6};
		padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[0]}
			${(p) => p.theme.space[0]} ${(p) => p.theme.space[0.5]};
		border: solid 1px ${(p) => p.theme.line};
	}
`

const Table = styled.table`
	width: calc(100% + ${(p) => p.theme.space[1.5]} * 2);
	transform: translateX(-${(p) => p.theme.space[1.5]});
	border-spacing: 0;

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
		}
	}
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

const TR = styled.tr`
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
