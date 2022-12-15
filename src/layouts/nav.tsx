import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { navSize } from '@utils/style'

interface NavProps {
	pageTitle: string
}

const Nav = ({ pageTitle }: NavProps) => {
	const location = useLocation()
	const linkIsDisabled = location.pathname === '/'

	return (
		<Wrap>
			<InnerWrap>
				<HomeLink
					to="/"
					disabled={linkIsDisabled}
					tabIndex={linkIsDisabled ? -1 : 0}
					aria-label="Return to home page"
				>
					<HomeLogo width="1140" height="180" viewBox="0 0 1140 180">
						<g>
							<path d="M124.72 176V86.48H64.2399V106.64H103.84C103.6 122 100.24 134.24 93.5199 143.84C86.7999 153.44 77.9199 158 66.8799 158C53.9199 158 43.3599 152 35.6799 139.52C27.7599 127.04 23.9199 110.48 23.9199 90.08C23.9199 69.92 27.9999 53.6 36.1599 40.64C44.0799 27.92 54.3999 21.44 67.1199 21.44C75.7599 21.44 83.1999 24.56 89.4399 30.56C95.6799 36.32 99.9999 44.96 102.4 56.24L123.28 48.8C119.2 33.44 112.24 21.44 102.64 13.28C93.0399 5.12004 81.0399 1.04004 67.1199 1.04004C47.9199 1.04004 32.0799 9.44004 19.5999 26C7.11988 43.04 0.879883 64.4 0.879883 90.32C0.879883 116.24 6.87988 137.6 18.6399 153.92C30.6399 170.48 45.9999 178.64 64.7199 178.64C74.5599 178.64 82.9599 176.24 90.1599 170.96C97.3599 165.68 102.64 158.96 105.76 150.32V176H124.72Z" />
							<path d="M205.032 103.76L251.352 176H277.752L229.752 102.32C243.192 99.92 253.512 94.4 260.712 86C267.912 77.6 271.752 66.8 271.752 53.6C271.752 37.76 266.472 25.28 256.152 16.64C245.592 8.00004 230.952 3.68003 212.232 3.68003H151.752V176H174.792V103.76H205.032ZM174.792 23.6H210.792C223.272 23.6 232.632 26.24 239.352 31.28C245.832 36.56 249.192 44 249.192 53.6C249.192 63.44 245.832 70.88 239.112 75.92C232.392 81.2 222.792 83.84 210.552 83.84H174.552L174.792 23.6Z" />
							<path d="M284.144 176H306.704L320.624 130.64H381.344L395.264 176H418.544L364.544 3.68003H337.904L284.144 176ZM375.104 110.48H326.624L350.864 31.28L375.104 110.48Z" />
							<path d="M475.816 176C501.256 176 521.416 168.32 536.296 152.96C550.696 137.6 558.135 116.72 558.135 89.84C558.135 63.2 550.696 42.08 536.056 26.72C521.416 11.36 501.256 3.68003 475.816 3.68003H439.096V176H475.816ZM461.656 23.6H475.576C494.776 23.6 509.416 29.36 519.736 40.88C530.056 52.4 535.336 68.72 535.336 89.84C535.336 110.96 530.056 127.28 519.736 138.8C509.416 150.32 494.776 156.08 475.816 156.08H461.656V23.6Z" />
							<path d="M650.207 155.84V23.84H698.927V3.68003H578.447V23.84H627.167V155.84H578.447V176H698.927V155.84H650.207Z" />
							<path d="M726.439 176H841.399V155.84H748.999V97.04H827.479V76.88H748.999V23.84H841.399V3.68003H726.439V176Z" />
							<path d="M960.351 3.68003V133.28L893.871 3.68003H870.111V176H891.711V40.64L960.351 176H981.951V3.68003H960.351Z" />
							<path d="M1136.42 3.68003H1002.74V23.84H1058.18V176H1081.22V23.84H1136.42V3.68003Z" />
						</g>
						<circle cx="110" cy="42" />
						<circle cx="66" cy="11" />
						<circle cx="12" cy="92" />
						<circle cx="66" cy="168" />
						<circle cx="115" cy="166" />
						<circle cx="115" cy="97" />
						<circle cx="162" cy="14" />
						<circle cx="162" cy="94" />
						<circle cx="162" cy="166" />
						<circle cx="214" cy="14" />
						<circle cx="214" cy="94" />
						<circle cx="260" cy="52" />
						<circle cx="258" cy="166" />
						<circle cx="299" cy="166" />
						<circle cx="314" cy="121" />
						<circle cx="389" cy="121" />
						<circle cx="404" cy="166" />
						<circle cx="351" cy="14" />
						<circle cx="449" cy="14" />
						<circle cx="449" cy="166" />
						<circle cx="546" cy="94" />
						<circle cx="589" cy="14" />
						<circle cx="689" cy="14" />
						<circle cx="589" cy="166" />
						<circle cx="689" cy="166" />
						<circle cx="639" cy="166" />
						<circle cx="639" cy="14" />
						<circle cx="737" cy="14" />
						<circle cx="737" cy="166" />
						<circle cx="737" cy="87" />
						<circle cx="831" cy="14" />
						<circle cx="817" cy="87" />
						<circle cx="831" cy="166" />
						<circle cx="881" cy="166" />
						<circle cx="881" cy="14" />
						<circle cx="972" cy="166" />
						<circle cx="972" cy="14" />
						<circle cx="1013" cy="14" />
						<circle cx="1126" cy="14" />
						<circle cx="1070" cy="14" />
						<circle cx="1070" cy="166" />
						<circle cx="74" cy="97" />
					</HomeLogo>
				</HomeLink>
				<PageTitle>{pageTitle}</PageTitle>
			</InnerWrap>
		</Wrap>
	)
}

