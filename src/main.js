import Vue from 'vue'
import Application from './Application'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createStore from './store/store'
import Axios from 'axios'
import {routes} from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'es6-promise/auto'  //Vuex依赖

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

const store = createStore()

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
  store,
  render: h => h(Application)
})
