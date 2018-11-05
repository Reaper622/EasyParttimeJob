<template>
    <div  class="main">
        <member v-for="member in members" :key="member.id"
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
    data() {
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
      this.$axios.get('https://www.easy-mock.com/mock/5bdea625bc617620972b02aa/parttime/getAuditingAccount',{
        page:1
      })
      .then((res) => {
        this._data.members = res.data.data;
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

