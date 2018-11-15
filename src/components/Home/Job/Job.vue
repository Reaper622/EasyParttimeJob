<template>
    <div class="job">
        <div class="title">
          <span class="summary">{{summary}}</span>
          <span class="time">{{jobTime}}</span>
        </div>
        <div class="detail">
          <p class="detailContent">{{details}}</p>
        </div>
        <div class="otherContent">
          <div class="contentRow">
            <img src="../../../assets/UserSystem/Icon/position.png" alt="位置图标">
            <span>{{address}}</span>
          </div>
          <div class="contentRow">
            <img src="../../../assets/UserSystem/Icon/money.png" alt="报酬图标">
            <span>{{reward}}元/{{rewardType}}</span>
          </div>
          <div class="contentRow">
            <img src="../../../assets/UserSystem/Icon/type.png" alt="类型图标">
            <span>{{type}}</span>
          </div>
          <div class="buttonRow">
            <el-button type="danger" icon="el-icon-close" @click="dispass"  plain class="buttons">拒绝</el-button>
            <el-button type="success" icon="el-icon-check" @click="pass"  class="buttons">通过</el-button>

          </div>
        </div>

    </div>
</template>

<script>
export default {
  props:['id','summary','jobTime','reward','rewardType','address','details','type'],
  data(){
    return{

    }
  },
  methods:{
    pass(){
        this.$axios.post('https://www.easy-mock.com/mock/5bdea625bc617620972b02aa/parttime/auditAccount',{
          jobId:this.id, //兼职的id
          action:1 //pass的标致
        })
        .then((res) => {
          console.log(res);
          if(res.data.status == 1){
          this.$message({
            showClose:true,
            message: '你已通过此兼职!',
            type: 'success'
          });
          this.$emit('refresh');
          }
          else{
            this.$message({
            showClose:true,
            message: '操作失败!',
            type: 'info'
          });
          }
        })
      },
    dispass(){
        this.$axios.post('https://www.easy-mock.com/mock/5bdea625bc617620972b02aa/parttime/auditAccount',{
          jobId:this.id, //兼职的id
          action:0 //dispass的标致
        })
        .then((res) => {
          console.log(res);
          if(res.data.status == 1){
          this.$message({
            showClose:true,
            message: '你未批准此兼职!',
            type: 'error'
          });
          this.$emit('refresh');
          }else{
            this.$message({
            showClose:true,
            message: '操作失败!',
            type: 'info'
          });
          }
        })
      }
  }
}
</script>

<style scoped>
    .job{
        position: relative;
        display: inline-block;
        width: 90%;
        height: 375px;
        background: url('../../../assets/UserSystem/images/job/job.png') no-repeat;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        transition: box-shadow .3s ease;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .job:hover{
        box-shadow: 0 0 10px #888888;
    }
    .title{
        position: relative;
        width: 100%;
        height: 60px;
        background: #409EFF;
        text-align: left;
        font-size: 20px;
        color: white;
        line-height: 60px;
        overflow: hidden;
    }
    .summary{
      display: inline-block;
      margin-left: 40px;
      max-width: 15em;  /*限制最长为15个字*/
      max-height: 3em;
      white-space:nowrap;
      text-overflow: ellipsis; /*超出部分用...代替*/
      overflow: hidden;
    }
    .time{
      float: right;
      padding-right: 30px;
      z-index: 10;
    }
    .detail{
      display: inline-block;
      width: 50%;
      height: 290px;
      margin-top: 10px;
      margin-left: 100px;
      font-size: 18px;
      line-height: 24px;
      border-right: 10px solid #409EFF;
      overflow: hidden;
    }
    .detailContent{
      padding: 10px 30px;
      text-indent: 2em;
    }
    .otherContent{
      display: block;
      width: 35%;
      float: right;
      margin-top: 10px;
      margin-right: 50px;
      height: 300px;
    }
    .contentRow{
      width: 100%;
      height: 80px;
    }
    .contentRow img{
      display: block;
      float: left;
      width: 40px;
      height: 40px;
      margin: 20px 20px;
    }
    .contentRow span{
      width: auto;
      font-size: 18px;
      line-height: 80px;
      clear: left;
    }
    .buttons{
      float: right;
      margin-left: 20px;
    }
</style>


