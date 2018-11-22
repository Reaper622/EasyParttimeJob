<template>
    <div  class="main">
        <div class="noInfoTip" v-show="!infoGetted">
          <p>当前没有信息哦....</p>
        </div>
        <member v-for="(member, index) in members" :key="index"
            :uid="member.uid"
            :name="member.name"
            :unit="member.unit"
            :school="member.school"
            :sex="member.sex"
            :photo-url="member.photoUrl"
            @refresh="loadMembers(pageNum)"></member>
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
import Member from './MemberManagement/Member.vue'

export default {
    data () {
      return{
        pageNum:1,
        total:null,
        members:[],
        infoGetted:false
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
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl";
  .noInfoTip
    position relative
    width 100%
    height 60px
    text-align center
    color rgba(158, 154, 154, 0.8)
  .searchInput
    width 250px
    margin-left 20px
  .addButton
    float right
    margin-right 50px
  .deleteButton
    float right
    margin-right 100px
  .selectedCar
    border 2px solid $baseColor
</style>
