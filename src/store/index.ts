import { createPinia } from 'pinia'
import useUserStore from './modules/user'

const store = createPinia()

export { useUserStore }

export default store
