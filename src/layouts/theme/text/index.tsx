import { CSSObject } from 'styled-components'

import domaine from '@theme/text/domaine'
import sohne from '@theme/text/sohne'
import sohneMono from '@theme/text/sohneMono'

import { Breakpoint, breakpoints } from '@utils/style'

type TextCategoryStyles = {
	fontFamily: string
	fontWeight: number
	lineHeight: number
	fontSize?: string
	letterSpacing?: string
	textTransform?: 'capitalize' | 'uppercase' | 'lowercase'
}

type TextCategoryDefinition = TextCategoryStyles & {
	fontSizes: Record<Breakpoint, number>
}

type TextCategory = CSSObject

type TextCategoryName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label'

export type TextScaleDefinition = Record<TextCategoryName, TextCategoryDefinition>

export type TextScale = Record<TextCategoryName, TextCategory>

const getCSSStyleObject = (scale: TextScaleDefinition): TextScale => {
	const result: Partial<TextScale> = {}

	;(Object.keys(scale) as TextCategoryName[]).map((key) => {
		const { fontSizes, ...rest } = scale[key]
		result[key] = {
			...rest,
			fontSize: `${fontSizes.xl}rem`,
		}
		;(Object.keys(fontSizes) as Breakpoint[]).map((breakpoint) => {
			;(result[key] as CSSObject)[
				`@media only screen and (max-width: ${breakpoints[breakpoint]})`
			] = {
				fontSize: `${fontSizes[breakpoint]}rem`,
			}
		})
		;(result[key] as CSSObject)[`@media only screen and (max-height: ${breakpoints.s})`] =
			{
				fontSize: `${fontSizes.xs}rem`,
			}
	})

	return result as TextScale
}

export const textScales = {
	sohne: getCSSStyleObject(sohne),
	'sohne-mono': getCSSStyleObject(sohneMono),
	domaine: getCSSStyleObject(domaine),
}
