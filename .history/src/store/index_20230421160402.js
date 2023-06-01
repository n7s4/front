//该文件用于创建vuex中最核心的store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
//引入home小仓库
import home from './home/index'
import search from './search/index'
import detail from './detail'
import shopcart from './shopcart'




//创建并导出store
export default new Vuex.Store({
 modules:{
    home,
    search,
    detail,
 }
})