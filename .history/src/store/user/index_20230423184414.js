import {reqGetCode} from '@/api'
const state = {
    code:''
};
const mutations = {};
const actions = {
    //获取验证码
    getCode({commit},phone){
        let result = reqGetCode(phone);
        if(result.code==200){
            commit('GETCODE');
        }
        
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}