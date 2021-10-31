import { authors } from '../authors'
import { Page } from './types'

export const authorIndices: Page[] = authors.map((author) => ({
	...author,
	path: `/author/${author.id}`,
}))
