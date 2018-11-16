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
        <div class="pages">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="handleCurrentChange">
              </el-pagination>
            </el-col>
          </el-row>

        </div>
    </div>
</template>
<script>
import Job from  './Job/Job.vue'
export default {
    data() {
        return{
          pageNum:0,
          jobs:[],
          total:null
        }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      //初始化页数
      this.pageNum = 0;
      this.loadJobs(this.pageNum);
    },
    methods:{
      //得到待审核的兼职信息
      loadJobs(pageNum){
        console.log(pageNum);
        this.$axios.get('/admin/getAuditingJob.do',{
        params:{
          page:pageNum
        }
      })
      .then(res => {
        console.log(res);
        //给兼职列表增加数据
        this.jobs = res.data.data.list;
        //设置总页数
        this.total = res.data.data.total * res.data.data.lastPage;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      },
      //处理页数变化
      handleCurrentChange(val){
        this.pageNum = val;
        this.loadJobs(val);
      }
    },
    components:{
        Job
    }
}
</script>
<style scoped>
  .pages{
    width: 90%;
    height: 40px;
    margin-top: 20px;
  }
</style>

