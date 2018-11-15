<template>
    <div class="main">
        <job v-for="job in jobs" :key="job.id"
              :id="job.id"
              :summary="job.summary"
              :job-time="job.jobTime"
              :reward="job.reward"
              :reward-type="job.rewardType"
              :address="job.address"
              :details="job.details"
              :type="job.type"
               @refresh="loadJobs"></job>
    </div>
</template>
<script>
import Job from  './Job/Job.vue'
export default {
    data() {
        return{
          jobs:[]
        }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.loadJobs();
    },
    methods:{
      //得到待审核的兼职信息
      loadJobs(){
        this.$axios.get('/admin/getAuditingJob.do',{
        params:{
          page:1
        }
      })
      .then(res => {
        console.log(res);
        this._data.jobs = res.data.data.list;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      }
    },
    components:{
        Job
    }
}
</script>
<style scoped>

</style>

