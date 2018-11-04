//一级路由
import Login from '@/components/Login'
import SystemHome from '@/components/SystemHome'

//二级路由
import MemberManagement from '@/components/Home/MemberManagement'
import JobExamine from '@/components/Home/JobExamine'
import SystemSetting from '@/components/Home/SystemSetting'

export const routes = [
  {path:'/',name:'indexLink',redirect:'/login'},
  {path:'/login',name:'loginLink',component:Login},
  {path:'/home',name:'homeLink',redirect:'/home/memberManagement',component:SystemHome,children:[
    {path:'/home/memberManagement',name:'memberManagementLink',component:MemberManagement},
    {path:'/home/jobExamine',name:'jobExamineLink',component:JobExamine},
    {path:'/home/systemSetting',name:'systemSetting',component:SystemSetting}
  ]}
]
