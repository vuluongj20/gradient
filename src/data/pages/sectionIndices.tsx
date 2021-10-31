import * as sections from '../sections.json'
import { Page } from './types'

const sectionIndices: Page[] = sections.map((section) => ({
	...section,
	path: `/section/${section.id}`,
}))

export default sectionIndices
