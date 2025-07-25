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

	type Page {
	  slug: String!
	  title: String!
	}

  type StoriesJson implements Node {
  	featuredIn: [String!]!
  	slug: String!
  	title: String!
  	description: String!
  	featuredIn: [String!]
  	featuredSize: String!
  	sections: [String!]!
  	authors: [String!]!
  	buildPage: Boolean
  }

  type SectionsJson implements Node {
    slug: String!
    name: String!
  }

  type AuthorsJson implements Node {
    slug: String!
    name: String!
  }
`
