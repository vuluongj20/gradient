import { Component, Fragment, ReactChild } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import {
	getTheme,
	UserPreferences,
	UserPreferencesKey,
	UserPreferencesValue,
} from './theme'

type Props = {
	children: ReactChild
}

const GlobalStyle = createGlobalStyle`
  body {
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	direction: ltr;
  	text-align: left;
    color: ${(p) => p.theme.colors.gray1};
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
				ui: 'ui',
				content: 'ui',
				sizeOffset: 0,
			},
			reduceMotion: false,
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
					<p>Why Hello there</p>
				</ThemeProvider>
			</Fragment>
		)
	}
}

export default Layout
