import { cards } from '@data/home'
import { Fragment } from 'react'

import CardArea from '@components/cardArea'
import Header from '@components/header'
import SEO from '@components/seo'

const IndexPage = (): JSX.Element => {
  return (
    <Fragment>
      <SEO />
      <Header />
      <CardArea cards={cards} />
    </Fragment>
  )
}

export default IndexPage
