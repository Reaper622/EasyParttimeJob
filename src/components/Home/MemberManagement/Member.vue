<template>
  <div class="member">
    <div class="identifyImg">
      <img :src="photoUrl" alt="验证照片" class="identifyImgContent">
    </div>
    <el-row class="attributeRow">
      <el-col :span="20" :offset="2">用户ID:<span class="content">{{uid}}</span></el-col>
    </el-row>
    <el-row class="attributeRow">
      <el-col :span="20" :offset="2">用户名:<span class="content">{{name}}</span></el-col>
    </el-row>
    <el-row class="attributeRow" v-show="!student">
      <el-col :span="20" :offset="2">单位: <span class="content">{{unit != null ? unit : school}}</span></el-col>
    </el-row>
    <el-row class="attributeRow">
      <el-col :span="10" :offset="2">性别: <span class="content">{{sex}}</span></el-col>
    </el-row>
    <el-row class="buttonRow">
      <el-col :span="6" :offset="12"><el-button type="success" icon="el-icon-check" @click="pass">通过</el-button></el-col>
      <el-col :span="6" ><el-button type="danger" icon="el-icon-close" @click="dispass" plain>拒绝</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
    props: ['uid','name','unit','school','sex','photoUrl','type','student'],
    data(){
      return{
        //uid的data表现
        userid:0,
      }
    },
    watch:{
      uid: (newVal, oldVal) => {
        this.userid = newVal; //监听uid的变化，将父组件props的值传递给data
      }
    },
    methods:{
      //通过用户
      pass(){
        if (this.student) {
          this.$axios.post('/manager/dealStudentInfo.do',qs.stringify({
            uid:this.uid, //用户的id
            action:1 //pass的标致
          }))
            .then((res) => {
              console.log(res);
              this.$message({
                showClose:true,
                message: '你已通过此用户!',
                type: 'success'
              });
              this.$emit('refresh'); //触发刷新事件
            })
        } else {
          this.$axios.post('/manager/dealMerchantInfo.do',qs.stringify({
          uid:this.uid, //用户的id
          action:1 //pass的标致
          }))
            .then((res) => {
              console.log(res);
              this.$message({
                showClose:true,
                message: '你已通过此用户!',
                type: 'success'
              });
              this.$emit('refresh'); //触发刷新事件
            })
        }
      },
      //不通过用户
      dispass(){
        if (type === 'student') {
          this.$axios.post('/manager/dealStudentInfo.do',qs.stringify({
            uid:this.uid, //用户的id
            action:2 //dispass的标致
          }))
          .then((res) => {
            console.log(res);
            this.$message({
              showClose:true,
              message: '你未批准此用户!',
              type: 'error'
            });
            this.$emit('refresh'); //触发刷新事件
          })
        } else {
          this.$axios.post('/manager/dealMerchantInfo.do',qs.stringify({
            uid:this.uid, //用户的id
            action:2 //dispass的标致
          }))
          .then((res) => {
            console.log(res);
            this.$message({
              showClose:true,
              message: '你未批准此用户!',
              type: 'error'
            });
            this.$emit('refresh'); //触发刷新事件
          })
        }
      }

    }
}
</script>

<style lang="stylus" scoped>
   @import "../../../common/stylus/variable.styl";
  .member
    position relative
    display inline-block
    width 400px
    height 500px
    margin 10px 15px
    background url('../../../assets/UserSystem/images/memberManagement/memberBackground.png')
    border 3px solid #EBEEF5
    border-radius: 10px
    transition box-shadow .3s ease
    overflow hidden
  .member:hover
    box-shadow: 0 0 10px $hoverShadow
  .identifyImg
    cursor: pointer;
    position: relative;
    width: 350px;
    height: 200px;
    margin: 10px 25px 50px;
    border-radius: 10px;
    &:hover
      transition box-shadow .5s ease
      box-shadow 0 0 10px $hoverShadow
  .identifyImgContent
    width 100%
    height 100%
  .attributeRow
    height 40px
    line-height 40px
    font-family Aria
  .content
    padding-left 20px
  .buttonRow
    margin-top 30px
  .flag
    position absolute
    bottom 0
    right 0
    width 120px
    height 50px
    text-align center
    font-size 26px
    font-weight bold
    line-height 50px
    color white
    border-radius 10px
</style>
