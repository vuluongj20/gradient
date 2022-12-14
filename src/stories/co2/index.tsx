import { PageProps } from 'gatsby'
import styled from 'styled-components'

import ContentMDX from './content.mdx'
import { DataProvider } from './dataContext'

import Page from '@components/page'
import SEO from '@components/seo'

import MDXStoryProvider from '@utils/mdxStoryProvider'

export interface Datum {
  date: Date
  level: number
}

export interface VizData {
  key: string
  height: string
  description?: string[]
}

export interface VizSection {
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
  --theme: var(--color-scale-green1);
  --warm: var(--color-scale-red1);
  --cool: var(--color-scale-blue1);
  min-height: 100vh;

  svg {
    margin: 0 auto;
    overflow: visible;
  }
`
