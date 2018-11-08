<template>
  <div class="member">
    <img :src="photoUrl" alt="验证照片" class="identifyImg">
    <el-row class="attributeRow">
      <el-col :span="8" :offset="2">用户ID:<span class="content">{{uid}}</span></el-col>
      <el-col :span="8" :offset="2">用户名:<span class="content">{{name}}</span></el-col>
    </el-row>
    <el-row class="attributeRow">
      <el-col :span="8" :offset="2">单位: <span class="content">{{unit != null?  unit : school}}</span></el-col>
      <el-col :span="8" :offset="2">性别: <span class="content">{{sex == 0 ? "男" : "女"}}</span></el-col>
    </el-row>
    <el-row class="buttonRow">
      <el-col :span="6" :offset="12"><el-button type="success" icon="el-icon-check" @click="pass">通过</el-button></el-col>
      <el-col :span="6" ><el-button type="danger" icon="el-icon-close" @click="dispass" plain>拒绝</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props: {
      //人员编号
      uid: {
        type: Number,
        required: true
      },
      //姓名
      name: {
        type: String,
        required: true
      },
      // 公司、商家的地址
      unit: {
        type: String
      },
      //学校的地址
      school:{
        type: String
      },
      // 性别
      sex: {
        type: Number,
        required: true
      },
      // 图片地址
      photoUrl: {
        type: String,
        //required: true
      }
    },
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
        this.$axios.post('http://equator8848.xyz:8848/yian/admin/auditAccount.do',{
          uid:this.userid, //用户的id
          action:1 //pass的标致
        })
        .then((res) => {
          console.log(res);
          this.$message({
            showClose:true,
            message: '你已通过此用户!',
            type: 'success'
          });
        })
      },
      //不通过用户
      dispass(){
        this.$axios.post('http://equator8848.xyz:8848/yian/admin/auditAccount.do',{
          uid:this.userid, //用户的id
          action:0 //dispass的标致
        })
        .then((res) => {
          console.log(res);
          this.$message({
            showClose:true,
            message: '你未批准此用户!',
            type: 'error'
          });
        })
      }
    }
}
</script>


<style scoped>
  .member{
    position: relative;
    display: inline-block;
    width: 400px;
    height: 500px;
    margin: 10px 15px;
    background: url('../../../assets/UserSystem/images/memberManagement/memberBackground.png');
    border: 3px solid #EBEEF5;
    border-radius: 10px;
    transition: box-shadow .3s ease;
    overflow: hidden;

  }
  .member:hover{
    box-shadow: 0 0 10px #888888;
  }
  .identifyImg{
    position: relative;
    width: 350px;
    height: 200px;
    margin: 10px 25px 50px;
    border-radius: 10px;
  }
  .attributeRow{
    height: 60px;
    line-height: 60px;
    font-family:Aria
  }
  .content{
    padding-left: 20px;
  }
  .buttonRow{
    margin-top: 60px;
  }
  .flag{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 120px;
    height: 50px;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    line-height: 50px;
    color: white;
    border-radius: 10px;
  }
</style>

