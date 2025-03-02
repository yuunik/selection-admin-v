import { createPinia } from 'pinia'
import useUserStore from './modules/user'
import useLayoutSettingStore from './modules/setting'

const store = createPinia()

export { useUserStore, useLayoutSettingStore }

export default store
