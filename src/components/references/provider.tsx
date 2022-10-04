import { ReactNode, createContext, useCallback, useState } from 'react'

export type Reference = {
	id: string
	title: string
	author: { family: string; given: string }[]
	year: string | number
	containerTitle?: string
	volume?: string | number
	issue?: string | number
	page?: string | number
	doi?: string
	url?: string
}

type ReferenceContext = {
	/**
	 * Reference objects
	 */
	references: Reference[]
	/**
	 * Ordered list of reference IDs, used for citation numbers.
	 */
	referencesOrder: string[]
	/**
	 * List of registered citations, used to generate backrefs in <References />.
	 */
	registeredCitations: Record<string, string[]>
	registerCitation: (refId: string, citeId: string) => void
}

export const ReferencesContext = createContext<ReferenceContext>({
	references: [],
	referencesOrder: [],
	registeredCitations: {},
	registerCitation: () => null,
})

type ReferencesProps = { references: Reference[]; children?: ReactNode }

export const ReferencesProvider = ({ references, children }: ReferencesProps) => {
	const [referencesOrder, setReferencesOrder] = useState<
		ReferenceContext['referencesOrder']
	>([])
	const [registeredCitations, setRegisteredCitations] = useState<
		ReferenceContext['registeredCitations']
	>({})

	const registerCitation = useCallback((refId: string, citeId: string) => {
		setReferencesOrder((current) =>
			current.includes(refId) ? current : [...current, refId],
		)

		setRegisteredCitations((current) => ({
			...current,
			[refId]: current[refId]?.includes(citeId)
				? current[refId]
				: [...(current[refId] ?? []), citeId],
		}))
	}, [])

	return (
		<ReferencesContext.Provider
			value={{ references, referencesOrder, registerCitation, registeredCitations }}
		>
			{children}
		</ReferencesContext.Provider>
	)
}
