import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueLineClamp from '../../src/index'

Vue.use(VueLineClamp)

new Vue({
  render: h => h(App),
}).$mount('#app')
