import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 100%;
    line-height: 1.2;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    transition: background-color ${(p) => p.theme.animation.mediumOut}, 
      border-color ${(p) => p.theme.animation.mediumOut},
      box-shadow ${(p) => p.theme.animation.mediumOut};
  }

  body {
    ${(p) => p.theme.text.system.body}; 
    color: ${(p) => p.theme.body};
    font-feature-settings: 'kern', 'liga';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    direction: ltr;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  @supports (padding-top: env(safe-area-inset-top)) {
    body {
      --sat: env(safe-area-inset-top);
      --sar: env(safe-area-inset-right);
      --sab: env(safe-area-inset-bottom);
      --sal: env(safe-area-inset-left);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(p) => p.theme.heading};
    margin: 0;
  }
  h1 {${(p) => p.theme.text.system.h1}}
  h2 {${(p) => p.theme.text.system.h2}}
  h3 {${(p) => p.theme.text.system.h3}}
  h4 {${(p) => p.theme.text.system.h4}}
  h5 {${(p) => p.theme.text.system.h5}}
  h6 {${(p) => p.theme.text.system.h6}}

  p, a, li, input, label {
    ${(p) => p.theme.text.system.body}; 
    color: ${(p) => p.theme.body};
    margin: 0;
  }

  strong {
    color: ${(p) => p.theme.heading};
  }

  a {
    color: ${(p) => p.theme.body};
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
    ${(p) => p.theme.text.system.label};
    color: ${(p) => p.theme.buttonLabel};

    appearance: none;
    background: transparent;
    border: none;
    border-radius: ${(p) => p.theme.radii.s};
    cursor: pointer;
    transition: color, box-shadow ${(p) => p.theme.animation.vFastOut};

    &:hover {
      color: ${(p) => p.theme.body};
    }
  }
  button:focus {
    outline: none;
  }
  button.focus-visible {
    ${(p) => p.theme.utils.focusVisible}; 
  }

  input {
    font-size: 1rem;
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
    border-bottom: solid 1px ${(p) => p.theme.line};
    grid-column: 1 / -1;
  }

  ol, ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  .tl-edges {
    overflow: initial;
  }

  .autolinked-header.before {
    ${(p) => p.theme.utils.flexCenter};
     height: 100%;
  }
  .autolinked-header svg {
    fill: ${(p) => p.theme.label};
  }
`

export default GlobalStyles
