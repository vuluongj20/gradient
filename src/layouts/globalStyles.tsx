import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    font-size: ${(p) => p.theme.text.rootSize};
    line-height: 1.5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    transition: background-color ${(p) => p.theme.animation.mediumOut}, 
      border-color ${(p) => p.theme.animation.mediumOut},
      box-shadow ${(p) => p.theme.animation.mediumOut},
      color ${(p) => p.theme.animation.mediumOut};
  }

  body {
    font-feature-settings: 'kern', 'liga';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    direction: ltr;
    text-align: left;
    font-family: ${(p) => p.theme.text.ui.body.fontFamily};
    font-size: ${(p) => p.theme.text.rootSize};
    color: ${(p) => p.theme.colors.text};
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(p) => p.theme.colors.heading};
    margin: 0;
  }
  h1 {${(p) => p.theme.text.ui.h1}}
  h2 {${(p) => p.theme.text.ui.h2}}
  h3 {${(p) => p.theme.text.ui.h3}}
  h4 {${(p) => p.theme.text.ui.h4}}
  h5 {${(p) => p.theme.text.ui.h5}}
  h6 {${(p) => p.theme.text.ui.h6}}

  p, a {
    ${(p) => p.theme.text.ui.body}; 
    margin: 0;
  }

  a {
    color: ${(p) => p.theme.colors.text};
    text-decoration: none;
    cursor: pointer;
    border-radius: ${(p) => p.theme.radii.s};
    transition: color, box-shadow ${(p) => p.theme.animation.vFastOut};
  }
  a:hover {
    text-decoration: none;
  }
  a:focus {
    outline: none;
  }
  a.focus-visible {
    ${(p) => p.theme.utils.focusVisible}; 
  }

  button {
    ${(p) => p.theme.text.ui.label};
    color: ${(p) => p.theme.colors.buttonLabel};

    appearance: none;
    background: transparent;
    border: none;
    border-radius: ${(p) => p.theme.radii.s};
    cursor: pointer;
    transition: color, box-shadow ${(p) => p.theme.animation.vFastOut};

    &:hover {
      color: ${(p) => p.theme.colors.text};
    }
  }
  button:focus {
    outline: none;
  }
  button.focus-visible {
    ${(p) => p.theme.utils.focusVisible}; 
  }

  input {
    font-size: ${(p) => p.theme.text.rootSize};
    transition: color, box-shadow ${(p) => p.theme.animation.vFastOut};
  }
  input:focus {
    outline: none;
  }
  input.focus-visible {
    ${(p) => p.theme.utils.focusVisible}; 
  }

  hr {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid 1px ${(p) => p.theme.colors.line};
    grid-column: 1 / -1;
  }

  ol, ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  li:not(:last-child) {
    margin-bottom: ${(p) => p.theme.space[1]};
  }

  .tl-edges {
    overflow: initial;
  }
`

export default GlobalStyles
