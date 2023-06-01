import {reqAddressInfo} from '@/api'
const state = {

}
const mutations = {

}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        if(result.code==200){
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