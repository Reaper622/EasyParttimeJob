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
Axios.defaults.baseURL = 'http://equator8848.xyz:8848/yian'; //设置基础路径
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
  },
})
//路由守卫，检测是否已经登录
router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin){ //如果前往页面需要登录
    if(store.getters.getUid == null){ //未登录
      next('/login')//跳转到登录界面
    }else{ //已登录
      next();
    }
  }else{ //前往页面不需要登录
    next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Application)
})
