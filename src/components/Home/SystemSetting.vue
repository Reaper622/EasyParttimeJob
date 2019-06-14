<template>
    <div class="main">
      <el-row type="flex" class="row-bg" justify="left">
        <el-col :span="6">
          <el-input
            placeholder="输入原密码"
            prefix-icon="el-icon-edit"
            v-model="oldPasswordInput">
          </el-input>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" class="row-bg" justify="left">
        <el-col :span="6">
          <el-input
            placeholder="输入新密码"
            prefix-icon="el-icon-edit"
            v-model="newPasswordInput">
          </el-input>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" class="row-bg" justify="left">
        <el-col :span="3">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-edit"
            v-model="authCode">
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary"  @click="getAuthCode">获取验证码</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" class="row-bg" justify="left">
        <el-col :span="4" :offset="1">
          <el-button type="success" class="resetBtn"  @click="resetPassword">重 设 密 码</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'SystemSetting',
  data () {
    return {
      oldPasswordInput: '',
      newPasswordInput: '',
      authCode: ''
    }
  },
  methods: {
    getAuthCode () {
      this.$axios.post('/email/changePsw.do', qs.stringify({
        emailAddress: this.$store.getters.getUid
      }))
        .then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: '已发送邮件',
              message: res.data.msg,
              type:'success'
            })
          } else {
            this.$notify.error({
              title: '发生错误',
              message: res.data.msg,
            })
          }
        })
    },
    resetPassword () {
      this.$axios.post('/manager/changePsw.do', qs.stringify({
        oldPsw: this.oldPasswordInput,
        newPsw: this.newPasswordInput,
        authCode: this.authCode
      }))
        .then(res => {
          if (res.data.status == 2000){
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$store.commit('loginOutState')
            this.$router.replace('/login')
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
  .resetBtn{
    width: 100%;
  }
</style>

