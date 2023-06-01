//search模块的小仓库
import { reqGetSearchInfo } from '@/api'
let state = {
     //搜索模块返回的数据
     searchList: {}
};
let mutations = {
     GETSEARCHLIST(state, searchList) {
          state.searchList = searchList;
     }
};
let actions = {
     async getSearchList({commit }, searchParams) {
          let result = await reqGetSearchInfo(searchParams);
          if (result.code == 200) {
               commit('GETSEARCHLIST', result.data);
          }
     }
};

//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
let getters = {
    goodsList(state){
     return 
    } 
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}