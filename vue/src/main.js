import Vue from 'vue';
import App from './App.vue';
import router from './router';

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//swal
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

//bootstrapvue
Vue.use(BootstrapVue);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
