import { SeparatorProps, useSeparator } from '@react-aria/separator'
import styled from 'styled-components'

const Divider = styled(({ orientation, ...props }: SeparatorProps) => {
	const { separatorProps } = useSeparator({ orientation })
	return <div {...separatorProps} {...props} />
}).withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) => defaultValidatorFn(prop),
})`
	border-color: var(--color-i-line);
	border-style: solid;
	border-width: 0;
	${(p) =>
		p.orientation === 'vertical'
			? 'border-right-width: 1px;'
			: 'border-bottom-width: 1px'}
`
export default Divider
