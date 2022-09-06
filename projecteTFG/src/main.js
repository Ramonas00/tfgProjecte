import Vue from 'vue'
import App from './App.vue'
import store from './store'

import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'
import VueCodemirror from 'vue-codemirror'


import 'codemirror/lib/codemirror.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'es6-promise/auto'
import router from './routes'

import moment from 'moment'


Vue.config.productionTip = false
Vue.prototype.$codeList = []
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(VueCodemirror)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
