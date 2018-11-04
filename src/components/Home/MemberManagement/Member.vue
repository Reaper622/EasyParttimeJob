<template>
  <div class="member">
    <img src="../../../assets/UserSystem/images/baiduMap.jpg" alt="验证照片" class="identifyImg">
    <el-row class="attributeRow">
      <el-col :span="8" :offset="2">用户ID:{{uid}}</el-col>
      <el-col :span="8" :offset="2">用户名:{{name}}</el-col>
    </el-row>
    <el-row class="attributeRow">
      <el-col :span="8" :offset="2">单位: {{unit}}</el-col>
      <el-col :span="8" :offset="2">性别: {{sex}}</el-col>
    </el-row>
    <el-row class="buttonRow">
      <el-col :span="6" :offset="12"><el-button type="success" icon="el-icon-check">通过</el-button></el-col>
      <el-col :span="6" ><el-button type="danger" icon="el-icon-close">拒绝</el-button></el-col>
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
      // 公司、商家的地址或者学校
      unit: {
        type: String,
        required: true
      },
      // 性别
      sex: {
        type: String,
        required: true
      },
      // 图片地址
      photoUrl: {
        type: Number,
        //required: true
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
    margin: 10px 20px;
    background: url('../../../assets/UserSystem/images/memberManagement/memberBackground.png');
    border: 1px solid #EBEEF5;
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

