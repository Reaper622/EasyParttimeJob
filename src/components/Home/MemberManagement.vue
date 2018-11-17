<template>
    <div  class="main">
        <member v-for="(member, index) in members" :key="index"
            :uid="member.uid"
            :name="member.name"
            :unit="member.unit"
            :school="member.school"
            :sex="member.sex"
            :photo-url="member.photoUrl"></member>
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
import Member from './MemberManagement/Member.vue'

export default {
    data () {
      return{
        total:null,
        members:[]
      }
    },
    components: {
      Member
    },
    methods: {
      loadMembers(pageNum){
        this.$axios.get('/admin/getAuditingAccount.do',{
        params:{
          page:pageNum
        }
      })
      .then((res) => {
        this.members = res.data.data.list;
        this.total = res.data.data.total;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
      },
       //处理页数变化
      handleCurrentChange(val){
        this.loadMembers(val);
      }
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.loadMembers(1);
    },

}
</script>
<style scoped>
  .searchInput{
    width: 250px;
    margin-left: 20px;
  }
  .addButton{
    float: right;
    margin-right: 50px;
  }
  .deleteButton{
    float: right;
    margin-right: 100px;
  }
  .selectedCar{
    border: 2px solid #409EFF;
  }
</style>

