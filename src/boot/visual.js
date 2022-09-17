import { boot } from 'quasar/wrappers'
import { input } from 'src/utils/visual'
export default boot(({ app }) => {
  app.config.globalProperties.$visualInputs = input
  
})