import balanceText from 'balance-text'
import { useEffect, useRef } from 'react'

type Props = { children: string; className?: string }

const BalancedText = ({ children, className }: Props) => {
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (!ref.current) return
		balanceText(ref.current, { watch: true })
	})

	return (
		<span ref={ref} className={className}>
			{children}
		</span>
	)
}

export default BalancedText
