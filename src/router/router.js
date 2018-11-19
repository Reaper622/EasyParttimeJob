//一级路由
import Login from '@/components/Login'
import SystemHome from '@/components/SystemHome'

//二级路由
import MemberManagement from '@/components/Home/MemberManagement'
import JobExamine from '@/components/Home/JobExamine'
import HistoryJobManagement from '@/components/Home/HistoryJobManagement'
import SystemSetting from '@/components/Home/SystemSetting'

export const routes = [
	{
		path:'/',
		name:'indexLink',
		redirect:'/login'
	},
	{
		path:'/login',
		name:'loginLink',
		component:Login
	},
	{
		path:'/home',
		name:'homeLink',
		redirect:'/home/memberManagement',
		component:SystemHome,
		children:[
			{
				path:'/home/memberManagement',
				name:'memberManagementLink',
				component:MemberManagement,
				meta:{
					requireLogin:true
				}
			},
			{
				path:'/home/jobExamine',
				name:'jobExamineLink',
				component:JobExamine,
				meta:{
					requireLogin:true
				}
			},
			{
				path:'/home/historyJobManagement',
				name:'historyJobLink',
				component:HistoryJobManagement,
				meta:{
					requireLogin:true
				}
			},
			{
				path:'/home/systemSetting',
				name:'systemSetting',
				component:SystemSetting,
				meta:{
					requireLogin:true
				}
			}
		]}
]
