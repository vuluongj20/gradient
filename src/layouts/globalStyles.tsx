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
    text-size-adjust: 100%;
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
    position: relative;
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

  small {
    ${(p) => p.theme.text.system.small}; 
    color: ${(p) => p.theme.label};
  }

  strong {
    color: ${(p) => p.theme.heading};
  }

  a {
    cursor: pointer;
    border-radius: ${(p) => p.theme.radii.s};

    text-decoration-line: underline;
    text-decoration-color: transparent;
    transition: color ${(p) => p.theme.animation.vFastOut}, 
      box-shadow ${(p) => p.theme.animation.vFastOut};
  }
  a:hover:not([data-no-underline="true"]) {
    text-decoration-color: ${(p) => p.theme.linkUnderline};
  }
  a:focus {
    outline: none;
  }
  a.focus-visible {
    ${(p) => p.theme.focusVisible}; 
  }

  button {
    margin: 0;
  }


  input {
    appearance: none;
    font-size: 1rem;
    transition: color ${(p) => p.theme.animation.vFastOut}, 
      box-shadow ${(p) => p.theme.animation.vFastOut};
  }
  input:focus {
    outline: none;
  }
  input.focus-visible {
    ${(p) => p.theme.focusVisible}; 
  }

  ol, ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  abbr {
    text-decoration: none;
  }
  @media not all and (hover: none) {
    abbr {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-color: ${(p) => p.theme.contentLinkUnderline};
      text-decoration-thickness: 0.05rem;
    }
  }

  svg {
    overflow: visible;
  }

  .tl-edges {
    overflow: initial;
  }

  .autolinked-header.before {
    ${(p) => p.theme.flexCenter};
    height: 100%;
    padding-right: ${(p) => p.theme.space[0.5]};

    > div {
      ${(p) => p.theme.flexCenter};
    }

    ${(p) => p.theme.media.xs} {
      padding-right: ${(p) => p.theme.space[0]};
    }
  }
  .autolinked-header svg {
    fill: ${(p) => p.theme.label};

    ${(p) => p.theme.media.xs} {
      width: 0.75em;
    }
  }

  .katex {
    display: inline-block;
    color: transparent;
    transition: color ${(p) => p.theme.animation.vFastOut};
  }
  .katex-display {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    ${(p) => p.theme.marginBottom[3]}
  }
`

export default GlobalStyles
