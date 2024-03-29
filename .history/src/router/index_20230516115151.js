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
import Trade from '@/components/pages/Trade'
import PaySuccess from '@/components/pages/PaySuccess'
import Pay from '@/components/pages/Pay'
import Center from '@/components/pages/Center'
import myOrder from '@/components/pages/Center/myOrder'
import groupOrder from '@/components/pages/Center/groupOrder'

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
            path:'/center',
            component:()=> import('@/components/pages/Center'),
            meta:{show:true},
            name:'center',
            children:[
                {
                    path:'/center/myorder',
                    component:myOrder
                },
                {
                    path:'/center/grouporder',
                    component:groupOrder
                },{
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            path:'/paysuccess',
            component:PaySuccess,
            meta:{show:true},
            name:'paysuccess'
        },
        {
            path:'/pay',
            component:Pay,
            meta:{show:true},
            name:'pay',
            beforeEnter (to, from, next) {
                // 去交易页面，必须是从购物车而来
                if(from.path=='/trade'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:'/trade',
            component:Trade,
            meta:{show:true},
            name:'trade',
            beforeEnter (to, from, next) {
                // 去交易页面，必须是从购物车而来
                if(from.path=='/shopcart'){
                    next();
                }else{
                    next(false);
                }
            }
        },
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
    let name = store.state.user.userInfo.name;
    if(token){
        //用户已经登陆了
        if(to.path=='/login'){
            console.log('111');
            next('/home')
        }else{
            //登陆了，但是去的不是login
            if(name){
                next();
                
            }else{
                try {
                    await store.dispatch('getUserInfo');
                    next();
                    
                } catch (error) {
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
            
        }
    }else{
        //用户未登录，不能去交易、支付相关模块，个人中心。
        //为扽古去上面这些路由----登录
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1|| toPath.indexOf('/center')!=-1){
            next('login?redirect='+toPath);
        }else{
            //取得不是上面这些路由
            next();
        }
        
    }
})


export default router;


