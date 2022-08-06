import { SeparatorProps, useSeparator } from '@react-aria/separator'
import styled from 'styled-components'

const Divider = styled(({ orientation, ...props }: SeparatorProps): JSX.Element => {
	const { separatorProps } = useSeparator({ orientation })
	return <div {...separatorProps} {...props} />
}).withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) => defaultValidatorFn(prop),
})`
	border-color: ${(p) => p.theme.iLine};
	border-style: solid;
	border-width: 0;
	${(p) =>
		p.orientation === 'vertical'
			? 'border-right-width: 1px;'
			: 'border-bottom-width: 1px'}
`
export default Divider
