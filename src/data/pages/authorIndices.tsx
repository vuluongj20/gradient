import * as authors from '../authors.json'
import { Page } from './types'

const authorIndices: Page[] = authors.map((author) => ({
	...author,
	path: `/author/${author.id}`,
}))

export default authorIndices
