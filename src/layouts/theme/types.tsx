import * as CSS from 'csstype'

import { BreakpointMediaRule } from './breakpoints'

import { Breakpoint } from '@types'

export type ColorKeys =
	| 'surface1'
	| 'surface2'
	| 'surface3'
	| 'surface4'
	| 'gray1'
	| 'gray2'
	| 'gray3'
	| 'gray4'
	| 'gray5'
	| 'gray6'
	| 'gray7'
	| 'gray8'
	| 'gray9'
	| 'red1'
	| 'red2'
	| 'red3'
	| 'red4'
	| 'red5'
	| 'red6'
	| 'yellow1'
	| 'yellow2'
	| 'yellow3'
	| 'yellow4'
	| 'yellow5'
	| 'yellow6'
	| 'green1'
	| 'green2'
	| 'green3'
	| 'green4'
	| 'green5'
	| 'green6'
	| 'teal1'
	| 'teal2'
	| 'teal3'
	| 'teal4'
	| 'teal5'
	| 'teal6'
	| 'blue1'
	| 'blue2'
	| 'blue3'
	| 'blue4'
	| 'blue5'
	| 'blue6'
	| 'purple1'
	| 'purple2'
	| 'purple3'
	| 'purple4'
	| 'purple5'
	| 'purple6'

export type ColorPalette = {
	id: string
	name: string
	appearance: 'light' | 'dark'
	colors: Record<ColorKeys, string>
}

export type ColorAliasName =
	| 'background'
	| 'surface'
	| 'surfaceElevated'
	| 'heading'
	| 'text'
	| 'label'
	| 'buttonLabel'
	| 'buttonLabelHover'
	| 'linkHover'
	| 'linkUnderlineHover'
	| 'line'
	| 'lineOnSurface'

export type ColorAliases = Record<ColorAliasName, string>

export type TypeCategoryStyles = {
	fontFamily: string
	fontWeight: number
	lineHeight: number
	letterSpacing?: string
	textTransform?: 'capitalize' | 'uppercase' | 'lowercase'
}

export type TypeCategoryDefinition = TypeCategoryStyles & {
	fontSizes: Record<Breakpoint, number>
}

export type TypeCategory = TypeCategoryStyles &
	Record<BreakpointMediaRule, CSS.Properties>

export type TypeCategoryName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label'

export type TypeScaleDefinition = Record<TypeCategoryName, TypeCategoryDefinition>

export type TypeScale = Record<TypeCategoryName, TypeCategory>

type EasingName =
	| 'easeInSine'
	| 'easeOutSine'
	| 'easeInOutSine'
	| 'easeInQuad'
	| 'easeOutQuad'
	| 'easeInOutQuad'
	| 'easeInCubic'
	| 'easeOutCubic'
	| 'easeInOutCubic'
	| 'easeInQuart'
	| 'easeOutQuart'
	| 'easeInOutQuart'
	| 'easeInQuint'
	| 'easeOutQuint'
	| 'easeInOutQuint'
	| 'easeInExpo'
	| 'easeOutExpo'
	| 'easeInOutExpo'
	| 'easeInCirc'
	| 'easeOutCirc'
	| 'easeInOutCirc'
	| 'easeInBack'
	| 'easeOutBack'
	| 'easeInOutBack'

export type Easings = Record<EasingName, string>

export type Animation = Easings & {
	reduced: boolean
}

export type UtilName = 'spread' | 'flexCenter' | 'absCenter' | 'focusVisible'

export type Utils = Record<UtilName, CSS.Properties>

export type Breakpoints = Record<Breakpoint, string>

export type Theme = {
	/** Color */
	c: ColorPalette['colors'] & ColorAliases
	/** Text */
	t: {
		rootSize: string
		ui: TypeScale
		content: TypeScale
	}
	/** Animation */
	a: Animation
	/** Breakpoints */
	b: Breakpoints
	/** Spacing */
	s: string[]
	/** Utilities */
	u: Utils
}
