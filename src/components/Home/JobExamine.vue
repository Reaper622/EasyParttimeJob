<template>
    <div class="main">
        <div class="noInfoTip" v-show="!infoGetted">
          <p>当前没有信息哦....</p>
        </div>
        <job v-for="job in jobs" :key="job.jobId"
              :id="job.jobId"
              :summary="job.jobSummary"
              :job-time="job.jobTime"
              :reward="job.reward"
              :reward-type="job.rewardType"
              :address="job.address"
              :details="job.details"
              :type="job.type"
               @refresh="loadJobs(pageNum)"></job>
        <div class="pages" v-show="infoGetted">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="5"
                  @current-change="handleCurrentChange"
                  >
              </el-pagination>
            </el-col>
          </el-row>
        </div>
    </div>
</template>
<script>
import Job from  './Job/Job.vue'
import qs from 'qs'
export default {
    data() {
        return{
          pageNum:1,
          jobs:[],
          total:null,
          infoGetted:false
        }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.loadJobs(1);
    },
    methods:{
      //得到待审核的兼职信息
      loadJobs(pageNum){
        this.$axios.post('/manager/getAuditingJobs.do',qs.stringify({
          pageNum:pageNum,
          pageSize: 5
      }))
      .then(res => {
        console.log(res)
        //给兼职列表增加数据
        this.jobs = res.data.data.list;
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
        this.loadJobs(val);
      }
    },
    components:{
        Job
    }
}
</script>
<style lang="stylus" scoped>
  .noInfoTip
    position relative
    width 100%
    height 60px
    text-align center
    color rgba(158, 154, 154, 0.8)
  .pages
    width 90%
    height 40px
    margin-top 20px
</style>
