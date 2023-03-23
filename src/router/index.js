//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '../components/pages/Home'
import Search from '../components/pages/Search'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
//配置路由
export default  new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{show:true},
            name:'home'
        },
        {
            path:'/search',
            //  path:'/search:keyWord',
            component:Search,
            meta:{show:true},
            name:'search'
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false},
            name:'login'
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false},
            name:'register'
        },
        {
            path:'*',
            redirect:"/home"
        }
    ]
})
