import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      //储存当前登录用户的必要信息
      user:{
        uid:null,
        name:null
      }
    },
    mutations:{
      //修改登录态
      loginState(state,user){ //第一个参数为state，第二个是传递的参数
        sessionStorage.setItem('uid',user.uid);
        state.user.uid = user.uid,
        state.user.name = user.name
      },
      loginOutState(state,user){ //第一个参数为state，第二个是传递的参数
        sessionStorage.removeItem('uid');
        state.user.uid = user.uid,
        state.user.name = user.name
      }
    },
    getters:{
      //获取当前用户信息
      getUsername(state){
        return state.user.name
      },
      getUid(state){
        if(state.user.uid == null){
          state.user.uid = sessionStorage.getItem('uid');
        }
        return state.user.uid
      }

    }
  })
}
