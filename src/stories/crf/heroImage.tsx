import styled from 'styled-components'

import Grid from '@components/grid'

const HeroImage = () => {
	return (
		<Grid>
			<Wrap>
				<SVG width="1728" height="1117" viewBox="0 0 1728 1117" fill="none">
					<title>Curved text lines</title>
					<path
						id="curve-1"
						d="M141.5 172C436.333 136.167 1096.1 88.2 1376.5 183C1727 301.5 1593.5 824 1194 786.5C874.4 756.5 914.167 526.667 974 415.5"
						stroke="transparent"
					/>
					<text fillOpacity="0.5">
						<textPath href="#curve-1">
							So, for instance, The Object of Knowledge grew from the 91 pages of the
							first edition to the 460 pages of the sixth edition in 1928. This style of
							writing makes the development of his thought particularly perspicuous.
						</textPath>
					</text>

					<path
						id="curve-2"
						d="M274 963C494.826 810.061 942.782 409.146 968 29"
						stroke="transparent"
					/>
					<text fillOpacity="0.4">
						<textPath href="#curve-2">
							In what follows, the Critique of Pure Reason is cited by the usual A/B
							method.
						</textPath>
					</text>

					<path
						id="curve-3"
						d="M233.5 467C317.167 689.333 619.5 1111.9 1159.5 1023.5"
						stroke="transparent"
					/>
					<text fillOpacity="0.3">
						<textPath href="#curve-3">
							Vervet monkeys give alarm calls to warn fellow monkeys of the presence of
							predators.
						</textPath>
					</text>

					<path
						id="curve-4"
						d="M503 431C913.4 514.6 1423.67 221.5 1627.5 64.5"
						stroke="transparent"
					/>
					<text fillOpacity="0.4">
						<textPath href="#curve-4">
							This entry proceeds mostly chronologically, to indicate the historical
							development of the topic.
						</textPath>
					</text>

					<path
						id="curve-5"
						d="M509.5 1078C744.5 1106.67 1258.1 1058.9 1432.5 638.5"
						stroke="transparent"
					/>
					<text fillOpacity="0.5">
						<textPath href="#curve-5">
							Current work on Latinx philosophy tends to cluster into several subject
							matters.
						</textPath>
					</text>

					<path
						id="curve-6"
						d="M391 541.5C616.833 518.167 1166.5 527 1558.5 749"
						stroke="transparent"
					/>
					<text fillOpacity="0.6">
						<textPath href="#curve-6">
							In its most important role in bioethics, informed consent is a legitimacy
							requirement.
						</textPath>
					</text>

					<path
						id="curve-7"
						d="M297.5 94.5C494.333 199 890.4 511.7 900 926.5"
						stroke="transparent"
					/>
					<text fillOpacity="0.7">
						<textPath href="#curve-7">
							He also wrote numerous works on other philosophical topics, especially
							psychology.
						</textPath>
					</text>

					<path
						id="curve-8"
						d="M43 507C143.924 729.146 508.618 1151.36 1160 1063.03"
						stroke="transparent"
					/>
					<text fillOpacity="0.8">
						<textPath href="#curve-8">
							“I am certain that I can have no knowledge of what is outside me except by
							means of the ideas I have within me.”
						</textPath>
					</text>

					<path
						id="curve-9"
						d="M919.992 51C778.589 152.123 501.935 411.889 526.538 641.967C557.292 929.565 797.436 984.661 919.992 936.523C1156.19 843.75 1225.32 510.224 909 481"
						stroke="transparent"
					/>
					<text fillOpacity="0.9">
						<textPath href="#curve-9">
							In addition to exhibiting sensitive dependence, chaotic systems possess two
							other properties: they are deterministic and nonlinear.
						</textPath>
					</text>
				</SVG>
			</Wrap>
		</Grid>
	)
}

export default HeroImage

const Wrap = styled.div`
	${(p) => p.theme.utils.gridColumn.wide};
	${(p) => p.theme.utils.space.marginBottom[5]};
`

const SVG = styled.svg`
	width: 100%;
	height: auto;
	border-radius: ${(p) => p.theme.radii.m};
	overflow: hidden;

	text {
		font-family: ${(p) => p.theme.text.viz.body.fontFamily};
		font-size: 20px;
		fill: ${(p) => p.theme.heading};
	}
`
