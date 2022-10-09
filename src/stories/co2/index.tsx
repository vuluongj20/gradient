import { PageProps } from 'gatsby'
import styled from 'styled-components'

import ContentMDX from './content.mdx'
import { DataProvider } from './dataContext'

import Page from '@components/page'
import SEO from '@components/seo'

import MDXStoryProvider from '@utils/mdxStoryProvider'

export type Data = {
  date: Date
  level: number
}[]

export type VizData = {
  key: string
  height: string
  description?: string[]
}

export type VizSection = {
  state: string
  des: string
  params?: number[]
}

const Main = () => {
  return (
    <Page>
      <MDXStoryProvider>
        <DataProvider>
          <Wrap>
            <ContentMDX />
          </Wrap>
        </DataProvider>
      </MDXStoryProvider>
    </Page>
  )
}

export default Main

export const Head = ({ pageContext }: PageProps) => <SEO {...pageContext} />

const Wrap = styled.article`
  --theme: ${(p) => p.theme.green1};
  --warm: ${(p) => p.theme.red1};
  --cool: ${(p) => p.theme.blue1};
  min-height: 100vh;

  svg {
    margin: 0 auto;
    overflow: visible;
  }
`
