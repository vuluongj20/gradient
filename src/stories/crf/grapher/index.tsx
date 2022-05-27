import Grid from '@components/grid'
import Panel from '@components/panel'

const Grapher = () => {
	return (
		<Grid noPaddingOnMobile>
			<Panel gridColumn="wide" inset>
				The Mauna Loa Observatory in Hawaii has been recording atmospheric CO₂ levels
				since 1958. The dataset offers great insights into the state of the earth in the
				past, present, and where it could be in the future.
			</Panel>
		</Grid>
	)
}

export default Grapher
