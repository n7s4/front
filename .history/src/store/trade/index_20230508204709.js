import {reqAddressInfo} from '@/api'
const state = {
    address: [],
}
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address;
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