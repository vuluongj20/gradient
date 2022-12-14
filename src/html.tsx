import { HTMLAttributes, ReactNode } from 'react'

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
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
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
