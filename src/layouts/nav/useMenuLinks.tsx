import useHomePage from '@utils/data/pages/home'
import useSections from '@utils/data/sections'

interface Link {
	slug: string
	path: string
	title: string
	isSection?: boolean
}

const useMenuLinks = () => {
	const sections = useSections()
	const homePage = useHomePage()

	const menuLinks: Link[] = [
		homePage,
		...sections.map((section) => ({
			slug: section.slug,
			path: section.path,
			title: section.name,
			isSection: true,
		})),
	]

	return menuLinks
}

export default useMenuLinks
