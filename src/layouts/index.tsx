import { Component, ReactChild } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import Nav from './nav'
import {
	getTheme,
	UserPreferences,
	UserPreferencesKey,
	UserPreferencesValue,
} from './theme'
import {
	sohneAtRules,
	domaineDisplayNarrowAtRules,
	domaineTextAtRules,
} from './theme/fonts'

import { theme, gridColCounts } from '@utils'

type Props = {
	children: ReactChild
}

const frameWidth = 2 // unit = em

const GlobalStyle = createGlobalStyle`
	${sohneAtRules}
	${domaineDisplayNarrowAtRules}
	${domaineTextAtRules}
	html {
	  font-size: ${theme('t.rootSize')};
	  box-sizing: border-box;
	  margin: 0;
	  padding: 0;
	}
	*,
	*:before,
	*:after {
	  box-sizing: inherit;
	}
  body {
  	font-feature-settings: 'kern', 'liga';
  	-moz-font-feature-settings: 'kern', 'liga';
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	direction: ltr;
  	text-align: left;
  	font-family: ${theme('t.ui.body.fontFamily')};
  	font-size: ${theme('t.rootSize')};
  	color: ${theme('c.gray2')};
  	margin: 0;
  	padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
  	color: ${theme('c.gray1')};
  	margin: 0;
  }
  h1 {${theme('t.ui.h1')}}
  h2 {${theme('t.ui.h2')}}
  h3 {${theme('t.ui.h3')}}
  h4 {${theme('t.ui.h4')}}
  h5 {${theme('t.ui.h5')}}
  h6 {${theme('t.ui.h6')}}
  p, a {${theme('t.ui.body')}; margin: 0;}
  a {
  	color: ${theme('c.gray2')};
  	text-decoration-color: ${theme('c.gray8')};
  	cursor: pointer;
  	transition: color, box-shadow 0.25s ${theme('a.easeOutQuad')};
  }
  a:hover {
  	color: ${theme('c.gray1')};
  	text-decoration-color: ${theme('c.gray5')};
  }
  a:focus-visible {
  	outline: none;
  	box-shadow: 0 0 0 0.25em ${theme('c.blue2')};
  	z-index: 1;
  }
  button {
  	appearance: none;
  	background: transparent;
  	border: none;
  	border-radius: 0.5em;

  	${theme('t.ui.label')};
  	color: ${theme('c.gray1')};

  	cursor: pointer;

  	transition: color, box-shadow 0.25s ${theme('a.easeOutQuad')};

  	&:hover {
  		color: ${theme('c.gray3')};
  	}
  }
  button:focus-visible {
  	outline: none;
  	box-shadow: 0 0 0 0.25em ${theme('c.blue2')};
  }
`

class Layout extends Component<Props, UserPreferences> {
	constructor(props: Props) {
		super(props)
		this.state = {
			color: {
				appearance: 'auto',
				lightPalette: 'paper',
				darkPalette: 'charcoal',
				increaseContrast: false,
			},
			text: {
				ui: 'sohne',
				content: 'domaine',
			},
			alwaysShowVideoCaptions: false,
		}
	}

	setUserPreference(
		key: UserPreferencesKey | UserPreferencesKey[],
		value: UserPreferencesValue,
	): void {
		if (typeof key === 'string') {
			this.setState(
				{
					...this.state,
					[key]: value,
				},
				() => {
					localStorage.setItem('UP', JSON.stringify(this.state))
				},
			)
		} else {
			const currentKeyedState = { ...this.state[key[0]] }
			currentKeyedState[key[1]] = value

			this.setState(
				{
					...this.state,
					[key[0]]: currentKeyedState,
				},
				() => {
					localStorage.setItem('UP', JSON.stringify(this.state))
				},
			)
		}
	}

	render(): JSX.Element {
		const { children } = this.props

		return (
			<ThemeProvider
				theme={getTheme(this.state)}
				themes={getTheme(this.state)}
				themess={getTheme(this.state)}
			>
				<GlobalStyle />
				<Nav frameWidth={frameWidth} />
				<PageContent id="page-content">{children}</PageContent>
			</ThemeProvider>
		)
	}
}

export default Layout

const PageContent = styled('div')`
	position: relative;
	max-width: ${(p) => p.theme.b.xl};
	padding: ${frameWidth}em ${frameWidth}em 0;
	margin: 0 auto;

	display: grid;
	grid-template-columns: [start] repeat(${gridColCounts.xl}, 1fr) [end];
	grid-gap: 1.25em;

	@media only screen and (max-width: ${(p) => p.theme.b.l}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.l}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.m}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.m}, 1fr)
			[end];
		grid-gap: 1em;
	}

	@media only screen and (max-width: ${(p) => p.theme.b.s}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.s}, 1fr)
			[end];
	}

	@media only screen and (max-width: ${(p) => p.theme.b.xs}) {
		grid-template-columns:
			[start] repeat(${gridColCounts.xs}, 1fr)
			[end];
		grid-gap: 0.75em;
	}
`
