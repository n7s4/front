import { reqDetailList } from "@/api"
const state = {
    detailInfo:{}
}
const mutations = {
    GETDETAILINFO(state, detailInfo){
        state.detailInfo = detailInfo;
    }
}
const actions = {
    async  getDetailInfo({commit},skuid){
        let result = await reqDetailList(skuid);
          if (result.code == 200) {
               commit('GETDETAILINFO', result.data);
          }
    },
    //将产品加入购物车
    addOrUpdateShopCart
}
const getters = {
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(){
        return state.detailInfo.spuSaleAttrList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}