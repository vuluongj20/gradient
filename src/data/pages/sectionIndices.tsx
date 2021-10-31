import { sections } from '../sections'
import { Page } from './types'

export const sectionIndices: Page[] = sections.map((section) => ({
	...section,
	path: `/section/${section.id}`,
}))