export default Nav

const Wrap = styled.nav`
	position: fixed;
	top: 0;
	height: 100%;
	width: ${navSize.width};
	z-index: var(--z-index-nav);

	${(p) => p.theme.media.mobile} {
		width: 100%;
		height: ${navSize.mobileHeight};
	}

	@media print {
		display: none;
	}
`

const InnerWrap = styled.div`
	${(p) => p.theme.flexCenter};
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background: var(--color-background);
	border-right: solid 1px var(--color-line);
	padding-top: calc(var(--space-0) + var(--sat, 0));
	padding-bottom: calc(var(--space-0) + var(--sab, 0));

	${(p) => p.theme.media.mobile} {
		align-items: flex-start;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: ${navSize.mobileHeight};
		padding: 0 var(--page-margin-right) 0 var(--page-margin-left);
		border-right-width: 0;
	}
`

const HomeLink = styled(Link)<{ disabled: boolean }>`
	position: absolute;
	top: var(--space-2);
	right: 50%;
	transform-origin: right;
	transform: rotate(-90deg);
	font-family: inherit;
	font-size: inherit;
	color: inherit;

	${(p) => p.disabled && `&& {color: inherit}`}

	${(p) => p.theme.media.mobile} {
		top: 50%;
		left: 50%;
		right: auto;
		transform: translate(-50%, -50%);
	}
`

const HomeLogo = styled.svg`
	height: 0.75em;
	width: auto;

	g > path {
		fill: var(--color-body);
		transition: opacity var(--animation-medium-out);
		opacity: 0;

		a:hover & {
			opacity: 1;
		}
	}

	circle {
		r: 18px;
		fill: var(--color-body);
		transition: opacity var(--animation-medium-out);
		opacity: 1;

		a:hover & {
			opacity: 0;
		}
	}
`

const PageTitle = styled.p`
	position: absolute;
	bottom: var(--space-1);
	left: 50%;
	transform-origin: left;
	transform: rotate(-90deg);

	${(p) => p.theme.text.viz.label};
	color: var(--color-heading);
	letter-spacing: 0.02em;
	white-space: nowrap;
	text-transform: uppercase;

	${(p) => p.theme.media.mobile} {
		display: none;
	}
`
