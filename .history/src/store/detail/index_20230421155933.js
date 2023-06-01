import { reqDetailList ,reqAddOrUpdateShopCart} from "@/api"
const state = {
    detailInfo:{}
}
const mutations = {
    GETDETAILINFO(state, detailInfo){
        state.detailInfo = detailInfo;
    }
}
const action = {
    async  getDetailInfo({commit},skuid){
        let result = await reqDetailList(skuid);
          if (result.code == 200) {
               commit('GETDETAILINFO', result.data);
          }
    },
    //将产品加入购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        
       let result = await reqAddOrUpdateShopCart(skuId,skuNum);
       //服务器成功加入购物车
       if(result.code==200){
            return "ok"
       }else{
        //服务器加入购物车失败
        return Promise.reject(new Error('faile'))
       }
    }
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
    action,
    getters
}