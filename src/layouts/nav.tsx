import { Fragment } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'

import Grid from '@components/grid'

interface NavProps {
	storyTitle?: string
}

const Nav = ({ storyTitle }: NavProps) => {
	const { pathname } = useLocation()
	const linkIsDisabled = pathname === '/'

	if (!storyTitle) return null

	return (
		<Wrap aria-label="Navigation">
			<InnerGrid>
				<Fragment>
					{storyTitle ? (
						<StoryTitle href="/" tabIndex={-1}>
							{storyTitle}
						</StoryTitle>
					) : (
						<Title to="/" tabIndex={linkIsDisabled ? -1 : 0} aria-label="Vu Luong">
							Gradient\
						</Title>
					)}
				</Fragment>
			</InnerGrid>
		</Wrap>
	)
}

export default Nav

const Wrap = styled.nav`
	--nav-vertical-offset: -2rem;

	position: fixed;
	top: var(--nav-vertical-offset);
	left: 0;

	width: var(--nav-width);
	height: calc(var(--nav-height) - var(--nav-vertical-offset));
	z-index: var(--z-index-nav);
	padding: 2rem var(--page-margin-right) 0 var(--page-margin-left);

	&::before {
		content: '';
		${(p) => p.theme.spread};
		transition: opacity var(--animation-v-fast-out);
		background-color: var(--color-background);

		/* background-image: url('${BackgroundNoise.src}'); */
		background-size: 25px;
		background-repeat: repeat;

		@supports (backdrop-filter: blur(1px)) {
			background-color: var(--color-background-alpha-backdrop);
			backdrop-filter: saturate(200%) blur(20px);
		}
	}

	@media print {
		display: none;
	}
`

const InnerGrid = styled(Grid)`
	align-items: center;
	position: relative;
	padding-left: 0;
	padding-right: 0;

	width: 100%;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	max-width: calc(
		var(--max-site-width) - var(--page-margin-left) - var(--page-margin-right)
	);

	&::before {
		${(p) => p.theme.spread};
		content: '';
		pointer-events: none;
		box-shadow: 0 1px 0 0 var(--color-line);

		${(p) => p.theme.breakpoints.xs} {
			left: calc(var(--page-margin-left) * -1);
			right: calc(var(--page-margin-right) * -1);
			width: calc(100% + var(--page-margin-left) + var(--page-margin-right));
		}
	}
`

const Title = styled(Link)`
	grid-column: 1 / -3;

	/* Expand click area */
	padding: var(--space-0);
	margin: calc(var(--space-0) * -1);

	${(p) => p.theme.text.h6};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	&:hover {
		text-decoration: none;
	}
`

// Use anchor tag instead of NextJS <Link /> to force reload
const StoryTitle = styled.a`
	grid-column: 1 / -1;

	display: block;
	width: max-content;
	max-width: calc(100% + var(--space-1));

	/* Expand click area */
	padding: var(--space-1);
	margin: calc(var(--space-1) * -1);

	${(p) => p.theme.text.h6};
	color: var(--color-heading);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	&:hover {
		text-decoration: none;
	}

	${(p) => p.theme.breakpoints.xs} {
		padding: var(--space-1) 0;
		margin: calc(var(--space-1) * -1) 0;
	}
`

const NavLink = styled(Link)<{ disabled?: boolean; $active: boolean }>`
	display: block;
	white-space: nowrap;
	padding: var(--space-1);
	transform: translateX(var(--space-1));
	${(p) => p.theme.text.label};
	${(p) => p.disabled && `&& {color: inherit}`}

	&:active {
		color: var(--color-label);
	}

	${(p) =>
		p.$active &&
		css`
			color: var(--color-label);
			&:hover {
				text-decoration: none;
			}
		`}

	justify-self: end;
	&:last-of-type {
		grid-column: -2;
	}
	&:nth-last-of-type(2) {
		grid-column: -3;
	}
`
