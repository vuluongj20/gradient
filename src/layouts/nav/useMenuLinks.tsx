import useAboutPage from '@utils/dataHooks/about'
import useSectionPages from '@utils/dataHooks/sections'
import useIndexPage from '@utils/dataHooks/siteIndex'

type Link = {
	slug: string
	path: string
	title: string
	type?: string
}

const useMenuLinks = () => {
	const sectionPages = useSectionPages()
	const indexPage = useIndexPage()
	const aboutPage = useAboutPage()

	const menuLinks: Link[] = [
		indexPage,
		...sectionPages.map((sp) => ({ ...sp, type: 'section' })),
		aboutPage,
	]

	return menuLinks
}

export default useMenuLinks
