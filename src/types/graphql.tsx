export default `
	type Site {
	  siteMetadata: SiteMetadata!
	}

	type SiteMetadata {
	  dir: String!
	  lang: String!
	  title: String!
	  description: String!
	  type: String!
	  author: String!
	  authorTwitter: String!
	  siteUrl: String!
  }

  type StoriesJson implements Node {
  	featuredIn: [String!]!
  	slug: String!
  	title: String!
  	featuredIn: [String!]
  	featuredSize: String!
  	sections: [String!]!
  	authors: [String!]!
  	buildPage: Boolean
  }
`
