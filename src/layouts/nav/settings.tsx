import styled from 'styled-components'

import SettingsDialog from './settingsDialog'

import Dialog from '@components/dialog'

import IconSettings from '@icons/settings'

type Props = {
	withLabel?: boolean
	className?: string
}

const Settings = ({ withLabel, className }: Props) => {
	return (
		<Wrap className={className}>
			<Dialog
				title="Settings"
				content={SettingsDialog}
				triggerLabel={
					<TriggerInnerWrap>
						<IconSettings />
						{withLabel && <TriggerLabel>Settings</TriggerLabel>}
					</TriggerInnerWrap>
				}
				triggerTooltip={!withLabel && 'Settings'}
				triggerTooltipPlacement="right"
			/>
		</Wrap>
	)
}

export default Settings

const Wrap = styled.div``

const TriggerInnerWrap = styled.div`
	${(p) => p.theme.utils.flexCenter};
	gap: ${(p) => p.theme.space[0]};
	color: ${(p) => p.theme.colors.label};
	padding: ${(p) => p.theme.space[0]};
	transition: color ${(p) => p.theme.animation.fastOut};

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`

const TriggerLabel = styled.span``
