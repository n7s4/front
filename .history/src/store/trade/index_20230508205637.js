import {reqAddressInfo,reqShopInfo} from '@/api'
const state = {
    address: [],
    tradeInfo: {},
}
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address;
    },
    GETSHOPINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo;
    }
}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        console.log(result);
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
           
            return 'ok'
        }
        else{
            return Promise.reject(new Error('faile'));
        }
    },
     //获取商品清单
     async getShopInfo({commit}){
        let result = await reqShopInfo();
        if(result.code==200){
            commit('GETSHOPINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
     },
     //
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}