import {reqGetCode} from '@/api'
const state = {};
const mutations = {};
const actions = {
    //获取验证码
    getCode({commit},phone){
        let result = reqGetCode(phone);
        console.log(result);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}