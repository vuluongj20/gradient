import { HTMLAttributes } from 'react'

import { colorPalettes } from './layouts/theme/colors'

type Props = {
  htmlAttributes: HTMLAttributes<HTMLDocument>
  headComponents: JSX.Element[]
  bodyAttributes: HTMLAttributes<HTMLBodyElement>
  preBodyComponents: JSX.Element[]
  body: string
  postBodyComponents: JSX.Element[]
}

export default function HTML(props: Props): JSX.Element {
  return (
    <html lang="en" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              background-color: ${colorPalettes.paper.colors.surface2};
            }
            ${Object.keys(colorPalettes)
              .map(
                (key) => `
              body.palette-${key} {
                background-color: ${colorPalettes[key].colors.surface2};
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
                const theme = localStorage.getItem('theme')
                if (!theme || theme === 'auto') {
                  const preferDarkTheme =
                    window.matchMedia('(prefers-color-scheme: dark)').matches === true
                  if (preferDarkTheme) {
                    document.body.classList.add('theme-dark')
                  } else {
                    document.body.classList.add('theme-light')
                  }
                } else {
                  document.body.classList.add('theme-' + theme)
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
      </body>
    </html>
  )
}
