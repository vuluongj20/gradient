import styled from 'styled-components'

import SettingsDialog from './settingsDialog'

import Dialog from '@components/dialog'

import IconSettings from '@icons/settings'

type Props = {
	className?: string
}

const Settings = ({ className }: Props) => {
	return (
		<Wrap className={className}>
			<Dialog
				title="Settings"
				content={SettingsDialog}
				triggerLabel={
					<ButtonInnerWrap>
						<IconSettings />
					</ButtonInnerWrap>
				}
				triggerTooltip="Settings"
				triggerTooltipPlacement="right"
			/>
		</Wrap>
	)
}

export default Settings

const Wrap = styled.div``

const ButtonInnerWrap = styled.div`
	${(p) => p.theme.utils.flexCenter};
	color: ${(p) => p.theme.colors.label};
	padding: ${(p) => p.theme.space[0]};
	transition: color ${(p) => p.theme.animation.fastOut};
	transform: rotate(90deg);

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`
