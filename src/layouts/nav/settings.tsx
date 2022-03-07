import styled from 'styled-components'

import SettingsDialog from './settingsDialog'

import Dialog from '@components/dialog'

import IconPalette from '@icons/palette'

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
				title="Reading Preferences"
				content={SettingsDialog}
				contentProps={{ size: 'xs' }}
				beforeOpen={beforeDialogOpen}
				afterClose={afterDialogClose}
				triggerLabel={
					<TriggerInnerWrap aria-hidden="true">
						<IconPalette size="xl" useAlt={!withLabel} />
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
	color: ${(p) => p.theme.heading};
	padding: ${(p) => p.theme.space[0]};
	transition: color ${(p) => p.theme.animation.fastOut};

	&:hover {
		color: ${(p) => p.theme.heading};
	}

	${(p) => p.theme.utils.media.mobile} {
		padding-left: 0;
	}
`

const TriggerLabel = styled.span``
