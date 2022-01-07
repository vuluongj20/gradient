import styled from 'styled-components'

import SettingsDialog from './settingsDialog'

import Dialog from '@components/dialog'

import IconSettings from '@icons/settings'

type Props = {
	withLabel?: boolean
	className?: string
	beforeDialogOpen?: () => void
	afterDialogClose?: () => void
	dialogTriggerDisabled?: boolean
}

const Settings = ({
	withLabel,
	className,
	beforeDialogOpen,
	afterDialogClose,
	dialogTriggerDisabled,
}: Props) => {
	return (
		<Wrap className={className}>
			<Dialog
				title="Settings"
				content={SettingsDialog}
				beforeOpen={beforeDialogOpen}
				afterClose={afterDialogClose}
				triggerLabel={
					<TriggerInnerWrap>
						<IconSettings />
						{withLabel && <TriggerLabel>Settings</TriggerLabel>}
					</TriggerInnerWrap>
				}
				triggerDisabled={dialogTriggerDisabled}
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
