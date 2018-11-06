<template>
    <div class="home">
        <el-container>
            <el-header>
                <el-row class="headerRow"  :gutter="20" >
                    <el-col :span="8">
                        <img class="logo" src="../assets/UserSystem/images/parttime.png" alt="Logo">
                    </el-col>
                    <el-row class="headerRightRow" type="flex" justify="end">
                        <el-col :span="2">
                            <el-badge :value="5"  class="item">
                                <el-button icon="el-icon-bell"  circle></el-button>
                            </el-badge>
                        </el-col>
                        <el-col :span="3">
                            <el-dropdown>
                                <el-button >
                                    Help <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>账户与安全</el-dropdown-item>
                                    <el-dropdown-item>联系我们</el-dropdown-item>
                                    <el-dropdown-item>如何使用?</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="3">
                            <span class="username">欢迎,{{username}}</span>
                        </el-col>
                        <el-col :span="3">
                          <el-tooltip class="item" effect="dark" content="注销" placement="bottom">
                           <el-button type="danger" icon="el-icon-close" @click="logout" >注销</el-button>
                          </el-tooltip>
                        </el-col>
                    </el-row>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        :default-active="$route.path"
                        class="sideBar"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2B333E"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        :router="true">
                        <el-menu-item index="/home/memberManagement">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户审核</span>
                        </el-menu-item>
                        <el-menu-item index="/home/jobExamine">
                            <i class="el-icon-date"></i>
                            <span slot="title">兼职审核</span>
                        </el-menu-item>
                        <el-menu-item index="/home/historyJobManagement">
                            <i class="el-icon-time"></i>
                            <span slot="title">历史兼职</span>
                        </el-menu-item>
                        <el-menu-item index="/home/systemSetting">
                            <i class="el-icon-setting"></i>
                            <span slot="title">系统设置</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main v-loading="isLoading"><router-view  @loaded="isLoaded" @unloaded="isUnloaded"></router-view></el-main>

                    <!-- 底部栏暂时无用
                      <el-footer>
                        &copy;Copyright:2018 易安兼职
                    </el-footer>
                    -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>


<script>
export default {
    name:'systemHome',
    data(){
        return{
            username:'',
            isLoading: true,
        }
    },
    watch:{
    },
    mounted(){
      this.username = this.$store.getters.getUsername;
    },
    components:{
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      isLoaded(){
          this.isLoading = false;
      },
      isUnloaded(){
        this.isLoading = true;
      },
      logout(){
        this.$confirm('您确定要注销当前账号?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('changeLoginState',{uid:null,name:null});
          this.$router.replace({name:'loginLink'});
        }).catch(() => {
          this.$message({
            type:'info',
            message:'你已取消注销'
          });
        })

      }
    }
}
</script>

<style scoped>
     .home{
       position: absolute;
       width: 100%;
       height: 100%;
       overflow: hidden;
     }
     .el-header{
         padding: 0 15px;
         margin-top: 10px;
         background: #FFFFFF;
         box-shadow: 0px 5px 1px #E5E5E9;

     }
     .el-header .logo{
         width: 250px;
         height: 50px;
         margin: auto 30px;
     }
    .el-aside {
        background-color: #2B333E;
        text-align: center;
    }
    .el-main {
        margin-top: 10px;
        height: 800px;
    }
    /*底部栏样式
    .el-footer{
        height: 60px;
        text-align: center;
        font-size: 20px;
        color: gray;
        line-height: 60px;
        border-top: 5px solid #2B333E;
    }
    */
    .headerRightRow{
        height: 60px;
        margin: 5px 0;
    }
    .username{
        line-height: 40px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

