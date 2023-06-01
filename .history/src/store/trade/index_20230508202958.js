import {reqAddressInfo} from '@/api'
const state = {

}
const mutations = {

}
const actions = {
    //获取用户地址信息
    getUserAddress({commit}){
        let result = reqAddressInfo();
        console.log(result.data);
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