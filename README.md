# Gradient

Gradient is an online publication on the topics of technology, design, philosophy, and the law. It is live on [gradient.ooo](https://www.gradient.ooo). The front end is written in React, with page generation handled by Gatsby.

## Setup

First, to install the required packages, run the following commands in bash:

```
yarn install
yarn global add gatsby-cli
```

Then, to start a local development server, just run:

```
yarn dev
```

That's it! The site should be up and running on [localhost:8000](http://localhost:8000).

## Project Structure

```
| src
    | pages
    | templates
    | layouts
    | components
    | images
| static
    | assets
        | images
```

In the `src` folder:

- `pages` contains files to be turned into individual pages during the Gatsby build process. Pages can be written:

  - As React components in `.tsx` files [(view docs)](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs).

  - As markup in `.mdx` files [(view docs)](https://www.gatsbyjs.com/docs/how-to/routing/mdx/).

- `templates` contains reusable code that can generate multiple pages of the same layout [(view docs)](https://www.gatsbyjs.com/docs/conceptual/building-with-components/#page-template-components).

- `layouts` stores a global layout component that is wrapped around every page. This is useful for providing global contexts, like a theme context. Implemented using `gatsby-plugin-layout` [(view docs)](https://www.gatsbyjs.com/plugins/gatsby-plugin-layout/).

- `images` contains all raw image files that will be transformed into dynamic, efficient image formats through `gatsby-plugin-image` [(view docs)](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/).

- `components` is where to store the reusable React components and page-specific components.

Assets in `static` will not be transformed by webpack or Gatsby during the build process. Instead, they will be copied directly to the final build in `public`.

## Resources

Here are some quick links to documentation for core packages:

- [Gatsby](https://www.gatsbyjs.com/docs/)

- [React](https://reactjs.org/docs/getting-started.html)

- [MDX](https://mdxjs.com) (Markdown documents with JSX support)
