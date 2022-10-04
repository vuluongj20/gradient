import { HTMLAttributes, ReactNode } from 'react'

import { colorAliases } from '@theme/colors'

type Props = {
  htmlAttributes: HTMLAttributes<HTMLHtmlElement>
  headComponents: ReactNode
  bodyAttributes: HTMLAttributes<HTMLBodyElement>
  preBodyComponents: ReactNode
  body: string
  postBodyComponents: ReactNode
}

const HTML = (props: Props) => {
  return (
    <html lang="en" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              background-color: ${colorAliases.paper.background};
            }
            @media only screen and (prefers-color-scheme: dark) {
              body {
                background-color: ${colorAliases.charcoal.background};
              }
            }
            ${(Object.keys(colorAliases) as (keyof typeof colorAliases)[])
              .map(
                (key) => `
              body.palette-${key} {
                background-color: ${colorAliases[key].background};
              }
              @media only screen and (prefers-color-scheme: dark) {
                body.palette-${key} {
                  background-color: ${colorAliases[key].background};
                }
              }
            `,
              )
              .join('')}
          `,
          }}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              try {
                const localSettings = JSON.parse(localStorage.getItem('UP'))
                const appearance = localSettings?.theme?.colors?.appearance
                const lightPalette = localSettings?.theme?.colors?.lightPalette
                const darkPalette = localSettings?.theme?.colors?.darkPalette

                if (!appearance || appearance === 'auto') {
                  const preferDarkAppearance =
                    window.matchMedia('(prefers-color-scheme: dark)').matches === true
                  if (preferDarkAppearance) {
                    document.body.classList.add('palette-' + darkPalette)
                  } else {
                    document.body.classList.add('palette-' + lightPalette)
                  }
                } else {
                  const palette = appearance === 'light' ? lightPalette : darkPalette
                  document.body.classList.add('palette-' + palette)
                }
              } catch (e) {console.warn(e)}
            })();
          `,
          }}
        />
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src="https://unpkg.com/focus-visible@5.2.0/dist/focus-visible.min.js" />
      </body>
    </html>
  )
}

export default HTML
