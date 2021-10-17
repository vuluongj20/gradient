import { createGlobalStyle } from 'styled-components'

import {
  sohneAtRules,
  domaineDisplayNarrowAtRules,
  domaineTextAtRules,
} from './theme/fonts'

import { theme } from '@utils/styling'

const GlobalStyles = createGlobalStyle`
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
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    font-feature-settings: 'kern', 'liga';
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
  p, a {
    ${theme('t.ui.body')}; 
    margin: 0;
  }
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
    ${theme('u.focusVisible')}; 
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
    ${theme('u.focusVisible')}; 
  }
`

export default GlobalStyles
