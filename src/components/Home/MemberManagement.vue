<template>
    <div  class="main">
        <member v-for="car in cars" :key="car.id"
            :type="car.type"
            :capacity="car.capacity"
            :oil="car.oil"
            :price="car.price"
            :del-flag="car.delFlag"></member>
    </div>
</template>
<script>
import Member from './MemberManagement/Member.vue'

export default {
    data() {
      return{
        cars:[
          {id:1, type: '货车', capacity: 200.05, oil: 5.5, price: 200.5, delFlag: 0},
          {id:2, type: '面包车', capacity: 100.15, oil: 2.0, price: 150.5, delFlag: 1},
          {id:3, type: '大货车', capacity: 300.15, oil: 7.0, price: 3000.5, delFlag: 1},
          {id:4, type: '大货车', capacity: 300.15, oil: 7.0, price: 3000.5, delFlag: 1}
        ],
      }
    },
    components: {
      Member
    },
    methods: {
      addCarIt() {
        console.log('addcar');
        this.$emit('addCar');
      },
      deleteCarIt() {
        this.$prompt('请输入要删除的车辆ID','删除车辆',{
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]*$/,
          inputErrorMessage: '车辆ID只能为数字'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '你已经删除' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你已取消删除'
          })
        })
      },
      setSeleteCar(index) {
        console.log('set');
        this.$data.selectedCar = index;
      }
    },
    mounted(){
      console.log('mounted');
      //加载完成触发已加载事件
      this.$emit('loaded');
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

