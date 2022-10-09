import { ReactNode, createContext } from 'react'

export const ReferencesContext = createContext<CSL.Data[]>([])

type ReferencesProps = { references: CSL.Data[]; children?: ReactNode }
export const ReferencesProvider = ({ references, children }: ReferencesProps) => {
	return (
		<ReferencesContext.Provider value={references}>{children}</ReferencesContext.Provider>
	)
}
