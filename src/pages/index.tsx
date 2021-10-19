import { Fragment } from 'react'

import { cards } from '@data/home'

import CardGrid from '@components/cardGrid'
import Header from '@components/header'
import SEO from '@components/seo'

const IndexPage = (): JSX.Element => {
  return (
    <Fragment>
      <SEO />
      <Header />
      <CardGrid cards={cards} />
    </Fragment>
  )
}

export default IndexPage
