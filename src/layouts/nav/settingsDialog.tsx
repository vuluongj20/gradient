import { useContext } from 'react'
import styled from 'styled-components'

import RadioBar from '@components/radioBar'

import SettingsContext from '@utils/settingsContext'

const Dialog = () => {
	const {
		settings: { theme: themeSettings },
		dispatch: dispatchSettings,
	} = useContext(SettingsContext)

	const appearanceOptions = [
		{
			value: 'auto',
			label: 'Sync with system',
		},
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
	]

	const setAppearance = (option: string) => {
		dispatchSettings({ type: 'update-color', key: 'appearance', value: option })
	}

	return (
		<InnerWrap>
			<Section>
				<SectionTitle>Appearance</SectionTitle>
				<RadioBar
					label="Appearance"
					options={appearanceOptions}
					onChange={setAppearance}
					value={themeSettings.color.appearance}
					moveLeft
				/>
			</Section>
		</InnerWrap>
	)
}

export default Dialog

const InnerWrap = styled.div``

const Section = styled.section`
	${(p) => p.theme.paddingVertical[0]};
`

const SectionTitle = styled.h3`
	${(p) => p.theme.text.system.h6};
	margin-bottom: ${(p) => p.theme.space[1]};
`
