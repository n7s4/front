import {reqGetCode} from '@/api'
const state = {
    code:''
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    }
};
const actions = {
    //获取验证码
    getCode({commit},phone){
        let result = reqGetCode(phone);
        console.log(result);
        if(result.code==200){
            commit('GETCODE',result.);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
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