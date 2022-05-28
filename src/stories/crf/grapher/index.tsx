import Canvas from './canvas'

import Grid from '@components/grid'
import Panel from '@components/panel'

const Grapher = () => {
	return (
		<Grid noPaddingOnMobile>
			<Panel gridColumn="wide" overlay>
				<Canvas />
			</Panel>
		</Grid>
	)
}

export default Grapher
