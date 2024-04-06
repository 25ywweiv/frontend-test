import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixin from "./scripts/mixin.js";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from 'moment';
import 'moment-timezone';


Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(VueAxios, axios);
// NOTE Add Mixin to Global Vue.js
// สำหรับใช้งาน Function ในการ Calling API ตาม API Spect
Vue.mixin(mixin);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
