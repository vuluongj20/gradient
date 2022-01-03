import styled from 'styled-components'

import DialogControl from '@components/dialogControl'

import IconVisibility from '@icons/visibility'

type Props = {
	className?: string
}

const Settings = ({ className }: Props) => {
	return (
		<Wrap className={className}>
			<DialogControl
				dialogTitle="Reading Preferences"
				dialogContent={<p>Another hello there to you! Another hello there to you!</p>}
				buttonLabel={
					<ButtonInnerWrap>
						<IconVisibility />
					</ButtonInnerWrap>
				}
			/>
		</Wrap>
	)
}

export default Settings

const Wrap = styled.div``

const ButtonInnerWrap = styled.div`
	color: ${(p) => p.theme.colors.label};
	padding: ${(p) => p.theme.space[1]};
	transition: color 0.25s ${(p) => p.theme.animation.easeOutQuart};

	&:hover {
		color: ${(p) => p.theme.colors.heading};
	}
`
