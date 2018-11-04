<template>
    <div class="main">
        <order></order>
    </div>
</template>
<script>
import Order from  './order/Order.vue'
export default {
    data() {
        return{
            searchOrderId:''
        }
    },
    components:{
        Order
    }
}
</script>
<style scoped>
    .searchInput{
    width: 250px;
    margin-left: 20px;
  }
</style>

