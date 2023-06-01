import Vue from 'vue'
import App from './App.vue'

//引入路由
import router  from './router'
//引入TypeNav组件，将它定义为全局组件
import TypeNav from './components/TypeNav'
import  Pagination  from '@/components/Pagination'
import AddCarSuccess from '@/components/pages/addCartSuccess'
//引入ElementUi组件
import ElementUI from 'element-ui';
//引入Element样式
import 'element-ui/lib/theme-chalk/index.css';
//引入mockServe.js ----mock数据
import '@/mock/mockServe'

//统一接口api文件夹里面的全部请求函数
import * as API from "@/api"

Vue.config.silent = true

//引入仓库
import store from './store';
//引入swiper样式
import "swiper/css/swiper.css"
//测试
import {reqCategoryList} from './api/index'
// import {reqGetSearchInfo} from './api'
// console.log(reqGetSearchInfo({}));
//全局注册组件 第一个参数：组件名 第二个组件：是哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(AddCarSuccess.name,AddCarSuccess)
Vue.config.productionTip = false
//只用ElementUI
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$ap
  },
  //注册路由
  router:router,
  //注册仓库
  store
}).$mount('#app')
