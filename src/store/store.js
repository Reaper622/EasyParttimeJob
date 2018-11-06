import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      //储存当前登录用户的必要信息
      user:{
        uid:Number,
        name:String
      }
    },
    mutations:{
      //修改登录态
      changeLoginState(state,user){ //第一个参数为state，第二个是传递的参数
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
        return state.user.uid
      }

    }
  })
}
