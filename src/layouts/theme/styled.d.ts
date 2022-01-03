import 'styled-components'

import { Theme } from './index'

/** Add type checking to theme prop */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
