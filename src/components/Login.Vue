<template>
    <div class="main">
       <div class="loginBody">
          <img src="../assets/UserSystem/images/parttime.png" alt="logo" class="topImg" />
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
          console.log(this.usernameInput + '   ' + this.passwordInput);
          let params = new URLSearchParams();
          params.append('uid',this.usernameInput);
          params.append('psw',this.passwordInput);
          this.$axios.post('/admin/adminLogin.do',params)
            .then(res => {
            if (res.data.status == 1) {
              //把登录信息存入state
              this.$store.commit('loginState',{uid:this.usernameInput});
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
<style scoped>
    .main{
        position: absolute;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .loginBody{
        position: relative;
        margin: auto;
        width: 600px;
        height: 500px;
    }
    .topImg{
      position: absolute;
      width: 600px;
      height: 150px;
      margin-left: 30px;
    }
    .loginSection{
        position: relative;
        display: inline-block;
        vertical-align: top;
        left: 125px;
        top: 200px;
        width: 350px;
        height: 300px;
    }
    .row{
        padding-bottom: 30px;
    }
    .buttons{
        padding-top: 50px;
    }
</style>
