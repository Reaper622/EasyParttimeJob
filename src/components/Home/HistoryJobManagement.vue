<template>
    <div class="main">
        <history-job v-for="job in historyJobs" :key="job.id"
              :id="job.id"
              :summary="job.summary"
              :job-time="job.jobTime"
              :reward="job.reward"
              :reward-type="job.rewardType"
              :address="job.address"
              :details="job.details"
              :type="job.type"></history-job>
        <div class="pages">
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
          total:null,
          historyJobs:[]
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
        console.log(res);
        this.historyJobs = res.data.data.list;
        this.total = res.data.data.total;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      },
       //处理页数变化
      handleCurrentChange(val){
        this.loadHistoryJobs(val);
      }
    },
    components:{
        HistoryJob
    }
}
</script>
<style scoped>

</style>

