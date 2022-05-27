import styled from 'styled-components'

import Grid from '@components/grid'
import Panel from '@components/panel'

const Grapher = () => {
	return (
		<Grid>
			<StyledPanel inset></StyledPanel>
		</Grid>
	)
}

export default Grapher

const StyledPanel = styled(Panel)`
	${(p) => p.theme.utils.gridColumn.wide};
`
