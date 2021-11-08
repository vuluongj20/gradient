import useHomePage from '@utils/dataHooks/home'
import useSectionPages from '@utils/dataHooks/sections'

type Link = {
	slug: string
	path: string
	title: string
	type?: string
}

const useMenuLinks = () => {
	const sectionPages = useSectionPages()
	const homePage = useHomePage()

	const menuLinks: Link[] = [
		homePage,
		...sectionPages.map((sp) => ({ ...sp, type: 'section' })),
	]

	return menuLinks
}

export default useMenuLinks
