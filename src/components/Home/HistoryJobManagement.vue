<template>
    <div class="main">
        <div class="noInfoTip" v-show="!infoGetted">
          <p>当前没有信息哦....</p>
        </div>
        <history-job v-for="job in historyJobs" :key="job.id"
              :id="job.id"
              :summary="job.summary"
              :job-time="job.jobTime"
              :reward="job.reward"
              :reward-type="job.rewardType"
              :address="job.address"
              :details="job.details"
              :type="job.type"
              @refresh="loadHistoryJobs(pageNum)"></history-job>
        <div class="pages" v-show="infoGetted">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="5"
                  @current-change="handleCurrentChange">
              </el-pagination>
            </el-col>
          </el-row>
        </div>
    </div>
</template>
<script>
import HistoryJob from  './Job/HistoryJob.vue'
export default {
    data() {
        return{
          pageNum:1,
          total:null,
          historyJobs:[],
          infoGetted:false
        }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.loadHistoryJobs(1);
    },
    methods:{
      //得到历史兼职
      loadHistoryJobs(pageNum){
        this.$axios.get('/admin/getHistory.do',{
        params:{
          page:pageNum
        }
      })
      .then(res => {
        this.historyJobs = res.data.data.list;
        if(res.data.data.list.length !== 0){
          //展示分页
          this.infoGetted = true;
          //设置总页数
          this.total = res.data.data.total;
        }else{
          this.infoGetted =  false;
        }
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      },
       //处理页数变化
      handleCurrentChange(val){
        this.pageNum = val;
        this.loadHistoryJobs(val);
      }
    },
    components:{
        HistoryJob
    }
}
</script>
<style scoped>
  .noInfoTip{
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    color:rgba(158, 154, 154, 0.8);
  }
</style>

