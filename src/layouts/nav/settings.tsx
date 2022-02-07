import styled from 'styled-components'

import SettingsDialog from './settingsDialog'

import Dialog from '@components/dialog'

import IconSettings from '@icons/settings'

type Props = {
	as?: string
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
					<TriggerInnerWrap aria-hidden="true">
						<IconSettings useAlt={!withLabel} />
						{withLabel && <TriggerLabel>Settings</TriggerLabel>}
					</TriggerInnerWrap>
				}
				triggerDisabled={dialogTriggerDisabled}
				triggerAriaLabel="Open settings"
			/>
		</Wrap>
	)
}

export default Settings

const Wrap = styled.li``

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
