import { graphql, useStaticQuery } from 'gatsby'
import { ComponentProps } from 'react'

import Figure from '@components/figure'
import Grid from '@components/grid'

/**
 * Reusable image component made specifically for use in MDX files. There
 * should a new copy of this component for every image, each with a custom
 * static query. Then, each can be imported and added inline in MDX files.
 *
 *
 * Image-related text content like alt, caption, and "from" caption can be
 * added as props.
 */
const Image = (props: ComponentProps<typeof Figure>) => {
	const imageQueryResult = useStaticQuery<Queries.CO2MaunaLoaObservatoryImageQuery>(
		graphql`
			query CO2MaunaLoaObservatoryImage {
				file(relativePath: { eq: "co2/images/mauna-loa-observatory.jpg" }) {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH, quality: 90)
					}
				}
			}
		`,
	)
	const imageData = imageQueryResult.file?.childImageSharp?.gatsbyImageData
	if (!imageData) return null

	return (
		<Grid noPaddingOnMobile>
			<Figure
				{...props}
				image={imageData}
				gridColumn="wide"
				loading="eager"
				sizes="100vw"
			/>
		</Grid>
	)
}

export default Image
