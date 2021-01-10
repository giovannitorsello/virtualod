import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueMobileDetection from 'vue-mobile-detection'
Vue.use(VueMobileDetection);
Vue.config.productionTip = false

window.Vue = Vue;


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')


