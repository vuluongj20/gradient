import { HTMLAttributes, ReactNode } from 'react'

import { colorAliases } from '@theme/colors'

const paletteStyles = `body{background-color:${
  colorAliases.paper.background
}}@media only screen and (prefers-color-scheme:dark){body{background-color:${
  colorAliases.charcoal.background
}}}${(Object.keys(colorAliases) as (keyof typeof colorAliases)[])
  .map(
    (key) =>
      `body.palette-${key}{background-color:${colorAliases[key].background}}@media only screen and (prefers-color-scheme:dark){body.palette-${key}{background-color:${colorAliases[key].background}}}`,
  )
  .join('')}`

const paletteScript = `!function(){try{const e=JSON.parse(localStorage.getItem("UP")),t=e?.theme?.colors?.appearance,a=e?.theme?.colors?.lightPalette,o=e?.theme?.colors?.darkPalette;if(t&&"auto"!==t){const e="light"===t?a:o;document.body.classList.add("palette-"+e)}else{!0===window.matchMedia("(prefers-color-scheme: dark)").matches?document.body.classList.add("palette-"+o):document.body.classList.add("palette-"+a)}}catch(e){console.warn(e)}}();`

interface HTMLProps {
  htmlAttributes: HTMLAttributes<HTMLHtmlElement>
  headComponents: ReactNode
  bodyAttributes: HTMLAttributes<HTMLBodyElement>
  preBodyComponents: ReactNode
  body: string
  postBodyComponents: ReactNode
}

const HTML = (props: HTMLProps) => {
  return (
    <html lang="en" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="stylesheet" href="/katex.min.css" />
        <style>{paletteStyles}</style>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <script>{paletteScript}</script>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default HTML
