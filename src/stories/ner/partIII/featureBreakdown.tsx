import { useState } from 'react'
import styled from 'styled-components'

import { nameTags } from '../constants'

import Divider from '@components/divider'
import SelectField from '@components/fields/select'
import TextField from '@components/fields/text'
import Grid from '@components/grid'
import GuideArrow from '@components/guideArrow'
import Panel from '@components/panel'

const tagOptions = nameTags.map((tag) => ({ value: tag, label: tag }))

const MEMMFeatureBreakdown = () => {
	const [prevTag, setPrevTag] = useState<typeof nameTags[number]>('O')
	const [currentTag, setCurrentTag] = useState<typeof nameTags[number]>('B-PER')
	const [word, setWord] = useState('Mulligan')

	return (
		<Wrap noPaddingOnMobile>
			<Panel overlay gridColumn="text" size="m">
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
								size={Math.max(word.length, 2)}
								aria-label="Current word"
							/>
						</WordInputWrap>
					</CurrentTagWrap>
				</InputWrap>
				<StyledDivider />
			</Panel>
		</Wrap>
	)
}

export default MEMMFeatureBreakdown

const Wrap = styled(Grid)`
	${(p) => p.theme.marginVertical[3]}
`

const InputWrap = styled.div`
	display: flex;
	align-items: start;
	justify-content: center;

	input,
	button,
	span {
		text-align: center;
		${(p) => p.theme.text.viz.body};
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

const StyledDivider = styled(Divider)`
	${(p) => p.theme.marginVertical[4]}
`
