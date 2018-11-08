<template>
    <div  class="main">
        <member v-for="(member, index) in members" :key="index"
            :uid="member.uid"
            :name="member.name"
            :unit="member.unit"
            :school="member.school"
            :sex="member.sex"
            :photo-url="member.photoUrl"></member>
    </div>
</template>
<script>
import Member from './MemberManagement/Member.vue'

export default {
    data () {
      return{
        members:[]
      }
    },
    components: {
      Member
    },
    methods: {
    },
    beforeMount(){
      this.$emit('unloaded');
    },
    mounted(){
      this.$axios.get('http://equator8848.xyz:8848/yian/admin/getAuditingAccount.do',{
        page:1
      })
      .then((res) => {
        this._data.members = res.data.data.list;
        //加载完成触发已加载事件
        this.$emit('loaded');
      })
    }
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

