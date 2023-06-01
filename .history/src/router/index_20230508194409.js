//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '../components/pages/Home'
import Search from '@/components/pages/Search/'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Detail from '../components/pages/Detail'
import AddCarSuccess from '@/components/pages/addCartSuccess'
import ShopCart from '@/components/pages/ShopCart'


import store from '@/store'


//重写push|replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    } else {
        originPush.call(this,location,resolve,reject);
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
//配置路由
let router =  new VueRouter({
    routes:[
        {
            path:'/shopcart',
            component:ShopCart,
            meta:{show:true},
            name:'shopcart'
        },
        {
            path:'/addcarsuccess',
            component:AddCarSuccess,
            meta:{show:true},
            name:'addcarsuccess'
        },
        {
            path:'/detail/:skuid?',
            component:Detail,
            meta:{show:true},
            name:'detail'
        },
        {
            path:'/home',
            component:Home,
            meta:{show:true},
            name:'home'
        },
        {
            // path:'/search',
            path:"/search/:keyWord?",
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
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
});

//全局守卫：前置守卫
router.beforeEach(async(to,from,next)=>{
    let token = store.state.user.token;
    let name = store.state.user.nickName;
    console.log(name.loginName);
    if(token){
        //用户已经登陆了
        if(to.path=='/login'){
            console.log('111');
            next('/home')
        }else{
            //登陆了，但是去的不是login
            if(name){
                next();
                console.log('222');
            }else{
                try {
                    await store.dispatch('getUserInfo');
                    console.log('333');
                    next();

                } catch (error) {
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
            
        }
    }else{
        //用户未登录
        next();
    }
})


export default router;


