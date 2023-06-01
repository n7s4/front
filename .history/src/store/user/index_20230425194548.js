import {reqGetCode,reqRegister,reqUserLogin,reqUserInfo} from '@/api'
const state = {
    code:'',
    token:''
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token=token;
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
   },
   //用户登录
   async userLogin({commit},data){
    let result = await reqUserLogin(data);
    if(result.code==200){
        commit('USERLOGIN',result.data.token);
        return 'ok';
    }else{
        return Promise.reject(new Error(result.message));
    }
   },
   //登录成功获取用户得信息
   getUserInfo({commit}){
    let result = reqUserInfo();
   },

};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}