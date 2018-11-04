import Vue from 'vue'
import Application from './Application'
import VueRouter from 'vue-router'
import Axios from 'axios'
import {routes} from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Application)
})
