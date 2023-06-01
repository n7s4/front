import {reqAddressInfo,reqShopInfo,reqSubmitOrder} from '@/api'
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
     ////提交订单:tradeNO 交易编码   data:付款人信息
     submitInfo({commit},{ tradeNo, data }){
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);
        
     }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}