<template>
    <div class="main">
       <div class="loginBody">
          <img src="../assets/UserSystem/images/longLogo.png" alt="logo" class="topImg" />

          <div class="loginSection">
                   <el-row type="flex" class="row" justify="center">
                       <el-col :span="16">
                           <el-input
                            placeholder="输入用户名"
                            prefix-icon="el-icon-edit"
                            v-model="usernameInput">
                            </el-input>
                       </el-col>
                   </el-row>
                   <el-row type="flex" class="row" justify="center">
                       <el-col :span="16">
                           <el-input
                           type="password"
                           placeholder="输入密码"
                           prefix-icon="el-icon-view"
                           v-model="passwordInput">
                           </el-input>
                       </el-col>
                   </el-row>
                   <el-row type="flex" class="row buttons" justify="space-around">
                       <el-col :span="8"><el-button type="primary" round @click="login">立 即 登 录</el-button></el-col>
                   </el-row>
               </div>
       </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'Login',
    data(){
        return{
            usernameInput:'',
            passwordInput:''
        }
    },
    created() {
      //绑定回车事件
      var that = this;
      document.onkeydown = e => {
        if(e.keyCode == 13){
          that.login();
        }
      }
    },
    methods:{
      login() {
        if(this.usernameInput == ''){
          this.$alert('请输入用户名!','提示',{
            confirmButtonText:'我知道了',
          })
        }else if(this.passwordInput == ''){
          this.$alert('请输入密码','提示',{
            confirmButtonText:'我知道了',
          })
        }else{
          this.$axios.post('/manager/login.do',qs.stringify({
            uid:this.usernameInput,
            psw:this.passwordInput
          }))
            .then(res => {
            if (res.data.status == 2000) {
              //把登录信息存入state
              this.$store.commit('loginState', res.data.data);
              this.$router.replace({name:'homeLink'});
            }else{
              this.$alert('登录失败!','通知',{
              confirmButtonText:'我知道了',
              type:'error'
            })
          }
        })
        }
    }
  }
}
</script>
<style lang="stylus" scoped>
    .main
      display flex
      justify-content center
      height 100%
      width 100%
    .loginBody
      display flex
      justify-items center
      flex-direction column
    .topImg
      display block
      margin-top 200px
    .loginSection
      display block
      margin-top 50px
    .row
      padding-bottom 30px
    .buttons
      padding-top 50px
</style>
