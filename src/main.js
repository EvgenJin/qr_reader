// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueQrcodeReader from "vue-qrcode-reader";
import { store } from './store/store'

Vue.use(VueQrcodeReader);
Vue.use(Vuetify);

const opts = {};
export default new Vuetify(opts)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
  }),
  components: { App },
  template: '<App/>'
});
