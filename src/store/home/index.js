import { reqCategoryList, reqgetBannerList,reqFloorList } from '@/api'
//home模块的小仓库
//state:仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floorList:[]
};
//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //通过api里面的接口函数调用
    async reqCategoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data);
        }

    },
    async getBannerList({commit}) {
        let result = await reqgetBannerList();
        if (result.code === 200) {
            commit("BANNERLIST", result.data);
        }
    },
    async getFloorList({commit}) {
        let result = await reqFloorList();
        if (result.code === 200) {
            commit("GETFLOORLIST", result.data);
        }
    }
};
//getters:理解为计算属性
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}