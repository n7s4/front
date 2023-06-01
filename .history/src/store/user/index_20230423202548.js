import {reqGetCode,reqRegister} from '@/api'
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
     async getCode({ commit, state, dispatch }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
             commit('GETCODE', result.data);
             return 'ok';
        } else {
             return Promise.reject();
        }
   },
   //用户注册
   async register({commit},data){
    //注册接口没有data，不需要提交mutations
    let result = await reqRegister(data);
    if(result.code==200){
        return 'ok';
    }else{
        return Promise.reject(new Error(result.message));
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