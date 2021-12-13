import useHomePage from '@utils/dataHooks/home'
import useSections from '@utils/dataHooks/sections'

type Link = {
	slug: string
	path: string
	title: string
	type?: string
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
			type: 'section',
		})),
	]

	return menuLinks
}

export default useMenuLinks
