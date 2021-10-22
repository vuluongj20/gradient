import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    font-size: ${(p) => p.theme.t.rootSize};
    line-height: 1.5;
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
    font-family: ${(p) => p.theme.t.ui.body.fontFamily};
    font-size: ${(p) => p.theme.t.rootSize};
    color: ${(p) => p.theme.c.text};
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(p) => p.theme.c.heading};
    margin: 0;
  }
  h1 {${(p) => p.theme.t.ui.h1}}
  h2 {${(p) => p.theme.t.ui.h2}}
  h3 {${(p) => p.theme.t.ui.h3}}
  h4 {${(p) => p.theme.t.ui.h4}}
  h5 {${(p) => p.theme.t.ui.h5}}
  h6 {${(p) => p.theme.t.ui.h6}}

  p, a {
    ${(p) => p.theme.t.ui.body}; 
    margin: 0;
  }

  a {
    color: ${(p) => p.theme.c.text};
    text-decoration: none;
    cursor: pointer;
    border-radius: ${(p) => p.theme.s[0]};
    transition: color, box-shadow 0.125s ${(p) => p.theme.a.easeOutQuad};
  }
  a:hover {
    text-decoration: none;
  }
  a:focus-visible {
    ${(p) => p.theme.u.focusVisible}; 
  }

  button {
    ${(p) => p.theme.t.ui.label};
    color: ${(p) => p.theme.c.buttonLabel};

    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
    transition: color, box-shadow 0.125s ${(p) => p.theme.a.easeOutQuad};

    &:hover {
      color: ${(p) => p.theme.c.text};
    }
  }
  button:focus-visible {
    ${(p) => p.theme.u.focusVisible}; 
  }

  hr {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid 1px ${(p) => p.theme.c.line};
  }

  li:not(:last-child) {
    margin-bottom: ${(p) => p.theme.s[1]};
  }

  .tl-edges {
    overflow: initial;
  }
`

export default GlobalStyles
