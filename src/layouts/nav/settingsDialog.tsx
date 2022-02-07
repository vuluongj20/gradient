import { useContext } from 'react'
import styled from 'styled-components'

import RadioBar from '@components/radioBar'
import TabList from '@components/tabList'

import IconSettings from '@icons/settings'

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
			tooltip: "Match your system's active appearance",
		},
		{ value: 'light', label: 'Light', tooltip: 'Use light appearance' },
		{ value: 'dark', label: 'Dark', tooltip: 'Use dark appearance' },
	]

	const setAppearance = (option: string) => {
		dispatchSettings({ type: 'update-color', key: 'appearance', value: option })
	}

	const tabItems = [
		{
			key: 'hello',
			label: 'Appearance',
			content: (
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
			),
			leadingItems: <IconSettings />,
		},
		{
			key: 'woah',
			label: 'Account',
			content:
				'It has distinctive black bars on its forelegs and a black-tipped, stubby tail, from which it derives its name. It reaches a body length of up to 125 cm (50 in). It is an adaptable predator inhabiting wooded areas, semidesert, urban edge, forest edge, and swampland environments.',
			leadingItems: <IconSettings />,
		},
	]

	return (
		<InnerWrap>
			<TabList orientation="vertical" insetPanel height="24rem" items={tabItems} />
		</InnerWrap>
	)
}

export default Dialog

const InnerWrap = styled.div``

const Section = styled.section`
	${(p) => p.theme.utils.space.paddingVertical[0]};
`

const SectionTitle = styled.h3`
	${(p) => p.theme.text.ui.h5};
	margin-bottom: ${(p) => p.theme.space[1]};
`
