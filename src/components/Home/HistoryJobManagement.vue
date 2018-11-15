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
    </div>
</template>
<script>
import HistoryJob from  './Job/HistoryJob.vue'
export default {
    data() {
        return{
          historyJobs:[]
        }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.loadHistoryJob();
    },
    methods:{
      //得到历史兼职
      loadHistoryJob(){
        this.$axios.get('/admin/getHistory.do',{
        params:{
          page:1
        }
      })
      .then(res => {
        console.log(res);
        this._data.historyJobs = res.data.data.list;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      }
    },
    components:{
        HistoryJob
    }
}
</script>
<style scoped>

</style>

