import { theme } from '@utils'
import { Component, Fragment, ReactChild } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

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

type Props = {
	children: ReactChild
}

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
  }
  h1 {${theme('t.ui.h1')}}
  h2 {${theme('t.ui.h2')}}
  h3 {${theme('t.ui.h3')}}
  h4 {${theme('t.ui.h4')}}
  h5 {${theme('t.ui.h5')}}
  h6 {${theme('t.ui.h6')}}
  p, a {${theme('t.ui.body')}}
  a {
  	color: ${theme('c.gray2')};
  	text-decoration-color: ${theme('c.gray8')};
  }
  a:hover {
  	color: ${theme('c.gray1')};
  	text-decoration-color: ${theme('c.gray5')};
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
			<Fragment>
				<ThemeProvider theme={getTheme(this.state)}>
					<GlobalStyle />
					{children}
					<a href="">Hello</a>
				</ThemeProvider>
			</Fragment>
		)
	}
}

export default Layout
